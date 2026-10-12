import type { CollectionEntry } from 'astro:content';

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

export function readingTime(body: string): number {
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

export function guideIconTheme(title: string, tags: string[] = []) {
  const t = (title + ' ' + (tags?.join(' ') ?? '')).toLowerCase();
  if (t.includes('json')) return { icon: 'braces', tone: 'blue' as const };
  if (t.includes('jwt')) return { icon: 'shield', tone: 'rose' as const };
  if (t.includes('base64')) return { icon: 'binary', tone: 'emerald' as const };
  if (t.includes('git') || t.includes('github')) return { icon: 'git-branch', tone: 'orange' as const };
  if (t.includes('python')) return { icon: 'terminal', tone: 'yellow' as const };
  if (t.includes('docker')) return { icon: 'container', tone: 'sky' as const };
  if (t.includes('react')) return { icon: 'atom', tone: 'cyan' as const };
  if (t.includes('node')) return { icon: 'server', tone: 'green' as const };
  if (t.includes('linux')) return { icon: 'terminal', tone: 'slate' as const };
  return { icon: 'file-code', tone: 'violet' as const };
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
