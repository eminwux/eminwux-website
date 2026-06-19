// i18n translations — EN / ES
// eminwux.dev (personal homepage)

export const en = {
  nav: {
    home: "home",
    projects: "projects",
    youtube: "youtube",
    contact: "contact",
    about: "about"
  },
  hero: {
    online: "online",
    openToCollabs: "open to collabs",
    role: "Systems Engineer · Containers · GNU/Linux",
    tagline: "Building agent-native infrastructure & Terminal-as-Code tooling."
  },
  bio: [
    "I'm a systems engineer who loves the parts of computing most people abstract away — containers, cgroups, namespaces, terminals, shells, and the long, weird history of Unix.",
    "I build self-hosted, open-source infrastructure tools, and I run a YouTube channel where I tell the stories behind the technology we use every day."
  ],
  home: {
    stats: {
      linuxVeteran: "Linux Veteran",
      unixHistorian: "Unix Historian",
      experience: "years experience",
      ytViews: "YouTube views",
      ossProjects: "active OSS projects"
    },
    featuredVideos: "featured videos · yt-dlp @eminwux --top",
    viewAllVideos: "View all videos",
    openSource: "open source · ls -la ~/oss",
    viewAllProjects: "View all projects",
    techStack: "tech stack · cat ~/stack.yaml",
    cta: {
      title: "Let's collaborate",
      desc: "Open to collab on YouTube videos and podcast appearances.",
      subscribe: "Subscribe on YouTube",
      projects: "Explore projects",
      contact: "Get in touch"
    }
  },
  projects: {
    sectionHeading: "03 / projects · ls -la ~/oss",
    source: "source",
    kukeon: {
      tagline: "Run AI agents on your own Linux.",
      description: "A containerd-native runtime for AI agents on any Linux host. Declarative Sessions, Interactive containers, scoped secrets, default-deny networking — all reconciled on a single machine. Self-hosted. No walled garden.",
      bullets: [
        "Realm → Space → Stack → Cell → Container hierarchy",
        "containerd + CNI + cgroups, no etcd, no scheduler",
        "Sovereign agent state — every byte on your hosts",
        "v0.6.0 beta — Apache 2.0"
      ]
    },
    sbsh: {
      tagline: "Terminal-as-Code.",
      description: "Reproducible, persistent and shareable shell environments. Define terminals declaratively with YAML manifests — env, hooks, prompts, lifecycle. Survive crashes, share with teammates, ship with CI/CD.",
      bullets: [
        "Declarative TerminalProfile manifests",
        "Persistent terminals — survive network drops",
        "Multi-attach for pair programming",
        "Programmatic API + structured logs"
      ]
    }
  },
  youtube: {
    sectionHeading: "04 / youtube · yt-dlp @eminwux --top",
    channelDesc: "Stories from Unix, Linux, BSD & the corners of computing history.",
    openToCollab: "open to collab",
    subscribe: "subscribe →",
    open: "open",
    views: "views",
    playlistsCmd: "ls ~/playlists/",
    "Historias Tech": { description: "Stories from the deep history of computing & Unix." },
    "Fundamentos de GNU/Linux": { description: "Foundations of GNU/Linux, from the prompt to streams." },
    "Directos": { description: "Live coding, kernel compilations, BSD installs." }
  },
  contact: {
    sectionHeading: "05 / contact · ./reach-out.sh",
    comment1: "For YouTube collabs or podcast appearances, drop a line.",
    comment2: "Reply time: usually < 48h.",
    email: "email",
    github: "github",
    x: "x",
    linkedin: "linkedin",
    youtube: "youtube",
    windowTitle: "links · ~/contacts"
  },
  about: {
    back: "cd ~",
    professional: "# professional summary",
    experience: "experience · 20+ years",
    education: "education",
    certifications: "certifications",
    skills: "skills",
    languages: "languages · locale -a",
    topSkills: "# top skills",
    techStack: "# technical stack"
  },
  video: {
    back: "cd ~/youtube",
    watchOnYoutube: "watch on youtube",
    subscribe: "subscribe to @eminwux"
  }
};

export const es = {
  nav: {
    home: "inicio",
    projects: "proyectos",
    youtube: "youtube",
    contact: "contacto",
    about: "sobre mí"
  },
  hero: {
    online: "en línea",
    openToCollabs: "abierto a colaborar",
    role: "Ingeniero de Sistemas · Contenedores · GNU/Linux",
    tagline: "Construyendo infraestructura agent-native y tooling Terminal-as-Code."
  },
  bio: [
    "Soy ingeniero de sistemas y me apasionan las partes de la computación que la mayoría abstrae — contenedores, cgroups, namespaces, terminales, shells y la larga y extraña historia de Unix.",
    "Construyo herramientas de infraestructura open-source auto-alojadas y tengo un canal de YouTube donde cuento las historias detrás de la tecnología que usamos cada día."
  ],
  home: {
    stats: {
      linuxVeteran: "Veterano Linux",
      unixHistorian: "Historiador Unix",
      experience: "años de experiencia",
      ytViews: "vistas en YouTube",
      ossProjects: "proyectos OSS activos"
    },
    featuredVideos: "videos destacados · yt-dlp @eminwux --top",
    viewAllVideos: "Ver todos los videos",
    openSource: "código abierto · ls -la ~/oss",
    viewAllProjects: "Ver todos los proyectos",
    techStack: "stack tecnológico · cat ~/stack.yaml",
    cta: {
      title: "Colaboremos",
      desc: "Abierto a colaborar en videos de YouTube y apariciones en podcasts.",
      subscribe: "Suscribirse en YouTube",
      projects: "Explorar proyectos",
      contact: "Contáctame"
    }
  },
  projects: {
    sectionHeading: "03 / proyectos · ls -la ~/oss",
    source: "código",
    kukeon: {
      tagline: "Ejecuta agentes de IA en tu propio Linux.",
      description: "Un runtime nativo de containerd para agentes de IA en cualquier host Linux. Sesiones declarativas, contenedores interactivos, secretos de alcance limitado, networking default-deny — todo reconciliado en una sola máquina. Self-hosted. Sin jardines vallados.",
      bullets: [
        "Jerarquía Realm → Space → Stack → Cell → Container",
        "containerd + CNI + cgroups, sin etcd, sin scheduler",
        "Estado soberano del agente — cada byte en tus hosts",
        "v0.6.0 beta — Apache 2.0"
      ]
    },
    sbsh: {
      tagline: "Terminal-as-Code.",
      description: "Entornos de shell reproducibles, persistentes y compartibles. Define terminales de forma declarativa con manifiestos YAML — env, hooks, prompts, ciclo de vida. Sobreviven crashes, compártelos con el equipo, despliégalos con CI/CD.",
      bullets: [
        "Manifiestos TerminalProfile declarativos",
        "Terminales persistentes — sobreviven caídas de red",
        "Multi-attach para pair programming",
        "API programática + logs estructurados"
      ]
    }
  },
  youtube: {
    sectionHeading: "04 / youtube · yt-dlp @eminwux --top",
    channelDesc: "Historias de Unix, Linux, BSD y los rincones de la historia de la computación.",
    openToCollab: "abierto a colaborar",
    subscribe: "suscribirse →",
    open: "abrir",
    views: "vistas",
    playlistsCmd: "ls ~/listas/",
    "Historias Tech": { description: "Historias del profundo pasado de la computación y Unix." },
    "Fundamentos de GNU/Linux": { description: "Fundamentos de GNU/Linux, desde el prompt hasta los streams." },
    "Directos": { description: "Programación en vivo, compilaciones del kernel, instalaciones BSD." }
  },
  contact: {
    sectionHeading: "05 / contacto · ./reach-out.sh",
    comment1: "Para colaboraciones en YouTube o apariciones en podcasts, escríbeme.",
    comment2: "Tiempo de respuesta: normalmente < 48h.",
    email: "correo",
    github: "github",
    x: "x",
    linkedin: "linkedin",
    youtube: "youtube",
    windowTitle: "enlaces · ~/contactos"
  },
  about: {
    back: "cd ~",
    professional: "# resumen profesional",
    experience: "experiencia · 20+ años",
    education: "educación",
    certifications: "certificaciones",
    skills: "habilidades",
    languages: "idiomas · locale -a",
    topSkills: "# habilidades principales",
    techStack: "# stack técnico"
  },
  video: {
    back: "cd ~/youtube",
    watchOnYoutube: "ver en youtube",
    subscribe: "suscríbete a @eminwux"
  }
};
