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
  { label: 'How We Excel', href: '#how-we-excel' },
  { label: 'Research', href: '#research' },
];

const partnerNames = [
  'HIPAA Compliant',
  'BAA-ready vendor process',
  'Secure-by-design implementation',
  'Zero Data Retention',
];

const howWeExcelItems = [
  'First, we help you rapidly identify where your data exists and map a schema of all relevant data points.',
  'Next, we use AI and machine learning models to create an automatic pipeline that will pull your data into a searchable database.',
  'We use this database as the source to create an infinite amount of dashboards, KPIs, and reports that answer real business questions.',
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
        <GlassButton href="#how-we-excel" variant="secondary" icon={Play}>
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

function WhatWeDoFlow() {
  return (
    <div className="what-flow-section" aria-labelledby="what-flow-heading">
      <h2 id="what-flow-heading" className="sr-only">
        Convert Data Into Insights
      </h2>
      <div className="what-flow-graphic" aria-label="Unstructured data flowing through the GPTechnologies AI Extraction Engine into dashboards, search, KPIs, and trends.">
        <div className="flow-node flow-node-source">
          <span>Unstructured Data</span>
          <p>Files, records, lab outputs, legacy systems</p>
        </div>
        <div className="flow-connector" aria-hidden="true" />
        <div className="flow-node flow-node-engine">
          <span>GPTechnologies AI Extraction Engine</span>
          <p>Schema mapping, validation, search-ready database</p>
        </div>
        <div className="flow-connector" aria-hidden="true" />
        <div className="flow-output-grid">
          {['Dashboards', 'Search', 'KPIs', 'Trends'].map((label) => (
            <div className="flow-node flow-node-output" key={label}>
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HowWeExcelSection() {
  return (
    <section id="how-we-excel" className="belowground-section" aria-labelledby="how-excel-heading">
      <div className="section-heading section-heading-left excellence-heading">
        <p>How we excel</p>
        <h2 id="how-excel-heading">From scattered records to decision-ready intelligence in 3 steps</h2>
        <ol className="excellence-list" aria-label="How GPTechnologies turns scattered records into intelligence">
          {howWeExcelItems.map((item, index) => (
            <li
              className="excellence-list-item reveal-on-scroll"
              style={{ ['--reveal-delay' as string]: `${index * 195}ms` }}
              key={item}
            >
              {item}
            </li>
          ))}
        </ol>
      </div>

      <WhatWeDoFlow />
    </section>
  );
}

function ResearchSection() {
  return (
    <section id="research" className="content-section research-section" aria-labelledby="research-heading">
      <div className="section-heading section-heading-left section-heading-page-left">
        <p>Research</p>
        <h2 id="research-heading">A selection of research and work we want to highlight</h2>
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
          <span>
            Share the systems, records, or reporting problems you want to improve. We will use this form as the front-end shell until submission handling is connected.
          </span>
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
      <HowWeExcelSection />
      <ResearchSection />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </main>
  );
}
