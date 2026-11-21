"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { WaveIcon, WaveText } from "./WaveText";
import { PlatformLogo } from "./PlatformLogo";
import { activeSocials, contact, person } from "@/lib/content";

export function Contact() {
  const [copy, setCopy] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  async function copyEmail() {
    try { await navigator.clipboard.writeText(person.email); setCopy("copied"); }
    catch { setCopy("failed"); }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopy("idle"), 3000);
  }

  return (
    <section id="contact" className="contact-section section-pad">
      <div className="wrap">
        <div className="contact-layout">
          <div className="contact-opening">
            <h2>Let&apos;s talk.</h2>
            <p>{contact.blurb}</p>
            <div className="contact-details">
              <div className="email-block">
                <a className="email-link wave-target" href={`mailto:${person.email}`}>
                  <WaveText>{person.email}</WaveText>
                  <ArrowUpRight size={20} aria-hidden="true" />
                </a>
                <button
                  type="button"
                  className="wave-target icon-button copy-email"
                  onClick={copyEmail}
                  aria-label={copy === "copied" ? "Email copied" : "Copy email address"}
                >
                  <WaveIcon size={20}>{copy === "copied" ? <Check size={18} /> : <Copy size={18} />}</WaveIcon>
                </button>
              </div>
              <span className="copy-status" role="status">
                {copy === "copied" ? "Email copied" : copy === "failed" ? "Please use the email link" : ""}
              </span>
            </div>
            <div className="social-links">
              {activeSocials.map((s) => (
                <a key={s.name} className="wave-target" href={s.url} target="_blank" rel="noopener noreferrer">
                  <PlatformLogo platform={s.name} />
                  <WaveText>{s.name}</WaveText>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
