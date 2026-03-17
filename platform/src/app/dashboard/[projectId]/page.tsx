"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  GitBranch,
  Rocket,
  Pencil,
  ExternalLink,
  Loader2,
  FileCode,
} from "lucide-react";

interface Run {
  id: string;
  status: string;
  promptSummary: string | null;
  createdAt: string;
}

interface ProjectDetail {
  id: string;
  name: string;
  templateId: string;
  repoUrl: string | null;
  deployUrl: string | null;
  runs: Run[];
}

export default function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const router = useRouter();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [pushing, setPushing] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/projects/${projectId}`)
      .then((r) => r.json())
      .then((d) => setProject(d.project))
      .finally(() => setLoading(false));
  }, [projectId]);

  async function handlePush() {
    setPushing(true);
    setError("");
    try {
      const res = await fetch(`/api/projects/${projectId}/push`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setProject((p) => (p ? { ...p, repoUrl: data.repoUrl } : p));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Push failed");
    } finally {
      setPushing(false);
    }
  }

  async function handleDeploy() {
    setDeploying(true);
    setError("");
    try {
      const res = await fetch(`/api/projects/${projectId}/deploy`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setProject((p) => (p ? { ...p, deployUrl: data.deployUrl } : p));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Deploy failed");
    } finally {
      setDeploying(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={24} className="animate-spin text-text-muted" />
      </div>
    );
  }

  if (!project) {
    return <div className="text-text-muted py-20 text-center">Project not found.</div>;
  }

  const latestRun = project.runs[0];

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{project.name}</h2>
        <span className="text-sm text-text-muted">
          Template: {project.templateId}
        </span>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {latestRun?.status === "SUCCEEDED" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={handlePush}
            disabled={pushing}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-surface-raised border border-border rounded-lg font-medium hover:border-brand-light transition-colors disabled:opacity-50"
          >
            {pushing ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <GitBranch size={16} />
            )}
            {project.repoUrl ? "Update Repo" : "Push to GitHub"}
          </button>

          <button
            onClick={handleDeploy}
            disabled={deploying || !project.repoUrl}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-surface-raised border border-border rounded-lg font-medium hover:border-brand-light transition-colors disabled:opacity-50"
          >
            {deploying ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Rocket size={16} />
            )}
            Deploy to Vercel
          </button>

          <button
            onClick={() => router.push(`/dashboard/${projectId}/edit`)}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-brand text-white rounded-lg font-medium hover:bg-brand-light transition-colors"
          >
            <Pencil size={16} />
            Edit with AI
          </button>
        </div>
      )}

      {project.repoUrl && (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-brand-light hover:underline"
        >
          <ExternalLink size={14} />
          {project.repoUrl}
        </a>
      )}

      {project.deployUrl && (
        <a
          href={project.deployUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-brand-light hover:underline"
        >
          <ExternalLink size={14} />
          {project.deployUrl}
        </a>
      )}

      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Run History</h3>
        {project.runs.map((run) => (
          <div
            key={run.id}
            className="flex items-center gap-4 bg-surface-raised border border-border rounded-lg px-5 py-3"
          >
            <FileCode size={16} className="text-text-muted" />
            <div className="flex-1">
              <span className="text-sm">
                {run.promptSummary ?? "Initial generation"}
              </span>
            </div>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded ${
                run.status === "SUCCEEDED"
                  ? "bg-green-500/20 text-green-400"
                  : run.status === "FAILED"
                  ? "bg-red-500/20 text-red-400"
                  : "bg-yellow-500/20 text-yellow-400"
              }`}
            >
              {run.status}
            </span>
            <span className="text-xs text-text-muted">
              {new Date(run.createdAt).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
