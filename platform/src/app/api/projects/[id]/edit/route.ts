import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { reserveCredits, refundCredits } from "@/lib/credits";
import { editSite } from "@/lib/codegen";
import type { FileOutput } from "@/lib/llm";
import { z } from "zod";

const schema = z.object({ prompt: z.string().min(1).max(2000) });

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth();
    const { id } = await params;
    const { prompt } = schema.parse(await req.json());

    const project = await db.project.findFirst({
      where: { id, userId: user.id },
    });
    if (!project?.latestRunId) {
      return NextResponse.json(
        { error: "No existing run to edit" },
        { status: 400 }
      );
    }

    const latestRun = await db.run.findUnique({
      where: { id: project.latestRunId },
    });
    if (!latestRun?.generatedFiles) {
      return NextResponse.json(
        { error: "No generated files to edit" },
        { status: 400 }
      );
    }

    const editReq = await db.editRequest.create({
      data: { runId: latestRun.id, prompt, creditCost: 1 },
    });

    const credit = await reserveCredits(user.id, 1, "edit", editReq.id);
    if (!credit.success) {
      await db.editRequest.update({
        where: { id: editReq.id },
        data: { status: "FAILED" },
      });
      return NextResponse.json(
        { error: "Insufficient credits", balance: credit.balance },
        { status: 402 }
      );
    }

    try {
      await db.editRequest.update({
        where: { id: editReq.id },
        data: { status: "PROCESSING" },
      });

      const currentFilesMap = latestRun.generatedFiles as Record<string, string>;
      const currentFiles: FileOutput[] = Object.entries(currentFilesMap).map(
        ([path, content]) => ({ path, content })
      );

      const updatedFiles = await editSite(
        currentFiles,
        project.templateId,
        prompt
      );

      const updatedMap = Object.fromEntries(
        updatedFiles.map((f) => [f.path, f.content])
      );

      const newRun = await db.run.create({
        data: {
          projectId: project.id,
          status: "SUCCEEDED",
          promptSummary: prompt,
          templateVersion: project.templateId,
          generatedFiles: updatedMap,
          creditCost: 0,
        },
      });

      await db.editRequest.update({
        where: { id: editReq.id },
        data: { status: "APPLIED" },
      });

      await db.project.update({
        where: { id: project.id },
        data: { latestRunId: newRun.id },
      });

      return NextResponse.json({
        editRequestId: editReq.id,
        runId: newRun.id,
        status: "APPLIED",
        files: updatedFiles.map((f) => f.path),
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Edit failed";
      await db.editRequest.update({
        where: { id: editReq.id },
        data: { status: "FAILED" },
      });
      await refundCredits(user.id, 1, "edit", editReq.id);
      return NextResponse.json({ error: message }, { status: 500 });
    }
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
