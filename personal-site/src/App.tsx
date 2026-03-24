import { useState, useEffect, useRef } from 'react';
import { Terminal, ChevronUp, Minus, Square, X, Bot, Send, Loader2, Zap, Phone } from 'lucide-react';
import { projects } from './data/projects';

const skills = [
  "Python", "Pandas", "Numpy", "SQL", "VBA", "Power Query", "PowerBI",
  "FastAPI", "Streamlit", "Langchain", "Langgraph", "Snowflake", "CI/CD",
  "DAX", "Excel", "n8n", "Intacct", "Salesforce", "Investran", "Allvue",
  "Concur", "AI Agents", "React", "TypeScript",
];

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

const Typewriter = ({ text, speed = 60 }: { text: string; speed?: number }) => {
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
  return (
    <span>
      {displayed}
      <span className={`inline-block w-[2px] h-[1em] bg-y2k-cyan ml-0.5 align-middle ${done ? 'animate-blink' : ''}`} />
    </span>
  );
};

const BusinessCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center w-full my-16 relative z-10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-y2k-pink/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-64 h-64 bg-y2k-cyan/20 blur-[100px] rounded-full pointer-events-none" />

      <p className="font-mono text-y2k-cyan text-sm md:text-base mb-6 y2k-text-glow">
        <Typewriter text="GPTechnologies is the consulting arm of:" speed={55} />
      </p>

      <div
        className="card-container cursor-pointer w-full max-w-[450px] h-[340px] perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`card-flipper w-full h-full relative transition-transform duration-700 ${isFlipped ? 'flipped' : ''}`}>

          {/* Front */}
          <div className="card-face card-front absolute w-full h-full bg-black/80 backdrop-blur-sm y2k-border p-8 flex flex-col justify-center items-center">
            <div className="absolute top-2 right-2 flex gap-1">
              <div className="w-2 h-2 bg-y2k-pink rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-y2k-cyan rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
            </div>
            <h1 className="text-4xl font-display font-black text-white y2k-text-glow tracking-widest uppercase mb-2">Jai Mangat</h1>
            <h2 className="text-lg font-mono text-y2k-cyan mb-5 bg-y2k-cyan/10 px-3 py-1 border border-y2k-cyan/30">Systems Architect</h2>
            <div className="w-full space-y-2 text-sm font-mono">
              <div className="flex items-center justify-between border-b border-y2k-pink/30 pb-1">
                <span className="text-y2k-pink">EMAIL::</span>
                <span className="text-white">jaimangat11@gmail.com</span>
              </div>
              <div className="flex items-center justify-between border-b border-y2k-pink/30 pb-1">
                <span className="text-y2k-pink">EDU::</span>
                <span className="text-white">Bentley University - BS in Finance</span>
              </div>
              <div className="flex items-center justify-between border-b border-y2k-pink/30 pb-1">
                <span className="text-y2k-pink">LOC::</span>
                <span className="text-white">New York, NY</span>
              </div>
            </div>
            <SkillsMarquee />
          </div>

          {/* Back */}
          <div className="card-face card-back absolute w-full h-full bg-black/90 y2k-border-alt p-6 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4 border-b border-y2k-cyan/50 pb-2">
              <Zap size={18} className="text-y2k-cyan" />
              <h3 className="text-lg font-mono font-bold text-y2k-cyan uppercase tracking-widest">What_Do_I_Do.exe</h3>
            </div>
            <ul className="text-xs font-mono space-y-3 overflow-y-auto pr-2">
              <li className="flex items-start gap-2">
                <span className="text-y2k-pink mt-0.5">{'>'}</span>
                <span className="text-gray-300">Install AI agents into day-to-day business workflows</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-y2k-pink mt-0.5">{'>'}</span>
                <span className="text-gray-300">Automate repetitive back-office and finance processes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-y2k-pink mt-0.5">{'>'}</span>
                <span className="text-gray-300">Connect CRM, operations, and reporting systems end-to-end</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-y2k-pink mt-0.5">{'>'}</span>
                <span className="text-gray-300">Improve scheduling, intake, and customer communication with AI</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-y2k-pink mt-0.5">{'>'}</span>
                <span className="text-gray-300">Turn manual ops work into reliable, automated systems</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div
        className="mt-8 flex items-center gap-2 text-y2k-cyan font-mono text-sm animate-pulse bg-black/50 px-4 py-1 border border-y2k-cyan/30 cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <ChevronUp size={14} />
        <p>Click card to flip</p>
        <ChevronUp size={14} />
      </div>
    </div>
  );
};

const starterPrompts = [
  "What does GPTechnologies help with?",
  "How do you install AI agents?",
  "What kind of automations can you build?",
];

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const Y2KChatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0 && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: ChatMessage = { role: 'user', content: text.trim() };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput('');
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.ok) throw new Error('Failed to get response');
      const data = await res.json();
      setMessages([...history, { role: 'assistant', content: data.reply }]);
    } catch {
      setError('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="w-full max-w-2xl mx-auto px-4 py-16 relative z-10">
      <div className="y2k-window">
        <div className="y2k-window-header">
          <div className="flex items-center gap-2">
            <Bot size={16} />
            <span>GPT_Assistant.exe</span>
          </div>
          <div className="flex gap-1">
            <button className="y2k-button" aria-label="Minimize"><Minus size={12} /></button>
            <button className="y2k-button" aria-label="Maximize"><Square size={10} /></button>
            <button className="y2k-button" aria-label="Clear chat" onClick={() => { setMessages([]); setInput(''); setError(''); }}><X size={12} /></button>
          </div>
        </div>

        <div className="bg-black border-4 border-silver border-t-0 flex flex-col" style={{ height: '420px' }}>
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3 chat-scrollbar">
            <div className="chat-bubble-assistant">
              <span className="text-y2k-cyan font-mono text-xs">{'>'} SYS::</span>
              <p className="text-sm font-mono text-gray-300 mt-1">
                Welcome to GPTechnologies. Ask me anything about our AI agents, automations, and consulting services.
              </p>
            </div>

            {messages.length === 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {starterPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(prompt)}
                    className="text-xs font-mono px-3 py-1.5 border border-y2k-cyan/40 text-y2k-cyan bg-y2k-cyan/5 hover:bg-y2k-cyan/15 transition-colors rounded"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-assistant'}>
                <span className={`font-mono text-xs ${msg.role === 'user' ? 'text-y2k-pink' : 'text-y2k-cyan'}`}>
                  {msg.role === 'user' ? '> YOU::' : '> GPT::'}
                </span>
                <p className="text-sm font-mono text-gray-300 mt-1 whitespace-pre-wrap">{msg.content}</p>
              </div>
            ))}

            {loading && (
              <div className="chat-bubble-assistant">
                <span className="text-y2k-cyan font-mono text-xs">{'>'} GPT::</span>
                <div className="flex items-center gap-2 mt-1">
                  <Loader2 size={14} className="animate-spin text-y2k-cyan" />
                  <span className="text-xs font-mono text-gray-500">Processing...</span>
                </div>
              </div>
            )}

            {error && (
              <div className="text-xs font-mono text-red-400 bg-red-500/10 border border-red-500/30 px-3 py-2 rounded">
                ERR:: {error}
              </div>
            )}

            
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
            className="border-t-2 border-silver flex"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              placeholder="Type your question..."
              className="flex-1 bg-y2k-bg text-white font-mono text-sm px-4 py-3 focus:outline-none placeholder:text-gray-600 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-4 bg-y2k-bg border-l-2 border-silver text-y2k-cyan hover:text-y2k-pink transition-colors disabled:opacity-30"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const MyWork = () => (
  <section className="w-full max-w-6xl mx-auto px-4 py-16 relative z-10">
    <div className="mb-16 flex flex-col items-center text-center">
      <h2 className="text-4xl md:text-5xl font-display font-black text-white y2k-text-glow tracking-wider uppercase border-b-4 border-y2k-pink pb-2">
        My_Work.dir
      </h2>
      <p className="mt-6 text-lg font-mono text-y2k-cyan bg-black/50 px-4 py-2 border border-y2k-cyan/30">
        {'>'} A showcase of automated workflows, AI agents, and systems architectures.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <div
          key={index}
          className="y2k-window flex flex-col hover:-translate-y-2 transition-transform duration-300"
        >
          <div className="y2k-window-header">
            <div className="flex items-center gap-2">
              {project.icon}
              <span className="truncate max-w-[150px]">{project.title}.exe</span>
            </div>
            <div className="flex gap-1">
              <button className="y2k-button" aria-label="Minimize"><Minus size={12} /></button>
              <button className="y2k-button" aria-label="Maximize"><Square size={10} /></button>
              <button className="y2k-button" aria-label="Close"><X size={12} /></button>
            </div>
          </div>

          <div className="bg-black text-white p-5 flex flex-col flex-grow border-4 border-silver border-t-0">
            <p className="text-gray-300 text-sm font-mono mb-6 flex-grow leading-relaxed">
              {project.description}
            </p>
            <div className="bg-y2k-bg border border-y2k-cyan p-3 mb-5 relative">
              <div className="absolute -top-2.5 left-2 bg-black px-1 text-xs font-mono text-y2k-cyan">IMPACT_LOG</div>
              <p className="text-xs font-mono text-white">
                <span className="text-y2k-pink">{'>'}</span> {project.impact}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-800">
              {project.tags.map((tag, tagIndex) => (
                <span key={tagIndex} className="px-2 py-1 text-[10px] font-mono font-bold text-black bg-y2k-cyan uppercase">{tag}</span>
              ))}
            </div>
            {project.phone && (
              <a
                href={`tel:+1${project.phone}`}
                className="mt-4 flex items-center gap-2 text-xs font-mono bg-y2k-cyan/10 border border-y2k-cyan/40 px-3 py-2 rounded text-y2k-cyan hover:bg-y2k-cyan/20 hover:text-white transition-colors group"
              >
                <Phone size={13} className="group-hover:animate-pulse" />
                <span>TRY IT LIVE — (518) 660-8016</span>
              </a>
            )}
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-xs font-mono text-y2k-cyan hover:text-y2k-pink underline underline-offset-2 transition-colors">OPEN_LINK</a>
            )}
          </div>
        </div>
      ))}
    </div>
  </section>
);

const Divider = ({ label }: { label: string }) => (
  <div className="w-full max-w-4xl mx-auto my-8 border-t-2 border-dashed border-y2k-pink/50 relative">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-y2k-bg px-4 text-y2k-pink font-mono text-xs">
      {label}
    </div>
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen w-full relative">
      <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.10)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%]" />

      <main className="relative z-10 py-10">
        <BusinessCard />
        <Divider label="ASK_US_ANYTHING" />
        <Y2KChatbot />
        <Divider label="SCROLL_DOWN" />
        <MyWork />
      </main>

      <footer className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8 border-t border-y2k-cyan/20">
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-6">
            <a href="https://linkedin.com/in/jai-mangat" target="_blank" rel="noopener noreferrer" className="text-y2k-cyan hover:text-y2k-pink font-mono text-xs transition-colors">
              LINKEDIN
            </a>
            <a href="https://github.com/gptechnologies" target="_blank" rel="noopener noreferrer" className="text-y2k-cyan hover:text-y2k-pink font-mono text-xs transition-colors">
              GITHUB
            </a>
            <a href="mailto:jaimangat11@gmail.com" className="text-y2k-cyan hover:text-y2k-pink font-mono text-xs transition-colors">
              EMAIL
            </a>
          </div>
          <p className="text-gray-600 font-mono text-xs">&copy; {new Date().getFullYear()} GPTechnologies</p>
        </div>
      </footer>
    </div>
  );
}
