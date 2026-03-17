import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { reserveCredits, refundCredits } from "@/lib/credits";
import { generateSite } from "@/lib/codegen";
import type { ResumeData } from "@/lib/resume-parser";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth();
    const { id } = await params;
    const body = await req.json();

    const project = await db.project.findFirst({
      where: { id, userId: user.id },
    });
    if (!project) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const run = await db.run.create({
      data: {
        projectId: project.id,
        status: "PENDING",
        promptSummary: body.prompt ?? project.promptSummary,
        templateVersion: project.templateId,
        creditCost: 1,
      },
    });

    const credit = await reserveCredits(user.id, 1, "generation", run.id);
    if (!credit.success) {
      await db.run.update({
        where: { id: run.id },
        data: { status: "FAILED", errorMessage: "Insufficient credits" },
      });
      return NextResponse.json(
        { error: "Insufficient credits", balance: credit.balance },
        { status: 402 }
      );
    }

    try {
      await db.run.update({
        where: { id: run.id },
        data: { status: "GENERATING" },
      });

      const files = await generateSite({
        templateId: project.templateId,
        resumeData: (project.resumeData ?? {}) as unknown as ResumeData,
        userPrompt: body.prompt ?? "Generate with default styling.",
      });

      const filesMap = Object.fromEntries(files.map((f) => [f.path, f.content]));

      await db.run.update({
        where: { id: run.id },
        data: {
          status: "SUCCEEDED",
          generatedFiles: filesMap,
        },
      });

      await db.project.update({
        where: { id: project.id },
        data: { latestRunId: run.id },
      });

      return NextResponse.json({
        runId: run.id,
        status: "SUCCEEDED",
        files: files.map((f) => f.path),
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Generation failed";
      await db.run.update({
        where: { id: run.id },
        data: { status: "FAILED", errorMessage: message },
      });
      await refundCredits(user.id, 1, "generation", run.id);
      return NextResponse.json({ error: message }, { status: 500 });
    }
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
