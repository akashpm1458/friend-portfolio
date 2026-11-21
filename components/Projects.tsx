"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Activity, ArrowRight, ArrowUpRight, ChevronDown, FileText, Gauge, GitBranch,
  Layers, Navigation, Play, Workflow, X,
} from "lucide-react";
import { WaveIcon, WaveText } from "./WaveText";
import { Counted } from "./CountUp";
import { activeSocials, caseStudy, eskf, folders, studies, type Folder, type Study } from "@/lib/content";

const github = activeSocials.find((s) => s.name === "GitHub")?.url;
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- 3D folder card ---------- */
function ProjectFolder({ folder, selected, onOpen }: { folder: Folder; selected: boolean; onOpen: () => void }) {
  return (
    <button
      type="button"
      className="project-folder"
      data-folder-id={folder.id}
      aria-expanded={selected}
      aria-controls="project-details-panel"
      onClick={onOpen}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--folder-lean", `${((e.clientX - r.left) / r.width - 0.5) * 10}deg`);
      }}
      onPointerLeave={(e) => e.currentTarget.style.setProperty("--folder-lean", "0deg")}
    >
      <span className="sr-only">{folder.title}</span>
      <span className="folder-scene" aria-hidden="true">
        <span className="folder-back" />
        <span className="folder-paper folder-paper-back">
          <FileText size={18} /><span>{folder.backLabel}</span><span className="folder-paper-lines" />
        </span>
        <span className="folder-paper folder-paper-preview">
          {folder.kind === "case-study" ? (
            <span className="folder-case-preview">
              <span>{caseStudy.preview.top}</span>
              <strong>{caseStudy.preview.big[0]}<br />{caseStudy.preview.big[1]}</strong>
              <span>{caseStudy.preview.bottom}</span>
            </span>
          ) : (
            <Image src={folder.image!} alt="" width={600} height={360} sizes="(max-width:700px) 75vw, 300px" />
          )}
          <span>{folder.title}</span>
        </span>
        <span className="folder-paper folder-paper-front">
          <FileText size={18} /><span>{folder.frontLabel}</span><span className="folder-paper-lines" />
        </span>
        <span className="folder-front">
          <span className="folder-front-title">{folder.title}</span>
          <span className="folder-open-icon"><ArrowUpRight size={20} /></span>
        </span>
      </span>
      <span className="folder-caption">
        <span>{folder.category}</span>
        <span className="folder-caption-action">{folder.action}<ArrowUpRight size={15} aria-hidden="true" /></span>
      </span>
    </button>
  );
}

/* ---------- shared bits ---------- */
function StudyImage({ s }: { s: Study }) {
  const figure = (
    <figure className="project-image" style={{ background: s.imageBg }}>
      <Image src={s.image} alt={s.imageAlt} width={s.imageWidth} height={s.imageHeight} sizes="(max-width: 700px) 90vw, 44vw" />
      {s.imageHref && <span className="image-action" aria-hidden="true"><ArrowUpRight size={24} /></span>}
    </figure>
  );
  return s.imageHref ? (
    <a className="project-image-link" href={s.imageHref} target="_blank" rel="noopener noreferrer" aria-label={s.imageLinkLabel}>{figure}</a>
  ) : (
    <div className="project-image-link">{figure}</div>
  );
}

function StudyLinks({ s }: { s: Study }) {
  if (!s.links.length) return null;
  return (
    <div className="project-links">
      {s.links.map((l) => (
        <a key={l.href} className="text-link wave-target" href={l.href} target="_blank" rel="noopener noreferrer">
          {l.icon === "source" && <GitBranch size={15} aria-hidden="true" />}
          {l.icon === "demo" && <Play size={15} aria-hidden="true" />}
          <WaveText>{l.label}</WaveText>
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}

function StudyBody({ s, children }: { s: Study; children?: React.ReactNode }) {
  return (
    <>
      <p className="study-description">{s.description}</p>
      <div className="stack-list">{s.stack.map((t) => <span key={t}>{t}</span>)}</div>
      {s.metric && <p className="study-outcome"><Counted text={s.metric} count={s.metricCount} /></p>}
      <StudyLinks s={s} />
      {children}
      <div className="detail-body">{s.details.map((d) => <p key={d}>{d}</p>)}</div>
    </>
  );
}

/* ---------- regular project ---------- */
function StudyArticle({ s, active }: { s: Study; active: boolean }) {
  return (
    <article hidden={!active} className={`project-study study-${s.id}`} aria-labelledby={`${s.id}-title`}>
      <StudyImage s={s} />
      <div className="study-content">
        <h3 id={`${s.id}-title`}>{s.title}</h3>
        <p className="project-category">{s.category}</p>
        <details className="project-details" open>
          <summary className="wave-target"><WaveText>{s.summaryLabel}</WaveText><ChevronDown size={17} aria-hidden="true" /></summary>
          <StudyBody s={s} />
        </details>
      </div>
    </article>
  );
}

/* ---------- ESKF project with interactive 9/15-state diagram ---------- */
function EskfArticle({ active }: { active: boolean }) {
  const [route, setRoute] = useState(eskf.diagram.a.key);
  const d = eskf.diagram;
  const isA = route === d.a.key;
  return (
    <article hidden={!active} className="project-study study-eskf" aria-labelledby="eskf-title">
      <StudyImage s={eskf} />
      <div className="study-content">
        <h3 id="eskf-title">{eskf.title}</h3>
        <p className="project-category">{eskf.category}</p>
        <details className="project-details" open>
          <summary className="wave-target"><WaveText>{eskf.summaryLabel}</WaveText><ChevronDown size={18} aria-hidden="true" /></summary>
          <StudyBody s={eskf}>
            <details className="project-details architecture-disclosure" open>
              <summary className="wave-target"><WaveText>{d.title}</WaveText><ChevronDown size={18} aria-hidden="true" /></summary>
              <div className="architecture-exhibit" data-route={isA ? "a" : "b"}>
                <div className="route-switch" role="group" aria-label={d.groupLabel}>
                  <button type="button" className="wave-target" aria-pressed={isA} onClick={() => setRoute(d.a.key)}>
                    <Gauge size={16} aria-hidden="true" /><WaveText>{d.a.button}</WaveText>
                  </button>
                  <button type="button" className="wave-target" aria-pressed={!isA} onClick={() => setRoute(d.b.key)}>
                    <Layers size={16} aria-hidden="true" /><WaveText>{d.b.button}</WaveText>
                  </button>
                </div>
                <div className="routing-diagram">
                  <div className="diagram-input"><Activity size={20} aria-hidden="true" /><span>{d.input}</span></div>
                  <div className="diagram-stem" aria-hidden="true" />
                  <div className="router-node">
                    <Workflow size={20} aria-hidden="true" />
                    <div><strong>{d.routerTitle}</strong><span>{d.routerSub}</span></div>
                  </div>
                  <svg className="route-lines" viewBox="0 0 480 80" fill="none" preserveAspectRatio="none" aria-hidden="true">
                    <path className="route-line-base" d="M240 0V30Q240 42 228 42H108Q96 42 96 54V80M240 30Q240 42 252 42H372Q384 42 384 54V80" />
                    <path className="route-line-active route-a" d="M240 0V30Q240 42 228 42H108Q96 42 96 54V80" />
                    <path className="route-line-active route-b" d="M240 0V30Q240 42 252 42H372Q384 42 384 54V80" />
                  </svg>
                  <div className="engine-columns">
                    <div className={`engine-node ${isA ? "engine-active" : ""}`}>
                      <Navigation size={22} aria-hidden="true" /><strong>{d.a.title}</strong><span>{d.a.sub}</span>
                    </div>
                    <div className={`engine-node ${!isA ? "engine-active" : ""}`}>
                      <Layers size={22} aria-hidden="true" /><strong>{d.b.title}</strong><span>{d.b.sub}</span>
                    </div>
                  </div>
                </div>
                <div className="route-explanation" aria-live="polite">
                  <ArrowRight size={17} aria-hidden="true" />
                  <p>{isA ? d.a.explain : d.b.explain}</p>
                </div>
              </div>
            </details>
          </StudyBody>
        </details>
      </div>
    </article>
  );
}

/* ---------- thesis case study ---------- */
function CaseStudyArticle({ active }: { active: boolean }) {
  const c = caseStudy;
  return (
    <article hidden={!active} className="project-study case-study" aria-labelledby={`${c.id}-title`}>
      <figure className="case-study-figure">
        <div className="case-study-figure-frame">
          <Image src={c.image.src} alt={c.image.alt} width={c.image.width} height={c.image.height} sizes="(max-width: 700px) 92vw, 1180px" />
        </div>
        <figcaption>
          <span>{c.image.caption}</span>
          <span>
            Source:{" "}
            <a className="case-study-source" href={c.image.sourceUrl} target="_blank" rel="noopener noreferrer">
              {c.image.sourceLabel}<ArrowUpRight size={12} aria-hidden="true" />
            </a>
          </span>
        </figcaption>
      </figure>
      <div className="case-study-overview study-content">
        <h3 id={`${c.id}-title`}>{c.title}</h3>
        <p className="project-category">{c.category}</p>
        <p className="case-study-summary">{c.summary}</p>
        <dl className="case-study-facts">
          {c.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd><Counted text={v} count={c.factCounts[k]} /></dd></div>)}
        </dl>
        <p className="case-study-privacy">{c.note}</p>
      </div>
      <div className="case-study-narrative">
        <section className="case-study-section" aria-labelledby={`${c.id}-challenge`}>
          <h4 id={`${c.id}-challenge`}>The challenge</h4>
          <p>{c.challenge}</p>
        </section>
        <section className="case-study-section" aria-labelledby={`${c.id}-approach`}>
          <h4 id={`${c.id}-approach`}>Approach</h4>
          <ol className="case-study-delivery">
            {c.steps.map(([t, p]) => <li key={t}><h5>{t}</h5><p>{p}</p></li>)}
          </ol>
        </section>
        <section className="case-study-section" aria-labelledby={`${c.id}-impact`}>
          <h4 id={`${c.id}-impact`}>The impact</h4>
          <p>{c.impact}</p>
          <div className="case-study-impact" role="group" aria-label="Before and after">
            <dl><dt>{c.before[0]}</dt><dd>{c.before[1]}</dd></dl>
            <ArrowRight size={24} aria-hidden="true" />
            <dl><dt>{c.after[0]}</dt><dd>{c.after[1]}</dd></dl>
          </div>
          <p className="case-study-estimate">{c.estimate}</p>
        </section>
      </div>
    </article>
  );
}

export function Projects() {
  const [selected, setSelected] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const reveal = () => {
    panelRef.current?.focus({ preventScroll: true });
    panelRef.current?.scrollIntoView({ behavior: reduced() ? "instant" : "smooth", block: "start" });
  };

  useEffect(() => {
    if (!selected || !panelRef.current) return;
    panelRef.current.querySelectorAll<HTMLDetailsElement>("article:not([hidden]) details").forEach((d) => { d.open = true; });
    reveal();
  }, [selected]);

  return (
    <section ref={sectionRef} id="projects" className="projects-section wrap section-pad">
      <noscript>
        <style>{`.project-folder-grid,.project-panel-toolbar{display:none!important}#project-details-panel[hidden],.project-study[hidden]{display:block!important}`}</style>
      </noscript>
      <div className="section-heading">
        <h2>Featured<br />Projects</h2>
        {github && (
          <a className="text-link wave-target" href={github} target="_blank" rel="noopener noreferrer">
            <WaveText>GitHub</WaveText> <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        )}
      </div>
      <p className="projects-intro">[Short intro to your work.] Open a folder to explore a project or case study.</p>

      <div className="project-folder-grid">
        {folders.map((f) => (
          <ProjectFolder
            key={f.id}
            folder={f}
            selected={selected === f.id}
            onOpen={() => { if (selected === f.id) reveal(); else setSelected(f.id); }}
          />
        ))}
      </div>

      <div
        ref={panelRef}
        id="project-details-panel"
        className="project-details-panel"
        hidden={!selected}
        tabIndex={-1}
        role="region"
        aria-labelledby={selected ? `${selected}-title` : undefined}
      >
        <div className="project-panel-toolbar">
          <span>{selected === caseStudy.id ? caseStudy.toolbar : "Project details"}</span>
          <button
            type="button"
            className="wave-target icon-button"
            aria-label="Close project details"
            onClick={() => {
              const folder = sectionRef.current?.querySelector<HTMLElement>(`[data-folder-id="${selected}"]`);
              setSelected(null);
              folder?.focus();
            }}
          >
            <WaveIcon size={20}><X size={20} /></WaveIcon>
          </button>
        </div>
        <div className="project-studies">
          <CaseStudyArticle active={selected === caseStudy.id} />
          <EskfArticle active={selected === eskf.id} />
          {studies.map((s) => <StudyArticle key={s.id} s={s} active={selected === s.id} />)}
        </div>
      </div>
    </section>
  );
}
