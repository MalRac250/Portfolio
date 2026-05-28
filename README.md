<div align="center">

<img src="public/images/logo.png" alt="Malwina Logo" width="64" height="64" />

# Malwina Raczyńska — Portfolio

**Data Analyst & Software Developer**

A personal portfolio website built with React and Vite, showcasing projects, skills, background, and contact information.

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white&labelColor=20232A)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white&labelColor=1a1a2e)](https://vitejs.dev)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-Custom_Properties-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Formspree](https://img.shields.io/badge/Formspree-Contact_Form-E04E39?style=flat-square)](https://formspree.io)

[Live Demo](https://portfoliomalwina.vercel.app/) · [View Resume](public/resume.pdf) · [Contact](mailto:raczynska.malwina.1lo@gmail.com)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Sections](#sections)
- [Adding Content](#adding-content)
- [Deployment](#deployment)
- [Contact](#contact)

---

## Overview

This is a fully client-side Single Page Application (SPA) - no backend, no database. All content lives in `src/App.jsx` as JavaScript constants, and the contact form is powered by [Formspree](https://formspree.io). The site is designed to be fast, responsive, and visually polished, with smooth scroll animations, a cursor glow effect, and animated skill bars.

---

## Features

- **Smooth scroll navigation** - custom easeInOutCubic animation (no library dependency)
- **Scroll-triggered animations** - sections fade and slide in using `IntersectionObserver`
- **Animated skill bars** - fill from 0% to target percentage on scroll
- **Cursor glow effect** - a subtle radial gradient that follows the mouse
- **Contact form** - powered by Formspree with loading and error states
- **Resume download** - direct PDF download from the navbar and resume section
- **Fully responsive** - adapts from desktop (1200px+) to mobile (320px+)
- **Frosted-glass navbar** - transitions on scroll with `backdrop-filter: blur`
- **No external UI library** - all styles written in plain CSS with custom properties

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 |
| Build tool | Vite 5 |
| Styling | Vanilla CSS with custom properties |
| Fonts | Plus Jakarta Sans + Inter (Google Fonts) |
| Form backend | Formspree |
| Animations | CSS transitions + IntersectionObserver API |
| Version control | Git |
| Linting | ESLint |

---

## Project Structure

```
malwina-portfolio/
├── public/
│   ├── images/
│   │   ├── banner.png       # Used in featured project card + resume CTA background
│   │   ├── hero.png         # Hero section image
│   │   ├── hero1.png
│   │   ├── logo.png         # Navbar and footer logo
│   │   └── project.png
│   ├── favicon.svg
│   ├── icons.svg
│   └── resume.pdf           # Downloadable CV - replace with your own
├── src/
│   ├── assets/              # Vite-processed assets (currently unused)
│   ├── App.css              # All styles - tokens, layout, animations, responsive
│   ├── App.jsx              # All components, data constants, and page layout
│   ├── index.css            # Global base styles
│   └── main.jsx             # React entry point
├── .gitignore
├── eslint.config.js
├── index.html               # HTML entry point
└── package.json
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 18 or higher
- npm 9 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/MalRac250/malwina-portfolio.git
cd malwina-portfolio

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The site will be available at **http://localhost:5173**

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the Vite development server with HMR on port 5173 |
| `npm run build` | Build for production - outputs to `/dist` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint over `src/` |

---

## Sections

| Section | ID | Description |
|---------|----|-------------|
| Home | `#home` | Hero with name, title, bio, CTA, and social links |
| Projects | `#projects` | Featured project card + three-column project grid |
| Skills | `#skills` | Three skill categories with animated progress bars |
| Background | `#background` | Education and experience timeline |
| Resume | `/resume.pdf` | Direct PDF download |
| Contact | `#contact` | GitHub, Email, LinkedIn cards + contact form |

---

## Adding Content

All site content is defined as constants at the top of `src/App.jsx`. No CMS or API is needed — just edit the arrays and redeploy.

### Add a project

```js
// src/App.jsx
const PROJECTS = [
  {
    name: "Your Project Name",
    featured: false,          // set true to show in the large featured card
    tags: ["React", "Python"],
    desc: "A short description of what the project does.",
    icon: "🔬",               // emoji shown on grid cards (optional)
    year: "2026",
    link: "https://github.com/you/project",
  },
  // ...existing projects
];
```

### Add a skill

```js
// src/App.jsx — find the relevant category in SKILLS
{ name: "TensorFlow", pct: 68 }
```

### Add a timeline entry

```js
// src/App.jsx
const TIMELINE = [
  {
    year: "2026",
    role: "Your Role",
    org: "Organisation Name",
    desc: "A sentence describing what you did or learned.",
  },
  // ...
];
```

### Replace the resume

Drop your PDF into `public/` and name it `resume.pdf`. It will be served at `/resume.pdf` and linked automatically by the navbar and resume CTA section.

---

## Deployment

The site is a fully static SPA and can be deployed to any static host.

### Vercel (recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Or connect your GitHub repository in the [Vercel dashboard](https://vercel.com) for automatic deployments on every push to `main`.

### Netlify

Drag and drop the `/dist` folder into [Netlify Drop](https://app.netlify.com/drop), or connect the repo for CI/CD.

### GitHub Pages

```bash
npm run build
# Then deploy the /dist directory using gh-pages or the Actions workflow
```

> **Note:** For GitHub Pages sub-path deployments (e.g. `username.github.io/repo`), set `base: '/repo/'` in `vite.config.js`.

---

## Contact

**Malwina Raczyńska**

- GitHub: [@MalRac250](https://github.com/MalRac250)
- LinkedIn: [malwina-raczyńska](https://www.linkedin.com/in/malwina-raczy%C5%84ska-523082364/)
- Email: [raczynska.malwina.1lo@gmail.com](mailto:raczynska.malwina.1lo@gmail.com)

---

<div align="center">

© 2026 Malwina Raczyńska. All rights reserved.

</div>
