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
import { Terminal, Youtube, Mail, ArrowRight, Play, ExternalLink, Github, Award, Briefcase, GraduationCap, TrendingUp } from "lucide-react";
import { VIDEOS, PROJECTS, STACK, PROFILE, SOCIAL } from "./data/site";

// Stats Bar Component
const StatsBar = () => {
  const stats = [
    { icon: TrendingUp, label: "400K+", sublabel: "YouTube views" },
    { icon: Terminal, label: "2", sublabel: "active OSS projects" },
    { icon: Briefcase, label: "20+", sublabel: "years experience" },
    { icon: GraduationCap, label: "Executive", sublabel: "MBA" }
  ];

  return (
    <div className="reveal" style={{ animationDelay: "0.1s" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: 16,
        padding: "24px 0",
        borderTop: "1px dashed var(--border)",
        borderBottom: "1px dashed var(--border)"
      }}>
        {stats.map((stat, i) => (
          <div key={i} style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            textAlign: "center"
          }}>
            <stat.icon size={16} style={{ color: "var(--accent)" }} />
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 20,
              fontWeight: 700,
              color: "var(--fg)"
            }}>
              {stat.label}
            </div>
            <div style={{ fontSize: 11, color: "var(--fg-mute)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {stat.sublabel}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// About Snippet Component
const AboutSnippet = () => (
  <section className="container-x reveal" style={{ paddingTop: 40, paddingBottom: 24, animationDelay: "0.15s" }}>
    <div style={{ maxWidth: 840, margin: "0 auto", textAlign: "center" }}>
      <div style={{
        fontSize: 12,
        color: "var(--fg-mute)",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        marginBottom: 16
      }}>
        <span style={{ color: "var(--accent)" }}>$</span> cat ~/about.md
      </div>
      {PROFILE.bio.map((p, i) => (
        <p key={i} style={{
          color: "var(--fg-dim)",
          fontSize: 15,
          lineHeight: 1.8,
          margin: "0 0 14px 0",
          fontFamily: "'IBM Plex Mono', monospace"
        }}>
          {p}
        </p>
      ))}
    </div>
  </section>
);

// Featured Video Card Component
const FeaturedVideoCard = ({ video, index }) => {
  const thumb = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
  
  return (
    <Link
      to={`/video/${video.id}`}
      className="card-term reveal"
      style={{
        textDecoration: "none",
        display: "block",
        animationDelay: `${0.05 * index}s`
      }}
    >
      <div className="thumb">
        <img src={thumb} alt={video.title} loading="lazy" />
        <div className="thumb-play">
          <div style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "var(--accent)",
            display: "grid",
            placeItems: "center",
            boxShadow: "0 0 30px var(--accent-glow)"
          }}>
            <Play size={22} fill="#0a0c0a" color="#0a0c0a" />
          </div>
        </div>
        <div style={{
          position: "absolute",
          bottom: 8,
          right: 8,
          background: "rgba(10,12,10,0.92)",
          color: "var(--fg)",
          fontSize: 11,
          padding: "2px 6px",
          borderRadius: 2,
          fontFamily: "'JetBrains Mono', monospace"
        }}>
          {video.duration}
        </div>
      </div>
      <div style={{ marginTop: 14 }}>
        <div style={{
          color: "var(--fg)",
          fontSize: 14,
          fontWeight: 500,
          lineHeight: 1.4,
          marginBottom: 8
        }}>
          {video.title}
        </div>
        <div style={{ color: "var(--fg-mute)", fontSize: 12, display: "flex", gap: 8 }}>
          <span style={{ color: "var(--accent)" }}>{video.views} views</span>
          <span>·</span>
          <span>{video.age}</span>
        </div>
      </div>
    </Link>
  );
};

// Compact Project Card Component
const CompactProjectCard = ({ project, index }) => (
  <div
    className="card-term reveal"
    style={{
      animationDelay: `${0.05 * index}s`
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
      <Terminal size={16} style={{ color: "var(--accent)" }} />
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 20,
        fontWeight: 700,
        color: "var(--fg)"
      }}>
        {project.name}
      </span>
      <span className="tag" style={{ borderColor: "var(--accent)", color: "var(--accent)", marginLeft: "auto" }}>
        ● {project.status}
      </span>
    </div>

    <div style={{ color: "var(--accent)", fontSize: 13, marginBottom: 12 }}>
      ❯ {project.tagline}
    </div>

    <ul style={{
      margin: "0 0 16px 0",
      padding: 0,
      listStyle: "none",
      display: "grid",
      gap: 6
    }}>
      {project.bullets.slice(0, 2).map((b, i) => (
        <li key={i} style={{ color: "var(--fg-dim)", fontSize: 13, display: "flex", gap: 10 }}>
          <span style={{ color: "var(--accent)" }}>→</span>
          <span>{b}</span>
        </li>
      ))}
    </ul>

    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
      {project.stack.slice(0, 4).map((s) => (
        <span key={s} className="tag">{s}</span>
      ))}
    </div>

    <div style={{ display: "flex", gap: 14, paddingTop: 14, borderTop: "1px dashed var(--border)" }}>
      <a
        href={project.url}
        target="_blank"
        rel="noreferrer"
        className="link-u"
        style={{ fontSize: 13, color: "var(--accent)", display: "inline-flex", alignItems: "center", gap: 6 }}
      >
        <ExternalLink size={13} /> {project.domain}
      </a>
      <a
        href={project.repo}
        target="_blank"
        rel="noreferrer"
        className="link-u"
        style={{ fontSize: 13, color: "var(--fg-dim)", display: "inline-flex", alignItems: "center", gap: 6 }}
      >
        <Github size={13} /> source
      </a>
    </div>
  </div>
);

// Tech Stack Section Component
const TechStackSection = () => (
  <section className="container-x reveal" style={{ paddingTop: 48, paddingBottom: 24, animationDelay: "0.2s" }}>
    <div className="section-h" style={{ marginBottom: 24 }}>
      <span style={{ color: "var(--accent)" }}>$</span>
      <span>tech stack · cat ~/stack.yaml</span>
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
      {STACK.map((tech) => (
        <span
          key={tech}
          className="tag"
          style={{
            borderColor: "var(--border)",
            color: "var(--fg)",
            background: "var(--bg-elev)",
            fontSize: 12,
            padding: "4px 12px"
          }}
        >
          {tech}
        </span>
      ))}
    </div>
  </section>
);

// CTA Section Component
const CTASection = () => (
  <section className="container-x reveal" style={{ paddingTop: 48, paddingBottom: 72, animationDelay: "0.25s" }}>
    <div style={{
      background: "var(--bg-soft)",
      border: "1px solid var(--border)",
      borderRadius: 6,
      padding: "48px 32px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden"
    }}>
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        background: "linear-gradient(90deg, transparent, var(--accent), transparent)"
      }} />
      
      <div style={{
        fontSize: 24,
        fontWeight: 700,
        color: "var(--fg)",
        marginBottom: 12,
        fontFamily: "'JetBrains Mono', monospace"
      }}>
        Let's collaborate
      </div>
      <p style={{
        color: "var(--fg-dim)",
        fontSize: 14,
        marginBottom: 32,
        maxWidth: 600,
        margin: "0 auto 32px"
      }}>
        Open to OSS collabs, infra & systems work, podcasts, and good old geek chats.
      </p>
      
      <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
        <a
          href={SOCIAL.youtube}
          target="_blank"
          rel="noreferrer"
          className="link-u"
          style={{
            fontSize: 14,
            color: "var(--accent)",
            border: "1px solid var(--accent)",
            padding: "12px 24px",
            borderRadius: 4,
            textDecoration: "none",
            background: "rgba(163, 230, 53, 0.06)",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontWeight: 600
          }}
        >
          <Youtube size={16} /> Subscribe on YouTube
        </a>
        <Link
          to="/projects"
          className="link-u"
          style={{
            fontSize: 14,
            color: "var(--fg)",
            border: "1px solid var(--border)",
            padding: "12px 24px",
            borderRadius: 4,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontWeight: 600
          }}
        >
          <Terminal size={16} /> Explore projects
        </Link>
        <Link
          to="/contact"
          className="link-u"
          style={{
            fontSize: 14,
            color: "var(--fg)",
            border: "1px solid var(--border)",
            padding: "12px 24px",
            borderRadius: 4,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontWeight: 600
          }}
        >
          <Mail size={16} /> Get in touch
        </Link>
      </div>
    </div>
  </section>
);

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featuredVideos = VIDEOS.slice(0, 3); // Top 3 videos

  return (
    <div className="crt">
      <div className="grain" />
      <Nav />
      <main>
        <Hero />
        
        {/* Stats Bar */}
        <section className="container-x" style={{ paddingTop: 32 }}>
          <StatsBar />
        </section>

        {/* About Snippet */}
        <AboutSnippet />

        {/* Featured YouTube Videos */}
        <section className="container-x" style={{ paddingTop: 48, paddingBottom: 24 }}>
          <div className="section-h" style={{ marginBottom: 28 }}>
            <span style={{ color: "var(--accent)" }}>$</span>
            <span>featured videos · yt-dlp @eminwux --top</span>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 22
          }}>
            {featuredVideos.map((video, i) => (
              <FeaturedVideoCard key={video.id} video={video} index={i} />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Link
              to="/youtube"
              className="link-u"
              style={{
                fontSize: 14,
                color: "var(--accent)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8
              }}
            >
              View all videos <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* Open Source Projects */}
        <section className="container-x" style={{ paddingTop: 48, paddingBottom: 24 }}>
          <div className="section-h" style={{ marginBottom: 28 }}>
            <span style={{ color: "var(--accent)" }}>$</span>
            <span>open source · ls -la ~/oss</span>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: 22
          }}>
            {PROJECTS.map((project, i) => (
              <CompactProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Link
              to="/projects"
              className="link-u"
              style={{
                fontSize: 14,
                color: "var(--accent)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8
              }}
            >
              View all projects <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* Tech Stack */}
        <TechStackSection />

        {/* CTA Section */}
        <CTASection />
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
