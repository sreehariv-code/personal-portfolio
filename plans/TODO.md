# Portfolio Website — Build TODO

> Single-page Next.js portfolio for Sreehari P V.
> Based on `ULTRA_MINIMAL_PLAN.md` + design files + `resume.json`.

---

## Phase 1 — Project Scaffolding & Configuration
*Estimated: ~1.5 hrs*

- [x] **1.1** Scaffold Next.js app (manual init — `create-next-app` rejected capital in folder name)
- [x] **1.2** Install additional dependencies
  - `framer-motion` — animations
  - `lucide-react` — icon library
  - Space Grotesk via `next/font/google`
- [x] **1.3** Configure `tailwind.config.ts`
  - Colors: `primary: #135bec`, `background-dark: #101622`, `background-light: #f6f6f8`
  - Font family: `display: Space Grotesk`
  - Border radius tokens from design
- [x] **1.4** Set up global CSS
  - Base `body` styles, dark mode default
  - Grid dot background helper class (`.grid-bg`)
- [x] **1.5** Configure dark mode as default in root layout (`<html class="dark">`)
- [x] **1.6** Create TypeScript types file (`types/resume.ts`) matching `resume.json` shape

---

## Phase 2 — Data Layer
*Estimated: ~30 min*

- [x] **2.1** Move / copy `data/resume.json` into the Next.js project (`/src/data/resume.json`)
- [x] **2.2** Create a typed data accessor (`lib/resume.ts`) — import and re-export resume data with types
- [x] **2.3** Verify all sections have the data they need; add any missing fields to `resume.json`
  - Projects: add `category` field for filter tabs (e.g. `"web"`, `"mobile"`, `"ai"`)
  - Basics: add `location` field

---

## Phase 3 — Layout & Navigation
*Estimated: ~1 hr*

- [x] **3.1** Root layout (`app/layout.tsx`) — font, metadata, OG tags, dark class, `<body>` wrapper
- [x] **3.2** Sticky header / navbar
  - Logo: Terminal icon + `sreehari.dev`
  - Nav links: Projects · Experience · Skills · Contact
  - "Resume" CTA button with Download icon
  - Scroll-aware border (transparent → visible on scroll)
- [x] **3.3** Mobile hamburger menu — Framer Motion slide-down with staggered links
- [x] **3.4** Smooth scroll anchors via `scroll-behavior: smooth` in globals.css

---

## Phase 4 — Hero Section
*Estimated: ~2 hrs*

- [x] **4.1** Grid dot background (`grid-bg` CSS class)
- [x] **4.2** Two-column layout (text left, code card right) — stacks to single col on mobile
- [x] **4.3** Left column
  - "Available for new projects" badge (Zap icon, primary/10 bg)
  - Headline: *Crafting Digital **Excellence***
  - Role subtitle: "Specializing in React, Node.js & AI" with cursor
  - Summary paragraph (condensed from resume)
  - "View My Work" + "Download CV" CTA buttons
  - Tech icon avatars (Code2, Bot, Database) + social proof text
- [x] **4.4** Right column — `developer.ts` code card
  - Browser chrome (dots + filename tab)
  - Token-based syntax highlighting (no external lib)
  - Glow border on hover, animated pulse footer
- [x] **4.5** Four feature cards (scroll-triggered fade-up, staggered)
- [x] **4.6** Mobile bottom tag strip: "EXPERT IN REACT • NODE.JS • REACT NATIVE"

---

## Phase 5 — Projects Section
*Estimated: ~2.5 hrs*

- [x] **5.1** Section heading + subtitle (real data)
- [x] **5.2** Filter tab bar (All · Web Apps · Mobile) — shadcn Tabs, underline style override
- [x] **5.3** Featured project card (horizontal, large)
  - Node-flow visual (Globe → Database → ShieldCheck)
  - Title, description, tech tags, View Project + GitHub buttons
  - First project from `resume.json` always featured
- [x] **5.4** Project card grid (3 columns on desktop)
  - Category icon as thumbnail visual
  - Hover overlay with ExternalLink + Github icons
  - Category badge top-right, tech pills (max 3 + overflow count)
- [x] **5.5** Filter logic — client-side useState, filters remaining 3 projects by category
- [x] **5.6** Footer CTA banner ("Interested in working together?") → links to #contact

---

## Phase 6 — Experience & Skills Section
*Estimated: ~2 hrs*

- [x] **6.1** Section eyebrow ("CAREER OVERVIEW") + headline ("Engineering the **Future** of Automation.") + subtext
- [x] **6.2** Timeline (left column, 7/12 grid)
  - Vertical gradient line via `before:` pseudo-element
  - Circular nodes: filled primary + glow for current, muted outlined for past
  - Cards: role, duration badge, company + formatted date range, top 3 highlights, tech chips
  - Both experience entries from `resume.json` + education node at bottom
- [x] **6.3** Tech Stack panel (right column, 5/12 grid)
  - Frontend: 2×2 tile grid (React/Next.js, TypeScript, Tailwind, React Native)
  - Backend & AI: 2×2 tile grid (Node.js/NestJS, Express/Flask, LLMs, Redis/Supabase)
  - Workflow & Tools: primary-tinted chip tags
- [x] **6.4** Education card as final timeline node (GraduationCap icon)

---

## Phase 7 — Contact & Footer Section
*Estimated: ~1.5 hrs*

- [x] **7.1** Section heading: "Let's build something **extraordinary** together."
- [x] **7.2** Background glow blobs (primary/10 top-right + violet/10 bottom-left)
- [x] **7.3** Contact form (left column)
  - Name + Email (2-col row) + Message textarea
  - "Send Message" button with Send icon + hover micro-animation
  - Sonner toast on submit (success + basic validation error)
  - 1s simulated delay + loading state ("Sending...")
- [x] **7.4** Contact info + socials (right column)
  - Email from `resume.json` (mail icon, hover:text-primary)
  - Location from `resume.json` (violet pin icon)
  - LinkedIn, GitHub, Twitter social buttons (brand hover colours)
  - Core expertise tag chips
- [x] **7.5** Footer bar (`components/layout/Footer.tsx`)
  - Terminal icon + `sreehari.dev` logo (matches Navbar)
  - "Built with Next.js and ♥ © 2026" (dynamic year)
  - "Back to top" pill button with ArrowUp icon

---

## Phase 8 — Animations (Framer Motion)
*Estimated: ~1.5 hrs*

- [ ] **8.1** Fade-up on scroll for each section (using `whileInView`)
- [ ] **8.2** Staggered card entrance animations (projects grid, skill pills)
- [ ] **8.3** Hover micro-interactions on project cards and nav links
- [ ] **8.4** Hero badge + headline entrance animation on page load
- [ ] **8.5** Timeline node pop-in on scroll

---

## Phase 9 — Responsiveness & Polish
*Estimated: ~1.5 hrs*

- [ ] **9.1** Review all sections at mobile breakpoints (use mobile design files)
- [ ] **9.2** Responsive hero — stack columns, scale typography
- [ ] **9.3** Responsive projects grid (1 col mobile → 2 col tablet → 3 col desktop)
- [ ] **9.4** Responsive experience timeline (full-width on mobile)
- [ ] **9.5** Responsive contact form + info stack
- [ ] **9.6** Cross-browser check (Chrome, Firefox, Safari)

---

## Phase 10 — SEO, Metadata & Performance
*Estimated: ~45 min*

- [ ] **10.1** `metadata` export in `app/layout.tsx` (title, description, OG tags)
- [ ] **10.2** `robots.txt` and `sitemap.xml`
- [ ] **10.3** `next/font` for Space Grotesk (eliminates Google Fonts runtime request)
- [ ] **10.4** Audit Lighthouse score — target 95+ on all metrics
- [ ] **10.5** Add `<link rel="preconnect">` for any remaining external resources

---

## Phase 11 — Deployment
*Estimated: ~30 min*

- [ ] **11.1** Push project to GitHub repo
- [ ] **11.2** Connect repo to Vercel
- [ ] **11.3** Set custom domain (if available)
- [ ] **11.4** Verify production build — check console errors, layout shifts, fonts

---

## Summary

| Phase | Description               | Est. Time |
|-------|---------------------------|-----------|
| 1     | Scaffolding & Config      | 1.5 hrs   |
| 2     | Data Layer                | 0.5 hrs   |
| 3     | Layout & Navigation       | 1.0 hr    |
| 4     | Hero Section              | 2.0 hrs   |
| 5     | Projects Section          | 2.5 hrs   |
| 6     | Experience & Skills       | 2.0 hrs   |
| 7     | Contact & Footer          | 1.5 hrs   |
| 8     | Animations                | 1.5 hrs   |
| 9     | Responsiveness & Polish   | 1.5 hrs   |
| 10    | SEO & Performance         | 0.75 hrs  |
| 11    | Deployment                | 0.5 hrs   |
| **—** | **Total**                 | **~15 hrs** |

---

## Notes

- Work section-by-section; each phase can be a separate session.
- Phase 8 (animations) can be layered in during each section build instead of all at once.
- Contact form is static (no backend) for now — can add Resend/Formspree later.
- Mobile design files are in `/design/mobile/` — reference them during Phase 9.
