// Resolves a real website favicon from a shortcut URL.
// Uses DuckDuckGo's favicon CDN (no API key, privacy-friendlier than Google).
// Returns null when the URL can't be parsed, so callers can fall back to a
// built-in icon or the globe glyph.

export function faviconUrl(url: string): string | null {
  try {
    const candidate = /^https?:\/\//i.test(url) ? url : 'https://' + url;
    const u = new URL(candidate);
    const host = u.hostname.replace(/^www\./, '').toLowerCase();
    if (!host) return null;
    return `https://icons.duckduckgo.com/ip3/${host}.ico`;
  } catch {
    return null;
  }
}
