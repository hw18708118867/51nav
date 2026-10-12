import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { websites } from '../data/websites';
import { ownSites } from '../data/ownSites';
import { categories } from '../data/categories';

// Prerendered to /search-index.json at build time (static output).
export const GET: APIRoute = async () => {
  const guides = await getCollection('guides');

  const items = [
    ...websites.map((w) => ({
      type: 'Website',
      title: w.name,
      description: w.description,
      url: w.url,
      category: w.category,
      tags: w.tags,
    })),
    ...ownSites.map((s) => ({
      type: 'Tool',
      title: s.name,
      description: s.description,
      url: s.url,
      tags: s.tags,
    })),
    ...categories.map((c) => ({
      type: 'Category',
      title: c.name,
      description: c.description,
      url: `/categories/${c.slug}`,
      tags: [c.slug],
    })),
    ...guides.map((g) => ({
      type: 'Guide',
      title: g.data.title,
      description: g.data.description,
      url: `/guides/${g.id}`,
      tags: g.data.tags,
    })),
  ];

  return new Response(JSON.stringify(items), {
    headers: { 'Content-Type': 'application/json' },
  });
};
