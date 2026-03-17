import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const MODEL = process.env.OPENAI_MODEL ?? "gpt-4o";

export interface FileOutput {
  path: string;
  content: string;
}

export async function generateCode(
  systemPrompt: string,
  userPrompt: string
): Promise<FileOutput[]> {
  const response = await client.chat.completions.create({
    model: MODEL,
    temperature: 0.2,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    response_format: { type: "json_object" },
  });

  const raw = response.choices[0]?.message?.content;
  if (!raw) throw new Error("Empty LLM response");

  const parsed = JSON.parse(raw);

  if (!parsed.files || !Array.isArray(parsed.files)) {
    throw new Error("LLM response missing files array");
  }

  return parsed.files.map((f: { path: string; content: string }) => ({
    path: f.path,
    content: f.content,
  }));
}

export async function applyEdit(
  currentFiles: FileOutput[],
  editPrompt: string,
  templateContext: string
): Promise<FileOutput[]> {
  const filesContext = currentFiles
    .map((f) => `--- ${f.path} ---\n${f.content}`)
    .join("\n\n");

  const systemPrompt = `You are a code editor for a resume website. You receive the current project files and an edit request.
Apply the requested changes and return ALL project files (modified and unmodified) as a JSON object with a "files" array.
Each file object has "path" (string) and "content" (string).

Template context:\n${templateContext}

Current files:\n${filesContext}`;

  return generateCode(systemPrompt, editPrompt);
}
