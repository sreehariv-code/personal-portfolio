# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # dev server with Turbopack on port 4567 (not 3000)
npm run build   # static export → out/
npm run lint    # next lint (eslint-config-next core-web-vitals)
npm start       # serves a prior `next build`; mostly irrelevant given static export
```

There is no test framework configured. `npm run lint` plus `npm run build` (which typechecks) are the only verification available.

## Architecture

Single-page portfolio, Next.js 15 App Router + React 19, statically exported.

**Static export is a hard constraint.** `next.config.ts` sets `output: 'export'` with `images.unoptimized`. There is no server at runtime — no API routes, route handlers, server actions, ISR, middleware, or dynamic rendering. Anything needing a backend must go to a third-party endpoint from the client (as the contact form does).

**One route, one page.** `src/app/page.tsx` stacks `Hero → Projects → Experience → Contact → Footer`. Navigation is anchor-based (`#projects`, `#experience`, `#skills`, `#contact`) — `Navbar.NAV_LINKS` hrefs must match the `id` attributes in the section components. Note `#skills` is an id on a grid *inside* the Experience section, not its own section.

**Content lives in `src/data/resume.json`**, typed by `src/types/resume.ts` and re-exported through `src/lib/resume.ts` as a single `resume` object. Components import `{ resume }` and read it directly; there is no fetching layer. To change portfolio content, edit the JSON — not the components. Adding a field means updating `src/types/resume.ts` too (the JSON is cast, so a mismatch is a type error, not a runtime one).

Two data conventions are load-bearing and not obvious from the types:
- **`resume.projects[0]` is the featured project** rendered as a large `FeaturedCard`; `slice(1)` populates the filterable grid. Reordering the JSON array changes which project is featured.
- **Experience dates are `"YYYY-MM"` strings, except `endDate: "Present"`**, which `Experience.tsx` special-cases for both formatting and "current role" styling. `getDuration`/`formatDate` there parse these by hand.

`ProjectCategory` in the types allows `web | mobile | ai | fullstack`, but `Projects.tsx` only exposes `all/web/mobile` filter tabs. Adding an `ai` or `fullstack` project means adding a `FILTERS` entry, or it will be invisible under every filter but "All".

## Styling

Tailwind 3 with shadcn/ui conventions (`components.json`, slate base, CSS variables, lucide icons). `src/components/ui/` holds generated shadcn primitives — regenerate via the shadcn CLI rather than hand-editing.

Design tokens are HSL CSS variables in `src/app/globals.css`, mapped to Tailwind names in `tailwind.config.ts` as `hsl(var(--x))` so opacity modifiers (`bg-primary/10`) work. Primary is `#135bec`. Page background uses the separate direct-hex `background-light` / `background-dark` tokens, *not* the `background` variable.

**Dark mode is hardcoded.** `layout.tsx` puts `className="dark"` on `<html>`. Light-mode variables and `dark:` variants are fully written out, but light mode never activates. `next-themes` is a dependency but is not wired up anywhere — adding a theme toggle means introducing a provider.

Fonts: Space Grotesk via `next/font`, exposed as `--font-space-grotesk` and used through the `font-display` utility.

## Animation

Framer Motion, client components only (`"use client"` at the top of every section). Each section file declares its own local `fadeUp` variant using the `custom` prop as a delay:

```tsx
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut", delay } }),
};
```

This is duplicated per file by convention. Hero animates on mount (`animate="visible"`); below-the-fold sections use `whileInView` with `viewport={{ once: true }}`.

## Contact form

`Contact.tsx` POSTs directly to `https://api.web3forms.com/submit` with `process.env.NEXT_PUBLIC_WEB3FORMS_KEY`. Because of static export the key is inlined into the bundle at build time — that is expected for Web3Forms access keys. Requires a local `.env.local` (gitignored, not present in a fresh clone) with:

```
NEXT_PUBLIC_WEB3FORMS_KEY=...
```

Without it the form renders and submits but fails. Feedback is via `sonner` toasts; `<Toaster />` is mounted in `layout.tsx`.

## Known gap

`Navbar.tsx` and `Hero.tsx` link to `/resume.pdf`, but there is no `public/` directory in the repo — those links currently 404. Creating `public/resume.pdf` fixes it.
