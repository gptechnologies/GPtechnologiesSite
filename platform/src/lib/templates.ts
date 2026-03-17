import fs from "fs/promises";
import path from "path";

export interface TemplateMeta {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  version: string;
  sections: string[];
}

export interface TemplateBundle {
  meta: TemplateMeta;
  files: Record<string, string>;
  systemPrompt: string;
}

const TEMPLATES_DIR = path.join(process.cwd(), "src", "templates");

export async function listTemplates(): Promise<TemplateMeta[]> {
  const entries = await fs.readdir(TEMPLATES_DIR, { withFileTypes: true });
  const templates: TemplateMeta[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    try {
      const raw = await fs.readFile(
        path.join(TEMPLATES_DIR, entry.name, "template.json"),
        "utf-8"
      );
      templates.push(JSON.parse(raw));
    } catch {
      // skip malformed templates
    }
  }

  return templates;
}

export async function loadTemplate(templateId: string): Promise<TemplateBundle> {
  const dir = path.join(TEMPLATES_DIR, templateId);
  const raw = await fs.readFile(path.join(dir, "template.json"), "utf-8");
  const meta: TemplateMeta = JSON.parse(raw);

  const filesDir = path.join(dir, "files");
  const files = await readDirRecursive(filesDir, filesDir);

  const systemPrompt = await fs.readFile(
    path.join(dir, "system-prompt.md"),
    "utf-8"
  );

  return { meta, files, systemPrompt };
}

async function readDirRecursive(
  baseDir: string,
  currentDir: string
): Promise<Record<string, string>> {
  const results: Record<string, string> = {};
  const entries = await fs.readdir(currentDir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(currentDir, entry.name);
    const relativePath = path.relative(baseDir, fullPath);

    if (entry.isDirectory()) {
      const sub = await readDirRecursive(baseDir, fullPath);
      Object.assign(results, sub);
    } else {
      results[relativePath] = await fs.readFile(fullPath, "utf-8");
    }
  }

  return results;
}
