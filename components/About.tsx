"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "./Hero";
import { WaveText } from "./WaveText";
import { bio, person } from "@/lib/content";

/**
 * On scroll, the small hero photo grows, slides and flips 180° until it lands
 * exactly on the bio photo. The real photos are hidden while the card flies.
 */
function PortraitJourney() {
  const journeyRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const journey = journeyRef.current;
    const card = cardRef.current;
    const section = journey?.closest<HTMLElement>(".about-section");
    const heroLink = section?.querySelector<HTMLElement>(".hero-portrait-link");
    const bioPortrait = section?.querySelector<HTMLElement>(".bio-portrait");
    const stage = journey?.querySelector<HTMLElement>(".portrait-sticky-stage");
    if (!journey || !card || !section || !heroLink || !bioPortrait || !stage) return;

    const motionOk = matchMedia("(prefers-reduced-motion: no-preference)");
    const mobileTouch = matchMedia("(max-width: 700px) and (pointer: coarse)");
    let raf = 0, current = 0, target = 0, start = 0, travel = 1;
    let sx = 0.5, sy = 0.5, dy = 0, dx = 0, rFrom = 9, rTo = 16, last = 0, dead = false;

    const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
    const render = () => {
      const p = current;
      const flip = p * p * (3 - 2 * p);
      card.style.transform = `translate(${dx * (1 - p)}px, ${dy * (1 - p)}px) scale(${sx + (1 - sx) * p}, ${sy + (1 - sy) * p})`;
      card.style.setProperty("--portrait-gray", String(1 - flip));
      card.style.borderRadius = `${rFrom + (rTo - rFrom) * p}px`;
      card.style.willChange = p > 0 && p < 1 ? "transform" : "auto";
      section.classList.toggle("portrait-motion-active", target > 0 || p > 0);
    };
    const step = (now: number) => {
      const dt = last ? Math.min(now - last, 64) : 16.67;
      last = now;
      current += (target - current) * (1 - Math.exp(-dt / (mobileTouch.matches ? 100 : 65)));
      const settled = Math.abs(target - current) < 1e-4;
      if (settled) current = target;
      render();
      raf = settled ? 0 : requestAnimationFrame(step);
      if (settled) last = 0;
    };
    const onScroll = () => {
      if (!motionOk.matches) return;
      target = clamp01((scrollY - start) / travel);
      section.classList.toggle("portrait-motion-active", target > 0 || current > 0);
      if (!raf && target !== current) raf = requestAnimationFrame(step);
    };
    const measure = () => {
      if (dead) return;
      cancelAnimationFrame(raf); raf = 0; last = 0;
      if (!motionOk.matches) { section.classList.remove("portrait-motion-ready", "portrait-motion-active"); return; }
      section.classList.add("portrait-motion-ready");
      const S = section.getBoundingClientRect();
      const H = heroLink.getBoundingClientRect();
      const B = bioPortrait.getBoundingClientRect();
      const vh = mobileTouch.matches ? stage.getBoundingClientRect().height : document.documentElement.clientHeight;
      const cardTop = vh - 20 - B.height;
      start = S.top + scrollY;
      travel = B.top + scrollY - start - cardTop;
      if (travel <= 0 || !B.width) { section.classList.remove("portrait-motion-ready", "portrait-motion-active"); return; }
      sx = H.width / B.width;
      sy = H.height / B.height;
      dy = H.top + scrollY - start - cardTop - (B.height - H.height) / 2;
      dx = H.left + H.width / 2 - (B.left + B.width / 2);
      rFrom = parseFloat(getComputedStyle(heroLink).borderTopLeftRadius) / Math.min(sx, sy);
      rTo = parseFloat(getComputedStyle(bioPortrait).borderTopLeftRadius);
      journey.style.height = `${travel + vh}px`;
      card.style.width = `${B.width}px`;
      card.style.height = `${B.height}px`;
      card.style.left = `${B.left - S.left}px`;
      card.style.top = `${cardTop}px`;
      current = target = clamp01((scrollY - start) / travel);
      render();
    };

    const ro = new ResizeObserver(measure);
    ro.observe(heroLink);
    ro.observe(bioPortrait);
    let lastWidth = window.innerWidth;
    const onResize = () => {
      if (mobileTouch.matches && window.innerWidth === lastWidth) return; // ignore URL-bar height changes
      lastWidth = window.innerWidth;
      measure();
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pageshow", measure);
    motionOk.addEventListener("change", measure);
    measure();
    document.fonts.ready.then(measure);
    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pageshow", measure);
      motionOk.removeEventListener("change", measure);
      section.classList.remove("portrait-motion-ready", "portrait-motion-active");
    };
  }, []);

  return (
    <div ref={journeyRef} className="portrait-journey" aria-hidden="true">
      <div className="portrait-sticky-stage">
        <div ref={cardRef} className="portrait-card">
          {/* eslint-disable @next/next/no-img-element */}
          <div className="portrait-face portrait-face-front"><img src="/portrait.webp" alt="" /></div>
        </div>
      </div>
    </div>
  );
}

function Biography() {
  const [p1, b1, p2, b2, p3] = bio.lead;
  return (
    <div className="biography wrap" id="biography">
      <div className="bio-introduction">
        <h2>Hi, I&apos;m<br />{person.firstName}.</h2>
        <p className="bio-role">{bio.role[0]} <span>{bio.role[1]}</span></p>
        <div className="bio-current">
          <span>Currently at</span>
          <p>
            <strong>{bio.current.org}</strong><br />
            {bio.current.title}<br />
            <span>{bio.current.place}</span>
          </p>
        </div>
      </div>
      <figure className="bio-portrait">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/portrait.webp" alt={`Portrait of ${person.name}`} loading="lazy" width={1000} height={1150} />
      </figure>
      <div className="bio-description">
        <p className="bio-lead">{p1}<strong>{b1}</strong>{p2}<strong>{b2}</strong>{p3}</p>
        <div className="bio-actions">
          <a className="bio-projects wave-target" href="#projects">
            <WaveText>Explore projects</WaveText>
            <ArrowUpRight size={20} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="about-section">
      <PortraitJourney />
      <Hero />
      <Biography />
    </section>
  );
}
