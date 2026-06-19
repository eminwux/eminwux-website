import React from "react";
import { Link, useLocation } from "react-router-dom";
import { HOME } from "../constants/testIds";
import { SOCIAL } from "../data/site";
import { Github, Twitter, Linkedin, Youtube } from "lucide-react";

const Nav = () => {
  const { pathname } = useLocation();

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
      <div className="container-x" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 24px" }}>
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

        <nav className="hidden-sm" style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {navLink("/", "home", HOME.navHome)}
          {navLink("/projects", "projects", HOME.navProjects)}
          {navLink("/youtube", "youtube", HOME.navYoutube)}
          {navLink("/contact", "contact", HOME.navContact)}
          {navLink("/about", "about", HOME.navAbout)}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <a href={SOCIAL.github} target="_blank" rel="noreferrer" data-testid={HOME.socialGithub} className="hover-glow" style={{ color: "var(--fg-dim)" }} aria-label="GitHub">
            <Github size={16} />
          </a>
          <a href={SOCIAL.twitter} target="_blank" rel="noreferrer" data-testid={HOME.socialTwitter} className="hover-glow" style={{ color: "var(--fg-dim)" }} aria-label="X / Twitter">
            <Twitter size={16} />
          </a>
          <a href={SOCIAL.linkedin} target="_blank" rel="noreferrer" data-testid={HOME.socialLinkedin} className="hover-glow" style={{ color: "var(--fg-dim)" }} aria-label="LinkedIn">
            <Linkedin size={16} />
          </a>
          <a href={SOCIAL.youtube} target="_blank" rel="noreferrer" data-testid={HOME.socialYoutube} className="hover-glow" style={{ color: "var(--fg-dim)" }} aria-label="YouTube">
            <Youtube size={16} />
          </a>
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .hidden-sm { display: none !important; }
        }
      `}</style>
    </header>
  );
};

export default Nav;
