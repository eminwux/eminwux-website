// Static site data for eminwux.dev

export const PROFILE = {
  name: "Emiliano Spinella",
  handle: "eminwux",
  role: "Computer Engineer · Containers · GNU/Linux",
  location: "Netherlands",
  tagline: "Building agent-native infrastructure & Terminal-as-Code tooling.",
  bio: [
    "I'm a computer engineer who loves the parts of computing most people abstract away — containers, cgroups, namespaces, terminals, shells, and the long, weird history of Unix.",
    "I build self-hosted, open-source infrastructure tools, and I run a YouTube channel where I tell the stories behind the technology we use every day."
  ]
};

export const SOCIAL = {
  github: "https://github.com/eminwux",
  twitter: "https://x.com/eminwux",
  linkedin: "https://www.linkedin.com/in/eminwux",
  youtube: "https://www.youtube.com/@eminwux",
  email: "mailto:me@eminwux.com"
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
    age: "1 year ago",
    lang: "es",
    description:
      "En 1992, Andrew Tanenbaum publicó un mensaje en Usenet que cambió el rumbo de la historia: 'Linux is obsolete'. Lo que siguió fue uno de los debates más legendarios del software libre — un duelo de visiones entre el académico del microkernel y el joven estudiante que estaba reescribiendo Unix desde cero. En este video reconstruyo la discusión original, los argumentos técnicos sobre kernels monolíticos vs microkernels, y por qué Linus Torvalds terminó cambiando el mundo a pesar de tener (técnicamente) toda la razón en contra.",
    tags: ["Linux", "Unix", "Historia", "Kernel"]
  },
  {
    id: "RJYe_uRVJi4",
    title: "BSD: The Hidden History of the Forgotten Unix",
    views: "73K",
    duration: "39:48",
    age: "1 year ago",
    lang: "en",
    description:
      "BSD shaped the internet. It gave us sockets, TCP/IP as we know it, vi, sendmail, and the core of macOS and the PlayStation. Yet most people don't know its story. This is the hidden history of the Berkeley Software Distribution — the Unix that almost won, the lawsuit that almost killed it, and the legacy that still runs on billions of devices today. Featuring rare documents and a direct reply from Ken Thompson.",
    tags: ["BSD", "Unix", "Berkeley", "History"]
  },
  {
    id: "tWVU7fEeH-8",
    title: "Microsoft vs. Linux: The All-Out War for the Future of Computing",
    views: "58K",
    duration: "43:06",
    age: "1 year ago",
    lang: "en",
    description:
      "From 'Linux is a cancer' to 'Microsoft loves Linux' — the most dramatic reversal in tech history. This is the full story of the war between Microsoft and the open source movement: the leaked Halloween Documents, the SCO lawsuits, the patent threats, the Steve Ballmer years, and finally the strategic surrender that turned Microsoft into one of the largest contributors to the Linux kernel.",
    tags: ["Microsoft", "Linux", "Open Source", "History"]
  },
  {
    id: "nH6b23P-4MQ",
    title: "Cuando Linux se conectó: la historia oculta detrás del networking",
    views: "36K",
    duration: "23:29",
    age: "11 months ago",
    lang: "es",
    description:
      "Antes de que Linux fuera el sistema operativo de internet, no podía ni siquiera hacer ping. Esta es la historia de cómo el kernel aprendió a hablar TCP/IP — los primeros parches de Ross Biro, la reescritura completa de Alan Cox, las guerras de drivers con tarjetas Ethernet de los 90, y el momento en que Linux dejó de ser un experimento universitario y se convirtió en la columna vertebral de la red.",
    tags: ["Linux", "Networking", "TCP/IP", "Historia"]
  },
  {
    id: "AJjJnbGW3OM",
    title: "Without macOS, Apple would have died: the true story",
    views: "35K",
    duration: "43:43",
    age: "1 year ago",
    lang: "en",
    description:
      "In 1996, Apple was 90 days from bankruptcy. The company's operating system was a decade behind, Copland had collapsed, and the board was desperate. The acquisition that saved Apple wasn't an acquisition at all — it was a Trojan horse named NeXT that brought Steve Jobs back and quietly replaced the soul of the Mac with Unix. This is the true story of how macOS was born, and why without it, there would be no iPhone, no App Store, and no Apple as we know it.",
    tags: ["macOS", "NeXT", "Apple", "Unix"]
  },
  {
    id: "FscVGsYcdDQ",
    title: "GNU/Linux Terminal Language: Prompt & Streams",
    views: "5.9K",
    duration: "12:25",
    age: "1 year ago",
    lang: "en",
    description:
      "Lesson 01 of the GNU/Linux Foundations course. Before you can do anything useful in a shell, you need to understand what the prompt is actually telling you, what stdin/stdout/stderr really are, and how the kernel wires file descriptors to your keyboard and screen. We start from absolute first principles — no copy-pasting commands, no magic.",
    tags: ["Linux", "Shell", "Tutorial", "Fundamentos"]
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
