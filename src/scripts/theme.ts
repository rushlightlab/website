/**
 * Theme toggle with a pixel-ripple transition.
 *
 * To light: the light page spreads out from the toggle in square pixels, like light
 * spilling from a lamp. To dark: the light shrinks back into the toggle, like a candle
 * being snuffed. Both use a View Transition: the browser snapshots the old and new page,
 * and we clip one snapshot to a growing/shrinking set of grid cells.
 *
 * Falls back to an instant switch without View Transitions or with reduced motion.
 */

const root = document.documentElement;
const CELL = 28; // px per pixel of the ripple
const DURATION = 620; // ms
const JITTER = 0.16; // how ragged the edge is (0 = perfect circle)

function apply(dark: boolean): void {
  root.classList.toggle('dark', dark);
  try {
    localStorage.setItem('rl-theme', dark ? 'dark' : 'light');
  } catch {
    /* not remembered in private mode */
  }
}

interface Grid {
  cols: number;
  rows: number;
  /** Per cell: when (0..1) it lights up — distance from the origin plus a little noise. */
  at: Float32Array;
}

function makeGrid(ox: number, oy: number, w: number, h: number): Grid {
  const cols = Math.ceil(w / CELL);
  const rows = Math.ceil(h / CELL);
  const far = Math.max(Math.hypot(ox, oy), Math.hypot(w - ox, oy), Math.hypot(ox, h - oy), Math.hypot(w - ox, h - oy));
  const at = new Float32Array(cols * rows);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const d = Math.hypot((c + 0.5) * CELL - ox, (r + 0.5) * CELL - oy) / far;
      at[r * cols + c] = d * (1 - JITTER) + Math.random() * JITTER;
    }
  }
  return { cols, rows, at };
}

/** A clip-path covering every cell lit at threshold q, merged into horizontal runs. */
function clipFor(grid: Grid, q: number): string {
  let d = '';
  for (let r = 0; r < grid.rows; r++) {
    let start = -1;
    for (let c = 0; c <= grid.cols; c++) {
      const lit = c < grid.cols && grid.at[r * grid.cols + c] <= q;
      if (lit && start < 0) start = c;
      if (!lit && start >= 0) {
        const len = (c - start) * CELL;
        d += `M${start * CELL} ${r * CELL}h${len}v${CELL}h${-len}Z`;
        start = -1;
      }
    }
  }
  return `path('${d || 'M0 0Z'}')`;
}

let busy = false;

export function toggleTheme(origin: HTMLElement): void {
  const toDark = !root.classList.contains('dark');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (busy) return;
  if (!document.startViewTransition || reduce) {
    apply(toDark);
    return;
  }

  busy = true;
  const box = origin.getBoundingClientRect();
  const grid = makeGrid(box.left + box.width / 2, box.top + box.height / 2, window.innerWidth, window.innerHeight);
  // light: reveal the new (light) page growing outward.
  // snuff: keep the old (light) page on top, shrinking back into the toggle.
  const mode = toDark ? 'snuff' : 'light';
  const threshold = (p: number) => (mode === 'light' ? p : 1 - p);

  root.dataset.vt = mode;
  root.style.setProperty('--vt-clip', clipFor(grid, threshold(0)));
  root.style.setProperty('--vt-duration', `${DURATION}ms`);

  const transition = document.startViewTransition(() => {
    root.classList.add('vt-active');
    apply(toDark);
  });

  transition.ready
    .then(() => {
      const start = performance.now();
      const frame = (now: number) => {
        const p = Math.min((now - start) / DURATION, 1);
        const eased = mode === 'light' ? 1 - (1 - p) ** 2 : p * p;
        root.style.setProperty('--vt-clip', clipFor(grid, threshold(eased)));
        if (p < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    })
    .catch(() => {});

  transition.finished.finally(() => {
    delete root.dataset.vt;
    root.style.removeProperty('--vt-clip');
    root.style.removeProperty('--vt-duration');
    root.classList.remove('vt-active');
    busy = false;
  });
}
