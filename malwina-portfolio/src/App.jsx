import { useState, useEffect, useRef } from "react";
import "./App.css";

const NAV_LINKS = ["Home", "Projects", "Skills", "Contact", "Resume"];

const PROJECTS = [
  {
    name: "NeuroViz — Brain Signal Classifier",
    featured: true,
    tags: ["Python", "TensorFlow", "React", "SQL"],
    desc: "An end-to-end pipeline that processes raw EEG signals, classifies cognitive states with 94% accuracy, and streams results to an interactive real-time dashboard.",
    image: "/images/project.png",
  },
  {
    name: "AstroMap",
    tags: ["C++", "Python", "SQL"],
    desc: "Interactive star-chart tool that queries NASA exoplanet archives and renders 3-D sky maps in the browser.",
    icon: "🌐",
  },
  {
    name: "CipherScan",
    tags: ["Python", "React", "Node.js"],
    desc: "Automated vulnerability scanner that parses network traffic and highlights anomalies using ML clustering.",
    icon: "🔒",
  },
  {
    name: "GeneFlow",
    tags: ["R", "Python", "SQL"],
    desc: "Bioinformatics pipeline for differential gene expression analysis across RNA-seq datasets.",
    icon: "🧬",
  },
];

const SKILLS = [
  {
    category: "Data Analysis",
    icon: "📊",
    items: ["Python", "R", "SQL", "Pandas", "NumPy", "C++"],
  },
  {
    category: "Full-Stack",
    icon: "</>",
    items: ["React", "Next.js", "Node.js", "TypeScript", "Tailwind", "C++"],
  },
  {
    category: "Tools & Others",
    icon: "🔧",
    items: ["Git", "Docker", "Linux", "Firebase", "Figma", "VS Code"],
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function AnimatedSection({ children, className = "", delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`animated-section ${inView ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [activeNav, setActiveNav] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeroLoaded(true), 100);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
    setMenuOpen(false);
  };

  return (
    <div className="portfolio">
      {/* Ambient background orbs */}
      <div className="bg-orb orb-1" />
      <div className="bg-orb orb-2" />
      <div className="bg-orb orb-3" />

      {/* NAV */}
      <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="nav__inner">
          <div className="nav__brand">
            <div className="logo-mark">M</div>
            <div className="nav__brand-text">
              <span className="nav__brand-name">Malwina</span>
              <span className="nav__brand-role">Data Scientist</span>
            </div>
          </div>

          <div className="nav__pill">
            <ul className={`nav__links ${menuOpen ? "nav__links--open" : ""}`}>
              {NAV_LINKS.filter(l => l !== "Resume").map((l) => (
                <li key={l}>
                  <button
                    className={`nav__link ${activeNav === l ? "nav__link--active" : ""}`}
                    onClick={() => scrollTo(l)}
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="nav__end">
            <button
              className="nav__link nav__link--cta"
              onClick={() => scrollTo("Resume")}
            >
              Resume ↓
            </button>
            <button className="nav__burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="hero">
        <div className={`hero__content ${heroLoaded ? "hero__content--loaded" : ""}`}>
          <span className="hero__eyebrow">HI, I'M MALWINA</span>
          <h1 className="hero__title">
            Data Scientist &amp;<br />Research Engineer
          </h1>
          <p className="hero__bio">
            I transform data into meaningful insights and build intelligent solutions.
            Passionate about bioinformatics, astronomy, and cybersecurity, with a love
            for clean interfaces and impactful design.
          </p>
          <div className="hero__actions">
            <button className="btn btn--primary" onClick={() => scrollTo("Contact")}>
              Contact Me →
            </button>
            <div className="hero__socials">
              <a href="https://github.com/malwina" target="_blank" rel="noreferrer" className="social-icon" aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
              </a>
              <a href="mailto:malwina@example.com" className="social-icon" aria-label="Email">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </a>
              <a href="https://linkedin.com/in/malwina" target="_blank" rel="noreferrer" className="social-icon" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div className={`hero__visual ${heroLoaded ? "hero__visual--loaded" : ""}`}>
          <div className="hero__image-frame">
            <img src="/images/hero.png" alt="Hero visual" className="hero__img" />
            <div className="hero__image-glow" />
          </div>
          <div className="hero__dots">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`dot ${i === 0 ? "dot--active" : ""}`} />
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section projects">
        <AnimatedSection>
          <div className="section__header">
            <h2 className="section__title">Projects</h2>
            <div className="section__underline" />
          </div>
        </AnimatedSection>

        {/* Featured project */}
        <AnimatedSection delay={100}>
          <div className="project-featured">
            <div className="project-featured__content">
              <div className="project-featured__badge">⭐ Featured Project</div>
              <h3 className="project-featured__name">{PROJECTS[0].name}</h3>
              <p className="project-featured__desc">{PROJECTS[0].desc}</p>
              <div className="tags">
                {PROJECTS[0].tags.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
              <div className="project-featured__links">
                <a href="#" className="btn btn--outline btn--sm">View Project →</a>
                <a href="#" className="btn btn--ghost btn--sm">GitHub</a>
              </div>
            </div>
            <div className="project-featured__image">
              <img src="/images/banner.png" alt={PROJECTS[0].name} />
              <div className="project-featured__image-overlay" />
            </div>
          </div>
        </AnimatedSection>

        {/* Other projects grid */}
        <div className="projects-grid">
          {PROJECTS.slice(1).map((p, i) => (
            <AnimatedSection key={p.name} delay={i * 80}>
              <div className="project-card">
                <div className="project-card__icon">{p.icon}</div>
                <h3 className="project-card__name">{p.name}</h3>
                <p className="project-card__desc">{p.desc}</p>
                <div className="tags">
                  {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
                <a href="#" className="project-card__link">View →</a>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section skills">
        <AnimatedSection>
          <div className="section__header">
            <h2 className="section__title">Skills &amp; Technologies</h2>
            <div className="section__underline" />
          </div>
        </AnimatedSection>
        <div className="skills-grid">
          {SKILLS.map((s, i) => (
            <AnimatedSection key={s.category} delay={i * 100}>
              <div className="skill-card">
                <div className="skill-card__header">
                  <span className="skill-card__icon">{s.icon}</span>
                  <h3 className="skill-card__title">{s.category}</h3>
                </div>
                <div className="skill-pills">
                  {s.items.map((item) => (
                    <span key={item} className="skill-pill">{item}</span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* RESUME CTA */}
      <section id="resume" className="resume-cta">
        <div className="resume-cta__bg">
          <img src="/images/banner.png" alt="" aria-hidden="true" />
          <div className="resume-cta__overlay" />
        </div>
        <AnimatedSection className="resume-cta__content">
          <h2>Want to know more?</h2>
          <p>Download my resume for a closer look at my experience, skills, and education.</p>
          <a href="/resume.pdf" className="btn btn--white" download>
            View Resume ↓
          </a>
        </AnimatedSection>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section contact">
        <AnimatedSection>
          <div className="section__header">
            <h2 className="section__title">Get in touch</h2>
            <p className="section__subtitle">Let's connect and bring great ideas to life!</p>
          </div>
        </AnimatedSection>
        <div className="contact-grid">
          {[
            { label: "GitHub", href: "https://github.com/malwina", sub: "github.com/malwina", icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg> },
            { label: "Email", href: "mailto:malwina@example.com", sub: "malwina@example.com", icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg> },
            { label: "LinkedIn", href: "https://linkedin.com/in/malwina", sub: "linkedin.com/in/malwina", icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
          ].map((c, i) => (
            <AnimatedSection key={c.label} delay={i * 100}>
              <a href={c.href} target="_blank" rel="noreferrer" className="contact-card">
                <div className="contact-card__icon">{c.icon}</div>
                <div className="contact-card__label">{c.label}</div>
                <div className="contact-card__sub">{c.sub}</div>
              </a>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer__logo">
          <div className="logo-mark">M</div>
        </div>
        <p>© 2025 Malwina. All rights reserved. Designed with Kinetic Precision.</p>
      </footer>
    </div>
  );
}
