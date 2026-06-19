import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Projects from "../components/Projects";
import { ArrowLeft } from "lucide-react";
import { PROFILE } from "../data/site";

const ProjectsPage = () => {
  useEffect(() => {
    document.title = `projects — ${PROFILE.name}`;
    window.scrollTo(0, 0);
    return () => { document.title = "eminwux.com — Emiliano Spinella"; };
  }, []);

  return (
    <div className="crt">
      <div className="grain" />
      <Nav />
      <main className="container-x" style={{ paddingTop: 32, paddingBottom: 96 }}>
        <Link
          to="/"
          className="link-u"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            color: "var(--fg-dim)", fontSize: 13, textDecoration: "none",
            marginBottom: 22
          }}
        >
          <ArrowLeft size={14} /> cd ~
        </Link>
        <Projects />
      </main>
    </div>
  );
};

export default ProjectsPage;
