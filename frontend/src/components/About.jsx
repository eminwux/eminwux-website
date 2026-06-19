import React from "react";
import { Link } from "react-router-dom";
import { TerminalWindow, Prompt, Comment } from "./Terminal";
import { PROFILE, STACK } from "../data/site";
import { HOME } from "../constants/testIds";
import { FileText, ArrowRight } from "lucide-react";

const About = () => {
  return (
    <section id="about" data-testid={HOME.about} className="container-x" style={{ paddingTop: 24, paddingBottom: 72 }}>
      <div className="section-h">
        <span style={{ color: "var(--accent)" }}>$</span>
        <span>02 / about</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }}>
        <TerminalWindow title="man eminwux" path="/usr/share/doc">
          <Prompt cmd="cat about.md" />
          <div style={{ marginTop: 8, color: "var(--fg)", lineHeight: 1.8 }}>
            {PROFILE.bio.map((p, i) => (
              <p key={i} style={{ margin: "0 0 14px 0" }}>
                <span style={{ color: "var(--fg-mute)" }}># </span>{p}
              </p>
            ))}
          </div>

          <div style={{ marginTop: 18 }}>
            <Prompt cmd="ls /home/eminwux/stack" />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
              {STACK.map((s) => (
                <span key={s} className="tag" style={{
                  borderColor: "var(--border)",
                  color: "var(--fg)",
                  background: "var(--bg-elev)"
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 18 }}>
            <Prompt cmd="grep -i 'philosophy' ~/.zshrc" />
            <Comment>
              # build simple tools that do one thing well — keep the ingredients in motion.
            </Comment>
          </div>

          <div style={{
            marginTop: 22, paddingTop: 16,
            borderTop: "1px dashed var(--border)"
          }}>
            <Prompt cmd="cat ~/cv/profile.md" />
            <div style={{ marginTop: 10 }}>
              <Link
                to="/cv"
                data-testid="about-view-cv"
                className="link-u"
                style={{
                  fontSize: 13, color: "var(--accent)",
                  border: "1px solid var(--accent)",
                  padding: "8px 14px", borderRadius: 3,
                  textDecoration: "none",
                  background: "rgba(163, 230, 53, 0.06)",
                  display: "inline-flex", alignItems: "center", gap: 8
                }}
              >
                <FileText size={13} /> view full cv · 20+ years <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </TerminalWindow>
      </div>
    </section>
  );
};

export default About;
