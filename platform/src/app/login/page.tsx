import { signIn } from "@/lib/auth";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-8 text-center">
        <div>
          <h1 className="text-3xl font-bold text-brand-light">ResumeForge</h1>
          <p className="mt-2 text-text-muted">Sign in to start building</p>
        </div>

        <div className="space-y-3">
          <form
            action={async () => {
              "use server";
              await signIn("github", { redirectTo: "/dashboard" });
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-surface-raised border border-border rounded-lg font-medium hover:bg-surface-bright transition-colors"
            >
              <LogIn size={18} />
              Continue with GitHub
            </button>
          </form>

          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/dashboard" });
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-surface-raised border border-border rounded-lg font-medium hover:bg-surface-bright transition-colors"
            >
              <LogIn size={18} />
              Continue with Google
            </button>
          </form>
        </div>

        <p className="text-xs text-text-muted">
          You&apos;ll receive 3 free credits on signup.
        </p>
      </div>
    </div>
  );
}
