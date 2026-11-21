"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { GlyphBackground } from "./GlyphBackground";
import { hero, heroCode, person } from "@/lib/content";
import { HERO_RETURN_EVENT } from "@/lib/hashNav";

gsap.registerPlugin(ScrambleTextPlugin);

const SCRAMBLE_CHARS = "0123456789ABCDEF<>/#";

/**
 * Text that "locks on" like a decoded signal: it scrambles from hex-like characters
 * when the hero comes into view, on "Back to top", and on mouse hover.
 * The caret blinks only while visible.
 */
function TerminalText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const liveRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    const live = liveRef.current;
    if (!el || !live) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const hover = el.closest<HTMLElement>(".hero-focus") ?? el;
    let inView = false;
    let tween: gsap.core.Tween | null = null;

    const scramble = (delay = 0) => {
      if (reduce.matches) return;
      tween?.kill();
      tween = gsap.to(live, {
        duration: 1.3,
        delay,
        scrambleText: { text, chars: SCRAMBLE_CHARS, speed: 0.5, revealDelay: 0.25, tweenLength: false },
        ease: "none",
      });
    };
    const update = () => { el.dataset.running = String(inView && !document.hidden && !reduce.matches); };
    const io = new IntersectionObserver((e) => {
      const was = inView;
      inView = e[0].isIntersecting;
      if (inView && !was) scramble(0.45); // replays each time the hero comes back
      update();
    });
    const onReturn = () => scramble(0.45);
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && !tween?.isActive()) scramble();
    };
    io.observe(el);
    hover.addEventListener("pointerenter", onEnter);
    window.addEventListener(HERO_RETURN_EVENT, onReturn);
    reduce.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      tween?.kill();
      live.textContent = text;
      io.disconnect();
      hover.removeEventListener("pointerenter", onEnter);
      window.removeEventListener(HERO_RETURN_EVENT, onReturn);
      reduce.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, [text]);
  return (
    <span className="terminal-text" ref={ref}>
      <span aria-hidden="true">{"{{\u00a0"}</span>
      <span className="sr-only">{text}</span>
      <span ref={liveRef} className="terminal-live" aria-hidden="true">{text}</span>
      <span className="terminal-caret" aria-hidden="true" />
      <span aria-hidden="true">{"\u00a0}}"}</span>
    </span>
  );
}

function CodeOpen() {
  return (
    <svg viewBox="20 0 110 160" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="square" strokeLinejoin="miter" focusable="false">
      <path className="hero-code-depth" d="M105 30 48 80 105 130" opacity=".16" transform="translate(5 6)" />
      <path d="M105 30 48 80 105 130" />
    </svg>
  );
}
function CodeClose() {
  return (
    <svg viewBox="0 0 180 160" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="square" strokeLinejoin="miter" focusable="false">
      <path className="hero-code-depth" d="M65 30 25 130M100 30 157 80 100 130" opacity=".16" transform="translate(5 6)" />
      <path d="M65 30 25 130M100 30 157 80 100 130" />
    </svg>
  );
}

/** Giant two-line title. Letters flip in (line 1 from below, line 2 from above) and replay on re-entry. */
function HeroTitle() {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const h1 = ref.current;
    const heroEl = h1?.closest<HTMLElement>(".hero");
    if (!h1 || !heroEl) return;
    const mm = gsap.matchMedia();
    mm.add(
      { animate: "(prefers-reduced-motion: no-preference)", reduce: "(prefers-reduced-motion: reduce)" },
      (ctx) => {
        if (ctx.conditions?.reduce) {
          heroEl.dataset.heroIntro = "done";
          h1.dataset.motion = "settled";
          return;
        }
        const letters = h1.querySelectorAll(".hero-letter");
        const marks = h1.querySelectorAll(".hero-code-mark svg");
        const all = [...letters, ...marks];
        const tl = gsap.timeline({
          paused: true,
          onStart: () => {
            heroEl.dataset.heroIntro = "pending";
            h1.dataset.motion = "entering";
            gsap.set(all, { willChange: "transform,opacity" });
          },
          onComplete: () => {
            heroEl.dataset.heroIntro = "done";
            gsap.set(all, { clearProps: "transform,opacity,willChange" });
            h1.dataset.motion = "settled";
          },
        });
        tl.addLabel("tags", 0.06).addLabel("headline", 0);
        tl.fromTo(
          marks,
          { rotation: (i: number) => (i === 0 ? -45 : 45), scale: 0.96, opacity: 0, transformOrigin: "50% 50%" },
          { rotation: 0, scale: 1, opacity: 1, duration: 0.95, stagger: 0.08, ease: "power3.out" },
          "tags",
        );
        h1.querySelectorAll(".hero-word").forEach((word, w) => {
          const dir = w === 0 ? 1 : -1;
          tl.fromTo(
            word.querySelectorAll(".hero-letter"),
            { yPercent: 105 * dir, rotationX: -80 * dir, scaleY: 0.65, opacity: 0, transformOrigin: w === 0 ? "50% 100%" : "50% 0%" },
            { yPercent: 0, rotationX: 0, scaleY: 1, opacity: 1, duration: 0.82, stagger: { each: 0.035, from: w === 0 ? "start" : "end" }, ease: "power3.out" },
            `headline+=${0.1 * w}`,
          );
        });

        const mostlyVisible = () => {
          const r = h1.getBoundingClientRect();
          return Math.min(r.bottom, innerHeight) - Math.max(r.top, 0) >= 0.4 * r.height;
        };
        let played = mostlyVisible();
        const reset = () => {
          tl.pause(0);
          heroEl.dataset.heroIntro = "pending";
          h1.dataset.motion = "ready";
          gsap.set(all, { opacity: 0, clearProps: "willChange" });
        };
        const play = () => { reset(); tl.restart(); };
        const onReturn = () => { reset(); played = mostlyVisible(); if (played) play(); };
        const onShow = (e: PageTransitionEvent) => { if (e.persisted) onReturn(); };
        const io = new IntersectionObserver(
          ([e]) => {
            if (e.isIntersecting) {
              if (e.intersectionRatio >= 0.4 && !played) { played = true; play(); }
            } else { reset(); played = false; }
          },
          { threshold: [0, 0.4] },
        );
        io.observe(h1);
        if (played) play(); else reset();
        window.addEventListener(HERO_RETURN_EVENT, onReturn);
        window.addEventListener("pageshow", onShow);
        return () => {
          io.disconnect();
          window.removeEventListener(HERO_RETURN_EVENT, onReturn);
          window.removeEventListener("pageshow", onShow);
          gsap.set(all, { clearProps: "transform,opacity,willChange" });
          heroEl.dataset.heroIntro = "done";
          delete h1.dataset.motion;
        };
      },
      h1,
    );
    return () => mm.revert();
  }, []);

  return (
    <h1 ref={ref} className="hero-title hero-display-title" aria-label={hero.ariaLabel}>
      {hero.lines.map((line, i) => (
        <span key={line} className="title-line" aria-hidden="true">
          <span className="hero-word">
            <span className={`hero-code-mark ${i === 0 ? "hero-code-open" : "hero-code-close"}`} aria-hidden="true">
              {i === 0 ? <CodeOpen /> : <CodeClose />}
            </span>
            {Array.from(line).map((ch, j) => (
              <span key={j} className="hero-letter-window">
                <span className="hero-letter">{ch}</span>
              </span>
            ))}
          </span>
        </span>
      ))}
    </h1>
  );
}

export function Hero() {
  return (
    <div className="hero wrap" data-hero-intro="pending">
      <noscript>
        <style>{`.hero[data-hero-intro="pending"] .hero-letter,.hero[data-hero-intro="pending"] .hero-code-mark svg{opacity:1!important}`}</style>
      </noscript>
      <GlyphBackground code={heroCode} className="hero-code-background" />
      <a className="hero-portrait-link" href="#biography" aria-label={`About ${person.name}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/portrait.webp" alt={`${person.name} in black and white`} width={1000} height={1150} />
      </a>
      <div className="hero-heading-composition">
        <HeroTitle />
      </div>
      <div className="hero-footer">
        <span className="hero-year">{hero.year}</span>
        <span className="hero-focus"><TerminalText text={hero.focus} /></span>
      </div>
    </div>
  );
}
