import type { CollectionEntry } from 'astro:content';
import type { Tone } from './tones';

export const difficultyTone: Record<string, string> = {
  Beginner: 'emerald',
  Intermediate: 'blue',
  Advanced: 'violet',
};

export const categoryTone: Record<string, string> = {
  Explained: 'blue',
  'How-to': 'emerald',
  default: 'violet',
};

export function readingTime(body: string | undefined): number {
  const source = (body || '').replace(/^---[\s\S]*?---/, '');

  // Prose: strip code blocks and markdown punctuation, keep link text.
  const prose = source
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#*_>`~\[\]|{}-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const proseWords = prose ? prose.split(' ').length : 0;

  // Code blocks take longer to read; count lines inside fenced blocks.
  const codeBlocks = source.match(/```[\s\S]*?```/g) ?? [];
  const codeLines = codeBlocks.reduce(
    (sum, block) => sum + Math.max(0, block.split('\n').length - 2),
    0
  );

  return Math.max(1, Math.ceil(proseWords / 200 + codeLines * 0.15));
}

// Per-guide icon + accent tone, chosen to reflect each article's topic.
// Keyed by the guide id (the markdown filename without extension) so the
// association is explicit and content-driven rather than guessed from keywords.
export const GUIDE_ICONS: Record<string, { icon: string; tone: Tone }> = {
  'json-unexpected-token': { icon: 'braces', tone: 'blue' },
  'jwt-signature-verification-failed': { icon: 'shield', tone: 'rose' },
  'sm4-vs-aes': { icon: 'lock', tone: 'purple' },
  'bip39-derivation-path': { icon: 'bitcoin', tone: 'orange' },
  'url-encode-space-plus': { icon: 'link', tone: 'yellow' },
  'utf8-vs-gbk-mojibake': { icon: 'languages', tone: 'slate' },
  'yaml-to-json-gotchas': { icon: 'braces', tone: 'teal' },
  'bcrypt-vs-scrypt-vs-argon2': { icon: 'hash', tone: 'fuchsia' },
  'base64-data-uri-image': { icon: 'image', tone: 'rose' },
  'uuid-vs-ulid': { icon: 'fingerprint', tone: 'cyan' },
  'unix-timestamp-10-vs-13': { icon: 'clock', tone: 'green' },
  'x509-certificate-expired': { icon: 'file-text', tone: 'red' },
  'qr-code-ecc-level': { icon: 'qr-code', tone: 'sky' },
};

// Gradient + snippet text colour for the homepage GuideGrid cards, keyed by tone
// so the two guide listings stay visually consistent. Class strings are kept
// literal so Tailwind v4 can statically detect them.
export const GUIDE_GRADIENT: Record<string, string> = {
  blue: 'from-blue-600/25 via-slate-900/80 to-slate-950',
  indigo: 'from-indigo-600/25 via-slate-900/80 to-slate-950',
  violet: 'from-violet-600/25 via-slate-900/80 to-slate-950',
  purple: 'from-purple-600/25 via-slate-900/80 to-slate-950',
  fuchsia: 'from-fuchsia-600/25 via-slate-900/80 to-slate-950',
  pink: 'from-pink-600/25 via-slate-900/80 to-slate-950',
  rose: 'from-rose-600/25 via-slate-900/80 to-slate-950',
  red: 'from-red-600/25 via-slate-900/80 to-slate-950',
  orange: 'from-orange-600/25 via-slate-900/80 to-slate-950',
  amber: 'from-amber-600/25 via-slate-900/80 to-slate-950',
  yellow: 'from-yellow-600/25 via-slate-900/80 to-slate-950',
  green: 'from-green-600/25 via-slate-900/80 to-slate-950',
  emerald: 'from-emerald-600/25 via-slate-900/80 to-slate-950',
  teal: 'from-teal-600/25 via-slate-900/80 to-slate-950',
  cyan: 'from-cyan-600/25 via-slate-900/80 to-slate-950',
  sky: 'from-sky-600/25 via-slate-900/80 to-slate-950',
  lime: 'from-lime-600/25 via-slate-900/80 to-slate-950',
  slate: 'from-slate-600/25 via-slate-900/80 to-slate-950',
};

export const GUIDE_SNIPPET: Record<string, string> = {
  blue: 'text-blue-200/80',
  indigo: 'text-indigo-200/80',
  violet: 'text-violet-200/80',
  purple: 'text-purple-200/80',
  fuchsia: 'text-fuchsia-200/80',
  pink: 'text-pink-200/80',
  rose: 'text-rose-200/80',
  red: 'text-red-200/80',
  orange: 'text-orange-200/80',
  amber: 'text-amber-200/80',
  yellow: 'text-yellow-200/80',
  green: 'text-green-200/80',
  emerald: 'text-emerald-200/80',
  teal: 'text-teal-200/80',
  cyan: 'text-cyan-200/80',
  sky: 'text-sky-200/80',
  lime: 'text-lime-200/80',
  slate: 'text-slate-200/80',
};

export function guideIconTheme(
  title: string,
  tags: string[] = [],
  id?: string
): { icon: string; tone: Tone } {
  if (id && GUIDE_ICONS[id]) {
    return GUIDE_ICONS[id];
  }
  // Fallback keyword matching for any guide not present in GUIDE_ICONS above.
  const t = (title + ' ' + (tags?.join(' ') ?? '')).toLowerCase();
  if (t.includes('json')) return { icon: 'braces', tone: 'blue' } as const;
  if (t.includes('jwt')) return { icon: 'shield', tone: 'rose' } as const;
  if (t.includes('base64')) return { icon: 'binary', tone: 'emerald' } as const;
  if (t.includes('git') || t.includes('github')) return { icon: 'git-branch', tone: 'orange' } as const;
  if (t.includes('python')) return { icon: 'terminal', tone: 'yellow' } as const;
  if (t.includes('docker')) return { icon: 'container', tone: 'sky' } as const;
  if (t.includes('react')) return { icon: 'atom', tone: 'cyan' } as const;
  if (t.includes('node')) return { icon: 'server', tone: 'green' } as const;
  if (t.includes('linux')) return { icon: 'terminal', tone: 'slate' } as const;
  return { icon: 'file-code', tone: 'violet' } as const;
}

export function sortGuides(
  guides: CollectionEntry<'guides'>[],
  sort: 'recent' | 'oldest' | 'az'
) {
  const list = [...guides];
  if (sort === 'recent') {
    list.sort(
      (a, b) =>
        (b.data.pubDate?.getTime() ?? 0) - (a.data.pubDate?.getTime() ?? 0)
    );
  } else if (sort === 'oldest') {
    list.sort(
      (a, b) =>
        (a.data.pubDate?.getTime() ?? 0) - (b.data.pubDate?.getTime() ?? 0)
    );
  } else if (sort === 'az') {
    list.sort((a, b) => a.data.title.localeCompare(b.data.title));
  }
  return list;
}
