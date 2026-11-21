import type { APIRoute } from 'astro';
import { faviconSvg } from '../lib/pixel';

// Generated from the same pixel grid as the logo, so it can never drift from it.
export const GET: APIRoute = () =>
  new Response(faviconSvg('C'), {
    headers: { 'Content-Type': 'image/svg+xml' },
  });
