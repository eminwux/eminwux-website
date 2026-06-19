import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import VideoPage from "./pages/VideoPage";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import YouTubePage from "./pages/YouTubePage";
import ContactPage from "./pages/ContactPage";
import { Terminal, Youtube, Mail, User, ArrowRight } from "lucide-react";

const QuickLinkCard = ({ to, icon: Icon, title, description, delay }) => (
  <Link
    to={to}
    className="card-term reveal"
    style={{
      textDecoration: "none",
      display: "block",
      animationDelay: delay
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
      <Icon size={18} style={{ color: "var(--accent)" }} />
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 18,
        fontWeight: 600,
        color: "var(--fg)"
      }}>
        {title}
      </span>
    </div>
    <p style={{ color: "var(--fg-dim)", fontSize: 13, margin: 0, lineHeight: 1.6 }}>
      {description}
    </p>
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 6,
      marginTop: 12,
      color: "var(--accent)",
      fontSize: 12
    }}>
      <span>explore</span>
      <ArrowRight size={12} />
    </div>
  </Link>
);

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="crt">
      <div className="grain" />
      <Nav />
      <main>
        <Hero />
        
        {/* Quick Links Section */}
        <section className="container-x" style={{ paddingTop: 24, paddingBottom: 72 }}>
          <div className="section-h" style={{ marginBottom: 32 }}>
            <span style={{ color: "var(--accent)" }}>$</span>
            <span>explore · ls -la ~/sections</span>
          </div>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20
          }}>
            <QuickLinkCard
              to="/projects"
              icon={Terminal}
              title="projects"
              description="Open-source tools: kukeon.io & sbsh.io — kubernetes & bash utilities"
              delay="0.1s"
            />
            <QuickLinkCard
              to="/youtube"
              icon={Youtube}
              title="youtube"
              description="Stories from Unix, Linux, BSD & computing history @eminwux"
              delay="0.15s"
            />
            <QuickLinkCard
              to="/about"
              icon={User}
              title="about"
              description="Full CV · 20+ years experience · certifications & tech stack"
              delay="0.2s"
            />
            <QuickLinkCard
              to="/contact"
              icon={Mail}
              title="contact"
              description="Get in touch via email, GitHub, LinkedIn, X/Twitter"
              delay="0.25s"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/youtube" element={<YouTubePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/video/:id" element={<VideoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
