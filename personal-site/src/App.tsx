import { createElement, useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import {
  ArrowUpRight,
  Play,
  ShieldCheck,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const splineViewerScript = 'https://unpkg.com/@splinetool/viewer@1.12.88/build/spline-viewer.js';
const splineSceneUrl = 'https://prod.spline.design/APbOccAAWifR9p4Y/scene.splinecode';

function SplineBackdrop() {
  useEffect(() => {
    if (document.querySelector(`script[src="${splineViewerScript}"]`)) return;

    const script = document.createElement('script');
    script.type = 'module';
    script.src = splineViewerScript;
    document.head.appendChild(script);
  }, []);

  return (
    <section className="spline-backdrop" aria-label="Interactive Spline object">
      {createElement('spline-viewer', {
        class: 'spline-scene',
        url: splineSceneUrl,
      })}
    </section>
  );
}

function useScrollReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal-on-scroll'));

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -16% 0px', threshold: 0.16 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);
}


type GlassButtonProps = {
  children: string;
  href: string;
  variant?: 'primary' | 'secondary';
  icon?: LucideIcon;
};

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Customers', href: '#customers' },
  { label: 'Platform', href: '#platform' },
  { label: 'How We Work', href: '#how-we-work' },
  { label: 'Research', href: '#research' },
];

const partnerNames = [
  'HIPAA Compliant',
  'BAA-ready vendor process',
  'Secure-by-design implementation',
  'Zero Data Retention',
];

const proofCards = [
  {
    name: 'Diagnostics operator',
    role: 'Clinical operations lead',
    quote:
      'GPTechnologies helped us turn case notes, intake files, and lab outputs into a searchable operating layer our team can actually trust.',
    result: 'Mapped 18 source systems',
  },
  {
    name: 'Biotech analytics team',
    role: 'Data science director',
    quote:
      'The work gave our team a practical route from scattered research records to repeatable dashboards without waiting on a platform rebuild.',
    result: 'Reduced manual reporting cycles',
  },
];

const narrativeBeats = [
  {
    label: 'Problem',
    title: 'Complex records slow down teams that need precise answers',
    summary:
      'Life sciences teams have useful data spread across PDFs, spreadsheets, lab systems, intake notes, and legacy databases. The work becomes manual, brittle, and hard to audit.',
  },
  {
    label: 'Solution',
    title: 'Build a controlled intelligence layer around the data you already own',
    summary:
      'We map the data, extract it into a governed structure, and turn it into searchable workflows, dashboards, and repeatable answers your team can use every day.',
  },
];

const securityFeatures = [
  {
    title: 'Governed extraction',
    description:
      'Schema mapping, review queues, and validation checkpoints keep extracted data understandable before it reaches production workflows.',
  },
  {
    title: 'Private deployment path',
    description:
      'We design around your vendor, BAA, retention, and access-control requirements instead of forcing sensitive data through a generic toolchain.',
  },
  {
    title: 'Auditable outputs',
    description:
      'Dashboards and search experiences are tied back to known sources so teams can inspect where the answer came from.',
  },
];

const platformInputs = [
  'PDFs',
  'Lab outputs',
  'Spreadsheets',
  'Legacy systems',
];

const platformOutputs = [
  'Search',
  'Dashboards',
  'KPIs',
  'Workflows',
];

const processSteps = [
  {
    number: '01',
    title: 'Map',
    description:
      'We inventory the source systems, identify the entities that matter, and define a schema your team can inspect before extraction begins.',
    visual: 'map',
  },
  {
    number: '02',
    title: 'Extract',
    description:
      'Purpose-built AI pipelines pull structured fields from documents, notes, and records while routing uncertain outputs through review.',
    visual: 'extract',
  },
  {
    number: '03',
    title: 'Validate',
    description:
      'Human checks, source links, and quality rules keep the data trustworthy enough to become the foundation for analytics and workflows.',
    visual: 'validate',
  },
  {
    number: '04',
    title: 'Operate',
    description:
      'The governed database powers dashboards, search, reporting, and automated workflows that improve as new records arrive.',
    visual: 'operate',
  },
];

const researchArticles = [
  {
    category: 'Research note',
    title: 'Designing reliable extraction pipelines for life sciences records',
    summary: 'A field guide to turning documents, lab outputs, and legacy records into queryable infrastructure.',
  },
  {
    category: 'Best practices',
    title: 'Turning fragmented operational data into decision-ready analytics',
    summary: 'How teams can move from scattered files to trusted metrics without waiting on a full platform rebuild.',
  },
  {
    category: 'Methods',
    title: 'Best practices for AI-assisted schema mapping',
    summary: 'A practical approach to deciding what to extract, how to validate it, and where humans stay in the loop.',
  },
];

const challengeOptions = ['48', '54', '56', '64'];

function LogoMark() {
  return (
    <img className="logo-mark" src="/logo-white.png" alt="" aria-hidden="true" />
  );
}

type TopNavProps = {
  onOpenContact: () => void;
};

function TopNav({ onOpenContact }: TopNavProps) {
  return (
    <header className="top-nav" aria-label="Primary navigation">
      <div className="brand-stack">
        <a className="brand" href="/">
          <LogoMark />
          <span>GPTechnologies</span>
        </a>
      </div>

      <nav className="nav-links" aria-label="Landing page sections">
        {navItems.map((item) => (
          <a href={item.href} key={item.label}>
            {item.label}
          </a>
        ))}
      </nav>

      <button className="nav-cta" type="button" onClick={onOpenContact}>
        <span>Contact Us</span>
        <span className="nav-cta-icon" aria-hidden="true">
          <ArrowUpRight size={16} strokeWidth={1.8} />
        </span>
      </button>
    </header>
  );
}

function GlassButton({ children, href, variant = 'primary', icon: Icon = ArrowUpRight }: GlassButtonProps) {
  return (
    <a className={`glass-button glass-button-${variant}`} href={href}>
      <span>{children}</span>
      <span className="button-icon" aria-hidden="true">
        <Icon size={18} strokeWidth={1.8} />
      </span>
    </a>
  );
}

function HeroCopy() {
  return (
    <section className="hero-copy" aria-labelledby="hero-heading">
      <h1 id="hero-heading">
        Turn Complex Life Sciences Data Into <span>Usable Intelligence</span>
      </h1>

      <p>
        We help biotech, diagnostics, healthcare, and research teams build an automated pipeline to pull information from files and legacy systems which we turn into a singular, searchable database with dashboards and automated workflows.
      </p>

      <div className="hero-actions">
        <GlassButton href="#research">See our work</GlassButton>
        <GlassButton href="#intelligence-flow" variant="secondary" icon={Play}>
          See How it Works
        </GlassButton>
      </div>
    </section>
  );
}

function PartnerRow() {
  return (
    <section className="partner-strip" aria-label="Trusted by life sciences innovators">
      <p>Trusted by life sciences innovators</p>
      <div className="partner-row">
        {partnerNames.map((name, index) => (
          <span
            key={name}
            style={{ ['--trust-delay' as string]: `${900 + index * 495}ms` }}
          >
            <ShieldCheck size={16} strokeWidth={1.6} />
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}

function LandingOverlay() {
  return (
    <div className="landing-overlay">
      <PartnerRow />
      <HeroCopy />
    </div>
  );
}

function ProofSection() {
  return (
    <section id="customers" className="proof-section" aria-labelledby="proof-heading">
      <div className="section-kicker" id="proof-heading">
        Deployed with teams that need trusted operational data
      </div>
      <div className="proof-grid">
        {proofCards.map((card, index) => (
          <article
            className="proof-card reveal-on-scroll"
            style={{ ['--reveal-delay' as string]: `${index * 140}ms` }}
            key={card.name}
          >
            <div>
              <p className="proof-name">{card.name}</p>
              <span className="proof-role">{card.role}</span>
            </div>
            <blockquote>{card.quote}</blockquote>
            <div className="proof-result">
              <span>{card.result}</span>
              <ArrowUpRight size={18} strokeWidth={1.7} aria-hidden="true" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function NarrativeSection() {
  return (
    <section id="intelligence-flow" className="narrative-section" aria-labelledby="narrative-heading">
      <h2 id="narrative-heading" className="sr-only">
        From scattered data to trusted intelligence
      </h2>
      <div className="narrative-rail" aria-hidden="true" />
      <div className="narrative-stack">
        {narrativeBeats.map((beat, index) => (
          <article
            className="narrative-beat reveal-on-scroll"
            style={{ ['--reveal-delay' as string]: `${index * 160}ms` }}
            key={beat.label}
          >
            <p>{beat.label}</p>
            <h3>{beat.title}</h3>
            <span>{beat.summary}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function PlatformSection() {
  return (
    <section id="platform" className="platform-section" aria-labelledby="platform-heading">
      <div className="platform-label">The platform</div>
      <div className="platform-heading">
        <h2 id="platform-heading">A controlled data layer for life sciences operations</h2>
        <p>
          GPTechnologies connects scattered records to a governed extraction engine, then routes clean data into the places where teams make decisions.
        </p>
      </div>

      <div className="platform-panel">
        <div className="platform-diagram" aria-label="Data sources flowing into the GPTechnologies extraction engine and out to search, dashboards, KPIs, and workflows.">
          <div className="platform-column platform-column-inputs">
            {platformInputs.map((input) => (
              <span key={input}>{input}</span>
            ))}
          </div>
          <div className="platform-lane" aria-hidden="true" />
          <div className="platform-core">
            <span>GPTechnologies</span>
            <strong>AI extraction engine</strong>
            <p>Schema mapping, validation, source links, governed database</p>
          </div>
          <div className="platform-lane" aria-hidden="true" />
          <div className="platform-column platform-column-outputs">
            {platformOutputs.map((output) => (
              <span key={output}>{output}</span>
            ))}
          </div>
        </div>

        <aside className="platform-copy">
          <h3>The operating layer</h3>
          <p>
            The goal is not another disconnected dashboard. The platform creates a shared source of truth that can answer questions, trigger workflows, and keep data traceable.
          </p>
          <div className="platform-tags">
            <span>Source linked</span>
            <span>Reviewable</span>
            <span>Search ready</span>
          </div>
        </aside>
      </div>
    </section>
  );
}

function ProcessVisual({ type }: { type: string }) {
  return (
    <div className={`process-visual process-visual-${type}`} aria-hidden="true">
      <div className="visual-toolbar">
        <span />
        <span />
        <span />
      </div>
      <div className="visual-stage">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="visual-meter">
        <span />
      </div>
    </div>
  );
}

function ProcessSection() {
  const [activeProcessIndex, setActiveProcessIndex] = useState(0);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visibleEntry) return;

        const index = Number((visibleEntry.target as HTMLElement).dataset.processIndex);
        if (Number.isFinite(index)) {
          setActiveProcessIndex(index);
        }
      },
      {
        rootMargin: '-34% 0px -42% 0px',
        threshold: [0.18, 0.36, 0.54, 0.72],
      }
    );

    stepRefs.current.forEach((step) => {
      if (step) observer.observe(step);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="how-we-work"
      className="process-section"
      aria-labelledby="process-heading"
      style={{ ['--process-progress' as string]: `${activeProcessIndex / (processSteps.length - 1)}` }}
    >
      <div className="process-heading">
        <p>How we work</p>
        <h2 id="process-heading">From fragmented records to intelligence your team can operate</h2>
      </div>

      <div className="process-layout">
        <ol className="process-index" aria-label="Process steps">
          {processSteps.map((step, index) => (
            <li
              className={activeProcessIndex === index ? 'is-active' : undefined}
              aria-current={activeProcessIndex === index ? 'step' : undefined}
              key={step.number}
            >
              {step.number}
            </li>
          ))}
        </ol>

        <div className="process-list">
          {processSteps.map((step, index) => (
            <article
              className={`process-step${activeProcessIndex === index ? ' is-active' : ''}`}
              data-process-index={index}
              ref={(element) => {
                stepRefs.current[index] = element;
              }}
              style={{
                ['--process-step-index' as string]: index,
                ['--reveal-delay' as string]: `${index * 120}ms`,
              }}
              key={step.number}
            >
              <div className="process-copy">
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              <ProcessVisual type={step.visual} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SecuritySection() {
  return (
    <section id="security" className="security-section" aria-labelledby="security-heading">
      <div className="security-heading">
        <p>Security</p>
        <h2 id="security-heading">Your data stays governed from extraction to answer</h2>
        <span>
          We structure AI workflows around privacy, source traceability, and human review so useful automation does not create a new data risk.
        </span>
        <div className="security-badges" aria-label="Security posture">
          {partnerNames.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
      </div>

      <div className="security-grid">
        {securityFeatures.map((feature, index) => (
          <article
            className="security-card reveal-on-scroll"
            style={{ ['--reveal-delay' as string]: `${index * 110}ms` }}
            key={feature.title}
          >
            <div className="security-glyph" aria-hidden="true" />
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ResearchSection() {
  return (
    <section id="research" className="research-section" aria-labelledby="research-heading">
      <div className="research-heading">
        <p>Research</p>
        <h2 id="research-heading">Practical notes from the data infrastructure work</h2>
      </div>

      <div className="research-list" aria-label="Upcoming research articles">
        {researchArticles.map((article, index) => (
          <article
            className="research-item reveal-on-scroll"
            style={{ ['--reveal-delay' as string]: `${index * 110}ms` }}
            key={article.title}
          >
            <div>
              <p>{article.category}</p>
              <h3>{article.title}</h3>
              <span>{article.summary}</span>
            </div>
            <ArrowUpRight size={22} strokeWidth={1.7} aria-hidden="true" />
          </article>
        ))}
      </div>
    </section>
  );
}

function FooterCta({ onOpenContact }: TopNavProps) {
  return (
    <footer className="footer-cta">
      <div>
        <p>Turn scattered records into operating intelligence</p>
        <button className="nav-cta" type="button" onClick={onOpenContact}>
          <span>Book a working session</span>
          <span className="nav-cta-icon" aria-hidden="true">
            <ArrowUpRight size={16} strokeWidth={1.8} />
          </span>
        </button>
      </div>
      <div className="footer-meta">
        <a className="brand" href="/">
          <LogoMark />
          <span>GPTechnologies</span>
        </a>
        <span>© 2026 GPTechnologies. All rights reserved.</span>
      </div>
    </footer>
  );
}

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [challengeAnswer, setChallengeAnswer] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousActiveElement = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const previousBodyOverflow = document.body.style.overflow;

    const focusTimer = window.setTimeout(() => {
      firstFieldRef.current?.focus();
    }, 80);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !modalRef.current) return;

      const focusableElements = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      previousActiveElement?.focus();
    };
  }, [isOpen, onClose]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatusMessage(
      challengeAnswer === '56'
        ? 'Thanks. The form is ready for a real submission endpoint.'
        : 'Please answer the verification question correctly before sending.'
    );
  }

  if (!isOpen) return null;

  return (
    <div className="contact-modal-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <div
        ref={modalRef}
        className="contact-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-heading"
      >
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close contact form">
          <X size={18} strokeWidth={1.8} />
        </button>

        <div className="contact-modal-heading">
          <p>Contact</p>
          <h2 id="contact-modal-heading">Tell us what you want your data to answer</h2>
          <span>Share the systems, records, or reporting problems you want to improve.</span>
        </div>

        <form className="contact-form contact-form-modal" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              <span>Company</span>
              <input ref={firstFieldRef} name="company" type="text" autoComplete="organization" required />
            </label>
            <label>
              <span>Name</span>
              <input name="name" type="text" autoComplete="name" required />
            </label>
            <label>
              <span>Email</span>
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              <span>Do you have a referral? If yes, put the company name.</span>
              <input name="referral" type="text" />
            </label>
          </div>

          <label>
            <span>Message</span>
            <textarea name="message" rows={5} required />
          </label>

          <fieldset className="challenge-field">
            <legend>What is 7 x 8?</legend>
            <div className="challenge-options">
              {challengeOptions.map((option) => (
                <label key={option}>
                  <input
                    name="challenge"
                    type="radio"
                    value={option}
                    checked={challengeAnswer === option}
                    onChange={(event) => setChallengeAnswer(event.currentTarget.value)}
                    required
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <button className="form-submit" type="submit">
            <span>Send Message</span>
            <span className="button-icon" aria-hidden="true">
              <ArrowUpRight size={18} strokeWidth={1.8} />
            </span>
          </button>
          {statusMessage && <p className="form-status">{statusMessage}</p>}
        </form>
      </div>
    </div>
  );
}

export default function App() {
  useScrollReveal();
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <main className="page">
      <TopNav onOpenContact={() => setIsContactOpen(true)} />
      <SplineBackdrop />
      <section id="home" className="hero-section" aria-label="GPTechnologies landing hero">
        <LandingOverlay />
      </section>
      <div className="site-flow">
        <ProofSection />
        <NarrativeSection />
        <PlatformSection />
        <ProcessSection />
        <SecuritySection />
        <ResearchSection />
        <FooterCta onOpenContact={() => setIsContactOpen(true)} />
      </div>
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </main>
  );
}
