import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { createVercelProject } from "@/lib/vercel";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth();
    const { id } = await params;

    const project = await db.project.findFirst({
      where: { id, userId: user.id },
    });
    if (!project?.repoUrl) {
      return NextResponse.json(
        { error: "Push to GitHub first" },
        { status: 400 }
      );
    }

    const org = process.env.GITHUB_ORG;
    const repoName = project.repoUrl.split("/").pop()!;
    const repoFullName = org ? `${org}/${repoName}` : repoName;
    const projectName = repoName;

    const { url } = await createVercelProject(projectName, repoFullName);

    await db.project.update({
      where: { id: project.id },
      data: { deployUrl: url },
    });

    return NextResponse.json({ deployUrl: url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Deploy failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
