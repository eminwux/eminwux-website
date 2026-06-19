import React, { useEffect } from "react";
import Nav from "../components/Nav";
import YouTube from "../components/YouTube";
import { LanguageProvider, useLanguage } from "../i18n/LanguageContext";
import { ArrowLeft } from "lucide-react";

const Body = () => {
  const { t } = useLanguage();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <Nav />
      <main className="container-x" style={{ paddingTop: 32, paddingBottom: 96 }}>
        <a href="/" className="link-u" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--fg-dim)", fontSize: 13, textDecoration: "none", marginBottom: 22 }}>
          <ArrowLeft size={14} /> {t('about.back')}
        </a>
        <YouTube />
      </main>
    </>
  );
};

export default function YouTubeIsland() {
  return <LanguageProvider><Body /></LanguageProvider>;
}
