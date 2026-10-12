import type { Tone } from '../lib/tones';

export interface FeaturedTool {
  name: string;
  description: string;
  /** Small label shown on the card (Format / Security / …). */
  tag: string;
  color: Tone;
  /** Icon name passed to the Icon component (lucide or mapped name). */
  icon: string;
  url: string;
}

// Featured Online Tools — doubles as SEO internal links into Toolhub.
export const featuredTools: FeaturedTool[] = [
  { name: 'JSON Formatter', description: 'Format and beautify JSON online.', tag: 'Format', color: 'blue', icon: 'braces', url: 'https://toolhub.51nav.com/tools/json-formatter/' },
  { name: 'ASCII Converter', description: 'Convert text to ASCII codes online.', tag: 'Convert', color: 'emerald', icon: 'check', url: 'https://toolhub.51nav.com/tools/ascii-converter/' },
  { name: 'Base64 Encoder', description: 'Encode and decode Base64 strings online.', tag: 'Encode', color: 'blue', icon: 'database', url: 'https://toolhub.51nav.com/tools/base64-converter/' },
  { name: 'JWT Decoder', description: 'Decode and inspect JWT tokens safely, locally.', tag: 'Security', color: 'rose', icon: 'shield', url: 'https://toolhub.51nav.com/tools/jwt-decoder/' },
  { name: 'URL Encoder', description: 'Percent-encode and decode URLs with ease.', tag: 'Web', color: 'violet', icon: 'link', url: 'https://toolhub.51nav.com/tools/url-encode/' },
  { name: 'Timestamp Converter', description: 'Convert between Unix time and human dates.', tag: 'Convert', color: 'amber', icon: 'clock', url: 'https://toolhub.51nav.com/tools/timestamp/' },
];
