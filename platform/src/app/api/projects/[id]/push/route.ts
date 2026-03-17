import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { createPrivateRepo, pushFiles } from "@/lib/github";
import { nanoid } from "nanoid";

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
    if (!project?.latestRunId) {
      return NextResponse.json(
        { error: "No run to push" },
        { status: 400 }
      );
    }

    const run = await db.run.findUnique({
      where: { id: project.latestRunId },
    });
    if (!run?.generatedFiles) {
      return NextResponse.json(
        { error: "No files to push" },
        { status: 400 }
      );
    }

    const repoName = `resume-${project.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${nanoid(6)}`;
    const files = run.generatedFiles as Record<string, string>;

    let repoUrl = project.repoUrl;

    if (!repoUrl) {
      const repo = await createPrivateRepo(repoName);
      repoUrl = repo.repoUrl;
    }

    const repoShortName = repoUrl!.split("/").pop()!;
    await pushFiles(repoShortName, files, "Generated resume website");

    await db.project.update({
      where: { id: project.id },
      data: { repoUrl },
    });

    return NextResponse.json({ repoUrl });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Push failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
