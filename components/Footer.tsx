"use client";

import { ArrowUp, ArrowUpRight } from "lucide-react";
import { WaveText } from "./WaveText";
import { person } from "@/lib/content";
import { HERO_RETURN_EVENT, navigateToHash, prefersReducedMotion } from "@/lib/hashNav";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "CV", href: person.cvUrl },
  { label: "Contact", href: "#contact" },
].filter((l) => l.href);

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top wrap">
        <div className="footer-identity">
          <h2>{person.firstName}<br />{person.lastName}.</h2>
          <p>Banking &amp;<br />Insurance.</p>
        </div>
        <nav aria-label="Footer navigation">
          <p>Explore</p>
          <div>
            {links.map((l) => (
              <a
                key={l.label}
                className="wave-target"
                href={l.href}
                {...(l.href.startsWith("#")
                  ? { onClick: (e: React.MouseEvent<HTMLAnchorElement>) => { if (navigateToHash(e.currentTarget.href)) e.preventDefault(); } }
                  : { target: "_blank", rel: "noopener" })}
              >
                <WaveText>{l.label}</WaveText>
              </a>
            ))}
          </div>
        </nav>
        <div className="footer-contact">
          <p>Get in touch</p>
          <a className="wave-target" href={`mailto:${person.email}`}>
            <WaveText>{person.email}</WaveText>
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <span>© {new Date().getFullYear()} {person.name}</span>
        </div>
      </div>
      <div className="footer-finale-heading wrap">
        <p>See you around.</p>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.dispatchEvent(new Event(HERO_RETURN_EVENT));
            window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "instant" : "smooth" });
          }}
        >
          Back to top <ArrowUp size={16} aria-hidden="true" />
        </a>
      </div>
      <div className="footer-scene-bottom wrap">
        <small>{person.siteTagline}</small>
      </div>
    </footer>
  );
}
