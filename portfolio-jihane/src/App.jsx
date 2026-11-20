import React, { useState, useEffect, useRef } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  ExternalLink,
  FolderGit2,
  Sparkles,
  X,
} from "lucide-react";

const PORTFOLIO_DATA = {
  name: "Jihane Jador",
  profileImage: "/jihane.jpeg",
  cvFile: "/CV_Jihane_Jador.pdf",
  role: "Développeuse Full-Stack & Créatrice d'expériences web modernes. Je conçois des applications rapides, élégantes et mémorables.",
  email: "jihanjador123@gmail.com",
  bio: "Spécialisée en PHP Laravel, React, MySQL et Tailwind CSS, je transforme des besoins métiers complexes en plateformes intuitives et soignées — de la modélisation UML jusqu'au déploiement en production.",
  marqueeWords: [
    "Full-Stack Developer",
    "React & Laravel",
    "UI / UX Clean",
    "API REST ",
    "Marrakech",
  ],
  projects: [
    {
      title: "PetCare Platform",
      category: "Full-Stack • Laravel & MySQL",
      description:
        "Plateforme complète de services animaliers : réservation de prestations, gestion des favoris, messagerie intégrée et système d'avis directement lié aux services.",
      details:
        "Architecture modélisée sous StarUML (diagrammes de classes et MCD) et maquettage Figma. Développement sous Laravel avec authentification, gestion des réservations, messagerie et notation par service.",
      tags: ["Laravel", "PHP", "MySQL", "Figma", "StarUML"],
      bg: "#FFB3D1",
      github: "https://github.com/jihanejador/PetCare.git",
    },
    {
      title: "ENAA Leave — Gestion des Congés",
      category: "Docker • Laravel & React",
      description:
        "Plateforme digitalisée de gestion des congés employés avec validation hiérarchique, suivi des soldes et export automatique des rapports Excel.",
      details:
        "Infrastructure multi-conteneurs orchestrée avec Docker Compose (PHP 8.3-FPM, Nginx, MySQL 8.0, React/Vite), communication via Axios et génération de fichiers XLSX.",
      tags: ["React", "Laravel", "Docker", "MySQL", "XLSX"],
      bg: "#A5F3FC",
      github:
        "https://github.com/jihanejador/ENAA-Leave-Plateforme-Digitalis-e-de-Gestion-des-Cong-s.git",
    },
    {
      title: "Gestion des Recrutements",
      category: "Backend & Sécurité • Sanctum",
      description:
        "Application et API REST sécurisée dédiée au recrutement avec contrôle d'accès par rôles (Admin / RH), filtrage multi-critères des profils et téléversement de CV.",
      details:
        "Architecture Service/Repository sous Laravel avec Laravel Sanctum, validation stricte des fichiers PDF, pagination avancée et tests complets sous Postman.",
      tags: ["Laravel", "Sanctum", "REST API", "RBAC", "Postman"],
      bg: "#D9B8FF",
      github: "https://github.com/sarafasra/Gestion-des-Recrutements-.git",
    },
    {
      title: "BDE Event",
      category: "Web App • Événementiel",
      description:
        "Portail interactif pour le Bureau des Étudiants permettant la publication d'événements, la gestion des inscriptions en ligne et le suivi des participants.",
      details:
        "Interface dynamique et responsive offrant une navigation fluide par catégories d'événements, tableau de bord organisateur et confirmation instantanée.",
      tags: ["React", "JavaScript", "Tailwind CSS", "REST API"],
      bg: "#FED7AA",
      github: "https://github.com/jihanejador/bde-event.git",
    },
    {
      title: "PharmaFEFO",
      category: "PHP MVC • Gestion de Stock",
      description:
        "Application d'optimisation des stocks pharmaceutiques appliquant la logique FEFO (First Expired, First Out) avec alertes de péremption en temps réel.",
      details:
        "Architecture PHP MVC personnalisée avec contrôleurs API, base de données MySQL et mises à jour asynchrones sans rechargement via Fetch API.",
      tags: ["PHP MVC", "MySQL", "Fetch API", "JavaScript"],
      bg: "#FDE68A",
      github:
        "https://github.com/jihanejador/Pharma-Application-d-Optimisation-des-Stocks-et-Alerte-P-remption.git",
    },
    {
      title: "Orchid Island Immobilier",
      category: "Refonte UI/UX • Cloudflare",
      description:
        "Optimisation de la barre de recherche immobilière, refonte responsive mobile et publication de biens de prestige à Marrakech.",
      details:
        "Collaboration en équipe agile avec gestion de branches Git, amélioration des performances front-end, intégration multilingue et déploiement via Cloudflare Wrangler Pages.",
      tags: ["HTML/CSS", "JavaScript", "UI/UX", "Cloudflare", "Git"],
      bg: "#BBF7D0",
      github: "https://github.com/jihanejador",
    },
  ],
  cv: [
    {
      role: "Stagiaire Développeuse Full-Stack — Orchid Island",
      period: "Oct. – Nov. 2026",
      desc: "Optimisation du moteur de recherche immobilier, refonte responsive, benchmark concurrentiel et déploiement sur Cloudflare Pages.",
    },
    {
      role: "Développeuse Full-Stack — Projets Académiques & Équipe",
      period: "2025 – 2026",
      desc: "Réalisation de PetCare, ENAA Leave (Docker), Gestion des Recrutements (Sanctum), BDE Event et PharmaFEFO en méthodologie Agile (Jira/Trello).",
    },
  ],
  skills: [
    "React",
    "JavaScript (ES6+)",
    "TypeScript",
    "PHP",
    "Laravel",
    "MySQL",
    "Tailwind CSS",
    "REST API",
    "Docker",
    "Git & GitHub",
    "Figma",
    "StarUML",
  ],
  links: [
    { label: "GitHub", url: "https://github.com/jihanejador" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/jihane-jador/" },
  ],
};

export default function App() {
  const [imgError, setImgError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 25 });
  const letterRefs = useRef([]);

  useEffect(() => {
    const handlePointerMove = (e) => {
      const xPct = (e.clientX / window.innerWidth) * 100;
      const yPct = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x: xPct, y: yPct });

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      letterRefs.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const dist = Math.hypot(dx, dy);
        const t = Math.max(0, 1 - dist / 220);

        if (t > 0) {
          el.style.transform = `translate(${-dx * t * 0.12}px, ${-dy * t * 0.12}px) scale(${1 + t * 0.35}) rotate(${dx * t * 0.05}deg)`;
          el.style.color = t > 0.35 ? "#8D6DEE" : "";
        } else {
          el.style.transform = "";
          el.style.color = "";
        }
      });
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PORTFOLIO_DATA.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const initials = PORTFOLIO_DATA.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  let globalLetterIndex = 0;

  return (
    <div className="portfolio-root">
      <style>{`
        :root {
          --bg: #F7F5FF;
          --surface: #FFFFFF;
          --ink: #161129;
          --muted: #524B6B;
          --primary: #8D6DEE;
          --accent-sky: #A5F3FC;
          --accent-pink: #FFB3D1;
        }

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: var(--bg);
          color: var(--ink);
          font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
          overflow-x: hidden;
        }

        h1, h2, h3, .font-display {
          font-family: 'Syne', 'DM Sans', sans-serif;
          margin: 0;
          line-height: 1.02;
        }

        .ambient-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background:
            radial-gradient(55vmax 55vmax at 12% 10%, rgba(141, 109, 238, 0.16), transparent 60%),
            radial-gradient(45vmax 45vmax at 90% 25%, rgba(165, 243, 252, 0.35), transparent 60%),
            radial-gradient(50vmax 50vmax at 30% 95%, rgba(255, 179, 209, 0.25), transparent 60%);
        }

        .cursor-glow {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          transition: background 0.15s ease-out;
        }

        .wrap {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }

        /* Header */
        .top-header {
          position: sticky;
          top: 0;
          z-index: 30;
          backdrop-filter: blur(14px);
          background: rgba(247, 245, 255, 0.82);
          border-bottom: 1px solid rgba(22, 17, 41, 0.07);
        }

        .header-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 74px;
        }

        .brand {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 21px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: var(--ink);
        }

        .brand-dot {
          width: 11px;
          height: 11px;
          border-radius: 99px;
          background: var(--primary);
          display: inline-block;
        }

        .nav-links {
          display: flex;
          gap: 26px;
          align-items: center;
        }

        .nav-links a {
          text-decoration: none;
          font-weight: 700;
          font-size: 15px;
          color: var(--ink);
          transition: color 0.2s;
        }

        .nav-links a:hover {
          color: var(--primary);
        }

        /* Hero Side-by-Side */
        .hero-section {
          display: grid;
          grid-template-columns: 1.35fr 0.65fr;
          gap: 44px;
          align-items: center;
          min-height: 78vh;
          padding: 48px 0 36px;
        }

        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--surface);
          border: 2px solid var(--ink);
          box-shadow: 4px 4px 0 var(--ink);
          padding: 7px 16px;
          border-radius: 99px;
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 22px;
        }

        .status-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #10B981;
        }

        .hero-title {
          font-weight: 800;
          font-size: clamp(54px, 9.5vw, 126px);
          letter-spacing: -0.03em;
          color: var(--ink);
        }

        .hero-word {
          display: block;
          white-space: nowrap;
        }

        .letter-wrap {
          display: inline-block;
          opacity: 0;
          transform: translateY(60%);
          animation: letterRise 0.75s cubic-bezier(0.2, 0.9, 0.25, 1.15) forwards;
          animation-delay: calc(var(--i) * 50ms + 120ms);
        }

        .letter-char {
          display: inline-block;
          font-style: normal;
          transition: transform 0.22s ease-out, color 0.22s;
          cursor: default;
        }

        @keyframes letterRise {
          to {
            opacity: 1;
            transform: none;
          }
        }

        .hero-role {
          font-size: 20px;
          line-height: 1.55;
          color: var(--muted);
          max-width: 34ch;
          margin: 22px 0 32px;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
        }

        .btn-solid {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--primary);
          color: #FFFFFF;
          font-weight: 700;
          font-size: 16px;
          padding: 15px 28px;
          border-radius: 99px;
          border: 2px solid var(--ink);
          box-shadow: 5px 5px 0 var(--ink);
          text-decoration: none;
          cursor: pointer;
          transition: transform 0.18s, box-shadow 0.18s;
        }

        .btn-solid:hover {
          transform: translate(-2px, -2px);
          box-shadow: 7px 7px 0 var(--ink);
        }

        .btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--surface);
          color: var(--ink);
          font-weight: 700;
          font-size: 16px;
          padding: 15px 28px;
          border-radius: 99px;
          border: 2px solid var(--ink);
          box-shadow: 5px 5px 0 var(--ink);
          text-decoration: none;
          cursor: pointer;
          transition: transform 0.18s, box-shadow 0.18s, background 0.18s;
        }

        .btn-outline:hover {
          background: var(--accent-sky);
          transform: translate(-2px, -2px);
          box-shadow: 7px 7px 0 var(--ink);
        }

        /* Photo Frame Side-by-Side */
        .photo-col {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .photo-card {
          position: relative;
          width: 100%;
          max-width: 310px;
          aspect-ratio: 4 / 5;
          border-radius: 32px;
          background: linear-gradient(145deg, #8D6DEE 0%, #FFB3D1 55%, #A5F3FC 100%);
          border: 3px solid var(--ink);
          box-shadow: 12px 12px 0 var(--ink);
          overflow: hidden;
          display: grid;
          place-items: center;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .photo-card:hover {
          transform: translate(-3px, -3px) rotate(-1deg);
          box-shadow: 16px 16px 0 var(--ink);
        }

        .photo-initials {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 86px;
          color: #FFFFFF;
          text-shadow: 4px 4px 0 var(--ink);
          user-select: none;
        }

        .photo-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Tilted Marquee Band */
        .marquee-band {
          background: var(--ink);
          color: #FFFFFF;
          transform: rotate(-1.8deg);
          margin: 26px -20px 0;
          overflow: hidden;
          white-space: nowrap;
          padding: 18px 0;
          position: relative;
          z-index: 2;
          border-top: 3px solid var(--primary);
          border-bottom: 3px solid var(--accent-sky);
        }

        .marquee-track {
          display: inline-block;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 26px;
          animation: marqueeSlide 28s linear infinite;
        }

        .marquee-star {
          color: var(--accent-pink);
          margin: 0 18px;
        }

        @keyframes marqueeSlide {
          to {
            transform: translateX(-50%);
          }
        }

        /* Sections */
        .section-block {
          padding: 100px 0 20px;
        }

        .section-heading {
          font-size: clamp(38px, 6.5vw, 72px);
          font-weight: 800;
          margin-bottom: 36px;
          letter-spacing: -0.025em;
          color: var(--ink);
        }

        .about-box {
          background: var(--surface);
          border: 2.5px solid var(--ink);
          border-radius: 28px;
          padding: 36px 40px;
          box-shadow: 10px 10px 0 var(--primary);
          font-size: clamp(20px, 2.6vw, 27px);
          line-height: 1.48;
          color: var(--ink);
          max-width: 36em;
        }

        /* Sticky Project Stack */
        .projects-stack {
          position: relative;
        }

        .project-card {
          position: sticky;
          top: calc(92px + var(--idx) * 22px);
          margin-bottom: 18vh;
          border-radius: 30px;
          border: 3px solid var(--ink);
          color: var(--ink);
          padding: 36px;
          min-height: 330px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transform: rotate(var(--rot));
          box-shadow: 0 14px 0 -4px var(--ink);
          transition: transform 0.25s ease;
        }

        .project-card:hover {
          transform: rotate(0deg) translateY(-4px);
        }

        .project-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
        }

        .project-cat {
          display: inline-block;
          font-weight: 700;
          font-size: 14px;
          background: rgba(255, 255, 255, 0.72);
          border: 1.5px solid var(--ink);
          padding: 5px 14px;
          border-radius: 99px;
          margin-bottom: 14px;
        }

        .project-title {
          font-size: clamp(30px, 5vw, 54px);
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .project-desc {
          max-width: 42em;
          margin: 14px 0 22px;
          font-size: 18px;
          line-height: 1.5;
          font-weight: 500;
        }

        .project-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 14px;
        }

        .tag-list {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .tag-pill {
          font-weight: 700;
          font-size: 13px;
          padding: 6px 14px;
          border-radius: 99px;
          background: var(--ink);
          color: #FFFFFF;
        }

        .card-actions {
          display: flex;
          gap: 10px;
        }

        .mini-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #FFFFFF;
          color: var(--ink);
          border: 2px solid var(--ink);
          border-radius: 99px;
          padding: 8px 16px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          text-decoration: none;
          box-shadow: 3px 3px 0 var(--ink);
          transition: transform 0.15s;
        }

        .mini-btn:hover {
          transform: translate(-2px, -2px);
        }

        /* CV & Skills */
        .cv-grid {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 48px;
          align-items: start;
        }

        .timeline {
          list-style: none;
          margin: 0 0 32px;
          padding: 0 0 0 28px;
          border-left: 3px solid var(--ink);
        }

        .timeline-item {
          position: relative;
          margin-bottom: 30px;
          background: var(--surface);
          border: 2px solid var(--ink);
          border-radius: 22px;
          padding: 22px 24px;
          box-shadow: 6px 6px 0 var(--accent-sky);
        }

        .timeline-item::before {
          content: "";
          position: absolute;
          left: -38px;
          top: 24px;
          width: 16px;
          height: 16px;
          background: var(--primary);
          border: 3px solid var(--ink);
          border-radius: 50%;
        }

        .timeline-item h3 {
          font-size: 22px;
          margin-bottom: 6px;
        }

        .timeline-period {
          display: inline-block;
          color: var(--primary);
          font-weight: 700;
          font-size: 14px;
          margin-bottom: 8px;
        }

        .timeline-item p {
          margin: 0;
          color: var(--muted);
          font-size: 16px;
          line-height: 1.5;
        }

        .skills-panel {
          background: var(--surface);
          border: 2.5px solid var(--ink);
          border-radius: 26px;
          padding: 28px;
          box-shadow: 8px 8px 0 var(--accent-pink);
        }

        .skills-cloud {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 18px;
        }

        .skill-chip {
          padding: 10px 18px;
          border-radius: 99px;
          border: 2px solid var(--ink);
          background: var(--bg);
          font-weight: 700;
          font-size: 15px;
          cursor: default;
          transition: transform 0.22s cubic-bezier(0.3, 1.6, 0.5, 1), background 0.2s, color 0.2s;
        }

        .skill-chip:hover {
          background: var(--primary);
          color: #FFFFFF;
          transform: rotate(-4deg) scale(1.08);
        }

        /* Contact */
        .contact-card {
          background: var(--ink);
          color: #FFFFFF;
          border-radius: 34px;
          padding: 52px 44px;
          border: 3px solid var(--ink);
          box-shadow: 12px 12px 0 var(--primary);
        }

        .contact-card h2 {
          color: #FFFFFF;
          margin-bottom: 18px;
        }

        .big-mail {
          display: inline-block;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(22px, 4.6vw, 54px);
          color: var(--accent-sky);
          text-decoration: none;
          word-break: break-all;
          margin-bottom: 28px;
          transition: color 0.2s;
        }

        .big-mail:hover {
          color: var(--accent-pink);
        }

        .contact-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          align-items: center;
        }

        footer {
          padding: 60px 0 40px;
          text-align: center;
          color: var(--muted);
          font-weight: 500;
          font-size: 15px;
        }

        /* Modal */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(22, 17, 41, 0.65);
          backdrop-filter: blur(6px);
          z-index: 60;
          display: grid;
          place-items: center;
          padding: 20px;
        }

        .modal-box {
          max-width: 580px;
          width: 100%;
          border-radius: 28px;
          border: 3px solid var(--ink);
          padding: 32px;
          box-shadow: 12px 12px 0 var(--ink);
          color: var(--ink);
          position: relative;
        }

        @media (max-width: 820px) {
          .hero-section {
            grid-template-columns: 1fr;
            text-align: left;
            padding-top: 28px;
            gap: 36px;
          }
          .photo-card {
            max-width: 260px;
          }
          .cv-grid {
            grid-template-columns: 1fr;
          }
          .project-card {
            padding: 24px;
            min-height: 290px;
          }
          .contact-card {
            padding: 34px 24px;
          }
        }
      `}</style>

      <div className="ambient-bg" />
      <div
        className="cursor-glow"
        style={{
          background: `radial-gradient(380px circle at ${mousePos.x}% ${mousePos.y}%, rgba(141, 109, 238, 0.14), transparent 70%)`,
        }}
      />

      {/* Header */}
      <header className="top-header">
        <div className="wrap header-inner">
          <a href="#" className="brand">
            <span className="brand-dot" />
            Jihane Jador
          </a>
          <nav className="nav-links">
            <a href="#about">À propos</a>
            <a href="#projets">Projets</a>
            <a href="#cv">CV</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero with Photo right next to Name */}
        <div className="wrap">
          <section className="hero-section">
            <div>
              <div className="status-pill">
                <span className="status-dot" />
                Disponible pour projets & opportunités
              </div>

              <h1 className="hero-title" aria-label={PORTFOLIO_DATA.name}>
                {PORTFOLIO_DATA.name.split(" ").map((word, wIdx) => (
                  <span key={wIdx} className="hero-word">
                    {word.split("").map((char, cIdx) => {
                      const idx = globalLetterIndex++;
                      return (
                        <span
                          key={cIdx}
                          className="letter-wrap"
                          style={{ "--i": idx }}
                        >
                          <i
                            className="letter-char"
                            ref={(el) => (letterRefs.current[idx] = el)}
                          >
                            {char}
                          </i>
                        </span>
                      );
                    })}
                  </span>
                ))}
              </h1>

              <p className="hero-role">{PORTFOLIO_DATA.role}</p>

              <div className="hero-actions">
                <a href="#projets" className="btn-solid">
                  Voir mes projets <ArrowUpRight size={19} />
                </a>
                <a href="#contact" className="btn-outline">
                  Me contacter
                </a>
              </div>
            </div>

            {/* Static Photo Card loaded from code */}
            <div className="photo-col">
              <div className="photo-card">
                {!imgError && PORTFOLIO_DATA.profileImage ? (
                  <img
                    src={PORTFOLIO_DATA.profileImage}
                    alt="Jihane Jador"
                    className="photo-img"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <span className="photo-initials">{initials}</span>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Marquee */}
        <div className="marquee-band" aria-hidden="true">
          <div className="marquee-track">
            {[...Array(4)].map((_, loopIdx) => (
              <React.Fragment key={loopIdx}>
                {PORTFOLIO_DATA.marqueeWords.map((word, wIdx) => (
                  <span key={`${loopIdx}-${wIdx}`}>
                    {word}
                    <span className="marquee-star">✦</span>
                  </span>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="wrap">
          {/* About */}
          <section id="about" className="section-block">
            <h2 className="section-heading">Bonjour</h2>
            <div className="about-box">{PORTFOLIO_DATA.bio}</div>
          </section>

          {/* Sticky Stacked Projects */}
          <section id="projets" className="section-block">
            <h2 className="section-heading">Mes projets</h2>
            <div className="projects-stack">
              {PORTFOLIO_DATA.projects.map((project, index) => (
                <article
                  key={project.title}
                  className="project-card"
                  style={{
                    background: project.bg,
                    "--idx": index,
                    "--rot": `${index % 2 === 0 ? -1.1 : 1.1}deg`,
                  }}
                >
                  <div>
                    <div className="project-top">
                      <span className="project-cat">{project.category}</span>
                    </div>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-desc">{project.description}</p>
                  </div>

                  <div className="project-footer">
                    <div className="tag-list">
                      {project.tags.map((tag) => (
                        <span key={tag} className="tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="card-actions">
                      <button
                        type="button"
                        className="mini-btn"
                        onClick={() => setSelectedProject(project)}
                      >
                        <Sparkles size={15} /> Détails
                      </button>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mini-btn"
                      >
                        <FolderGit2 size={15} /> Code
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* CV & Skills */}
          <section id="cv" className="section-block">
            <h2 className="section-heading">Mon parcours</h2>
            <div className="cv-grid">
              <div>
                <ul className="timeline">
                  {PORTFOLIO_DATA.cv.map((item, idx) => (
                    <li key={idx} className="timeline-item">
                      <h3>{item.role}</h3>
                      <span className="timeline-period">{item.period}</span>
                      <p>{item.desc}</p>
                    </li>
                  ))}
                </ul>
                <a
                  href={PORTFOLIO_DATA.cvFile}
                  download="CV_Jihane_Jador.pdf"
                  className="btn-solid"
                >
                  <Download size={18} /> Télécharger mon CV (PDF)
                </a>
              </div>

              <div className="skills-panel">
                <h3 style={{ fontSize: "26px" }}>Stack & Outils</h3>
                <div className="skills-cloud">
                  {PORTFOLIO_DATA.skills.map((skill) => (
                    <span key={skill} className="skill-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="section-block">
            <div className="contact-card">
              <h2>On travaille ensemble ?</h2>
              <a
                href={`mailto:${PORTFOLIO_DATA.email}`}
                className="big-mail"
              >
                {PORTFOLIO_DATA.email}
              </a>

              <div className="contact-actions">
                <button
                  type="button"
                  className="btn-solid"
                  onClick={handleCopyEmail}
                >
                  {copied ? (
                    <>
                      <Check size={18} /> Email copié !
                    </>
                  ) : (
                    <>
                      <Copy size={18} /> Copier l'email
                    </>
                  )}
                </button>

                {PORTFOLIO_DATA.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                  >
                    {link.label} <ExternalLink size={16} />
                  </a>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer>
        <div className="wrap">
          © {new Date().getFullYear()} Jihane Jador — Conçu & développé avec React
        </div>
      </footer>

      {/* Project Details Modal */}
      {selectedProject && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="modal-box"
            style={{ background: selectedProject.bg }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "14px",
              }}
            >
              <span className="project-cat" style={{ marginBottom: 0 }}>
                {selectedProject.category}
              </span>
              <button
                type="button"
                className="mini-btn"
                onClick={() => setSelectedProject(null)}
                aria-label="Fermer"
              >
                <X size={16} /> Fermer
              </button>
            </div>

            <h3 style={{ fontSize: "34px", marginBottom: "14px" }}>
              {selectedProject.title}
            </h3>
            <p style={{ fontSize: "17px", lineHeight: 1.6, marginBottom: "20px" }}>
              {selectedProject.details}
            </p>

            <div className="tag-list" style={{ marginBottom: "24px" }}>
              {selectedProject.tags.map((t) => (
                <span key={t} className="tag-pill">
                  {t}
                </span>
              ))}
            </div>

            <a
              href={selectedProject.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-solid"
            >
              <FolderGit2 size={18} /> Voir sur GitHub
            </a>
          </div>
        </div>
      )}
    </div>
  );
}