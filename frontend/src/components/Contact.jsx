import React from "react";
import { TerminalWindow, Prompt, Comment } from "./Terminal";
import { SOCIAL, PROFILE } from "../data/site";
import { HOME } from "../constants/testIds";
import { Github, Twitter, Linkedin, Youtube, Mail, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const Row = ({ Icon, label, value, href, testid }) => (
  <a href={href} target="_blank" rel="noreferrer" data-testid={testid}
     style={{
       textDecoration: "none",
       display: "flex", alignItems: "center", justifyContent: "space-between",
       padding: "14px 18px",
       borderTop: "1px dashed var(--border)",
       transition: "background 0.2s"
     }}
     onMouseEnter={(e) => e.currentTarget.style.background = "rgba(163,230,53,0.04)"}
     onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <Icon size={15} style={{ color: "var(--accent)" }} />
      <span style={{ color: "var(--fg-dim)", fontSize: 13, width: 90 }}>{label}</span>
      <span style={{ color: "var(--fg)", fontSize: 14 }}>{value}</span>
    </div>
    <ArrowUpRight size={15} style={{ color: "var(--fg-mute)" }} />
  </a>
);

const Contact = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" data-testid={HOME.contact} className="container-x" style={{ paddingTop: 24, paddingBottom: 96 }}>
      <div className="section-h">
        <span style={{ color: "var(--accent)" }}>$</span>
        <span>{t('contact.sectionHeading')}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 22 }}>
        <TerminalWindow title="contact.sh" path="~/.ssh">
          <Prompt cmd="cat ~/.contact" />
          <Comment># {t('contact.comment1')}</Comment>
          <Comment># {t('contact.comment2')}</Comment>
        </TerminalWindow>

        <div className="win">
          <div className="win-bar">
            <span className="dot" style={{ background: "#ff5f56" }} />
            <span className="dot" style={{ background: "#ffbd2e" }} />
            <span className="dot" style={{ background: "#27c93f" }} />
            <span style={{ marginLeft: 8 }}>— {t('contact.windowTitle')}</span>
          </div>
          <div>
            <Row Icon={Mail}     label={t('contact.email')}    value="me@eminwux.com"             href={SOCIAL.email}   testid={HOME.socialEmail} />
            <Row Icon={Github}   label={t('contact.github')}   value="github.com/eminwux"         href={SOCIAL.github}  testid={`${HOME.socialGithub}-row`} />
            <Row Icon={Twitter}  label={t('contact.x')}        value="x.com/eminwux"              href={SOCIAL.twitter} testid={`${HOME.socialTwitter}-row`} />
            <Row Icon={Linkedin} label={t('contact.linkedin')} value="linkedin.com/in/eminwux"    href={SOCIAL.linkedin} testid={`${HOME.socialLinkedin}-row`} />
            <Row Icon={Youtube}  label={t('contact.youtube')}  value="youtube.com/@eminwux"       href={SOCIAL.youtube} testid={`${HOME.socialYoutube}-row`} />
          </div>
        </div>
      </div>

      <footer style={{
        marginTop: 64,
        paddingTop: 24,
        borderTop: "1px solid var(--border-soft)",
        display: "flex", justifyContent: "space-between",
        flexWrap: "wrap", gap: 12,
        color: "var(--fg-mute)", fontSize: 12,
        fontFamily: "'JetBrains Mono', monospace"
      }}>
        <span># © {new Date().getFullYear()} {PROFILE.name} · Apache 2.0 spirit</span>
        <span>last commit: just now <span className="caret" style={{ height: "0.9em" }} /></span>
      </footer>
    </section>
  );
};

export default Contact;
