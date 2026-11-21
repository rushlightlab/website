# Rushlight Lab

Home page and brand guidelines for [Rushlight Lab](https://rushlightlab.com) — a one-person software lab where I ship open-source tools, apps and experiments under one name.

Astro 7 · Tailwind CSS 4 · TypeScript · pnpm. Static output, no framework runtime.

```sh
pnpm install
pnpm dev      # http://localhost:4321
pnpm check    # astro check (TypeScript 6 — astro check doesn't support TS 7 yet)
pnpm build    # → dist/
```

## Where things live

| Path | What |
|---|---|
| `src/lib/pixel.ts` | The whole identity as pixel grids: flame marks + flicker frames, the 5×7 wordmark, icons, favicon. Renders on the server and in the browser. |
| `src/lib/brand-files.ts` | Downloadable SVGs + the README that goes in the brand zip. |
| `src/data/site.ts` | All copy and the project list (add a project = add an entry to `PROJECTS`). |
| `src/components/` | One component per section. `LogoMenu.astro` is the right-click brand menu on the header logo. |
| `src/pages/index.astro` | Home: hero, projects, about, contact. |
| `src/pages/brand.astro` | Brand guidelines (linked from the logo menu and the footer). |
| `src/pages/brand/[file].ts`, `…brand-assets.zip.ts`, `favicon.svg.ts` | Brand files generated at build time from `pixel.ts`, so they never drift from the logo. |

## Notes

- `package.json` pins `packageManager: pnpm` because a `package.json` in the user home folder pins yarn for everything below it.
- The Kinglet log tail on the landing page is illustrative, not live data.
