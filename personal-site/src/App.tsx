import { projects } from './data/projects';

function App() {
  return (
    <main>
      <section className="hero" aria-label="GPTechnologies introduction">
        <div className="hero-artwork">
          <img
            src="/GPTechnologiesWebsite.png"
            alt="Hand-drawn GPTechnologies illustration with the message: This is our website."
          />
          <a className="see-more" href="#projects" aria-label="Scroll down to projects">
            <span>Scroll down to projects</span>
          </a>
        </div>
      </section>

      <section className="projects" id="projects" aria-labelledby="projects-title">
        <div className="projects-heading">
          <p>Last updated</p>
          <h1 id="projects-title">Projects</h1>
        </div>

        <ol className="timeline">
          {projects.map((project) => (
            <li className="timeline-item" key={project.title}>
              <time>{project.date}</time>
              <article>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                {project.link ? (
                  <a href={project.link} target="_blank" rel="noreferrer">
                    View project <span aria-hidden="true">↗</span>
                  </a>
                ) : null}
              </article>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}

export default App;
