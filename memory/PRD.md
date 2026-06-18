# PRD — eminwux.dev (Personal Homepage)

## Original Problem Statement
> "my homepage including my development work and my youtube channel https://www.youtube.com/@eminwux, my projects kukeon.io and sbsh.io"

## User Choices (verbatim)
1. Name: **Emiliano Spinella (eminwux)**
2. Design: **terminal aesthetic**
3. YouTube: **static links/embed only** (no API)
4. Projects: investigate kukeon.io and sbsh.io (auto-fetched)
5. Contact: same `eminwux` handle on GitHub, X/Twitter, LinkedIn

## Architecture
- Stack: React 19 + react-router-dom 7 + Tailwind + lucide-react + FastAPI (untouched stub)
- 100% static site — no backend persistence needed
- Sections: Hero · About · Projects · YouTube · Contact
- Visual: dark green/lime palette, JetBrains Mono, CRT scanlines, terminal windows, typewriter intro

## User Personas
- **Recruiters / collaborators** — quickly understand who Emiliano is and what he builds
- **Developers / homelab users** — discover kukeon and sbsh and click through to GitHub/docs
- **YouTube viewers** — find more content, subscribe, jump to top videos and playlists

## Core Requirements (static)
- Hero with ASCII art and typewriter terminal animation
- About section with bio + tech stack tags
- Projects cards (kukeon, sbsh) with descriptions, bullets, repos, status
- YouTube section: top 6 videos with real thumbnails + 3 playlists
- Contact: email, GitHub, X, LinkedIn, YouTube — all `eminwux` handle
- Sticky nav with active-section highlight
- Responsive (mobile-friendly)

## Implemented (Dec 2025 / Jan 2026)
- ✅ Hero + ASCII + animated terminal (Hero.jsx)
- ✅ About + stack tags (About.jsx)
- ✅ Project cards for kukeon.io and sbsh.io (Projects.jsx)
- ✅ 6 video cards + 3 playlist cards with i.ytimg.com thumbnails (YouTube.jsx)
- ✅ Contact section + footer (Contact.jsx)
- ✅ Sticky Nav with scrollspy (Nav.jsx)
- ✅ CRT scanlines + grain overlay
- ✅ data-testid coverage for all interactive elements
- ✅ Tested: 100% frontend pass (iteration_1.json)

## Backlog
- P1: Dynamic YouTube feed via YouTube Data API (user requires API key)
- P1: Blog/notes section (MDX articles about Linux/containers)
- P2: Newsletter capture (Buttondown/Resend)
- P2: RSS feed for YouTube uploads (mirror via youtube RSS)
- P2: Light/CRT theme toggle
- P3: Open Graph image generator
- P3: i18n EN/ES toggle (channel is bilingual)

## Next Actions
- Decide whether to add dynamic YouTube fetching (needs YouTube Data API key)
- Add custom domain DNS (eminwux.dev) once user is ready to deploy
