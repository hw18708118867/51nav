// Country-specific hero background photos, resolved per visitor country.
// Images live under /public/landmarks and are swapped client-side via geo.
// Add more countries by generating a matching WebP and extending the map below.

export const landmarkImages: Record<string, string> = {
  // China – Great Wall at golden-hour sunset
  CN: '/landmarks/cn.webp',
  // United States – Monument Valley mesas at sunset
  US: '/landmarks/us.webp',
  // Japan – Mount Fuji reflected in a calm lake
  JP: '/landmarks/jp.webp',
  // United Kingdom – Big Ben and the Thames at dusk
  GB: '/landmarks/gb.webp',
  // France – Eiffel Tower at golden hour
  FR: '/landmarks/fr.webp',
  // Germany – Neuschwanstein Castle in the Alps
  DE: '/landmarks/de.webp',
  // Italy – Colosseum at golden hour
  IT: '/landmarks/it.webp',
  // Spain – Sagrada Familia at sunset
  ES: '/landmarks/es.webp',
  // Brazil – Christ the Redeemer over Rio
  BR: '/landmarks/br.webp',
  // India – Taj Mahal at sunrise
  IN: '/landmarks/in.webp',
  // South Korea – N Seoul Tower at blue hour
  KR: '/landmarks/kr.webp',
  // Canada – Moraine Lake and the Rockies
  CA: '/landmarks/ca.webp',
  // Australia – Sydney Opera House at sunset
  AU: '/landmarks/au.webp',
  // Russia – Saint Basil's Cathedral at golden hour
  RU: '/landmarks/ru.webp',
  // Mexico – Chichen Itza pyramid at sunrise
  MX: '/landmarks/mx.webp',

  // Generic scenic fallback (dawn mountain lake)
  DEFAULT: '/landmarks/default.webp',
};

export function getLandmarkImage(code: string): string {
  return landmarkImages[code.toUpperCase()] || landmarkImages.DEFAULT;
}
