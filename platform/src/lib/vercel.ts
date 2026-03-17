const BASE = "https://api.vercel.com";

function headers() {
  return {
    Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
    "Content-Type": "application/json",
  };
}

function teamQuery() {
  const teamId = process.env.VERCEL_TEAM_ID;
  return teamId ? `?teamId=${teamId}` : "";
}

export async function createVercelProject(
  projectName: string,
  repoFullName: string
): Promise<{ projectId: string; url: string }> {
  const res = await fetch(`${BASE}/v10/projects${teamQuery()}`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      name: projectName,
      framework: "vite",
      gitRepository: {
        type: "github",
        repo: repoFullName,
      },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Vercel create project failed: ${res.status} ${body}`);
  }

  const data = await res.json();
  return {
    projectId: data.id,
    url: `https://${projectName}.vercel.app`,
  };
}

export async function triggerDeployment(
  projectName: string
): Promise<{ deploymentUrl: string }> {
  const res = await fetch(`${BASE}/v13/deployments${teamQuery()}`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      name: projectName,
      target: "production",
      gitSource: {
        type: "github",
        ref: "main",
        repoId: projectName,
      },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Vercel deploy failed: ${res.status} ${body}`);
  }

  const data = await res.json();
  return { deploymentUrl: data.url };
}
