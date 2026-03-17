import Link from "next/link";
import { Sparkles, Upload, Code, Rocket } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-brand-light tracking-tight">
          ResumeForge
        </h1>
        <Link
          href="/login"
          className="px-4 py-2 bg-brand text-white rounded-lg text-sm font-medium hover:bg-brand-light transition-colors"
        >
          Get Started
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-2xl space-y-8">
          <h2 className="text-5xl font-extrabold tracking-tight leading-tight">
            Your resume,
            <br />
            <span className="text-brand-light">as a website.</span>
          </h2>
          <p className="text-lg text-text-muted max-w-lg mx-auto">
            Upload your resume, choose a style template, and we generate a
            fully deployable website. Edit with AI, push to GitHub, deploy
            anywhere.
          </p>

          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-lg font-semibold hover:bg-brand-light transition-colors"
          >
            <Sparkles size={18} />
            Start Building — 3 Free Credits
          </Link>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
          <StepCard
            icon={<Upload size={24} />}
            title="1. Upload"
            description="Drop your resume PDF and pick a style template from our gallery."
          />
          <StepCard
            icon={<Code size={24} />}
            title="2. Generate"
            description="AI builds a complete website project using your data and chosen style."
          />
          <StepCard
            icon={<Rocket size={24} />}
            title="3. Deploy"
            description="Push to a private GitHub repo and deploy to Vercel with one click."
          />
        </div>
      </main>

      <footer className="border-t border-border px-6 py-4 text-center text-sm text-text-muted">
        Built by GPTechnologies
      </footer>
    </div>
  );
}

function StepCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-surface-raised border border-border rounded-xl p-6 text-left space-y-3">
      <div className="text-brand-light">{icon}</div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-text-muted">{description}</p>
    </div>
  );
}
