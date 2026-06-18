// Static site data for eminwux.dev

export const PROFILE = {
  name: "Emiliano Spinella",
  handle: "eminwux",
  role: "Systems Engineer · Containers · GNU/Linux",
  location: "Netherlands",
  tagline: "Building agent-native infrastructure & Terminal-as-Code tooling.",
  bio: [
    "I'm a systems engineer who loves the parts of computing most people abstract away — containers, cgroups, namespaces, terminals, shells, and the long, weird history of Unix.",
    "I build self-hosted, open-source infrastructure tools, and I run a YouTube channel where I tell the stories behind the technology we use every day."
  ]
};

export const SOCIAL = {
  github: "https://github.com/eminwux",
  twitter: "https://x.com/eminwux",
  linkedin: "https://www.linkedin.com/in/eminwux",
  youtube: "https://www.youtube.com/@eminwux",
  email: "mailto:hello@eminwux.dev"
};

export const PROJECTS = [
  {
    id: "kukeon",
    name: "kukeon",
    domain: "kukeon.io",
    url: "https://kukeon.io",
    repo: "https://github.com/eminwux/kukeon",
    tagline: "Run AI agents on your own Linux.",
    description:
      "A containerd-native runtime for AI agents on any Linux host. Declarative Sessions, Interactive containers, scoped secrets, default-deny networking — all reconciled on a single machine. Self-hosted. No walled garden.",
    bullets: [
      "Realm → Space → Stack → Cell → Container hierarchy",
      "containerd + CNI + cgroups, no etcd, no scheduler",
      "Sovereign agent state — every byte on your hosts",
      "v0.6.0 beta — Apache 2.0"
    ],
    stack: ["Go", "containerd", "CNI", "cgroups", "YAML"],
    status: "active",
    state: "beta"
  },
  {
    id: "sbsh",
    name: "sbsh",
    domain: "sbsh.io",
    url: "https://sbsh.io",
    repo: "https://github.com/eminwux/sbsh",
    tagline: "Terminal-as-Code.",
    description:
      "Reproducible, persistent and shareable shell environments. Define terminals declaratively with YAML manifests — env, hooks, prompts, lifecycle. Survive crashes, share with teammates, ship with CI/CD.",
    bullets: [
      "Declarative TerminalProfile manifests",
      "Persistent terminals — survive network drops",
      "Multi-attach for pair programming",
      "Programmatic API + structured logs"
    ],
    stack: ["Go", "PTY", "YAML", "Unix"],
    status: "active",
    state: "beta"
  }
];

// Top videos from @eminwux — static, ordered by impact
export const VIDEOS = [
  {
    id: "Kqbg1xHZbuw",
    title: "Linux Quedó Obsoleto: La Discusión que Marcó la Historia",
    views: "200K",
    duration: "33:18",
    age: "1 year ago"
  },
  {
    id: "RJYe_uRVJi4",
    title: "BSD: The Hidden History of the Forgotten Unix",
    views: "73K",
    duration: "39:48",
    age: "1 year ago"
  },
  {
    id: "tWVU7fEeH-8",
    title: "Microsoft vs. Linux: The All-Out War for the Future of Computing",
    views: "58K",
    duration: "43:06",
    age: "1 year ago"
  },
  {
    id: "nH6b23P-4MQ",
    title: "Cuando Linux se conectó: la historia oculta detrás del networking",
    views: "36K",
    duration: "23:29",
    age: "11 months ago"
  },
  {
    id: "AJjJnbGW3OM",
    title: "Without macOS, Apple would have died: the true story",
    views: "35K",
    duration: "43:43",
    age: "1 year ago"
  },
  {
    id: "FscVGsYcdDQ",
    title: "GNU/Linux Terminal Language: Prompt & Streams",
    views: "5.9K",
    duration: "12:25",
    age: "1 year ago"
  }
];

export const PLAYLISTS = [
  {
    title: "Historias Tech",
    description: "Stories from the deep history of computing & Unix.",
    count: "8 videos",
    url: "https://www.youtube.com/playlist?list=PLC8uYeu8H8E8Q-X_7SWO6zu80XmwpI35c"
  },
  {
    title: "Fundamentos de GNU/Linux",
    description: "Foundations of GNU/Linux, from the prompt to streams.",
    count: "10 lessons",
    url: "https://www.youtube.com/playlist?list=PLC8uYeu8H8E-wCStffP_sqyz_Bmlke0NW"
  },
  {
    title: "Directos",
    description: "Live coding, kernel compilations, BSD installs.",
    count: "4 videos",
    url: "https://www.youtube.com/playlist?list=PLC8uYeu8H8E8fsT6t9HCU9Q2Rl3LP-tLW"
  }
];

export const STACK = [
  "Go", "Python", "Linux", "containerd", "Kubernetes", "CNI",
  "cgroups", "eBPF", "Bash", "PTY", "YAML", "Terraform"
];
