import type { Tone } from '../lib/tones';

export interface SearchEngine {
  id: string;
  name: string;
  /** Search URL template; {q} is replaced with the encoded query. */
  search: string;
  color: Tone;
  /** Inline SVG icon name from src/lib/icons. */
  icon: string;
}

// Engines offered in the Hero search dropdown.
// The first item is the default "site search" and opens the CommandPalette.
export const webEngines: SearchEngine[] = [
  { id: 'site', name: 'Site Search', search: '', color: 'slate', icon: 'search' },
  { id: 'google', name: 'Google', search: 'https://www.google.com/search?q={q}', color: 'blue', icon: 'google' },
  { id: 'bing', name: 'Bing', search: 'https://www.bing.com/search?q={q}', color: 'sky', icon: 'bing' },
  { id: 'brave', name: 'Brave', search: 'https://search.brave.com/search?q={q}', color: 'orange', icon: 'brave' },
  { id: 'duckduckgo', name: 'DuckDuckGo', search: 'https://duckduckgo.com/?q={q}', color: 'rose', icon: 'duckduckgo' },
];

// Quick shortcut buttons shown under the Hero search.
export const quickLinks: SearchEngine[] = [
  { id: 'google', name: 'Google', search: 'https://www.google.com', color: 'blue', icon: 'google' },
  { id: 'bing', name: 'Bing', search: 'https://www.bing.com', color: 'sky', icon: 'bing' },
  { id: 'chatgpt', name: 'ChatGPT', search: 'https://chat.openai.com', color: 'emerald', icon: 'chatgpt' },
  { id: 'github', name: 'GitHub', search: 'https://github.com', color: 'slate', icon: 'github' },
];

export const DEFAULT_ENGINE = 'site';

export function engineById(id: string): SearchEngine {
  return webEngines.find((e) => e.id === id) ?? webEngines[0];
}
