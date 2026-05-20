import { useState, useEffect, useRef } from "react";
import "./App.css";


/* ─── DATA ───────────────────────────────────────────────── */
const NAV_LINKS = ["Home", "Projects", "Skills", "Background", "Contact", "Resume"];

const PROJECTS = [
  {
    name: "Euclid Space Vision - ESA",
    featured: true,
    tags: ["Python", "NumPy", "Matplotlib", "AstroPy"],
    desc: "Developed image-processing pipelines for ESA (European Space Agency) Euclid telescope data to enhance gravitational lens features and improve AI-based lens detection from astronomical FITS images.",
    image: "/images/banner.png",
    year: "2025",
    link: "https://docs.google.com/document/d/1aRetpVAUKkl1BKiacXXt1T5HEE9hRifNhQBvIjQF_eU/edit?usp=sharing",
  },
  {
    name: "Ocean Climate Analysis",
    tags: ["Python", "Pandas", "Matplotlib", "Data Analysis"],
    desc: "Data analysis project exploring the impact of ocean climate factors on coral reef health and marine biodiversity through visualization and forecasting.",
    icon: "",
    year: "2025",
    link: "https://docs.google.com/document/d/1jQIgYv940vRKs7Ut79XQYQ5Rn2jXLZjfELwviIwloKI/edit?usp=sharing",
  },
  {
    name: "PSV Popularity Visualiser",
    tags: ["React", "Python", "AI", "Data Visualization"],
    desc: "Interactive web dashboard for PSV Eindhoven that visualises player popularity using football data, social media engagement, fan sentiment, and media attention.",
    icon: "",
    year: "2025",
    link: "https://stichtingfontys-my.sharepoint.com/personal/536517_student_fontys_nl/_layouts/15/stream.aspx?id=%2Fpersonal%2F536517%5Fstudent%5Ffontys%5Fnl%2FDocuments%2FMicrosoft%20Teams%20Chat%20Files%2FVideo%2E791217787%2E595254%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E13e02e49%2D9bd3%2D4530%2D949c%2Da729cd1b8f03",
  },
  {
    name: "PITS - Public Information Trust System",
    tags: ["Next.js", "React", "UI/UX", "Figma"],
    desc: "Designed and developed the frontend and user experience for a public trust platform focused on content integrity, provenance tracking, and cryptographic verification.",
    icon: "",
    year: "2026",
    link: "https://your-pits-project-link-here.com",
  },
];

const SKILLS = [
  { 
    category: "Data Analysis",  
    icon: "", 
    items: [
      { name: "Python", pct: 90 },
      { name: "R", pct: 70 },
      { name: "SQL", pct: 75 },
      { name: "Pandas", pct: 88 },
      { name: "NumPy", pct: 80 },
      { name: "Data Visualization", pct: 82 },
    ]
  },

  { 
    category: "Frontend & Development", 
    icon: "", 
    items: [
      { name: "React", pct: 80 },
      { name: "Next.js", pct: 75 },
      { name: "TypeScript", pct: 70 },
      { name: "Tailwind CSS", pct: 85 },
      { name: "PySide6", pct: 72 },
      { name: "UI/UX Design", pct: 80 },
    ]
  },

  { 
    category: "Tools & Technologies", 
    icon: "", 
    items: [
      { name: "Git", pct: 85 },
      { name: "Docker", pct: 50 },
      { name: "Figma", pct: 80 },
      { name: "PyTorch", pct: 72 },
      { name: "REST APIs", pct: 50 },
      { name: "GitHub", pct: 85 },
    ]
  },
];
const TIMELINE = [
  {
    year: "2023",
    role: "Secondary School Graduate",
    org: "I Liceum Ogólnokształcące im. Mikołaja Kopernika, Lubin",
    desc: "Graduated with a Mathematics-Biology profile, focusing on analytical thinking and scientific foundations."
  },
  {
    year: "2024",
    role: "Mechatronics Student",
    org: "Fontys University of Applied Sciences",
    desc: "Completed a year in Mechatronics, building experience in engineering principles, problem-solving, and technical systems."
  },
  {
    year: "2025",
    role: "ICT Student - Delta Excellence Programme",
    org: "Fontys University of Applied Sciences",
    desc: "Currently studying ICT while participating in the Delta Excellence programme, working on research-driven and interdisciplinary technology projects."
  },
];

/* ─── HOOKS ──────────────────────────────────────────────── */
function useInView(threshold = 0.12) {
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

/* ─── CURSOR GLOW ────────────────────────────────────────── */
function CursorGlow() {
  const glowRef = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <div className="cursor-glow" ref={glowRef} />;
}

/* ─── SKILL BAR ──────────────────────────────────────────── */
function SkillBar({ name, pct, delay }) {
  const [ref, inView] = useInView(0.1);
  return (
    <div className="skill-bar" ref={ref}>
      <div className="skill-bar__top">
        <span className="skill-bar__name">{name}</span>
        <span className="skill-bar__pct">{pct}%</span>
      </div>
      <div className="skill-bar__track">
        <div
          className="skill-bar__fill"
          style={{ width: inView ? `${pct}%` : "0%", transitionDelay: `${delay}ms` }}
        />
      </div>
    </div>
  );
}

/* ─── APP ────────────────────────────────────────────────── */
export default function App() {
  const [activeNav,  setActiveNav]  = useState("Home");
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [formState,   setFormState]   = useState({ name: "", email: "", message: "" });
  const [formSent,    setFormSent]    = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError,   setFormError]   = useState("");

  useEffect(() => {
    setTimeout(() => setHeroLoaded(true), 100);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) {
      const start = window.scrollY;
      const target = el.getBoundingClientRect().top + window.scrollY - 20;
      const duration = 700;
      let startTime = null;

      const easeInOutCubic = (t) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, start + (target - start) * easeInOutCubic(progress));
        if (progress < 1) requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    }
    setActiveNav(id);
    setMenuOpen(false);
  };


  const handleForm = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");
    try {
      const res = await fetch("https://formspree.io/f/maqkeyyo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      if (res.ok) {
        setFormSent(true);
      } else {
        setFormError("Something went wrong. Please try again or email me directly.");
      }
    } catch {
      setFormError("Network error. Please check your connection and try again.");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="portfolio">
      <CursorGlow />
      <div className="bg-orb orb-1" />
      <div className="bg-orb orb-2" />
      <div className="bg-orb orb-3" />

      {/* ── NAV ─────────────────────────────────────────── */}
      <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="nav__inner">
          <div className="nav__brand">
            <div className="logo-mark">
              <img src="public/images/logo.png" alt="Logo" />
            </div>
            <div className="nav__brand-text">
              <span className="nav__brand-name">Malwina</span>
              <span className="nav__brand-role">Data Analyst</span>
            </div>
          </div>
          <div className="nav__pill">
            <ul className={`nav__links ${menuOpen ? "nav__links--open" : ""}`}>
              {NAV_LINKS.filter(l => l !== "Resume").map((l) => (
                <li key={l}>
                  <button
                    className={`nav__link ${activeNav === l ? "nav__link--active" : ""}`}
                    onClick={() => scrollTo(l)}
                  >{l}</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="nav__end">
            {/* FIX 2: Direct download link instead of scrollTo */}
            <a href="/resume.pdf" download className="nav__link nav__link--cta">
              Resume ↓
            </a>
            <button className="nav__burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────── */}
      <section id="home" className="hero">
        <div className={`hero__content ${heroLoaded ? "hero__content--loaded" : ""}`}>
          <div className="hero__eyebrow-wrap">
            <span className="hero__dot-pulse" />
            <span className="hero__eyebrow">Hi, I'm Malwina</span>
          </div>
          <h1 className="hero__title">
            Data Analyst &amp;<br /> Software Developer
          </h1>
          <p className="hero__bio">
           ICT student and aspiring researcher passionate about turning ideas into impactful solutions through data analysis, intelligent systems, and user-centered design.
          </p>
          <div className="hero__actions" style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
            <button className="btn btn--primary" onClick={() => scrollTo("Contact")}>
              Contact Me →
            </button>
            <div className="hero__socials">
              <a href="https://github.com/MalRac250" target="_blank" rel="noreferrer" className="social-icon" aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
              </a>
             <a
                href="mailto:raczynska.malwina.1lo@gmail.com?subject=Portfolio Contact&body=Hi Malwina,%0D%0A%0D%0AI would like to get in touch regarding..."
                className="social-icon"
                aria-label="Email"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/malwina-raczy%C5%84ska-523082364/?locale=pl" target="_blank" rel="noreferrer" className="social-icon" aria-label="LinkedIn">
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

      {/* ── PROJECTS ────────────────────────────────────── */}
      <section id="projects" className="section projects">
        <AnimatedSection>
          <div className="section__header">
            <span className="section__label">PORTFOLIO</span>
            <h2 className="section__title">Projects</h2>
            <div className="section__underline" />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="project-featured">
            <div className="project-featured__content">
              <div className="project-featured__meta">
                <div className="project-featured__badge">Featured Project</div>
                <span className="project-year">{PROJECTS[0].year}</span>
              </div>

              <h3 className="project-featured__name">{PROJECTS[0].name}</h3>

              <p className="project-featured__desc">{PROJECTS[0].desc}</p>

              <div className="tags">
                {PROJECTS[0].tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>

              <div className="project-featured__links">
                <a
                  href={PROJECTS[0].link}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--outline btn--sm"
                >
                  View Project →
                </a>
              </div>
            </div>

            <div className="project-featured__image">
              <img src={PROJECTS[0].image} alt={PROJECTS[0].name} />
              <div className="project-featured__image-overlay" />
            </div>
          </div>
        </AnimatedSection>

        <div className="projects-grid">
          {PROJECTS.slice(1).map((p, i) => (
            <AnimatedSection key={p.name} delay={i * 80}>
              <div className="project-card">
                <div className="project-card__top">
                  <div className="project-card__icon">{p.icon}</div>
                  <span className="project-year">{p.year}</span>
                </div>

                <h3 className="project-card__name">{p.name}</h3>

                <p className="project-card__desc">{p.desc}</p>

                <div className="tags">
                  {p.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>

                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="project-card__link"
                >
                  View project →
                </a>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ── SKILLS ──────────────────────────────────────── */}
      <section id="skills" className="section skills">
        <AnimatedSection>
          <div className="section__header">
            <span className="section__label">EXPERTISE</span>
            <h2 className="section__title">Skills &amp; Technologies</h2>
            <div className="section__underline" />
          </div>
        </AnimatedSection>
        <div className="skills-grid">
          {SKILLS.map((s, si) => (
            <AnimatedSection key={s.category} delay={si * 100}>
              <div className="skill-card">
                <div className="skill-card__header">
                  <span className="skill-card__icon">{s.icon}</span>
                  <h3 className="skill-card__title">{s.category}</h3>
                </div>
                <div className="skill-bars">
                  {s.items.map((item, ii) => (
                    <SkillBar key={item.name} name={item.name} pct={item.pct} delay={ii * 80} />
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ── TIMELINE ────────────────────────────────────── */}
      {/* FIX 1: Added id="background" so the nav link can scroll to it */}
      <section id="background" className="section timeline-section">
        <AnimatedSection>
          <div className="section__header">
            <span className="section__label">BACKGROUND</span>
            <h2 className="section__title">Experience &amp; Education</h2>
            <div className="section__underline" />
          </div>
        </AnimatedSection>
        <div className="timeline">
          {TIMELINE.map((item, i) => (
            <AnimatedSection key={i} delay={i * 120}>
              <div className="timeline-item">
                <div className="timeline-item__left">
                  <span className="timeline-item__year">{item.year}</span>
                </div>
                <div className="timeline-item__line">
                  <div className="timeline-item__dot" />
                  {i < TIMELINE.length - 1 && <div className="timeline-item__connector" />}
                </div>
                <div className="timeline-item__right">
                  <h3 className="timeline-item__role">{item.role}</h3>
                  <span className="timeline-item__org">{item.org}</span>
                  <p className="timeline-item__desc">{item.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ── RESUME CTA ──────────────────────────────────── */}
      <section id="resume" className="resume-cta">
        <div className="resume-cta__bg">
          <img src="/images/banner.png" alt="" aria-hidden="true" />
          <div className="resume-cta__overlay" />
        </div>
        <AnimatedSection className="resume-cta__content">
          <h2>Want to know more?</h2>
          <p>Download my resume for a closer look at my experience, skills, and education.</p>
          <a href="/resume.pdf" className="btn btn--white" download>View Resume ↓</a>
        </AnimatedSection>
      </section>

      {/* ── CONTACT ─────────────────────────────────────── */}
      <section id="contact" className="section contact">
        <AnimatedSection>
          <div className="section__header">
            <span className="section__label">SAY HELLO</span>
            <h2 className="section__title">Get in touch</h2>
            <p className="section__subtitle">Let's connect and bring great ideas to life!</p>
          </div>
        </AnimatedSection>

        <div className="contact-layout">
          <AnimatedSection delay={80} className="contact-cards">
            {[
              { label: "GitHub",   href: "https://github.com/MalRac250",     sub: "github.com/MalRac250",      icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg> },
              { label: "Email",    href: "mailto:raczysnka.malwina.1lo@gmail.com",      sub: "raczysnka.malwina.1lo@gmail.com",     icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg> },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/malwina-raczy%C5%84ska-523082364/?locale=pl", sub: "linkedin.com/in/malwina-raczyńska-523082364", icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1。771 ２４h２０．４５１C２３．２ ２４ ２４ ２３．２２７ ２４ ２２．２７１V１．７２９C２４ .７７４ ２３．２ ０ ２２．２２２ ０h．００３z"/></svg> },
            ].map((c) => (
              <a key={c.label} href={c.href} target="_blank" rel="noreferrer" className="contact-card">
                <div className="contact-card__icon">{c.icon}</div>
                <div className="contact-card__text">
                  <div className="contact-card__label">{c.label}</div>
                  <div className="contact-card__sub">{c.sub}</div>
                </div>
                <span className="contact-card__arrow">→</span>
              </a>
            ))}
          </AnimatedSection>

          <AnimatedSection delay={160} className="contact-form-wrap">
            {formSent ? (
              <div className="form-success">
                <div className="form-success__icon">✓</div>
                <h3>Message sent!</h3>
                <p>Thanks for reaching out! I'll get back to you soon.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleForm}>
                <h3 className="contact-form__title">Send a message</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="cf-name">Name</label>
                    <input id="cf-name" type="text" placeholder="Your name" required
                      value={formState.name}
                      onChange={e => setFormState(s => ({...s, name: e.target.value}))} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cf-email">Email</label>
                    <input id="cf-email" type="email" placeholder="you@example.com" required
                      value={formState.email}
                      onChange={e => setFormState(s => ({...s, email: e.target.value}))} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="cf-msg">Message</label>
                  <textarea id="cf-msg" rows={5} placeholder="What's on your mind?" required
                    value={formState.message}
                    onChange={e => setFormState(s => ({...s, message: e.target.value}))} />
                </div>
                {formError && <p style={{ color: "var(--clr-error, #ff6b6b)", marginBottom: "12px", fontSize: "0.875rem" }}>{formError}</p>}
                <button type="submit" className="btn btn--primary btn--full" disabled={formLoading}>
                  {formLoading ? "Sending…" : "Send Message →"}
                </button>
              </form>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────── */}
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__brand">
            <div className="logo-mark">
              <img src="public/images/logo.png" alt="Logo" />
            </div>
            <span className="footer__name">Malwina</span>
          </div>
          <p className="footer__copy">© 2026 Malwina. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}