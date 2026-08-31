import React, { useEffect } from "react";
import Nav from "../components/Nav";
import { TerminalWindow, Prompt, Comment } from "../components/Terminal";
import { LanguageProvider, useLanguage } from "../i18n/LanguageContext";
import { COMMUNITY } from "../data/site";
import { HOME } from "../constants/testIds";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  GraduationCap,
  Heart,
  MessageCircle,
  MessagesSquare,
  Terminal,
  Users
} from "lucide-react";

const AudienceCard = ({ Icon, title, description, index }) => (
  <article className="card-term reveal" style={{ animationDelay: `${0.08 + index * 0.05}s` }}>
    <Icon size={20} aria-hidden="true" style={{ color: "var(--accent)", marginBottom: 14 }} />
    <h3 style={{ color: "var(--fg)", fontSize: 16, margin: "0 0 10px", fontFamily: "'JetBrains Mono', monospace" }}>
      {title}
    </h3>
    <p style={{ color: "var(--fg-dim)", fontSize: 13, lineHeight: 1.75, margin: 0, fontFamily: "'IBM Plex Mono', monospace" }}>
      {description}
    </p>
  </article>
);

const DiscordLink = ({ children, testId }) => {
  const { t } = useLanguage();
  return (
    <a
      href={COMMUNITY.discord}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={testId}
      className="focus-ring"
      aria-label={`${children} (${t('community.externalNote')})`}
      style={{
        color: "var(--bg)",
        background: "var(--accent)",
        border: "1px solid var(--accent)",
        borderRadius: 4,
        padding: "12px 22px",
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 9,
        fontSize: 14,
        fontWeight: 700,
        boxShadow: "0 0 22px var(--accent-glow)"
      }}
    >
      <MessagesSquare size={17} aria-hidden="true" />
      {children}
      <ArrowRight size={15} aria-hidden="true" />
    </a>
  );
};

const CommunityBody = () => {
  const { t } = useLanguage();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const audiences = [
    { key: "professional", Icon: Briefcase },
    { key: "academic", Icon: GraduationCap },
    { key: "hobby", Icon: Terminal }
  ];

  const participation = [
    { key: "share", Icon: MessageCircle },
    { key: "ask", Icon: Users },
    { key: "discuss", Icon: Heart }
  ];

  return (
    <>
      <Nav />
      <main className="container-x" style={{ paddingTop: 32, paddingBottom: 96, maxWidth: 1040 }}>
        <a
          href="/"
          className="link-u"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--fg-dim)", fontSize: 13, textDecoration: "none", marginBottom: 22 }}
        >
          <ArrowLeft size={14} aria-hidden="true" /> {t('community.back')}
        </a>

        <section className="reveal" aria-labelledby="community-title" style={{ animationDelay: "0.04s" }}>
          <TerminalWindow title="community@eminwux" path="~/discord">
            <Prompt cmd="join --channel discord" />
            <div style={{ padding: "18px 0 4px", textAlign: "center" }}>
              <div style={{ color: "var(--accent)", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>
                ● {t('community.status')}
              </div>
              <h1
                id="community-title"
                style={{ color: "var(--fg)", fontSize: "clamp(30px, 5vw, 48px)", lineHeight: 1.12, margin: "0 auto 18px", maxWidth: 760, fontFamily: "'JetBrains Mono', monospace" }}
              >
                {t('community.title')}
              </h1>
              <p style={{ color: "var(--fg-dim)", fontSize: 15, lineHeight: 1.8, margin: "0 auto 12px", maxWidth: 760, fontFamily: "'IBM Plex Mono', monospace" }}>
                {t('community.intro')}
              </p>
              <p style={{ color: "var(--fg)", fontSize: 14, lineHeight: 1.7, margin: "0 auto 28px", maxWidth: 760 }}>
                {t('community.welcome')}
              </p>
              <DiscordLink testId={HOME.communityDiscord}>{t('community.joinDiscord')}</DiscordLink>
            </div>
          </TerminalWindow>
        </section>

        <section aria-labelledby="community-audiences" style={{ marginTop: 56 }}>
          <div className="section-h">
            <span style={{ color: "var(--accent)" }}>$</span>
            <h2 id="community-audiences" style={{ font: "inherit", margin: 0 }}>{t('community.audiencesHeading')}</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 18 }}>
            {audiences.map(({ key, Icon }, index) => (
              <AudienceCard
                key={key}
                Icon={Icon}
                index={index}
                title={t(`community.audiences.${key}.title`)}
                description={t(`community.audiences.${key}.desc`)}
              />
            ))}
          </div>
        </section>

        <section aria-labelledby="community-participate" style={{ marginTop: 56 }}>
          <div className="section-h">
            <span style={{ color: "var(--accent)" }}>$</span>
            <h2 id="community-participate" style={{ font: "inherit", margin: 0 }}>{t('community.participateHeading')}</h2>
          </div>
          <div className="card-term reveal" style={{ padding: "28px", animationDelay: "0.18s" }}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 20 }}>
              {participation.map(({ key, Icon }) => (
                <li key={key} style={{ display: "flex", alignItems: "flex-start", gap: 14, color: "var(--fg-dim)", fontSize: 14, lineHeight: 1.7 }}>
                  <Icon size={17} aria-hidden="true" style={{ color: "var(--accent)", flexShrink: 0, marginTop: 4 }} />
                  <span>{t(`community.participate.${key}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="reveal" style={{ marginTop: 56, textAlign: "center", animationDelay: "0.22s" }}>
          <div style={{ background: "var(--bg-soft)", border: "1px solid var(--border)", borderRadius: 6, padding: "42px 28px" }}>
            <Comment># {t('community.closingTitle')}</Comment>
            <p style={{ color: "var(--fg-dim)", fontSize: 14, lineHeight: 1.8, maxWidth: 700, margin: "16px auto 26px", fontFamily: "'IBM Plex Mono', monospace" }}>
              {t('community.closingDesc')}
            </p>
            <DiscordLink>{t('community.joinDiscord')}</DiscordLink>
          </div>
        </section>
      </main>
    </>
  );
};

export default function CommunityIsland() {
  return <LanguageProvider><CommunityBody /></LanguageProvider>;
}
