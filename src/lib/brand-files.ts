import { BONE, INK, AMBER, faviconSvg, markFile, wordmarkFile } from './pixel';

/** Every downloadable brand file, generated from the pixel grids at build time. */
export const BRAND_FILES: Record<string, () => string> = {
  'rushlight-lab-wordmark-on-dark.svg': () => wordmarkFile(BONE),
  'rushlight-lab-wordmark-on-light.svg': () => wordmarkFile(INK),
  'rushlight-lab-mark-on-dark.svg': () => markFile(BONE),
  'rushlight-lab-mark-on-light.svg': () => markFile(INK),
  'rushlight-lab-app-icon.svg': () => faviconSvg('C'),
};

export const BRAND_README = `Rushlight Lab — brand assets

Files
  rushlight-lab-wordmark-on-dark.svg   Wordmark for dark backgrounds
  rushlight-lab-wordmark-on-light.svg  Wordmark for light backgrounds
  rushlight-lab-mark-on-dark.svg       Flame mark for dark backgrounds
  rushlight-lab-mark-on-light.svg      Flame mark for light backgrounds
  rushlight-lab-app-icon.svg           Mark on its own dark tile: avatars, app icons, favicons

Colours
  Ink    ${INK}   dark background, text on light
  Bone   ${BONE}   light background, text on dark
  Flame  ${AMBER}   the one accent

Rules
  - One accent per screen: the flame is the only amber thing.
  - Don't place the mark next to the wordmark; the wordmark's I already carries the flame.
  - Keep pixels square: scale by whole numbers where you can.
  - Clear space: one flame-height on every side.

Guidelines: https://rushlightlab.com/brand
`;
