import type { Category } from '../lib/types';

export const categories: Category[] = [
  { slug: 'ai', name: 'AI', icon: 'ai', tagline: 'Chatbots, assistants & generative AI', description: 'Discover the best AI chatbots, writing assistants, image and code generators. From ChatGPT and Claude to developer-focused platforms like Google AI Studio and Replicate.' },
  { slug: 'developer', name: 'Developer', icon: 'developer', tagline: 'Code, repos, docs & dev utilities', description: 'Everything a developer needs in one place: code hosting, documentation, package registries, API tools, and programming language homepages.' },
  { slug: 'search', name: 'Search', icon: 'search', tagline: 'Search engines & discovery', description: 'Privacy-focused, green, and traditional search engines. Compare Google, Bing, DuckDuckGo, Brave, Kagi and more to find the right search for you.' },
  { slug: 'productivity', name: 'Productivity', icon: 'productivity', tagline: 'Notes, tasks & collaboration', description: 'Notes, docs, calendars, task managers and team collaboration tools that help you get more done, whether solo or with a team.' },
  { slug: 'design', name: 'Design', icon: 'design', tagline: 'UI, graphics & creative assets', description: 'Design tools, prototyping, inspiration communities and free asset libraries for designers and creators.' },
  { slug: 'cloud', name: 'Cloud', icon: 'cloud', tagline: 'Hosting, serverless & edge', description: 'Cloud providers, hosting platforms, serverless and edge compute services to deploy and scale your applications.' },
  { slug: 'learning', name: 'Learning', icon: 'learning', tagline: 'Courses, tutorials & practice', description: 'Online courses, coding bootcamps, university open content and interactive practice platforms for lifelong learning.' },
  { slug: 'business', name: 'Business', icon: 'business', tagline: 'Jobs, CRM, payments & growth', description: 'Job boards, CRM, payments, email marketing and e-commerce platforms that power modern businesses.' },
  { slug: 'finance', name: 'Finance', icon: 'finance', tagline: 'Markets, quotes & investing', description: 'Stock quotes, market data, financial news and investing research tools for tracking and analyzing the markets.' },
  { slug: 'social', name: 'Social', icon: 'social', tagline: 'Networks & communities', description: 'Social networks, communities and messaging platforms where people connect and share.' },
  { slug: 'media', name: 'Media', icon: 'media', tagline: 'Video, music & reading', description: 'Streaming video, music, podcasts and reading platforms for entertainment and discovery.' },
  { slug: 'shopping', name: 'Shopping', icon: 'shopping', tagline: 'Marketplaces & retail', description: 'Marketplaces, retail stores and deal destinations for everyday and specialty shopping.' },
  { slug: 'travel', name: 'Travel', icon: 'travel', tagline: 'Maps, flights & stays', description: 'Maps, flight search, hotel booking, vacation rentals and trip planning tools for travelers.' },
  { slug: 'health', name: 'Health', icon: 'health', tagline: 'Medical & wellness info', description: 'Authoritative medical references, wellness information and research databases from trusted institutions.' },
  { slug: 'entertainment', name: 'Entertainment', icon: 'entertainment', tagline: 'Streaming & subscription TV', description: 'Subscription streaming services and on-demand TV for movies, series and shows.' },
  { slug: 'games', name: 'Games', icon: 'games-cat', tagline: 'Stores & browser games', description: 'Game stores, launchers and browser-based gaming platforms to play and discover games.' },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
