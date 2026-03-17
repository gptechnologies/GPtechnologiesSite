import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import { getBalance } from "@/lib/credits";
import { redirect } from "next/navigation";
import { Coins, FolderOpen, LogOut } from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const balance = await getBalance(session.user.id);

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 border-r border-border bg-surface-raised flex flex-col">
        <div className="p-6 border-b border-border">
          <h1 className="text-lg font-bold text-brand-light">ResumeForge</h1>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <NavLink href="/dashboard" icon={<FolderOpen size={18} />}>
            Projects
          </NavLink>
          <NavLink href="/dashboard/credits" icon={<Coins size={18} />}>
            Credits ({balance})
          </NavLink>
        </nav>

        <div className="p-4 border-t border-border space-y-3">
          <div className="text-sm text-text-muted truncate">
            {session.user.email}
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button
              type="submit"
              className="flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors"
            >
              <LogOut size={14} />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}

function NavLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-text-muted hover:bg-surface-bright hover:text-text-primary transition-colors"
    >
      {icon}
      {children}
    </Link>
  );
}
