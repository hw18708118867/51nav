import type { Tone } from '../lib/tones';

export interface Shortcut {
  id: string;
  name: string;
  url: string;
  category: string;
  color: Tone;
  /** Inline SVG icon name from src/lib/icons. */
  icon: string;
}

// First-visit default shortcuts for the "My Shortcuts" dashboard tile.
export const defaultShortcuts: Shortcut[] = [
  { id: 'github', name: 'GitHub', url: 'https://github.com', category: 'Developer', color: 'slate', icon: 'github' },
  { id: 'chatgpt', name: 'ChatGPT', url: 'https://chat.openai.com', category: 'AI', color: 'emerald', icon: 'chatgpt' },
  { id: 'gmail', name: 'Gmail', url: 'https://mail.google.com', category: 'Email', color: 'red', icon: 'gmail' },
  { id: 'youtube', name: 'YouTube', url: 'https://youtube.com', category: 'Media', color: 'red', icon: 'youtube' },
  { id: 'notion', name: 'Notion', url: 'https://notion.so', category: 'Productivity', color: 'slate', icon: 'notion' },
  { id: 'figma', name: 'Figma', url: 'https://figma.com', category: 'Design', color: 'fuchsia', icon: 'figma' },
  { id: 'drive', name: 'Google Drive', url: 'https://drive.google.com', category: 'Cloud', color: 'blue', icon: 'drive' },
];

// Built-in icon options shown in the "Add shortcut" picker.
// 'auto' resolves the real website favicon from the URL (see lib/favicon).
export const shortcutIconOptions: string[] = [
  'auto',
  'globe',
  'google',
  'bing',
  'brave',
  'duckduckgo',
  'chatgpt',
  'github',
  'youtube',
  'twitter',
  'reddit',
  'netflix',
  'gmail',
  'notion',
  'figma',
  'drive',
  'facebook',
  'instagram',
  'linkedin',
  'discord',
  'telegram',
  'spotify',
];

// Built-in category options shown in the "Add shortcut" dropdown.
export const shortcutCategories: string[] = [
  'AI',
  'Developer',
  'Search',
  'Email',
  'Media',
  'Productivity',
  'Design',
  'Cloud',
  'Social',
  'Finance',
  'Shopping',
  'Entertainment',
  'Games',
  'News',
  'Tools',
  'Other',
];

export const SHORTCUTS_KEY = '51nav:shortcuts';
