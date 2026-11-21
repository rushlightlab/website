import type { APIRoute, GetStaticPaths } from 'astro';
import { BRAND_FILES } from '../../lib/brand-files';

export const getStaticPaths = (() => Object.keys(BRAND_FILES).map((file) => ({ params: { file } }))) satisfies GetStaticPaths;

export const GET: APIRoute = ({ params }) => {
  const make = BRAND_FILES[params.file ?? ''];
  if (!make) return new Response('Not found', { status: 404 });
  return new Response(make(), { headers: { 'Content-Type': 'image/svg+xml' } });
};
