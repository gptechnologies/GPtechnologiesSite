import { loadTemplate } from "./templates";
import { generateCode, applyEdit, type FileOutput } from "./llm";
import type { ResumeData } from "./resume-parser";

export interface GenerationInput {
  templateId: string;
  resumeData: ResumeData;
  userPrompt: string;
}

export async function generateSite(
  input: GenerationInput
): Promise<FileOutput[]> {
  const template = await loadTemplate(input.templateId);

  const templateFiles = Object.entries(template.files)
    .map(([path, content]) => `--- ${path} ---\n${content}`)
    .join("\n\n");

  const resumeJson = JSON.stringify(input.resumeData, null, 2);

  const systemPrompt = `${template.systemPrompt}

TEMPLATE FILES (use these as the base structure — populate with the user's data):
${templateFiles}

PARSED RESUME DATA:
${resumeJson}

INSTRUCTIONS:
1. Use the template files as the exact structural base.
2. Replace all placeholder/sample data with the user's resume data.
3. Match the template's visual style, component structure, and CSS exactly.
4. Apply any customization the user requests in their prompt.
5. Return a JSON object with a "files" array. Each entry has "path" (string) and "content" (string).
6. Include ALL files needed for a working Vite + React + Tailwind project (package.json, index.html, vite.config.ts, tsconfig.json, src/*, etc).
7. The project must build with \`npm install && npm run build\` without errors.`;

  const userPrompt = input.userPrompt
    ? `User request: ${input.userPrompt}`
    : "Generate the resume website using my data with the default template style.";

  return generateCode(systemPrompt, userPrompt);
}

export async function editSite(
  currentFiles: FileOutput[],
  templateId: string,
  editPrompt: string
): Promise<FileOutput[]> {
  const template = await loadTemplate(templateId);
  return applyEdit(currentFiles, editPrompt, template.systemPrompt);
}
