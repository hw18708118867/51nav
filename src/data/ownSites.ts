import type { OwnSite } from '../lib/types';

/**
 * 51NAV's own ecosystem entries (10 items).
 * The first 6 are the sub-sites that form the "My Tools" hub on the homepage.
 * The last 4 are cross-links into 51NAV's own sections.
 */
export const ownSites: OwnSite[] = [
  {
    id: 'toolhub',
    name: 'Toolhub',
    url: 'https://toolhub.51nav.com',
    description: 'Developer tools for JSON, API and everyday coding tasks.',
    meta: '200+ Developer Tools',
    icon: 'code-2',
    tags: ['developer', 'tools', 'json', 'api'],
  },
  {
    id: 'devtools',
    name: 'DevTools',
    url: 'https://devtools.51nav.com',
    description: 'Common developer utilities and quick online converters.',
    meta: '80+ Developer Utilities',
    icon: 'cog',
    tags: ['developer', 'utilities', 'converters'],
  },
  {
    id: 'moneytools',
    name: 'Finance Tools',
    url: 'https://moneytools.51nav.com',
    description: 'Financial calculators: loans, interest, investment and more.',
    meta: '30+ Calculators',
    icon: 'coins',
    tags: ['finance', 'calculators', 'money'],
  },
  {
    id: 'healthcalchub',
    name: 'HealthCalcHub',
    url: 'https://healthcalchub.51nav.com',
    description: 'Health and fitness calculators: BMI, calories, and more.',
    meta: '20+ Health Calculators',
    icon: 'heart',
    tags: ['health', 'calculators', 'fitness'],
  },
  {
    id: 'games',
    name: 'Games',
    url: 'https://games.51nav.com',
    description: 'Lightweight front-end mini-games to relax and have fun.',
    meta: '5+ Brain Games',
    icon: 'gamepad-2',
    tags: ['games', 'entertainment', 'browser'],
  },
  {
    id: 'toolbox',
    name: 'Toolbox',
    url: 'https://toolbox.51nav.com',
    description: 'A Chinese-language developer toolbox of handy utilities.',
    meta: 'Useful Developer Tools',
    icon: 'wrench',
    tags: ['developer', 'tools', '中文'],
  },
  {
    id: '51nav-tools',
    name: '51NAV Tools',
    url: '/tools',
    description: 'Browse all online tools and tool destinations from 51NAV.',
    icon: 'toolbox',
    tags: ['tools', 'directory'],
  },
  {
    id: '51nav-guides',
    name: '51NAV Guides',
    url: '/guides',
    description: 'How-to guides and explainers for developers and power users.',
    icon: 'learning',
    tags: ['guides', 'how-to', 'learning'],
  },
  {
    id: '51nav-developer',
    name: '51NAV Developer',
    url: '/categories/developer',
    description: 'Curated developer resources, tools and references.',
    icon: 'developer',
    tags: ['developer', 'resources'],
  },
  {
    id: '51nav-resources',
    name: '51NAV Resources',
    url: '/categories',
    description: 'Explore all resource categories in one place.',
    icon: 'search',
    tags: ['resources', 'directory'],
  },
];

/** The 6 external sub-sites promoted in the "My Tools" section. */
export const myTools = ownSites.filter((s) =>
  ['toolhub', 'devtools', 'moneytools', 'healthcalchub', 'games', 'toolbox'].includes(s.id)
);
