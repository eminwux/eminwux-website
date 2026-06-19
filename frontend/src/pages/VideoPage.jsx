import React, { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { VIDEOS, SOCIAL } from "../data/site";
import { TerminalWindow, Prompt, Comment } from "../components/Terminal";
import Nav from "../components/Nav";
import { ArrowLeft, ExternalLink, Play, Youtube as YT } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const VideoPage = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const idx = VIDEOS.findIndex((v) => v.id === id);
  const v = VIDEOS[idx];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (v) document.title = `${v.title} — eminwux.com`;
    return () => { document.title = "eminwux.com — Emiliano Spinella"; };
  }, [v]);

  if (!v) return <Navigate to="/" replace />;

  const prev = VIDEOS[(idx - 1 + VIDEOS.length) % VIDEOS.length];
  const next = VIDEOS[(idx + 1) % VIDEOS.length];

  return (
    <div className="crt">
      <div className="grain" />
      <Nav />
      <main className="container-x" style={{ paddingTop: 32, paddingBottom: 96, maxWidth: 1100 }}>
        <Link
          to="/#youtube"
          data-testid="video-back"
          className="link-u"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            color: "var(--fg-dim)", fontSize: 13, textDecoration: "none",
            marginBottom: 24
          }}
        >
          <ArrowLeft size={14} /> {t('video.back')}
        </Link>

        <div className="reveal" style={{ animationDelay: "0.05s" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <span className="tag" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
              ● {v.lang === "es" ? "español" : "english"}
            </span>
            <span className="tag">{v.duration}</span>
            <span className="tag">{v.views} {t('youtube.views')}</span>
            <span className="tag">{v.age}</span>
          </div>

          <h1
            data-testid="video-title"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "clamp(24px, 3.4vw, 36px)",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              color: "var(--fg)",
              margin: "0 0 10px 0"
            }}
          >
            <span style={{ color: "var(--accent)" }}>❯ </span>{v.title}
          </h1>

          <div style={{ color: "var(--fg-mute)", fontSize: 12, fontFamily: "'JetBrains Mono', monospace", marginBottom: 24 }}>
            <span style={{ color: "var(--accent)" }}>$</span> mpv https://youtu.be/{v.id}
          </div>
        </div>

        <div
          className="reveal win"
          style={{ animationDelay: "0.12s", overflow: "hidden", marginBottom: 28 }}
          data-testid="video-player"
        >
          <div className="win-bar">
            <span className="dot" style={{ background: "#ff5f56" }} />
            <span className="dot" style={{ background: "#ffbd2e" }} />
            <span className="dot" style={{ background: "#27c93f" }} />
            <span style={{ marginLeft: 8 }}>— mpv — {v.id}.mp4</span>
          </div>
          <div style={{ position: "relative", paddingTop: "56.25%", background: "#000" }}>
            <iframe
              title={v.title}
              src={`https://www.youtube-nocookie.com/embed/${v.id}?rel=0&modestbranding=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
            />
          </div>
        </div>

        <div className="reveal" style={{ animationDelay: "0.2s", marginBottom: 28 }}>
          <TerminalWindow title="cat description.md" path={`~/videos/${v.id}`}>
            <Prompt cmd={`cat description.md`} />
            <Comment># {v.title}</Comment>
            <div style={{ marginTop: 14, color: "var(--fg)", fontSize: 14, lineHeight: 1.8, fontFamily: "'IBM Plex Mono', monospace" }}>
              {v.description}
            </div>
            <div style={{ marginTop: 22, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {v.tags.map((t_) => (
                <span key={t_} className="tag">#{t_.toLowerCase()}</span>
              ))}
            </div>
            <div style={{ marginTop: 22, paddingTop: 14, borderTop: "1px dashed var(--border)", display: "flex", flexWrap: "wrap", gap: 16 }}>
              <a
                href={`https://www.youtube.com/watch?v=${v.id}`}
                target="_blank"
                rel="noreferrer"
                data-testid="video-watch-yt"
                className="link-u"
                style={{ color: "var(--accent)", fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none" }}
              >
                <YT size={14} /> {t('video.watchOnYoutube')} <ExternalLink size={12} />
              </a>
              <a
                href={SOCIAL.youtube}
                target="_blank"
                rel="noreferrer"
                className="link-u"
                style={{ color: "var(--fg-dim)", fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none" }}
              >
                {t('video.subscribe')}
              </a>
            </div>
          </TerminalWindow>
        </div>

        <div
          className="reveal"
          style={{
            animationDelay: "0.28s",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16
          }}
        >
          <Link
            to={`/video/${prev.id}`}
            data-testid="video-prev"
            className="card-term"
            style={{ textDecoration: "none", display: "block" }}
          >
            <div style={{ color: "var(--fg-mute)", fontSize: 11, marginBottom: 6, fontFamily: "'JetBrains Mono', monospace" }}>
              ◄ prev · ./{prev.id}
            </div>
            <div style={{ color: "var(--fg)", fontSize: 14, lineHeight: 1.5 }}>
              {prev.title}
            </div>
          </Link>
          <Link
            to={`/video/${next.id}`}
            data-testid="video-next"
            className="card-term"
            style={{ textDecoration: "none", display: "block", textAlign: "right" }}
          >
            <div style={{ color: "var(--fg-mute)", fontSize: 11, marginBottom: 6, fontFamily: "'JetBrains Mono', monospace" }}>
              next ► · ./{next.id}
            </div>
            <div style={{ color: "var(--fg)", fontSize: 14, lineHeight: 1.5 }}>
              {next.title}
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default VideoPage;
