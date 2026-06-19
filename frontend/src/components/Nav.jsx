import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HOME } from "../constants/testIds";
import { SOCIAL } from "../data/site";
import { Github, Twitter, Linkedin, Youtube, Menu, X } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const Nav = () => {
  const { pathname } = useLocation();
  const { lang, setLang, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu whenever the route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Helper: desktop nav link
  const navLink = (to, label, testid) => {
    const isActive = pathname === to;
    return (
      <Link
        key={to}
        to={to}
        data-testid={testid}
        className="link-u"
        style={{
          fontSize: 13,
          color: isActive ? "var(--accent)" : "var(--fg-dim)",
          transition: "color 0.2s",
          textDecoration: "none"
        }}
      >
        <span style={{ color: "var(--fg-mute)" }}>~/</span>{label}
      </Link>
    );
  };

  // Helper: mobile nav link (larger touch target)
  const mobileNavLink = (to, label, testid) => {
    const isActive = pathname === to;
    return (
      <Link
        key={to}
        to={to}
        data-testid={testid}
        onClick={() => setMenuOpen(false)}
        style={{
          fontSize: 15,
          color: isActive ? "var(--accent)" : "var(--fg-dim)",
          transition: "color 0.2s",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          padding: "12px 0",
          borderBottom: "1px dashed var(--border-soft)"
        }}
      >
        <span style={{ color: "var(--fg-mute)", marginRight: 2 }}>~/</span>
        <span>{label}</span>
        {isActive && (
          <span style={{ marginLeft: "auto", color: "var(--accent)", fontSize: 10 }}>
            ● active
          </span>
        )}
      </Link>
    );
  };

  // Reusable language switcher JSX
  const langSwitcher = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        border: "1px solid var(--border)",
        borderRadius: 3,
        overflow: "hidden"
      }}
      aria-label="Language selector"
    >
      <button
        onClick={() => setLang('en')}
        title="Switch to English"
        style={{
          background: lang === 'en' ? "rgba(163,230,53,0.12)" : "transparent",
          border: "none",
          cursor: "pointer",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          fontWeight: 700,
          padding: "4px 8px",
          color: lang === 'en' ? "var(--accent)" : "var(--fg-mute)",
          letterSpacing: "0.05em",
          transition: "all 0.15s"
        }}
      >
        EN
      </button>
      <span style={{ color: "var(--border)", fontSize: 11, userSelect: "none" }}>|</span>
      <button
        onClick={() => setLang('es')}
        title="Cambiar a Español"
        style={{
          background: lang === 'es' ? "rgba(163,230,53,0.12)" : "transparent",
          border: "none",
          cursor: "pointer",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          fontWeight: 700,
          padding: "4px 8px",
          color: lang === 'es' ? "var(--accent)" : "var(--fg-mute)",
          letterSpacing: "0.05em",
          transition: "all 0.15s"
        }}
      >
        ES
      </button>
    </div>
  );

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(10, 12, 10, 0.78)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border-soft)"
      }}
    >
      {/* ── Main nav bar ─────────────────────────────────────────── */}
      <div
        className="container-x"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 24px"
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          data-testid={HOME.navHome}
          style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}
        >
          <span style={{
            width: 28, height: 28, borderRadius: 4,
            background: "var(--bg-elev)", border: "1px solid var(--accent)",
            display: "grid", placeItems: "center",
            color: "var(--accent)", fontWeight: 800, fontSize: 13,
            boxShadow: "0 0 12px var(--accent-glow)"
          }}>
            $_
          </span>
          <span style={{ color: "var(--fg)", fontWeight: 600, fontSize: 14 }}>
            eminwux<span style={{ color: "var(--accent)" }}>.com</span>
          </span>
        </Link>

        {/* Desktop: nav links (hidden on mobile) */}
        <nav
          className="hidden-sm"
          style={{ display: "flex", alignItems: "center", gap: 28 }}
        >
          {navLink("/",          t('nav.home'),     HOME.navHome)}
          {navLink("/youtube",   t('nav.youtube'),  HOME.navYoutube)}
          {navLink("/projects",  t('nav.projects'), HOME.navProjects)}
          {navLink("/about",     t('nav.about'),    HOME.navAbout)}
          {navLink("/contact",   t('nav.contact'),  HOME.navContact)}
        </nav>

        {/* Desktop: language switcher + social icons (hidden on mobile) */}
        <div
          className="hidden-sm"
          style={{ display: "flex", alignItems: "center", gap: 14 }}
        >
          {langSwitcher}
          <a href={SOCIAL.github}   target="_blank" rel="noreferrer" data-testid={HOME.socialGithub}   className="hover-glow" style={{ color: "var(--fg-dim)" }} aria-label="GitHub">
            <Github size={16} />
          </a>
          <a href={SOCIAL.twitter}  target="_blank" rel="noreferrer" data-testid={HOME.socialTwitter}  className="hover-glow" style={{ color: "var(--fg-dim)" }} aria-label="X / Twitter">
            <Twitter size={16} />
          </a>
          <a href={SOCIAL.linkedin} target="_blank" rel="noreferrer" data-testid={HOME.socialLinkedin} className="hover-glow" style={{ color: "var(--fg-dim)" }} aria-label="LinkedIn">
            <Linkedin size={16} />
          </a>
          <a href={SOCIAL.youtube}  target="_blank" rel="noreferrer" data-testid={HOME.socialYoutube}  className="hover-glow" style={{ color: "var(--fg-dim)" }} aria-label="YouTube">
            <Youtube size={16} />
          </a>
        </div>

        {/* Mobile: hamburger button (hidden on desktop via CSS) */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          style={{
            background: "transparent",
            border: "1px solid",
            borderColor: menuOpen ? "var(--accent)" : "var(--border)",
            borderRadius: 4,
            padding: "6px 8px",
            cursor: "pointer",
            color: menuOpen ? "var(--accent)" : "var(--fg)",
            alignItems: "center",
            justifyContent: "center",
            transition: "color 0.2s, border-color 0.2s"
          }}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* ── Mobile dropdown menu ──────────────────────────────────── */}
      {menuOpen && (
        <div
          style={{
            background: "rgba(10, 12, 10, 0.97)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderTop: "1px solid var(--border-soft)",
            padding: "4px 24px 20px"
          }}
        >
          {/* Nav links */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {mobileNavLink("/",         t('nav.home'),     HOME.navHome)}
            {mobileNavLink("/youtube",  t('nav.youtube'),  HOME.navYoutube)}
            {mobileNavLink("/projects", t('nav.projects'), HOME.navProjects)}
            {mobileNavLink("/about",    t('nav.about'),    HOME.navAbout)}
            {mobileNavLink("/contact",  t('nav.contact'),  HOME.navContact)}
          </div>

          {/* Language switcher + social icons row */}
          <div
            style={{
              marginTop: 16,
              paddingTop: 16,
              borderTop: "1px dashed var(--border)",
              display: "flex",
              alignItems: "center",
              gap: 16
            }}
          >
            {langSwitcher}
            <div style={{ flex: 1 }} />
            <a href={SOCIAL.github}   target="_blank" rel="noreferrer" className="hover-glow" style={{ color: "var(--fg-dim)" }} aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href={SOCIAL.twitter}  target="_blank" rel="noreferrer" className="hover-glow" style={{ color: "var(--fg-dim)" }} aria-label="X / Twitter">
              <Twitter size={18} />
            </a>
            <a href={SOCIAL.linkedin} target="_blank" rel="noreferrer" className="hover-glow" style={{ color: "var(--fg-dim)" }} aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href={SOCIAL.youtube}  target="_blank" rel="noreferrer" className="hover-glow" style={{ color: "var(--fg-dim)" }} aria-label="YouTube">
              <Youtube size={18} />
            </a>
          </div>
        </div>
      )}

      <style>{`
        /* Hide desktop nav + social on mobile */
        @media (max-width: 640px) {
          .hidden-sm { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        /* Hide mobile hamburger on desktop */
        @media (min-width: 641px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
};

export default Nav;
