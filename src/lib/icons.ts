// Inline SVG brand logos + a few utility glyphs rendered at runtime.
// These MUST stay inline because the ShortcutGrid client script re-renders
// them via innerHTML. Everything else (categories, featured tools, generic UI)
// is rendered with astro-icon (Iconify) in Icon.astro.

const brand: Record<string, string> = {
  // --- Search engines ---
  google:
    '<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.98.66-2.24 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.05l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/></svg>',
  bing:
    '<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="#00809D" d="M5 4.5l9 4v6l-3.5 1.5 3.5 1.5v4.5l-9-4v-10z"/></svg>',
  brave:
    '<svg viewBox="0 0 24 24" width="100%" height="100%"><circle cx="12" cy="12" r="11" fill="#FB542B"/><path d="M17 7H7l2 3.5L7 17h10l-2-6.5L17 7z" fill="#fff"/></svg>',
  duckduckgo:
    '<svg viewBox="0 0 24 24" width="100%" height="100%"><circle cx="12" cy="12" r="11" fill="#DE5833"/><path d="M9 16c0-1.5 2-1.5 2-3V8h2v5c0 1.5 2 1.5 2 3H9z" fill="#fff"/></svg>',

  // --- Quick links / shortcuts ---
  chatgpt:
    '<svg viewBox="0 0 24 24" width="100%" height="100%"><circle cx="12" cy="12" r="11" fill="#10A37F"/><path fill="#fff" d="M12 7a5 5 0 0 0-3.2 8.86c.36.12.62-.24.6-.56l-.2-1.34a3.6 3.6 0 1 1 3.6-3.6l1.34.2c.32.02.68-.24.56-.6A5 5 0 0 0 12 7z"/></svg>',
  github:
    '<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="#fff" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85l-.01 2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/></svg>',
  youtube:
    '<svg viewBox="0 0 24 24" width="100%" height="100%"><rect x="1" y="3" width="22" height="18" rx="4" fill="#FF0000"/><path fill="#fff" d="M10 8.5v7l6-3.5-6-3.5z"/></svg>',
  twitter:
    '<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="#1DA1F2" d="M22 5.8c-.7.32-1.5.54-2.3.64a4 4 0 0 0 1.76-2.2c-.78.46-1.64.8-2.56.98A4.02 4.02 0 0 0 11.8 9c0 .3.03.6.1.9A11.4 11.4 0 0 1 3.6 4.6a4 4 0 0 0 1.24 5.36c-.65-.02-1.26-.2-1.8-.5v.05a4 4 0 0 0 3.22 3.93c-.6.16-1.23.18-1.84.07a4 4 0 0 0 3.74 2.78A8.07 8.07 0 0 1 2 17.9a11.3 11.3 0 0 0 6.13 1.8c7.36 0 11.38-6.1 11.38-11.38v-.52A8.1 8.1 0 0 0 22 5.8z"/></svg>',
  reddit:
    '<svg viewBox="0 0 24 24" width="100%" height="100%"><circle cx="12" cy="12" r="11" fill="#FF4500"/><circle cx="8.5" cy="13" r="1.6" fill="#fff"/><circle cx="15.5" cy="13" r="1.6" fill="#fff"/><path fill="#fff" d="M12 8.5l1.6 1.6h-3.2L12 8.5z"/><path stroke="#fff" stroke-width="1.4" fill="none" d="M8 16c1 1.2 2.4 1.8 4 1.8s3-.6 4-1.8"/></svg>',
  netflix:
    '<svg viewBox="0 0 24 24" width="100%" height="100%"><rect x="1" y="2" width="22" height="20" rx="3" fill="#000"/><path fill="#E50914" d="M7 5l4 14 1.5-5L14 19l4-14-2.2.7L15 14l-1.4-5.2L11 14l-1.8-8.3L7 5z"/></svg>',
  gmail:
    '<svg viewBox="0 0 24 24" width="100%" height="100%"><rect width="24" height="24" rx="3" fill="#fff"/><path fill="#EA4335" d="M12 12.6 4 7.3V17a2 2 0 0 0 2 2h2V12.6l4 3.3 4-3.3V19h2a2 2 0 0 0 2-2V7.3L12 12.6z"/><path fill="#4285F4" d="M22 7.3 12 13.6 2 7.3 2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1.3z"/></svg>',
  notion:
    '<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="#fff" d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514c-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233l4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632"/></svg>',
  figma:
    '<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="#A259FF" d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491M12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539m-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019c1.705 0 3.093-1.376 3.093-3.068v-2.97zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49m-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019z"/></svg>',
  drive:
    '<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="#1FA463" d="M12.01 1.485c-2.082 0-3.754.02-3.743.047c.01.02 1.708 3.001 3.774 6.62l3.76 6.574h3.76c2.081 0 3.753-.02 3.742-.047c-.005-.02-1.708-3.001-3.775-6.62l-3.76-6.574zm-4.76 1.73a789.828 789.861 0 0 0-3.63 6.319L0 15.868l1.89 3.298l1.885 3.297l3.62-6.335l3.618-6.33l-1.88-3.287C8.1 4.704 7.255 3.22 7.25 3.214zm2.259 12.653l-.203.348c-.114.198-.96 1.672-1.88 3.287a423.93 423.948 0 0 1-1.698 2.97c-.01.026 3.24.042 7.222.042h7.244l1.796-3.157c.992-1.734 1.85-3.23 1.906-3.323l.104-.167h-7.249z"/></svg>',
  facebook:
    '<svg viewBox="0 0 24 24" width="100%" height="100%"><circle cx="12" cy="12" r="11" fill="#1877F2"/><path fill="#fff" d="M15.5 12.5h-2.2v8h-3.3v-8H8v-2.8h1.9V8.4c0-2.6 1.1-4.1 4-4.1 1.1 0 1.9.1 2.1.2v2.5h-1.4c-1.1 0-1.5.6-1.5 1.7v1.9h2.8l-.4 2.9z"/></svg>',
  instagram:
    '<svg viewBox="0 0 24 24" width="100%" height="100%"><rect width="24" height="24" rx="6" fill="#833AB4"/><circle cx="12" cy="12" r="4.5" fill="none" stroke="#fff" stroke-width="1.6"/><circle cx="18" cy="6" r="1.3" fill="#fff"/></svg>',
  linkedin:
    '<svg viewBox="0 0 24 24" width="100%" height="100%"><rect width="24" height="24" rx="4" fill="#0A66C2"/><path fill="#fff" d="M7 9H4.5v9H7V9zm-1.3-4.5c-1 0-1.7.7-1.7 1.6 0 .9.7 1.6 1.7 1.6s1.7-.7 1.7-1.6c0-.9-.7-1.6-1.7-1.6zM9.5 9v9h2.5v-4.8c0-1.2.6-2 1.8-2 1 0 1.6.7 1.6 2V18H18v-5.3c0-2.6-1.5-4-3.7-4-1.8 0-2.6 1-3 1.8V9H9.5z"/></svg>',
  discord:
    '<svg viewBox="0 0 24 24" width="100%" height="100%"><circle cx="12" cy="12" r="11" fill="#5865F2"/><path fill="#fff" d="M17.5 7c-.9.4-1.9.7-2.9.8-.1-.3-.3-.5-.4-.8-1 .1-2 .4-2.9.8-.4-.5-.8-.8-1.3-.8s-.9.3-1.3.8c-.9-.4-1.9-.7-2.9-.8-.1.3-.3.5-.4.8-1-.1-2-.4-2.9-.8C3.6 8.6 3 10.7 3 13c0 4.5 3.5 6 8 6s8-1.5 8-6c0-2.3-.6-4.4-1.5-6zM10.5 13a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm3 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>',
  telegram:
    '<svg viewBox="0 0 24 24" width="100%" height="100%"><circle cx="12" cy="12" r="11" fill="#2AABEE"/><path fill="#fff" d="M9.6 15.4l-.4 3.8c.4.1.8-.1 1.1-.4l2.2-2.1 4.6 3.4c.9.4.9-.3 1.2-1.1l3-14.5c.2-.9-.4-1.3-1.1-1.1L4.2 10.5c-1 .4-1 .9-.1 1.2l4.5 1.4 10.4-6.5c.5-.3 1-.1.6.2L9.6 15.4z"/></svg>',
  spotify:
    '<svg viewBox="0 0 24 24" width="100%" height="100%"><circle cx="12" cy="12" r="11" fill="#1DB954"/><path fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" d="M7 10c3-1 7-1 10 .5M6.5 13.5c3.5-1.2 8-.8 11 1M6 17c4-1.3 9.5-.8 13 1.5"/></svg>',

  // --- 51NAV own network brands ---
  toolhub:
    '<svg viewBox="0 0 24 24" width="100%" height="100%"><rect width="24" height="24" rx="6" fill="#2563EB"/><path fill="#fff" d="M7 7h3l5 10h-3L7 7zm7 0h3l-5 10h-3l5-10z"/></svg>',
  devtools:
    '<svg viewBox="0 0 24 24" width="100%" height="100%"><rect width="24" height="24" rx="6" fill="#7C3AED"/><path fill="#fff" d="M9 8l-4 4 4 4 1.4-1.4L7.8 12l2.6-2.6L9 8zm6 0l-1.4 1.4L16.2 12l-2.6 2.6L15 16l4-4-4-4z"/></svg>',
  moneytools:
    '<svg viewBox="0 0 24 24" width="100%" height="100%"><rect width="24" height="24" rx="6" fill="#059669"/><circle cx="12" cy="12" r="5" fill="none" stroke="#fff" stroke-width="1.6"/><path stroke="#fff" stroke-width="1.6" d="M12 9.5v5M10.5 11h3M10.5 13h3"/></svg>',
  healthcalchub:
    '<svg viewBox="0 0 24 24" width="100%" height="100%"><rect width="24" height="24" rx="6" fill="#E11D48"/><path fill="#fff" d="M12 6v12M6 12h12" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/></svg>',
  games:
    '<svg viewBox="0 0 24 24" width="100%" height="100%"><rect width="24" height="24" rx="6" fill="#C026D3"/><path fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M7 9h10a3 3 0 0 1 3 3v1a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-1a3 3 0 0 1 3-3z"/><path fill="#fff" d="M8 12h1.5M7.25 11.25v1.5M16 11.5h.01M17.5 11.5h.01"/></svg>',
  toolbox:
    '<svg viewBox="0 0 24 24" width="100%" height="100%"><rect width="24" height="24" rx="6" fill="#0891B2"/><path fill="#fff" d="M6 9h12v8H6V9zm2-2h8v2H8V7zm3 4h2v3h-2v-3z"/></svg>',

  // --- Utility glyphs (used by client-rendered shortcuts) ---
  search:
    '<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
  globe:
    '<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  plus:
    '<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  x:
    '<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
};

/** Returns the inline SVG string for a brand/utility icon, or undefined. */
export function icon(name: string): string | undefined {
  return brand[name];
}
