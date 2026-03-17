import { Octokit } from "octokit";

function getClient() {
  return new Octokit({ auth: process.env.GITHUB_PAT });
}

export async function createPrivateRepo(
  repoName: string
): Promise<{ repoUrl: string; cloneUrl: string }> {
  const octokit = getClient();
  const org = process.env.GITHUB_ORG;

  const { data } = org
    ? await octokit.rest.repos.createInOrg({
        org,
        name: repoName,
        private: true,
        auto_init: false,
      })
    : await octokit.rest.repos.createForAuthenticatedUser({
        name: repoName,
        private: true,
        auto_init: false,
      });

  return {
    repoUrl: data.html_url,
    cloneUrl: data.clone_url,
  };
}

export async function addCollaborator(
  repoName: string,
  username: string
): Promise<void> {
  const octokit = getClient();
  const org = process.env.GITHUB_ORG;
  const owner = org ?? (await octokit.rest.users.getAuthenticated()).data.login;

  await octokit.rest.repos.addCollaborator({
    owner,
    repo: repoName,
    username,
    permission: "push",
  });
}

export async function pushFiles(
  repoName: string,
  files: Record<string, string>,
  commitMessage: string
): Promise<void> {
  const octokit = getClient();
  const org = process.env.GITHUB_ORG;
  const owner = org ?? (await octokit.rest.users.getAuthenticated()).data.login;

  const blobs = await Promise.all(
    Object.entries(files).map(async ([path, content]) => {
      const { data } = await octokit.rest.git.createBlob({
        owner,
        repo: repoName,
        content: Buffer.from(content).toString("base64"),
        encoding: "base64",
      });
      return { path, sha: data.sha };
    })
  );

  let baseSha: string | undefined;
  try {
    const { data: ref } = await octokit.rest.git.getRef({
      owner,
      repo: repoName,
      ref: "heads/main",
    });
    baseSha = ref.object.sha;
  } catch {
    // empty repo, no base commit
  }

  const treeItems = blobs.map((b) => ({
    path: b.path,
    mode: "100644" as const,
    type: "blob" as const,
    sha: b.sha,
  }));

  const { data: tree } = await octokit.rest.git.createTree({
    owner,
    repo: repoName,
    tree: treeItems,
    ...(baseSha ? { base_tree: baseSha } : {}),
  });

  const { data: commit } = await octokit.rest.git.createCommit({
    owner,
    repo: repoName,
    message: commitMessage,
    tree: tree.sha,
    ...(baseSha ? { parents: [baseSha] } : { parents: [] }),
  });

  try {
    await octokit.rest.git.updateRef({
      owner,
      repo: repoName,
      ref: "heads/main",
      sha: commit.sha,
    });
  } catch {
    await octokit.rest.git.createRef({
      owner,
      repo: repoName,
      ref: "refs/heads/main",
      sha: commit.sha,
    });
  }
}
