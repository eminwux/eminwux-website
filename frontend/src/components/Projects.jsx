import React from "react";
import { PROJECTS } from "../data/site";
import { HOME } from "../constants/testIds";
import { ExternalLink, Github, Terminal as TermIcon } from "lucide-react";

const ProjectCard = ({ p }) => {
  const testid = p.id === "kukeon" ? HOME.projectKukeon : HOME.projectSbsh;
  return (
    <article data-testid={testid} className="card-term reveal" style={{ animationDelay: "0.1s" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <TermIcon size={14} style={{ color: "var(--accent)" }} />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 24, fontWeight: 700, color: "var(--fg)"
            }}>
              {p.name}
            </span>
            <span style={{ color: "var(--fg-mute)", fontSize: 13 }}>· {p.domain}</span>
          </div>
          <div style={{ color: "var(--accent)", fontSize: 13, marginBottom: 14 }}>
            ❯ {p.tagline}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
          <span className="tag" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
            ● {p.status}
          </span>
          <span className="tag">{p.state}</span>
        </div>
      </div>

      <p style={{ color: "var(--fg-dim)", fontSize: 14, lineHeight: 1.7, margin: "0 0 16px 0" }}>
        {p.description}
      </p>

      <ul style={{
        margin: "0 0 20px 0",
        padding: 0,
        listStyle: "none",
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: 6
      }}>
        {p.bullets.map((b, i) => (
          <li key={i} style={{ color: "var(--fg)", fontSize: 13, display: "flex", gap: 10 }}>
            <span style={{ color: "var(--accent)" }}>→</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
        {p.stack.map((s) => (
          <span key={s} className="tag">{s}</span>
        ))}
      </div>

      <div style={{ display: "flex", gap: 14, paddingTop: 14, borderTop: "1px dashed var(--border)" }}>
        <a href={p.url} target="_blank" rel="noreferrer" className="link-u" style={{ fontSize: 13, color: "var(--accent)", display: "inline-flex", alignItems: "center", gap: 6 }}>
          <ExternalLink size={13} /> {p.domain}
        </a>
        <a href={p.repo} target="_blank" rel="noreferrer" className="link-u" style={{ fontSize: 13, color: "var(--fg-dim)", display: "inline-flex", alignItems: "center", gap: 6 }}>
          <Github size={13} /> source
        </a>
      </div>
    </article>
  );
};

const Projects = () => {
  return (
    <section id="projects" data-testid={HOME.projects} className="container-x" style={{ paddingTop: 24, paddingBottom: 72 }}>
      <div className="section-h">
        <span style={{ color: "var(--accent)" }}>$</span>
        <span>03 / projects · ls -la ~/oss</span>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
        gap: 22
      }}>
        {PROJECTS.map((p) => <ProjectCard key={p.id} p={p} />)}
      </div>
    </section>
  );
};

export default Projects;
