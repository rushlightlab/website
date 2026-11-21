/**
 * The Rushlight Lab identity, as data.
 *
 * Every mark, the wordmark, the icons and the favicon are pixel grids drawn by
 * `svgFromGrid`. The same module renders on the server (Astro components) and in
 * the browser (flicker, brand switcher), so there is one source for the identity.
 */

export const AMBER = '#E9A94A';
export const INK = '#08080A';
export const BONE = '#F4EDDE';
const FG = 'currentColor';

export type Grid = readonly string[];
export type ColourMap = Readonly<Record<string, string>>;

interface SvgOptions {
  cell?: number;
  cls?: string;
  /** Use fill attributes with literal colours (for standalone files like the favicon). */
  standalone?: boolean;
  /** Accessible name; without it the SVG is decorative. */
  label?: string;
}

export function svgFromGrid(rows: Grid, map: ColourMap, opts: SvgOptions = {}): string {
  const { cell = 10, cls = '', standalone = false, label } = opts;
  const width = Math.max(...rows.map((r) => r.length)) * cell;
  const height = rows.length * cell;
  const paths = new Map<string, string[]>();
  rows.forEach((row, y) => {
    [...row].forEach((ch, x) => {
      const colour = map[ch];
      if (!colour) return;
      const d = `M${x * cell} ${y * cell}h${cell}v${cell}h${-cell}Z`;
      paths.set(colour, [...(paths.get(colour) ?? []), d]);
    });
  });
  const body = [...paths]
    .map(([c, d]) => (standalone ? `<path fill="${c}" d="${d.join('')}"/>` : `<path style="fill:${c}" d="${d.join('')}"/>`))
    .join('');
  const a11y = label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" shape-rendering="crispEdges" class="${cls}" ${a11y}>${body}</svg>`;
}

const swap = (rows: Grid, from: string, to: string): string[] =>
  rows.map((r) => [...r].map((c) => (from.includes(c) ? to[from.indexOf(c)] : c)).join(''));

// ---------------------------------------------------------------------------- flame
// Amber body ("a"), core in the foreground colour ("#"). Three frames: rest, lean, stretch.
const FLAME: readonly Grid[] = [
  ['...a...', '...aa..', '..aaa..', '.aaaa..', '.aa#aa.', '.aa##a.', '.a###a.', '.a###a.', '..aaa..'],
  ['..a....', '..aa...', '..aaa..', '.aaaa..', '.aa#aa.', '.a##aa.', '.a###a.', '.a###a.', '..aaa..'],
  ['...a...', '...a...', '..aaa..', '..aaaa.', '.aa#aa.', '.aa##a.', '.a###a.', '.a###a.', '..aaa..'],
];
const FLAME9: readonly Grid[] = [
  ['....#....', '....##...', '...###...', '...####..', '..#####..', '..######.', '.###*###.', '.###**##.', '.##***##.', '.##***##.', '..#####..', '...###...'],
  ['...#.....', '...##....', '...###...', '...####..', '..#####..', '..######.', '.###*###.', '.###**##.', '.##***##.', '.##***##.', '..#####..', '...###...'],
  ['....#....', '....#....', '...###...', '...####..', '..#####..', '..######.', '.###*###.', '.###**##.', '.##***##.', '.##***##.', '..#####..', '...###...'],
];
const STREAK: Grid = ['.........', '.........', '.........', '...#.####', '.........', '#.##.####', '.........', '.....#.##', '.........'];
const STALK: Grid = ['...#...', '...#...', '...#...', '...#...', '...#...', '..###..'];

export type MarkKey = 'C' | 'A' | 'D' | 'E' | 'F';
export interface Mark {
  name: string;
  note: string;
  frames: readonly Grid[];
  map: ColourMap;
}

export const MARKS: Record<MarkKey, Mark> = {
  C: {
    name: 'Amber flame',
    note: 'Amber flame with a core in the text colour. Colour does the work — the recommended mark.',
    frames: FLAME,
    map: { a: AMBER, '#': FG },
  },
  A: {
    name: 'Solid flame',
    note: 'A taller 9×12 flame in the text colour with an amber core. Calmer, more monochrome.',
    frames: FLAME9,
    map: { '#': FG, '*': AMBER },
  },
  D: {
    name: 'Small flame',
    note: 'The 7×9 flame inverted: text-colour body, amber core. Pixel-perfect at 16px.',
    frames: FLAME.map((f) => swap(f, 'a#', '#*')),
    map: { '#': FG, '*': AMBER },
  },
  E: {
    name: 'Rush',
    note: 'Rush + light: the flame dashes right with speed lines behind it. Best for motion and launch graphics.',
    frames: FLAME.map((f) => swap(f, 'a#', '#*').map((r, i) => STREAK[i] + r)),
    map: { '#': FG, '*': AMBER },
  },
  F: {
    name: 'Rushlight',
    note: 'The actual object: an amber flame on a rush stalk. Charming, but thin as an avatar.',
    frames: FLAME.map((f) => [...f, ...STALK]),
    map: { a: AMBER, '#': FG },
  },
};
export const MARK_KEYS = Object.keys(MARKS) as MarkKey[];
export const isMarkKey = (k: unknown): k is MarkKey => typeof k === 'string' && k in MARKS;

export const markSvg = (key: MarkKey, frame = 0, cls = 'h-full w-auto', label?: string): string =>
  svgFromGrid(MARKS[key].frames[frame % MARKS[key].frames.length], MARKS[key].map, { cls, label });

// ---------------------------------------------------------------------------- wordmark
// Custom 5×7 lettering. The I is a pixel candle: an amber stem with a flame above the cap line.
const GLYPHS: Record<string, Grid> = {
  R: ['####.', '#...#', '#...#', '####.', '#.#..', '#..#.', '#...#'],
  U: ['#...#', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
  S: ['.####', '#....', '#....', '.###.', '....#', '....#', '####.'],
  H: ['#...#', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
  L: ['#....', '#....', '#....', '#....', '#....', '#....', '#####'],
  G: ['.####', '#....', '#....', '#.###', '#...#', '#...#', '.###.'],
  T: ['#####', '..#..', '..#..', '..#..', '..#..', '..#..', '..#..'],
  A: ['.###.', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
  B: ['####.', '#...#', '#...#', '####.', '#...#', '#...#', '####.'],
};
const I_FLAME: Grid = ['..*..', '..**.', '.***.', '.***.', '..*..'];

function wordmarkRows(text = 'RUSHLIGHT LAB'): string[] {
  const top = I_FLAME.length + 1;
  const height = top + 7;
  const cols: string[][] = [];
  const put = (x: number, y: number, ch: string) => {
    while (cols.length <= x) cols.push(Array<string>(height).fill('.'));
    cols[x][y] = ch;
  };
  const labStart = text.indexOf(' ');
  let x = 0;
  [...text].forEach((ch, idx) => {
    if (ch === ' ') {
      x += 3;
      return;
    }
    if (ch === 'I') {
      for (let y = 0; y < 7; y++) put(x, top + y, '*');
      I_FLAME.forEach((r, y) => [...r].forEach((c, dx) => c === '*' && put(x - 2 + dx, y, '*')));
      x += 2;
      return;
    }
    const fill = idx > labStart ? 'L' : '#';
    GLYPHS[ch].forEach((r, y) => [...r].forEach((c, dx) => put(x + dx, top + y, c === '#' ? fill : (cols[x + dx]?.[top + y] ?? '.'))));
    x += GLYPHS[ch][0].length + 1;
  });
  const width = x - 1;
  return Array.from({ length: height }, (_, y) => Array.from({ length: width }, (_, c) => cols[c]?.[y] ?? '.').join(''));
}

export const WORDMARK: Grid = wordmarkRows();
export type WordKey = 'W1' | 'W2';
export const WORDS: Record<WordKey, { name: string; map: ColourMap }> = {
  W1: { name: 'Lit I', map: { '#': FG, L: FG, '*': AMBER } },
  W2: { name: 'Amber LAB', map: { '#': FG, L: AMBER, '*': AMBER } },
};
export const WORD_KEYS = Object.keys(WORDS) as WordKey[];
export const isWordKey = (k: unknown): k is WordKey => typeof k === 'string' && k in WORDS;

export const wordmarkSvg = (key: WordKey = 'W1', cls = 'h-full w-auto'): string =>
  svgFromGrid(WORDMARK, WORDS[key].map, { cls, label: 'Rushlight Lab' });

// ---------------------------------------------------------------------------- icons
export const ICONS = {
  sun: ['...#...', '.#...#.', '...#...', '#.###.#', '...#...', '.#...#.', '...#...'],
  moon: ['..###..', '.##....', '##.....', '##.....', '##.....', '.##....', '..###..'],
} satisfies Record<string, Grid>;
export type IconName = keyof typeof ICONS;

export const iconSvg = (name: IconName, cls = 'h-full w-auto'): string => svgFromGrid(ICONS[name], { '#': FG, '*': AMBER }, { cls });

// ---------------------------------------------------------------------------- files
/** A standalone SVG file: literal colours, `fg` replaces the text colour. */
function asFile(rows: Grid, map: ColourMap, fg: string, label: string): string {
  const literal = Object.fromEntries(Object.entries(map).map(([k, v]) => [k, v === FG ? fg : v]));
  return svgFromGrid(rows, literal, { standalone: true, label }).replace(' class=""', '');
}

export const markFile = (fg: string = BONE, key: MarkKey = 'C'): string => asFile(MARKS[key].frames[0], MARKS[key].map, fg, 'Rushlight Lab');
export const wordmarkFile = (fg: string = BONE, key: WordKey = 'W1'): string => asFile(WORDMARK, WORDS[key].map, fg, 'Rushlight Lab');

// ---------------------------------------------------------------------------- favicon
/** The mark on a dark rounded tile with literal colours, so it reads on any browser theme. */
export function faviconSvg(key: MarkKey = 'C'): string {
  const mark = MARKS[key];
  const rows = mark.frames[0];
  const cell = 10;
  const w = Math.max(...rows.map((r) => r.length)) * cell;
  const h = rows.length * cell;
  const side = Math.max(w, h) / 0.78;
  const map = Object.fromEntries(Object.entries(mark.map).map(([k, v]) => [k, v === FG ? BONE : v]));
  const inner = svgFromGrid(rows, map, { standalone: true }).replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${side} ${side}" shape-rendering="crispEdges">` +
    `<rect width="${side}" height="${side}" rx="${side * 0.22}" fill="${INK}"/>` +
    `<g transform="translate(${(side - w) / 2} ${(side - h) / 2})">${inner}</g></svg>`
  );
}
