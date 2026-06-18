import React from "react";
import { TerminalWindow, Prompt, Comment } from "./Terminal";
import { PROFILE, STACK } from "../data/site";
import { HOME } from "../constants/testIds";

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
        </TerminalWindow>
      </div>
    </section>
  );
};

export default About;
