import React, { useEffect } from "react";
import { CV } from "../data/cv";
import { PROFILE, SOCIAL, STACK } from "../data/site";
import { TerminalWindow, Prompt, Comment } from "../components/Terminal";
import Nav from "../components/Nav";
import { LanguageProvider, useLanguage } from "../i18n/LanguageContext";
import {
  ArrowLeft, Briefcase, GraduationCap,
  Award, Languages, Wrench, MapPin, Calendar, Mail, Linkedin
} from "lucide-react";

const SectionTitle = ({ n, label, Icon }) => (
  <div className="section-h" data-testid={`about-section-${n}`}>
    <span style={{ color: "var(--accent)" }}>$</span>
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      {Icon && <Icon size={13} style={{ color: "var(--accent)" }} />}
      {label}
    </span>
  </div>
);

const ExperienceItem = ({ job, i }) => (
  <li
    data-testid={`about-job-${i}`}
    className="reveal"
    style={{
      animationDelay: `${0.04 * i}s`,
      position: "relative",
      paddingLeft: 26,
      paddingBottom: 28,
      borderLeft: "1px dashed var(--border)"
    }}
  >
    <span aria-hidden="true" style={{ position: "absolute", left: -7, top: 4, width: 12, height: 12, borderRadius: "50%", background: "var(--bg)", border: "2px solid var(--accent)", boxShadow: "0 0 10px var(--accent-glow)" }} />
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "baseline", marginBottom: 4 }}>
      <span style={{ color: "var(--fg)", fontWeight: 600, fontSize: 16, fontFamily: "'JetBrains Mono', monospace" }}>{job.title}</span>
      <span style={{ color: "var(--fg-mute)" }}>@</span>
      <span style={{ color: "var(--accent)", fontWeight: 600, fontSize: 14 }}>{job.company}</span>
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 14, color: "var(--fg-mute)", fontSize: 12, marginBottom: 12, fontFamily: "'JetBrains Mono', monospace" }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><Calendar size={11} /> {job.period}</span>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><MapPin size={11} /> {job.location}</span>
    </div>
    {job.summary && (
      <p style={{ color: "var(--fg-dim)", fontSize: 13, lineHeight: 1.7, margin: "0 0 12px 0", fontFamily: "'IBM Plex Mono', monospace" }}>{job.summary}</p>
    )}
    {job.bullets && (
      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 6 }}>
        {job.bullets.map((b, idx) => (
          <li key={idx} style={{ color: "var(--fg)", fontSize: 13, display: "flex", gap: 10, fontFamily: "'IBM Plex Mono', monospace" }}>
            <span style={{ color: "var(--accent)", flexShrink: 0 }}>→</span><span>{b}</span>
          </li>
        ))}
      </ul>
    )}
  </li>
);

const Body = () => {
  const { t } = useLanguage();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const bio = t('bio');
  return (
    <>
      <Nav />
      <main className="container-x" style={{ paddingTop: 32, paddingBottom: 96, maxWidth: 980 }}>
        <a href="/" data-testid="about-back" className="link-u" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--fg-dim)", fontSize: 13, textDecoration: "none", marginBottom: 22 }}>
          <ArrowLeft size={14} /> {t('about.back')}
        </a>
        <div className="reveal" style={{ animationDelay: "0.05s" }}>
          <TerminalWindow title="cat ~/about/profile.md" path="~/about">
            <Prompt cmd="whoami --full" />
            <div style={{ marginTop: 8 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 700, color: "var(--fg)", lineHeight: 1.1, marginBottom: 8 }}>
                {PROFILE.name}
              </div>
              <div style={{ color: "var(--accent)", fontSize: 14, marginBottom: 16 }}>❯ {CV.headline}</div>
              <div style={{ marginBottom: 18 }}>
                {(Array.isArray(bio) ? bio : [bio]).map((p, i) => (
                  <p key={i} style={{ color: "var(--fg)", fontSize: 14, lineHeight: 1.8, margin: "0 0 12px 0", fontFamily: "'IBM Plex Mono', monospace" }}>
                    <span style={{ color: "var(--fg-mute)" }}># </span>{p}
                  </p>
                ))}
              </div>
              <div style={{ paddingTop: 14, borderTop: "1px dashed var(--border)" }}>
                <Comment>{t('about.professional')}</Comment>
                {CV.summary.map((p, i) => (
                  <p key={i} style={{ color: "var(--fg-dim)", fontSize: 13, lineHeight: 1.8, margin: "10px 0", fontFamily: "'IBM Plex Mono', monospace" }}>{p}</p>
                ))}
              </div>
              <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px dashed var(--border)" }}>
                <Prompt cmd="ls /home/eminwux/stack" />
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
                  {STACK.map((s) => (
                    <span key={s} className="tag" style={{ borderColor: "var(--border)", color: "var(--fg)", background: "var(--bg-elev)" }}>{s}</span>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 22, paddingTop: 16, borderTop: "1px dashed var(--border)" }}>
                <a href={SOCIAL.email} className="link-u" style={{ fontSize: 13, color: "var(--accent)", border: "1px solid var(--accent)", padding: "8px 14px", borderRadius: 3, textDecoration: "none", background: "rgba(163, 230, 53, 0.06)", display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <Mail size={13} /> me@eminwux.com
                </a>
                <a href={SOCIAL.linkedin} target="_blank" rel="noreferrer" className="link-u" style={{ fontSize: 13, color: "var(--fg)", padding: "8px 14px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <Linkedin size={13} /> linkedin.com/in/eminwux
                </a>
              </div>
            </div>
          </TerminalWindow>
        </div>

        <section style={{ marginTop: 56 }}>
          <SectionTitle n="01" label={t('about.experience')} Icon={Briefcase} />
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {CV.experience.map((job, i) => <ExperienceItem key={`${job.company}-${i}`} job={job} i={i} />)}
          </ul>
        </section>

        <section style={{ marginTop: 32 }}>
          <SectionTitle n="02" label={t('about.education')} Icon={GraduationCap} />
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 14 }}>
            {CV.education.map((e, i) => (
              <li key={i} data-testid={`about-edu-${i}`} className="card-term reveal" style={{ animationDelay: `${0.04 * i}s` }}>
                <div style={{ color: "var(--fg)", fontSize: 15, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", marginBottom: 4 }}>{e.degree}</div>
                <div style={{ color: "var(--accent)", fontSize: 13 }}>{e.school}</div>
                <div style={{ color: "var(--fg-mute)", fontSize: 12, marginTop: 4, fontFamily: "'JetBrains Mono', monospace" }}>{e.period}</div>
              </li>
            ))}
          </ul>
        </section>

        <section style={{ marginTop: 32 }}>
          <SectionTitle n="03" label={t('about.certifications')} Icon={Award} />
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
            {CV.certifications.map((c, i) => (
              <li key={i} className="card-term reveal" style={{ animationDelay: `${0.05 * i}s` }}>
                <div style={{ color: "var(--fg)", fontSize: 14, fontWeight: 600 }}>{c.name}</div>
                <div style={{ color: "var(--fg-mute)", fontSize: 12, marginTop: 4 }}>{c.issuer} · {c.year}</div>
              </li>
            ))}
          </ul>
        </section>

        <section style={{ marginTop: 32 }}>
          <SectionTitle n="04" label={t('about.skills')} Icon={Wrench} />
          <div className="card-term">
            <div style={{ color: "var(--fg-mute)", fontSize: 12, marginBottom: 12, fontFamily: "'JetBrains Mono', monospace" }}>{t('about.topSkills')}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
              {CV.topSkills.map((s) => (
                <span key={s} className="tag" style={{ borderColor: "var(--accent)", color: "var(--accent)", background: "rgba(163, 230, 53, 0.06)" }}>{s}</span>
              ))}
            </div>
            <div style={{ color: "var(--fg-mute)", fontSize: 12, marginBottom: 12, fontFamily: "'JetBrains Mono', monospace" }}>{t('about.techStack')}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {CV.skills.map((s) => (
                <span key={s} className="tag" style={{ borderColor: "var(--border)", color: "var(--fg)", background: "var(--bg-elev)" }}>{s}</span>
              ))}
            </div>
          </div>
        </section>

        <section style={{ marginTop: 32 }}>
          <SectionTitle n="05" label={t('about.languages')} Icon={Languages} />
          <div className="card-term">
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
              {CV.languages.map((l) => (
                <li key={l.name} style={{ display: "flex", justifyContent: "space-between", fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>
                  <span style={{ color: "var(--fg)" }}>{l.name}</span>
                  <span style={{ color: "var(--fg-dim)" }}>{l.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <footer style={{ marginTop: 64, paddingTop: 24, borderTop: "1px solid var(--border-soft)", color: "var(--fg-mute)", fontSize: 12, fontFamily: "'JetBrains Mono', monospace", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span># EOF · {PROFILE.name}</span>
          <a href="/" className="link-u" style={{ color: "var(--accent)", textDecoration: "none" }}>{t('about.back')} ↩</a>
        </footer>
      </main>
    </>
  );
};

export default function AboutIsland() {
  return <LanguageProvider><Body /></LanguageProvider>;
}
