import { useEffect, useState } from 'react';
import { ProjectScene } from './components/ProjectScene';
import { projects } from './data/projects';

const projectCount = String(projects.length).padStart(2, '0');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function machineDate(date: string) {
  const [month, year] = date.split(' ');
  return year + '-' + String(months.indexOf(month) + 1).padStart(2, '0');
}

function Arrow({ direction = 'up' }: { direction?: 'up' | 'down' }) {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    {direction === 'down'
      ? <path d="M8 2v11m-5-5 5 5 5-5" />
      : <path d="M3 13 13 3M3 3h10v10" />}
  </svg>;
}

function App() {
  const [active, setActive] = useState<string>('top');
  const [motionPaused, setMotionPaused] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(entry => entry.isIntersecting);
      if (visible.length) setActive(visible[0].target.id);
    }, { rootMargin: '-20% 0px -55% 0px', threshold: 0 });
    document.querySelectorAll('[data-chapter]').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const activeIndex = projects.findIndex(project => project.id === active);

  return (
    <>
      <a className="skip-link" href="#projects">Skip to projects</a>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="GPTechnologies home">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="m12 2 1.5 7 6.5-4-4 6.5 7 1.5-7 1.5 4 6.5-6.5-4L12 23l-1.5-7L4 20l4-6.5L1 12l7-1.5L4 4l6.5 4Z" /></svg>
          GPTechnologies
        </a>
        <span className="chapter-counter">
          {activeIndex >= 0 ? String(activeIndex + 1).padStart(2, '0') + ' / ' + projectCount : ''}
          {activeIndex >= 0 && <span className="counter-name"> · {projects[activeIndex].title}</span>}
        </span>
        <a className="header-link" href="#projects">Selected work <Arrow direction="down" /></a>
      </header>

      <main>
        <section className="hero page-width" id="top" data-chapter aria-labelledby="intro-title">
          <div className="hero-copy">
            <h1 id="intro-title">Hi, I'm Jai.</h1>
            <p className="hero-description">I work in Private Equity and AI, and build things I'm interested in.</p>
          </div>
          <figure className="hero-artwork">
            <img
              src="/gptechnologies-cartoon.webp"
              width="1627"
              height="967"
              fetchPriority="high"
              alt="A hand-drawn character pointing to a board that says GPTechnologies, This is our website, Scroll down."
            />
          </figure>
        </section>

        <section className="projects page-width" id="projects" aria-labelledby="projects-title">
          <div className="projects-heading">
            <h2 id="projects-title">Selected work</h2>
            <div className="projects-meta"><span>{projectCount} projects</span><button className="motion-control" type="button" aria-pressed={motionPaused} onClick={() => setMotionPaused(paused => !paused)}>
              <svg viewBox="0 0 12 12" width="10" height="10" fill="currentColor" aria-hidden="true">{motionPaused ? <path d="m3 1 7 5-7 5Z" /> : <path d="M2 1h2v10H2Zm6 0h2v10H8Z" />}</svg>
              {motionPaused ? 'Resume motion' : 'Pause motion'}
            </button></div>
          </div>
          {projects.map((project, index) => (
            <article className="project-chapter" id={project.id} key={project.id} data-chapter aria-labelledby={project.id + '-title'}>
              <ProjectScene project={project} index={index} paused={motionPaused} />
              <div className="project-story">
                <p className="eyebrow">{project.category}</p>
                <h3 id={project.id + '-title'}>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                {project.link && <a className="text-link project-primary-link" href={project.link} target="_blank" rel="noreferrer">View project <Arrow /></a>}
                {!!project.resources?.length && (
                  <div className="project-resources">
                    {project.resources.map(resource => <a className="quiet-link" href={resource.href} target="_blank" rel="noreferrer" key={resource.href}>{resource.label}<Arrow /></a>)}
                  </div>
                )}
                <p className="project-updated"><span>Last updated</span><time dateTime={machineDate(project.date)}>{project.date}</time></p>
              </div>
            </article>
          ))}
        </section>

        <footer className="site-footer page-width">
          <span>© 2026 GPTechnologies</span>
          <div className="footer-links"><a className="quiet-link" href="https://github.com/gptechnologies" target="_blank" rel="noreferrer">GitHub <Arrow /></a><a className="quiet-link" href="#top">Back to top <span aria-hidden="true">↑</span></a></div>
        </footer>
      </main>

      <nav className="chapter-nav" aria-label="Project chapters">
        {projects.map((project, index) => <a key={project.id} href={'#' + project.id} aria-label={project.title} aria-current={active === project.id ? 'location' : undefined}>
          <span className="chapter-nav-label">{String(index + 1).padStart(2, '0')} {project.title}</span><span className="chapter-tick" />
        </a>)}
      </nav>
    </>
  );
}

export default App;
