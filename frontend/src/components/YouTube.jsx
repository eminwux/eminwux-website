import React from "react";
import { Link } from "react-router-dom";
import { VIDEOS, PLAYLISTS, SOCIAL } from "../data/site";
import { HOME } from "../constants/testIds";
import { Play, ListVideo, ExternalLink } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const thumb = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

const VideoCard = ({ v, i }) => {
  const { t } = useLanguage();

  return (
    <Link
      to={`/video/${v.id}`}
      data-testid={`${HOME.videoCard}-${v.id}`}
      className="card-term reveal"
      style={{
        textDecoration: "none",
        display: "block",
        animationDelay: `${0.05 * i}s`
      }}
    >
      <div className="thumb">
        <img src={thumb(v.id)} alt={v.title} loading="lazy" />
        <div className="thumb-play">
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            background: "var(--accent)",
            display: "grid", placeItems: "center",
            boxShadow: "0 0 30px var(--accent-glow)"
          }}>
            <Play size={22} fill="#0a0c0a" color="#0a0c0a" />
          </div>
        </div>
        <div style={{
          position: "absolute", bottom: 8, right: 8,
          background: "rgba(10,12,10,0.92)",
          color: "var(--fg)", fontSize: 11,
          padding: "2px 6px", borderRadius: 2,
          fontFamily: "'JetBrains Mono', monospace"
        }}>
          {v.duration}
        </div>
      </div>
      <div style={{ marginTop: 14 }}>
        <div style={{
          color: "var(--fg)", fontSize: 14, fontWeight: 500,
          lineHeight: 1.4, marginBottom: 8
        }}>
          {v.title}
        </div>
        <div style={{ color: "var(--fg-mute)", fontSize: 12, display: "flex", gap: 8 }}>
          <span style={{ color: "var(--accent)" }}>{v.views} {t('youtube.views')}</span>
          <span>·</span>
          <span>{v.age}</span>
        </div>
      </div>
    </Link>
  );
};

const PlaylistCard = ({ p, i }) => {
  const { t } = useLanguage();
  // Use translated playlist description if available
  const descKey = `youtube.${p.title}.description`;
  const translatedDesc = t(descKey);
  const displayDesc = (translatedDesc && translatedDesc !== descKey) ? translatedDesc : p.description;

  return (
    <a
      href={p.url}
      target="_blank"
      rel="noreferrer"
      data-testid={`${HOME.playlistCard}-${i}`}
      className="card-term reveal"
      style={{ textDecoration: "none", animationDelay: `${0.05 * i}s` }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <ListVideo size={16} style={{ color: "var(--accent)" }} />
        <span style={{ color: "var(--fg)", fontSize: 16, fontWeight: 600 }}>{p.title}</span>
      </div>
      <p style={{ color: "var(--fg-dim)", fontSize: 13, margin: "0 0 10px 0", lineHeight: 1.6 }}>
        {displayDesc}
      </p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
        <span className="tag">{p.count}</span>
        <span style={{ color: "var(--accent)", fontSize: 12, display: "inline-flex", alignItems: "center", gap: 4 }}>
          {t('youtube.open')} <ExternalLink size={11} />
        </span>
      </div>
    </a>
  );
};

const YouTube = () => {
  const { t } = useLanguage();

  return (
    <section id="youtube" data-testid={HOME.youtube} className="container-x" style={{ paddingTop: 24, paddingBottom: 72 }}>
      <div className="section-h">
        <span style={{ color: "var(--accent)" }}>$</span>
        <span>{t('youtube.sectionHeading')}</span>
      </div>

      <div style={{
        display: "flex", flexWrap: "wrap", gap: 18, alignItems: "baseline",
        justifyContent: "space-between", marginBottom: 22
      }}>
        <div>
          <div style={{ color: "var(--fg)", fontSize: 22, fontWeight: 700 }}>
            <span style={{ color: "var(--accent)" }}>@</span>eminwux
          </div>
          <div style={{ color: "var(--fg-dim)", fontSize: 13, marginTop: 4 }}>
            {t('youtube.channelDesc')}
          </div>
          <div style={{ marginTop: 10 }}>
            <span className="tag" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
              ● {t('youtube.openToCollab')}
            </span>
          </div>
        </div>
        <a
          href={SOCIAL.youtube}
          target="_blank"
          rel="noreferrer"
          className="link-u"
          style={{
            fontSize: 13,
            color: "var(--accent)",
            border: "1px solid var(--accent)",
            padding: "8px 16px",
            borderRadius: 3,
            textDecoration: "none",
            background: "rgba(163, 230, 53, 0.06)"
          }}
        >
          {t('youtube.subscribe')}
        </a>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 22,
        marginBottom: 48
      }}>
        {VIDEOS.map((v, i) => <VideoCard key={v.id} v={v} i={i} />)}
      </div>

      <div style={{ color: "var(--fg-mute)", fontSize: 12, marginBottom: 18, fontFamily: "'JetBrains Mono', monospace" }}>
        <span style={{ color: "var(--accent)" }}>$</span> {t('youtube.playlistsCmd')}
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 18
      }}>
        {PLAYLISTS.map((p, i) => <PlaylistCard key={p.title} p={p} i={i} />)}
      </div>
    </section>
  );
};

export default YouTube;
