import { useState, useEffect } from 'react';
import { Terminal, ChevronUp, Minus, Square, X, Briefcase } from 'lucide-react';
import { projects } from './data/projects';
import { experience } from './data/experience';

const skills = ["{{SKILL_1}}", "{{SKILL_2}}", "{{SKILL_3}}", "{{SKILL_4}}", "{{SKILL_5}}"];

const SkillsMarquee = () => {
  const content = skills.map(s => s.toUpperCase()).join("  \u00b7  ");
  return (
    <div className="w-full mt-2 flex items-center gap-2">
      <span className="text-y2k-pink text-xs font-mono shrink-0">SKILLS::</span>
      <div className="marquee-outer">
        <div className="marquee-track">
          <span className="text-y2k-cyan text-xs font-mono whitespace-nowrap y2k-text-glow">{content}&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>
          <span className="text-y2k-cyan text-xs font-mono whitespace-nowrap y2k-text-glow" aria-hidden="true">{content}&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>
        </div>
      </div>
    </div>
  );
};

const Typewriter = ({ text, speed = 55 }: { text: string; speed?: number }) => {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(interval); setDone(true); }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return <span>{displayed}<span className={`inline-block w-[2px] h-[1em] bg-y2k-cyan ml-0.5 align-middle ${done ? 'animate-blink' : ''}`} /></span>;
};

const BusinessCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center w-full my-16 relative z-10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-y2k-pink/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-64 h-64 bg-y2k-cyan/20 blur-[100px] rounded-full pointer-events-none" />

      <p className="font-mono text-y2k-cyan text-sm md:text-base mb-6 y2k-text-glow">
        <Typewriter text="{{INTRO_TEXT}}" />
      </p>

      <div className="card-container cursor-pointer w-full max-w-[450px] h-[340px] perspective-1000" onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`card-flipper w-full h-full relative transition-transform duration-700 ${isFlipped ? 'flipped' : ''}`}>
          <div className="card-face card-front absolute w-full h-full bg-black/80 backdrop-blur-sm y2k-border p-8 flex flex-col justify-center items-center">
            <div className="absolute top-2 right-2 flex gap-1">
              <div className="w-2 h-2 bg-y2k-pink rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-y2k-cyan rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
            </div>
            <h1 className="text-4xl font-display font-black text-white y2k-text-glow tracking-widest uppercase mb-2">{"{{FULL_NAME}}"}</h1>
            <h2 className="text-lg font-mono text-y2k-cyan mb-5 bg-y2k-cyan/10 px-3 py-1 border border-y2k-cyan/30">{"{{TITLE}}"}</h2>
            <div className="w-full space-y-2 text-sm font-mono">
              <div className="flex items-center justify-between border-b border-y2k-pink/30 pb-1"><span className="text-y2k-pink">EMAIL::</span><span className="text-white">{"{{EMAIL}}"}</span></div>
              <div className="flex items-center justify-between border-b border-y2k-pink/30 pb-1"><span className="text-y2k-pink">EDU::</span><span className="text-white">{"{{EDUCATION}}"}</span></div>
              <div className="flex items-center justify-between border-b border-y2k-pink/30 pb-1"><span className="text-y2k-pink">LOC::</span><span className="text-white">{"{{LOCATION}}"}</span></div>
            </div>
            <SkillsMarquee />
          </div>
          <div className="card-face card-back absolute w-full h-full bg-black/90 y2k-border-alt p-6 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4 border-b border-y2k-cyan/50 pb-2">
              <Terminal size={18} className="text-y2k-cyan" />
              <h3 className="text-lg font-mono font-bold text-y2k-cyan uppercase tracking-widest">Work_Summary.exe</h3>
            </div>
            <ul className="text-xs font-mono space-y-3 overflow-y-auto pr-2">
              {/* Back of card work summary bullets populated by LLM */}
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-8 flex items-center gap-2 text-y2k-cyan font-mono text-sm animate-pulse bg-black/50 px-4 py-1 border border-y2k-cyan/30 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
        <ChevronUp size={14} /><p>Click card to flip</p><ChevronUp size={14} />
      </div>
    </div>
  );
};

const WorkExperience = () => (
  <section className="w-full max-w-4xl mx-auto px-4 py-12 relative z-10">
    <div className="flex items-center gap-3 mb-10">
      <Briefcase size={24} className="text-y2k-pink" />
      <h2 className="text-3xl md:text-4xl font-display font-black text-white y2k-text-glow tracking-wider uppercase">Experience.log</h2>
    </div>
    <div className="space-y-8 border-l-2 border-y2k-cyan/40 pl-6 ml-3">
      {experience.map((exp, i) => (
        <div key={i} className="relative">
          <div className="absolute -left-[33px] top-1 w-4 h-4 rounded-full bg-y2k-cyan border-2 border-y2k-bg" />
          <div className="bg-black/60 border border-y2k-cyan/30 p-5 rounded">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <h3 className="text-lg font-mono font-bold text-y2k-cyan">{exp.company}</h3>
              <span className="text-xs font-mono text-y2k-pink">{exp.dates}</span>
            </div>
            <p className="text-sm font-mono text-y2k-pink/80 mb-3">{exp.title}</p>
            <ul className="space-y-1.5">
              {exp.bullets.map((b, j) => (
                <li key={j} className="flex items-start gap-2 text-xs font-mono text-gray-300">
                  <span className="text-y2k-pink mt-0.5">{'>'}</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const MyWork = () => (
  <section className="w-full max-w-6xl mx-auto px-4 py-16 relative z-10">
    <div className="mb-16 flex flex-col items-center text-center">
      <h2 className="text-4xl md:text-5xl font-display font-black text-white y2k-text-glow tracking-wider uppercase border-b-4 border-y2k-pink pb-2">My_Work.dir</h2>
      <p className="mt-6 text-lg font-mono text-y2k-cyan bg-black/50 px-4 py-2 border border-y2k-cyan/30">{'>'} A showcase of automated workflows, AI agents, and systems architectures.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <div key={index} className="y2k-window flex flex-col hover:-translate-y-2 transition-transform duration-300">
          <div className="y2k-window-header">
            <div className="flex items-center gap-2">{project.icon}<span className="truncate max-w-[150px]">{project.title}.exe</span></div>
            <div className="flex gap-1">
              <button className="y2k-button" aria-label="Minimize"><Minus size={12} /></button>
              <button className="y2k-button" aria-label="Maximize"><Square size={10} /></button>
              <button className="y2k-button" aria-label="Close"><X size={12} /></button>
            </div>
          </div>
          <div className="bg-black text-white p-5 flex flex-col flex-grow border-4 border-silver border-t-0">
            <p className="text-gray-300 text-sm font-mono mb-6 flex-grow leading-relaxed">{project.description}</p>
            <div className="bg-y2k-bg border border-y2k-cyan p-3 mb-5 relative">
              <div className="absolute -top-2.5 left-2 bg-black px-1 text-xs font-mono text-y2k-cyan">IMPACT_LOG</div>
              <p className="text-xs font-mono text-white"><span className="text-y2k-pink">{'>'}</span> {project.impact}</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-800">
              {project.tags.map((tag, tagIndex) => (
                <span key={tagIndex} className="px-2 py-1 text-[10px] font-mono font-bold text-black bg-y2k-cyan uppercase">{tag}</span>
              ))}
            </div>
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-xs font-mono text-y2k-cyan hover:text-y2k-pink underline underline-offset-2 transition-colors">OPEN_LINK</a>
            )}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default function App() {
  return (
    <div className="min-h-screen w-full relative">
      <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.10)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%]" />
      <main className="relative z-10 py-10">
        <BusinessCard />
        <WorkExperience />
        <div className="w-full max-w-4xl mx-auto my-8 border-t-2 border-dashed border-y2k-pink/50 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-y2k-bg px-4 text-y2k-pink font-mono text-xs">SCROLL_DOWN</div>
        </div>
        <MyWork />
      </main>
    </div>
  );
}
