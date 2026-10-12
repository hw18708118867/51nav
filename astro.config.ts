import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// https://www.51nav.com is bound via public/CNAME.
// base is '/' because the site is served from the domain root.
export default defineConfig({
  site: 'https://www.51nav.com',
  base: '/',
  integrations: [sitemap(), icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});
