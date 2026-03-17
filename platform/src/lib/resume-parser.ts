import pdf from "pdf-parse";

export interface ResumeData {
  fullName: string;
  email: string;
  phone?: string;
  location?: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  skills: string[];
  projects: ProjectEntry[];
  summary?: string;
  raw: string;
}

export interface EducationEntry {
  institution: string;
  degree: string;
  dates?: string;
}

export interface ExperienceEntry {
  company: string;
  title: string;
  dates?: string;
  bullets: string[];
}

export interface ProjectEntry {
  name: string;
  description: string;
  impact?: string;
  tags: string[];
}

export async function parseResumePdf(buffer: Buffer): Promise<ResumeData> {
  const { text } = await pdf(buffer);
  return extractStructuredData(text);
}

function extractStructuredData(raw: string): ResumeData {
  const lines = raw.split("\n").map((l) => l.trim()).filter(Boolean);

  const fullName = lines[0] ?? "Unknown";
  const emailMatch = raw.match(/[\w.-]+@[\w.-]+\.\w+/);
  const phoneMatch = raw.match(
    /(\+?\d[\d\s\-().]{7,}\d)/
  );

  const skills = extractSection(raw, [
    "TECHNICAL SKILLS",
    "SKILLS",
    "TECHNOLOGIES",
  ]);
  const skillList = skills
    ? skills
        .split(/[,;|]/)
        .map((s) => s.replace(/\(.*?\)/g, "").trim())
        .filter(Boolean)
    : [];

  const education = extractEducation(raw);
  const experience = extractExperience(raw);
  const projects = extractProjects(raw);

  return {
    fullName,
    email: emailMatch?.[0] ?? "",
    phone: phoneMatch?.[1],
    location: extractLocation(raw),
    education,
    experience,
    skills: skillList,
    projects,
    raw,
  };
}

function extractSection(text: string, headers: string[]): string | null {
  for (const header of headers) {
    const regex = new RegExp(`${header}[:\\s]*\\n([\\s\\S]*?)(?=\\n[A-Z]{2,}|$)`, "i");
    const match = text.match(regex);
    if (match) return match[1].trim();
  }
  return null;
}

function extractLocation(text: string): string | undefined {
  const match = text.match(
    /(?:Location|Address)[:\s]*([^\n]+)/i
  );
  if (match) return match[1].trim();

  const cityState = text.match(
    /\b([A-Z][a-z]+(?:\s[A-Z][a-z]+)*),\s*([A-Z]{2})\b/
  );
  return cityState ? `${cityState[1]}, ${cityState[2]}` : undefined;
}

function extractEducation(text: string): EducationEntry[] {
  const section = extractSection(text, ["EDUCATION", "ACADEMIC"]);
  if (!section) return [];

  const entries: EducationEntry[] = [];
  const lines = section.split("\n").filter((l) => l.trim());

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.match(/university|college|institute|school/i)) {
      const dateMatch = line.match(/\d{4}\s*[-–]\s*\d{4}|\d{4}/);
      const institution = line.replace(/\d{4}.*/, "").trim();
      const degree = lines[i + 1]?.trim() ?? "";
      entries.push({
        institution,
        degree,
        dates: dateMatch?.[0],
      });
    }
  }

  return entries;
}

function extractExperience(text: string): ExperienceEntry[] {
  const section = extractSection(text, [
    "PROFESSIONAL EXPERIENCE",
    "WORK EXPERIENCE",
    "EXPERIENCE",
  ]);
  if (!section) return [];

  const entries: ExperienceEntry[] = [];
  const blocks = section.split(/\n(?=[A-Z][\w\s&/]+(?:–|-))/);

  for (const block of blocks) {
    const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) continue;

    const company = lines[0].replace(/[–-]\s*.*/, "").trim();
    const titleLine = lines[1] ?? "";
    const title = titleLine.replace(/\b\w+\s+\d{4}.*/, "").trim();
    const dateMatch = block.match(
      /(?:January|February|March|April|May|June|July|August|September|October|November|December|\w+)\s+\d{4}\s*[–-]\s*(?:Present|\w+\s+\d{4})/i
    );

    const bullets = lines
      .slice(2)
      .filter((l) => l.startsWith("o ") || l.startsWith("•") || l.startsWith("-") || l.length > 20)
      .map((l) => l.replace(/^[o•\-]\s*/, "").trim());

    if (company) {
      entries.push({
        company,
        title,
        dates: dateMatch?.[0],
        bullets,
      });
    }
  }

  return entries;
}

function extractProjects(text: string): ProjectEntry[] {
  const section = extractSection(text, ["PROJECTS", "PROJECT EXPERIENCE"]);
  if (!section) return [];

  const entries: ProjectEntry[] = [];
  const blocks = section.split(/\n(?=[A-Z])/);

  for (const block of blocks) {
    const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) continue;

    entries.push({
      name: lines[0],
      description: lines.slice(1).join(" ").slice(0, 200),
      tags: [],
    });
  }

  return entries;
}
