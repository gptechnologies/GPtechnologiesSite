import Link from "next/link";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Plus, ExternalLink } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const projects = await db.project.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: { runs: { orderBy: { createdAt: "desc" }, take: 1 } },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Link
          href="/dashboard/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg text-sm font-medium hover:bg-brand-light transition-colors"
        >
          <Plus size={16} />
          New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-20 text-text-muted">
          <p className="text-lg">No projects yet</p>
          <p className="text-sm mt-1">
            Create your first resume website to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const latestRun = project.runs[0];
            return (
              <Link
                key={project.id}
                href={`/dashboard/${project.id}`}
                className="bg-surface-raised border border-border rounded-xl p-6 hover:border-brand-light transition-colors space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold truncate">{project.name}</h3>
                  <ExternalLink size={14} className="text-text-muted" />
                </div>
                <p className="text-sm text-text-muted">
                  Template: {project.templateId}
                </p>
                {latestRun && (
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        latestRun.status === "SUCCEEDED"
                          ? "bg-green-500"
                          : latestRun.status === "FAILED"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    />
                    <span className="text-xs text-text-muted">
                      {latestRun.status}
                    </span>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
