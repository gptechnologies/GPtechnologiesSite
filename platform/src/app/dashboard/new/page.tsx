"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Upload, Sparkles, Loader2 } from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
}

export default function NewProjectPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [name, setName] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [prompt, setPrompt] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [step, setStep] = useState<"setup" | "generating">("setup");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/templates")
      .then((r) => r.json())
      .then((d) => {
        setTemplates(d.templates ?? []);
        if (d.templates?.[0]) setTemplateId(d.templates[0].id);
      });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setStep("generating");

    try {
      const projRes = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, templateId, promptSummary: prompt }),
      });
      const { project } = await projRes.json();
      if (!projRes.ok) throw new Error("Failed to create project");

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("projectId", project.id);
        const uploadRes = await fetch("/api/resume/upload", {
          method: "POST",
          body: formData,
        });
        if (!uploadRes.ok) throw new Error("Resume upload failed");
      }

      const genRes = await fetch(`/api/projects/${project.id}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!genRes.ok) {
        const data = await genRes.json();
        throw new Error(data.error ?? "Generation failed");
      }

      router.push(`/dashboard/${project.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStep("setup");
    }
  }

  if (step === "generating") {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <Loader2 size={32} className="animate-spin text-brand-light" />
        <p className="text-text-muted">Generating your resume website...</p>
        <p className="text-xs text-text-muted">This may take 30-60 seconds.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold">New Project</h2>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Project Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="My Resume Site"
            className="w-full px-4 py-3 bg-surface-raised border border-border rounded-lg focus:outline-none focus:border-brand-light"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Style Template</label>
          <div className="grid grid-cols-1 gap-3">
            {templates.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTemplateId(t.id)}
                className={`text-left p-4 rounded-lg border transition-colors ${
                  templateId === t.id
                    ? "border-brand-light bg-brand/10"
                    : "border-border bg-surface-raised hover:border-brand-light/50"
                }`}
              >
                <div className="font-medium">{t.name}</div>
                <div className="text-sm text-text-muted mt-1">
                  {t.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Upload Resume (PDF)</label>
          <div className="relative">
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="w-full px-4 py-3 bg-surface-raised border border-border rounded-lg file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:bg-brand file:text-white file:text-sm file:font-medium"
            />
            <Upload
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Describe how it should look (optional)
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            placeholder="Make it clean and modern, emphasize my AI/ML experience..."
            className="w-full px-4 py-3 bg-surface-raised border border-border rounded-lg focus:outline-none focus:border-brand-light resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={!name || !templateId}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-brand text-white rounded-lg font-semibold hover:bg-brand-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Sparkles size={18} />
          Generate (1 Credit)
        </button>
      </form>
    </div>
  );
}
