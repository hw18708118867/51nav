import type { Tone } from './tones';

export interface Website {
  /** Stable slug used in URLs (derived from name). */
  id: string;
  name: string;
  url: string;
  description: string;
  /** Category slug, see categories.ts */
  category: string;
  tags: string[];
  featured?: boolean;
  official?: boolean;
  /** Approximate community rating (0-5) shown on the detail hero. */
  rating?: number;
  /** Rating vote count label, e.g. "12.5k". */
  ratingCount?: string;
  /** Curated tags shown in the detail hero. Falls back to `tags` if omitted. */
  heroTags?: string[];
}

/** Which 51NAV tool site a directory entry comes from. */
export type ToolSource =
  | 'toolhub'
  | 'devtools'
  | 'toolbox'
  | 'finance'
  | 'health'
  | 'games';

/** A single tool in the 51NAV Tools directory (aggregated from tool sites). */
export interface ToolItem {
  name: string;
  description: string;
  category: string;
  url: string;
  icon: string;
  tone: Tone;
  source: ToolSource;
}

export interface OwnSite {
  id: string;
  name: string;
  /** Absolute URL or site-relative path (e.g. /tools). */
  url: string;
  description: string;
  tags: string[];
  /** Short highlight shown on homepage cards, e.g. "200+ Developer Tools". */
  meta?: string;
  /** Inline SVG icon name from src/lib/icons. */
  icon?: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  /** Short tagline shown on cards. */
  tagline: string;
  /** Inline SVG icon name from src/lib/icons. */
  icon?: string;
}

/** Slugify a website / category name into a stable id. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
