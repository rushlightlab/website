/**
 * Flickers every [data-mark][data-animate] element: mostly at rest, with short
 * random flickers, so it reads as a flame rather than a loop.
 */
import { isMarkKey, markSvg } from '../lib/pixel';

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let frame = 0;
  const tick = (): void => {
    const r = Math.random();
    const next = r < 0.6 ? 0 : r < 0.8 ? 1 : 2;
    if (next !== frame && !document.hidden) {
      frame = next;
      document.querySelectorAll<HTMLElement>('[data-mark][data-animate]').forEach((el) => {
        const key = isMarkKey(el.dataset.mark) ? el.dataset.mark : 'C';
        el.innerHTML = markSvg(key, frame, 'h-full w-auto');
      });
    }
    window.setTimeout(tick, 110 + Math.random() * 160);
  };
  tick();
}
