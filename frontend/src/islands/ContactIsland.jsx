import React, { useEffect } from "react";
import Nav from "../components/Nav";
import Contact from "../components/Contact";
import { LanguageProvider } from "../i18n/LanguageContext";
import { ArrowLeft } from "lucide-react";

const Body = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <Nav />
      <main className="container-x" style={{ paddingTop: 32, paddingBottom: 96 }}>
        <a href="/" className="link-u" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--fg-dim)", fontSize: 13, textDecoration: "none", marginBottom: 22 }}>
          <ArrowLeft size={14} /> cd ~
        </a>
        <Contact />
      </main>
    </>
  );
};

export default function ContactIsland() {
  return <LanguageProvider><Body /></LanguageProvider>;
}
