import React, { useEffect, useState, useRef } from "react";
import { TerminalWindow, Prompt } from "./Terminal";
import { PROFILE } from "../data/site";
import { HOME } from "../constants/testIds";
import { useLanguage } from "../i18n/LanguageContext";

const ASCII = `
█████  █   █  █  █   █  █     █  █   █  █   █
█      ██ ██  █  ██  █  █     █  █   █   █ █ 
███    █ █ █  █  █ █ █  █  █  █  █   █    █  
█      █   █  █  █  ██  █ █ █ █  █   █   █ █ 
█████  █   █  █  █   █   █   █    ███    █  █
`;

const Hero = () => {
  const { t } = useLanguage();
  const [shown, setShown] = useState(0);
  const asciiRef = useRef(null);

  // ── ASCII art: scale to fit container on mobile ────────────────────
  useEffect(() => {
    const fit = () => {
      const el = asciiRef.current;
      if (!el) return;

      // 1. Reset any previous transform / inline fontSize so we can measure
      el.style.transform = "none";
      el.style.transformOrigin = "";
      el.style.marginBottom = "";
      el.style.fontSize = "14px"; // base desktop size

      const parent = el.parentElement;
      if (!parent) return;

      // 2. Measure at base size
      const containerWidth = parent.offsetWidth;
      const naturalWidth = el.scrollWidth;

      // 3. If the art overflows, scale it down via CSS transform
      //    (avoids mobile minimum-font-size restriction)
      if (naturalWidth > containerWidth && containerWidth > 0) {
        const scale = containerWidth / naturalWidth;
        el.style.transform = `scale(${scale})`;
        el.style.transformOrigin = "left top";
        // Remove the excess vertical space that transform leaves behind
        const excess = el.offsetHeight * (1 - scale);
        el.style.marginBottom = `-${excess}px`;
      }
    };

    // Small delay so the DOM has finished its first paint
    const timer = setTimeout(fit, 60);
    window.addEventListener("resize", fit);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", fit);
    };
  }, []);

  // ── Terminal animation ─────────────────────────────────────────────
  const lines = [
    { delay: 100,  type: "prompt", cmd: "whoami" },
    { delay: 600,  type: "out",    text: PROFILE.name },
    { delay: 900,  type: "prompt", cmd: "cat /etc/role" },
    { delay: 1400, type: "out",    text: t('hero.role') },
    { delay: 1700, type: "prompt", cmd: "uname -a" },
    { delay: 2200, type: "out",    text: `Linux ${PROFILE.location.toLowerCase()} 6.x #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux` },
    { delay: 2500, type: "prompt", cmd: "echo $TAGLINE" },
    { delay: 3000, type: "tag",    text: t('hero.tagline') }
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const timers = lines.map((l, i) =>
      setTimeout(() => setShown((s) => Math.max(s, i + 1)), l.delay)
    );
    return () => timers.forEach(clearTimeout);
  // Run only on mount; lines text updates reactively via re-render
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="top" data-testid={HOME.hero} className="container-x" style={{ paddingTop: 56, paddingBottom: 72 }}>
      <div className="reveal" style={{ animationDelay: "0.05s" }}>
        {/* overflow:hidden clips the pre's layout footprint while transform scales visually */}
        <div style={{ overflowX: "hidden", width: "100%" }}>
          <pre ref={asciiRef} className="ascii" aria-hidden="true">{ASCII}</pre>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 32, marginTop: 28 }}>
        <div className="reveal" style={{ animationDelay: "0.15s" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14 }}>
            <span className="tag" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>● {t('hero.online')}</span>
            <span className="tag">{PROFILE.location}</span>
            <span className="tag">{t('hero.openToCollabs')}</span>
          </div>

          <h1 style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            margin: 0,
            color: "var(--fg)"
          }}>
            {PROFILE.name.split(" ")[0]}{" "}
            <span className="glow-text">{PROFILE.name.split(" ")[1]}</span>
          </h1>
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            color: "var(--fg-dim)",
            fontSize: 16,
            marginTop: 14,
            maxWidth: 640,
            lineHeight: 1.6
          }}>
            <span style={{ color: "var(--accent)" }}>$</span> {t('hero.tagline')}
            <span className="caret" />
          </p>
        </div>

        <div className="reveal" style={{ animationDelay: "0.3s", marginTop: 20 }}>
          <TerminalWindow title="zsh" path="~/eminwux">
            {lines.slice(0, shown).map((l, i) => {
              if (l.type === "prompt") return <Prompt key={i} cmd={l.cmd} />;
              if (l.type === "out")    return <div key={i} style={{ color: "var(--fg)", marginBottom: 4 }}>{l.text}</div>;
              if (l.type === "tag")    return (
                <div key={i} style={{ color: "var(--amber)", marginBottom: 4 }}>
                  <span className="str">&quot;{l.text}&quot;</span>
                </div>
              );
              return null;
            })}
            {shown >= lines.length && (
              <div style={{ marginTop: 6 }}>
                <Prompt cmd="" />
                <span className="caret" style={{ marginLeft: -6 }} />
              </div>
            )}
          </TerminalWindow>
        </div>
      </div>
    </section>
  );
};

export default Hero;
