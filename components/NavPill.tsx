"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { Ellipsis, Moon, Sun, X } from "lucide-react";
import { WaveIcon } from "./WaveText";
import { PlatformLogo } from "./PlatformLogo";
import { activeSocials, person } from "@/lib/content";
import { navigateToHash } from "@/lib/hashNav";

const THEME_EVENT = "portfolio-theme";

function subscribeTheme(cb: () => void) {
  window.addEventListener(THEME_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(THEME_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

/** Splits text into per-letter pieces (they scatter when the menu closes). */
function Pieces({ children }: { children: string }) {
  return (
    <span className="nav-menu-text">
      <span className="sr-only">{children}</span>
      <span aria-hidden="true">
        {Array.from(children).map((c, i) => (
          <span key={i} className="nav-menu-piece">{c === " " ? " " : c}</span>
        ))}
      </span>
    </span>
  );
}

const primary = [
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];
const secondary = [
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "cv", label: "CV", href: person.cvUrl },
].filter((l) => l.href);

type Spin = { from: number; target: number; started: number; speed: number; fastFor: number; coastFor: number };

/** On hover/focus the wordmark does a full spin with a coasting stop. */
function useWordmarkSpin(ref: React.RefObject<HTMLSpanElement | null>) {
  useEffect(() => {
    const el = ref.current;
    const link = el?.closest("a");
    if (!el || !link) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    let spin: Spin | null = null;
    let raf = 0;
    let hovering = false;

    const angleAt = (now: number) => {
      if (!spin) return { angle: 0, speed: 0, finished: true };
      const t = Math.max(0, now - spin.started);
      if (t < spin.fastFor) return { angle: spin.from + spin.speed * t, speed: spin.speed, finished: false };
      const p = Math.min(1, (t - spin.fastFor) / spin.coastFor);
      const half = (spin.speed * spin.coastFor) / 2;
      return { angle: spin.from + spin.speed * spin.fastFor + half * (2 * p - p * p), speed: spin.speed * (1 - p), finished: p === 1 };
    };
    const stop = () => {
      cancelAnimationFrame(raf); raf = 0; spin = null;
      el.style.removeProperty("transform"); el.style.removeProperty("will-change");
      el.dataset.spinning = "false";
    };
    const tick = (now: number) => {
      const s = angleAt(now);
      if (s.finished) return stop();
      el.style.transform = `rotate(${s.angle}deg)`;
      raf = requestAnimationFrame(tick);
    };
    const run = (s: Spin) => {
      cancelAnimationFrame(raf); spin = s;
      el.style.willChange = "transform"; el.dataset.spinning = "true";
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (reduce.matches || document.hidden) return;
      const now = performance.now();
      const { angle } = angleAt(now);
      let r = 360 - (((angle % 360) + 360) % 360);
      if (r < 180) r += 360;
      run({ from: angle, target: angle + r, started: now, speed: 1.05, fastFor: 120, coastFor: (2 * (r - 126)) / 1.05 });
    };
    const coast = () => {
      if (!spin) return;
      const now = performance.now();
      const s = angleAt(now);
      if (s.finished || s.speed <= 0) return stop();
      run({ from: s.angle, target: spin.target, started: now, speed: s.speed, fastFor: 0, coastFor: (2 * (spin.target - s.angle)) / s.speed });
    };
    // only stop a running spin when motion gets reduced or the tab is hidden (no automatic repeat)
    const schedule = () => {
      if (reduce.matches || document.hidden) { hovering = false; stop(); }
    };
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "touch" || hovering) return;
      hovering = true; start();
    };
    const onLeave = () => { hovering = false; coast(); schedule(); };
    const onFocus = () => { if (!hovering && link.matches(":focus-visible")) start(); };
    const onBlur = () => { if (!hovering) coast(); schedule(); };

    link.addEventListener("pointerenter", onEnter);
    link.addEventListener("pointerleave", onLeave);
    link.addEventListener("focus", onFocus);
    link.addEventListener("blur", onBlur);
    reduce.addEventListener("change", schedule);
    document.addEventListener("visibilitychange", schedule);
    return () => {
      stop();
      link.removeEventListener("pointerenter", onEnter);
      link.removeEventListener("pointerleave", onLeave);
      link.removeEventListener("focus", onFocus);
      link.removeEventListener("blur", onBlur);
      reduce.removeEventListener("change", schedule);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [ref]);
}

export function NavPill({ activeTab }: { activeTab: string }) {
  const isDark = useSyncExternalStore(
    subscribeTheme,
    () => document.documentElement.dataset.theme === "dark",
    () => false,
  );
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const stateRef = useRef<"closed" | "open" | "closing">("closed");
  const [open, setOpen] = useState(false);

  useWordmarkSpin(wordRef);
  useEffect(() => () => { tlRef.current?.kill(); }, []);

  // lock page scroll while the menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  function toggleTheme() {
    const next = isDark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("portfolio-theme", next); } catch {}
    window.dispatchEvent(new Event(THEME_EVENT));
  }

  function openMenu() {
    const dialog = dialogRef.current;
    if (!dialog || stateRef.current !== "closed") return;
    tlRef.current?.kill();
    const pieces = Array.from(dialog.querySelectorAll(".nav-menu-piece"));
    gsap.set([dialog, ...pieces], { clearProps: "transform,opacity,visibility,willChange" });
    gsap.set(dialog, { "--nav-backdrop-opacity": 1 });
    stateRef.current = "open";
    dialog.dataset.motion = "open";
    dialog.showModal();
    setOpen(true);
    dialog.querySelector(".nav-panel")?.scrollTo(0, 0);
  }

  /** Letters fall and scatter, then the panel shrinks into the menu button. */
  function closeMenu(after?: () => void) {
    const dialog = dialogRef.current;
    if (!dialog?.open || stateRef.current === "closing") return;
    tlRef.current?.kill();
    stateRef.current = "closing";
    dialog.dataset.motion = "closing";
    const done = () => { dialog.close(); after?.(); };
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return done();

    const pieces = Array.from(dialog.querySelectorAll<HTMLElement>(".nav-menu-piece"));
    const box = dialog.getBoundingClientRect();
    const fall = pieces.map((p) => box.bottom - p.getBoundingClientRect().top + 80);
    const t = triggerRef.current?.getBoundingClientRect();
    tlRef.current = gsap
      .timeline({ onComplete: done })
      .set(pieces, { willChange: "transform,opacity" }, 0.22)
      .to(pieces, {
        y: (i) => `+=${fall[i]}`,
        x: (i) => `+=${((29 * i) % 83) - 41}`,
        rotation: (i) => ((37 * i) % 97) - 48,
        duration: 0.7,
        stagger: { amount: 0.18, from: "random" },
        ease: "power2.in",
      }, 0.22)
      .to(pieces, { autoAlpha: 0, duration: 0.16, stagger: { amount: 0.18 }, ease: "power1.in" }, 0.76)
      .to(dialog, {
        scaleX: t ? t.width / box.width : 0.06,
        scaleY: t ? t.height / box.height : 0.04,
        x: t ? t.right - box.right : 0,
        y: t ? t.top - box.top : -16,
        transformOrigin: "top right",
        autoAlpha: 0,
        "--nav-backdrop-opacity": 0,
        duration: 0.46,
        ease: "power3.inOut",
      }, "+=.12");
  }

  function onDialogClick(e: React.MouseEvent<HTMLDialogElement>) {
    const dialog = e.currentTarget;
    const r = dialog.getBoundingClientRect();
    if (e.target === dialog && (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)) {
      closeMenu();
      return;
    }
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
    if (!a || a.target === "_blank" || a.hasAttribute("download") || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.href.startsWith("mailto:")) return;
    e.preventDefault();
    closeMenu(() => { if (!navigateToHash(a.href)) window.location.assign(a.href); });
  }

  function onDialogKeyDown(e: React.KeyboardEvent<HTMLDialogElement>) {
    if (e.key !== "Tab") return;
    const items = e.currentTarget.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
  }

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <a className="wordmark" href="#about" aria-label={`${person.name}, home`}>
            <span className="wordmark-text" ref={wordRef}>{person.name}</span>
          </a>
          <div className="header-actions">
            <button
              type="button"
              className="wave-target icon-button theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              aria-pressed={isDark}
            >
              <WaveIcon size={20}>{isDark ? <Sun size={18} /> : <Moon size={18} />}</WaveIcon>
            </button>
            <button
              ref={triggerRef}
              type="button"
              className="icon-button nav-menu-trigger wave-target"
              aria-label="Navigation menu"
              aria-expanded={open}
              aria-controls="navigation-panel"
              aria-haspopup="dialog"
              onClick={openMenu}
            >
              <WaveIcon size={24}><Ellipsis size={24} /></WaveIcon>
            </button>
          </div>
        </div>
      </header>

      <dialog
        ref={dialogRef}
        id="navigation-panel"
        className="nav-dialog"
        aria-label="Navigation menu"
        onCancel={(e) => { e.preventDefault(); closeMenu(); }}
        onClose={() => {
          tlRef.current?.kill();
          stateRef.current = "closed";
          if (dialogRef.current) delete dialogRef.current.dataset.motion;
          setOpen(false);
          triggerRef.current?.focus({ preventScroll: true });
        }}
        onClick={onDialogClick}
        onKeyDown={onDialogKeyDown}
      >
        <div className="nav-panel">
          <div className="nav-panel-top">
            <button type="button" className="nav-panel-close" onClick={() => closeMenu()} aria-label="Close navigation menu">
              <Pieces>close</Pieces>
              <span className="nav-close-circle nav-menu-piece"><X size={23} aria-hidden="true" /></span>
            </button>
          </div>
          <nav className="nav-panel-links" aria-label="Site navigation">
            <div className="nav-menu-primary">
              {primary.map((l) => (
                <a key={l.id} href={`#${l.id}`} aria-current={activeTab === l.id ? "location" : undefined}>
                  <Pieces>{l.label}</Pieces>
                </a>
              ))}
            </div>
            <div className="nav-menu-secondary">
              {secondary.map((l) => (
                <a
                  key={l.id}
                  href={l.href}
                  aria-current={activeTab === l.id ? "page" : undefined}
                  {...(l.id === "cv" ? { target: "_blank", rel: "noopener" } : {})}
                >
                  <Pieces>{l.label}</Pieces>
                </a>
              ))}
            </div>
          </nav>
          <div className="nav-panel-footer">
            <a className="nav-panel-email" href={`mailto:${person.email}`}>
              <Pieces>{person.email}</Pieces>
            </a>
            <div className="nav-panel-socials">
              {activeSocials.map((s) => (
                <a key={s.name} className="nav-menu-piece" href={s.url} aria-label={s.name} target="_blank" rel="noopener noreferrer">
                  <PlatformLogo platform={s.name} size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
