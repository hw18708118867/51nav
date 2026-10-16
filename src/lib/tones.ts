// Shared accent color tones for icons, tiles and arrows used across the dashboard.
// Keeping the class strings literal so Tailwind v4 can statically detect them.

export type Tone =
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose'
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'lime'
  | 'slate';

export const toneIcon: Record<string, string> = {
  blue: 'bg-blue-500/15 text-blue-400 ring-1 ring-blue-400/20',
  indigo: 'bg-indigo-500/15 text-indigo-400 ring-1 ring-indigo-400/20',
  violet: 'bg-violet-500/15 text-violet-400 ring-1 ring-violet-400/20',
  purple: 'bg-purple-500/15 text-purple-400 ring-1 ring-purple-400/20',
  fuchsia: 'bg-fuchsia-500/15 text-fuchsia-400 ring-1 ring-fuchsia-400/20',
  pink: 'bg-pink-500/15 text-pink-400 ring-1 ring-pink-400/20',
  rose: 'bg-rose-500/15 text-rose-400 ring-1 ring-rose-400/20',
  red: 'bg-red-500/15 text-red-400 ring-1 ring-red-400/20',
  orange: 'bg-orange-500/15 text-orange-400 ring-1 ring-orange-400/20',
  amber: 'bg-amber-500/15 text-amber-400 ring-1 ring-amber-400/20',
  yellow: 'bg-yellow-500/15 text-yellow-400 ring-1 ring-yellow-400/20',
  green: 'bg-green-500/15 text-green-400 ring-1 ring-green-400/20',
  emerald: 'bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-400/20',
  teal: 'bg-teal-500/15 text-teal-400 ring-1 ring-teal-400/20',
  cyan: 'bg-cyan-500/15 text-cyan-400 ring-1 ring-cyan-400/20',
  sky: 'bg-sky-500/15 text-sky-400 ring-1 ring-sky-400/20',
  lime: 'bg-lime-500/15 text-lime-400 ring-1 ring-lime-400/20',
  slate: 'bg-slate-500/15 text-slate-300 ring-1 ring-slate-400/20',
};

export const toneSolid: Record<string, string> = {
  blue: 'bg-blue-600 hover:bg-blue-500',
  indigo: 'bg-indigo-600 hover:bg-indigo-500',
  violet: 'bg-violet-600 hover:bg-violet-500',
  purple: 'bg-purple-600 hover:bg-purple-500',
  fuchsia: 'bg-fuchsia-600 hover:bg-fuchsia-500',
  pink: 'bg-pink-600 hover:bg-pink-500',
  rose: 'bg-rose-600 hover:bg-rose-500',
  red: 'bg-red-600 hover:bg-red-500',
  orange: 'bg-orange-600 hover:bg-orange-500',
  amber: 'bg-amber-600 hover:bg-amber-500',
  yellow: 'bg-yellow-600 hover:bg-yellow-500',
  green: 'bg-green-600 hover:bg-green-500',
  emerald: 'bg-emerald-600 hover:bg-emerald-500',
  teal: 'bg-teal-600 hover:bg-teal-500',
  cyan: 'bg-cyan-600 hover:bg-cyan-500',
  sky: 'bg-sky-600 hover:bg-sky-500',
  lime: 'bg-lime-600 hover:bg-lime-500',
  slate: 'bg-slate-600 hover:bg-slate-500',
};
