import type { APIRoute } from 'astro';
import { strToU8, zipSync } from 'fflate';
import { BRAND_FILES, BRAND_README } from '../../lib/brand-files';

export const GET: APIRoute = () => {
  const entries = Object.fromEntries(Object.entries(BRAND_FILES).map(([name, make]) => [`rushlight-lab-brand/${name}`, strToU8(make())]));
  entries['rushlight-lab-brand/README.txt'] = strToU8(BRAND_README);
  return new Response(zipSync(entries, { level: 9 }), {
    headers: { 'Content-Type': 'application/zip' },
  });
};
