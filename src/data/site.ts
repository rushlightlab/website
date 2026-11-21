export const SITE = {
  name: 'Rushlight Lab',
  tagline: 'Small light. Shipped fast.',
  description:
    'Rushlight Lab is a one-person software lab: open-source tools, apps and experiments of every kind, built and shipped under one name.',
  email: 'contact@rushlightlab.com',
  github: 'https://github.com/rushlightlab',
};

export const NAV = [
  { href: '/#projects', label: 'Projects' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
];

/**
 * Projects, most important first.
 * status: 'lit' = shipped and running · 'kindling' = in progress · 'spark' = just an idea
 */
export type ProjectStatus = 'lit' | 'kindling' | 'spark';
export const STATUS_LABEL: Record<ProjectStatus, string> = {
  lit: 'Lit · shipped',
  kindling: 'Kindling · in progress',
  spark: 'Spark · idea',
};

export interface Project {
  name: string;
  status: ProjectStatus;
  tagline: string;
  body: string;
  badge?: string;
  tags: string[];
  links: { label: string; href: string; primary?: boolean }[];
  /** Optional live demo panel beside the description. */
  demo?: 'log-tail';
}

export const PROJECTS: Project[] = [
  {
    name: 'Kinglet',
    status: 'lit',
    tagline: 'Your logs. Your rules.',
    body: 'A self-hosted log server in one small container. Anything that can send an HTTP POST can ship logs to it; they land in a single SQLite file, with live tail, fast substring search and webhook alerts. No agents, no account, no telemetry.',
    badge: 'Open source · MIT',
    tags: ['Self-hosted', 'Docker', 'SQLite · libSQL', 'NDJSON over HTTP'],
    links: [
      { label: 'Visit Kinglet', href: 'https://kinglet.rushlightlab.com/', primary: true },
      { label: 'GitHub', href: 'https://github.com/rushlightlab/kinglet' },
    ],
    demo: 'log-tail',
  },
];

export const PRINCIPLES = [
  { title: 'Small is a feature', body: 'Fewer moving parts, fewer surprises. I reach for the simplest thing that does the job well.' },
  { title: 'Ship early, ship often', body: "An experiment only counts once it's out. Rough edges get filed down in public." },
  { title: 'Your stack, your data', body: 'Self-hostable where it matters, no lock-in, no surprise telemetry.' },
  { title: 'Leave the light on', body: 'Shipping is the start. Things that get lit here get looked after.' },
];

/** Files offered from the logo menu and the brand page; generated at build time from the pixel grids. */
export const BRAND_ASSETS = [
  { file: 'rushlight-lab-wordmark-on-dark.svg', label: 'Wordmark · on dark' },
  { file: 'rushlight-lab-wordmark-on-light.svg', label: 'Wordmark · on light' },
  { file: 'rushlight-lab-mark-on-dark.svg', label: 'Mark · on dark' },
  { file: 'rushlight-lab-mark-on-light.svg', label: 'Mark · on light' },
  { file: 'rushlight-lab-app-icon.svg', label: 'App icon / avatar' },
];
export const BRAND_ZIP = '/brand/rushlight-lab-brand-assets.zip';
