# Design System & Architecture

This file is the single source-of-truth for the Ardira marketing website. It documents the architecture, design system, pages, components, and behavior.

---

---

# Project Guide (Merged)

The following full, easy-language project guide has been merged here. It explains how to run the project, the main technologies, colors, fonts, page sections, forms, SEO, performance, and common fixes in plain language.

## Quick start (the fastest way to run)
1. Open the project folder on your computer.
2. Install packages:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
npm run preview
```

---

## What this site is (short)
- A marketing website for Ardira.
- It is a Single Page App (SPA): pages are built with React and served by Vite during development.
- The code is mainly in `src/`. Static files like fonts and `robots.txt` are in `public/`.

---

## Main technologies (simple)
- React: builds the UI (pages and pieces of the page).
- Vite: fast dev server and build tool.
- TypeScript: checks code types to avoid bugs.
- Tailwind CSS: utility classes for styles (e.g., `px-4`, `text-lg`).

---

## Fonts and typography (what and where)
- Fonts live in `public/fonts/` as `.woff2` files.
- Two main fonts:
  - Inter (used for body text / normal text)
  - Poppins (used for headings / titles)
- We use `font-display: swap` so users see text fast even if the font is still loading.
- Global font settings and sizes are in `src/index.css`.

---

## Colors and branding (exact values)
Use these colors to keep the design consistent. They are also saved as CSS variables in `src/index.css`.

- Primary green (CTA): #39b44a
- Primary green dark: #2a8f38
- Primary green light / accent background: #e8f7ea
- Accent blue: #27aae1
- Navy / main text: #1a2b3c
- Secondary text: #4a5a6a
- Muted text: #7a8a9a
- Light background: #f8f9fa
- White: #ffffff

When you change colors, edit the variables in `src/index.css` instead of changing many files.

---

## Buttons and CTAs (how they look)
- Primary (big green): green background, white text, rounded corners (`rounded-xl`), small shadow, hover becomes darker green.
- Small primary (`.btn-demo`): used in the navbar for "Book Demo".
- Secondary/outline: light background, subtle border.

If you add a button, copy an existing button's classes to keep the look same.

---

## Page layout and structure (how pages are built)
- The site uses a shared header (navbar) and footer across pages.
- Pages are built from smaller components: `Hero`, `Products`, `Features`, `Contact`, `Stats`, `TrustedSection`.
- Keep the order and structure: Header → Main Sections → Footer.

---

## What each main section does (very simple)
- Hero: Big title, short description, main CTAs. Goal: tell visitors the main message and get them to act.
- TrustedSection: shows logos of partners/customers. Goal: build trust.
- Products: tabs or boxes that show the product range and short descriptions.
- Features: list of features with small icons and short text.
- Stats: big numbers to show credibility (e.g., customers, uptime).
- Contact: a form where visitors enter name, email, message. Uses reCAPTCHA to reduce spam.
- Partner Hub: special page for partners to apply or get info.

---

## Components (where to find them and what they do)
- `src/components/Hero.tsx` — top section.
- `src/components/Products.tsx` — product tabs and images.
- `src/components/Contact.tsx` — contact form.
- `src/components/ContactCta.tsx` — small CTA block reused on pages.
- `src/components/Navbar.tsx` — site navigation and logo.
- `src/components/Footer.tsx` — bottom area with links and contact info.
- `src/components/PageSeo.tsx` — sets page title and meta tags.
- `src/components/RobotsManager.tsx` — controls `noindex` for dev/staging.
- `src/components/StructuredData.tsx` — inserts JSON-LD for SEO.

When you change a component, look for where it is imported in `src/pages/` so you don't break pages.

---

## Forms and reCAPTCHA (step-by-step)
1. The site uses reCAPTCHA v3 on the client. The client asks reCAPTCHA for a token.
2. The token (`recaptchaToken`) is added to the form data sent to the server.
3. The server (edge function) uses the secret key (server-only) to ask Google if the token is valid.
4. If the token is valid, the server accepts the form and saves the lead.
5. If the token is missing or invalid, the server returns 403 (Forbidden).

Important rules:
- Do NOT put the secret reCAPTCHA key in any `VITE_` variable. Secrets must stay on the server.
- The client only uses `VITE_RECAPTCHA_SITE_KEY` (safe to be public).

Debugging form 403 errors (easy steps):
- Ensure the browser sends `recaptchaToken` in the request body.
- Open browser dev tools → Network tab → look at the POST request and check the body.
- If token is missing, check `useRecaptcha` hook and confirm it returns a token before submit.
- If token is present, check server logs for token verification errors.

---

## SEO and robots (what to keep)
- `public/robots.txt` must exist and be served as a plain text file.
- `public/sitemap.xml` should be linked in `robots.txt`.
- `PageSeo` and `StructuredData` help search engines understand pages.
- Keep canonical links in `PageSeo` to inform search engines about the main URL.

Common Lighthouse problem: it cannot fetch `robots.txt`.
- Check `public/_redirects` to ensure the hosting platform does not rewrite `/robots.txt` to the SPA index.html.
- On Netlify-style hosting, ensure `_redirects` contains a rule to let `robots.txt` be served as static.

---

## Images and performance (how to keep site fast)
- Above-the-fold images (images visible on first load) should use `loading="eager"` and `fetchPriority="high"`.
- Below-the-fold images should be lazy-loaded to save bandwidth.
- Use `React.lazy` and `Suspense` for big components that are not needed immediately.
- Preload main fonts in `index.html` with `<link rel="preload" as="font" crossorigin>`.
- Use optimized images (WebP or compressed PNG/JPEG).

Quick checklist to improve speed:
- Reduce big images sizes.
- Lazy load non-critical scripts.
- Keep CSS small; use Tailwind utility classes.

---

## Accessibility (simple checks)
- Add `alt` text to all images.
- Ensure text has enough color contrast with its background.
- Buttons and links need to be reachable with keyboard (use `tab`).
- Use semantic HTML: `header`, `main`, `nav`, `footer`, `h1`–`h6`, `p`, `ul`.

---

## Files you'll edit most often
- `src/pages/*` — page-level files (Home, PartnerHub, Team, PrivacyPolicy, TermsOfService).
- `src/components/*` — reusable components (Hero, Contact, Products).
- `src/index.css` — color and font variables and global styles.
- `public/robots.txt` and `public/sitemap.xml` — SEO static files.
- `index.html` — preloads and meta tags.

---

## Environment variables (what each one does)
- `VITE_RECAPTCHA_SITE_KEY` — public reCAPTCHA site key for the browser.
- `VITE_LEAD_SUBMIT_URL` — where the client sends form data (edge function URL).
- `VITE_APP_ENV` — indicates environment (production vs staging). Used to control indexing.

Never put secrets in client variables. Server-only secrets stay on the server.

---

## How to make small content edits (step-by-step)
- Change a sentence on the Home page:
  1. Open `src/pages/Home.tsx`.
  2. Find the `Hero` component or text and edit it.
  3. Save and view changes on `npm run dev`.

- Change a product description:
  1. Open `src/components/Products.tsx`.
  2. Edit the product title or description.
  3. Save and check the page.

- Add a menu link:
  1. Open `src/components/Navbar.tsx`.
  2. Add a `<Link>` or `<a>` item matching the route.

---

## Common problems and quick fixes (with steps)
- Form 403 (Forbidden):
  1. Open browser dev tools → Network → find the POST request.
  2. Check if `recaptchaToken` was sent. If not, fix `useRecaptcha` or form submit flow.
  3. If sent, check server logs for token verification errors.

- Fonts not loading correctly:
  1. Confirm font files exist in `public/fonts/`.
  2. Confirm `index.html` has preload tags for those fonts.

- `robots.txt` missing in Lighthouse:
  1. Ensure `public/robots.txt` exists.
  2. Check hosting redirect rules so `/robots.txt` is not rewritten to `index.html`.

- Slow page:
  1. Remove or lazy-load large images.
  2. Use `React.lazy` for heavy components.
  3. Check bundle size with `vite build` and an analyzer.

---

## Coding style and conventions (keep things uniform)
- Use Tailwind utility classes for layout and spacing.
- Use `src/components` for reusable UI pieces and `src/pages` for page-level composition.
- Name components in PascalCase (`MyComponent`).
- Keep global styles and tokens in `src/index.css`.
- Use `Link` from `react-router-dom` for internal links. Do not replace `Link` with `<a>` for internal navigation.

---

## Deployment notes (what hosting needs)
- `public/_redirects` prevents SPA rewrite of static files. Make sure rules allow `robots.txt` and `sitemap.xml` to be served as files.
- If using Apache, `.htaccess` contains caching and rewrite rules. Map these to your hosting platform's config if not using Apache.
- Ensure fonts and hashed static assets are served with long cache headers (1 year) and immutable when their filenames include a hash.

---

## Short checklist before merging changes
- [ ] Run `npm run build` and check there are no build errors.
- [ ] Confirm `robots.txt` and `sitemap.xml` are present in the build output.
- [ ] Test contact form in a preview environment (ensure recaptcha token is valid server-side).
- [ ] Run Lighthouse on a preview of the site and check SEO and performance.

---

## Where to find more details
- `design-system-and-architecture.md` — technical design system reference.
- `src/hooks/useRecaptcha.ts` — shows how reCAPTCHA is injected and tokens are fetched.
- `src/index.css` — color tokens and global styles.
- `public/_redirects` — SPA redirect rules for Netlify-like hosts.

---

If you want this file shorter or want a printable checklist version, tell me and I will make it. This file will be kept as the single guide. Now I will remove the older two guide files as you requested.

## 1. Project Overview & Tech Stack

### Core frameworks
- React 19 (function components + hooks)
- Vite (dev server + build)
- TypeScript (static types)
- Tailwind CSS (utility-first styling)

### Major dependencies and their purpose
- `@vitejs/plugin-react`: Vite React plugin (JSX, Fast Refresh)
- `vite-tsconfig-paths`: resolve TS path aliases
- `tailwindcss` & `@tailwindcss/vite`: utility CSS framework and vite integration
- `react-router-dom`: client-side SPA routing
- `react-helmet-async`: manage document head (meta tags, canonical tags)
- `framer-motion`: UI animation primitives used selectively in components
- `lucide-react`: SVG icon library used across UI
- `@supabase/supabase-js`: (present in package lock) used for lead submission (edge function endpoint)
- `@tanstack/*`: present in deps (react-query, router helpers), not central to marketing site but included

### Build & deployment configuration
- `vite.config.ts`:
  - `server` config: host `::`, port `8080` for local development
  - `envPrefix: ["VITE_", "RECAPTCHA_"]` — Vite will expose env vars prefixed with `VITE_` and `RECAPTCHA_` to the client.
  - `plugins`: `react()`, `tailwindcss()`, `tsconfigPaths()`
  - `build.target` set to `es2020` (modern browsers, smaller bundles)
- `public/` contains static assets that get copied as-is to the build output.
- `_redirects` (in `public/` and `dist/`): SPA catch-all plus explicit exceptions for `/robots.txt` and `/sitemap.xml`. Important for Netlify-style hosting to ensure crawlers fetch static files.
- `.htaccess` (present): rules for Apache — compression, caching headers, and SPA rewrites. If deploying to other platforms (Netlify, Vercel), map these rules to platform header/redirect config.

### Environment variables
- `.env` exposes (client-safe) variables prefixed by `VITE_`.
  - `VITE_RECAPTCHA_SITE_KEY`: public reCAPTCHA site key used in `useRecaptcha` hook
  - `VITE_LEAD_SUBMIT_URL`: full URL to lead submission edge function
  - `VITE_SITE_ID`: site identifier used in payloads
  - `VITE_APP_ENV`: determines production vs non-production behavior in `RobotsManager`

Security note: Server secrets (reCAPTCHA secret) must be stored in the server/edge function — never in `VITE_` variables.

---

## 2. Global Design System (The UI Kit)

This section documents typography, color tokens, components, and global effects.

### Typography
- Fonts included (local woff2 files in `public/fonts/`):
  - Inter: `Inter-300-400-500-600-700.woff2`
    - Use case: primarily body copy / UI text
    - Weights used: 300, 400, 500, 600, 700
  - Poppins: `Poppins-400/500/600/700/800.woff2`
    - Use case: headings and display text
    - Weights used: 400, 500, 600, 700, 800
- CSS variables (in `src/index.css`):
  - `--font-sans: "Inter", sans-serif` (body)
  - `--font-display: "Poppins", sans-serif` (headings)
- `@font-face` uses `font-display: swap` for faster text rendering.
- Application rules:
  - Body: `font-family: Inter` (applied globally via `body`)
  - Headings: `font-family: Poppins` (applied to h1–h6)

### Color palette
All tokens are defined in `:root` in `src/index.css`. Both HSL tokens and hex tokens are used.

- Primary (Green):
  - HSL token `--primary: 142 71% 35%` (used for color system HSL variables)
  - Hex: `--primary-green`: `#39b44a` (used for CTAs)
  - Dark: `--primary-green-dark`: `#2a8f38`
  - Light: `--primary-green-light`: `#e8f7ea`
- Accent / Blue:
  - `--primary-blue`: `#27aae1`
  - `--primary-blue-light`: `#e6f6fd`
- Text:
  - `--navy` / `--text-primary`: `#1a2b3c`
  - `--text-secondary`: `#4a5a6a`
  - `--text-muted`: `#7a8a9a`
- Backgrounds:
  - `--bg-light`: `#f8f9fa`
  - `--bg-lighter`: `#f0f2f4`
  - `--white`: `#ffffff`
- Borders:
  - `--border-color`: `#e2e6ea`
- Shadows and elevation:
  - `--shadow-sm`: `0 4px 16px rgba(26, 43, 60, 0.1), 0 1px 4px rgba(26, 43, 60, 0.06)`
  - `--shadow-md`: `0 8px 48px rgba(0, 0, 0, 0.12)`

Gradients and patterns used in components:
- Radial gradients for soft green glows: e.g. `radial-gradient(ellipse 70% 50% at 50% -5%, rgba(34,197,94,0.12), transparent)` (used in Hero-like sections)
- Subtle dot/grid patterns via `radial-gradient(circle, #0f172a 1px, transparent 1px)` with `background-size: 32px 32px` for low opacity overlays.

### UI Components — exact classes & CSS
Below are the canonical component styles taken directly from the codebase; these are the authoritative classes to use when building new features.

Primary CTA (large rounded button used across CTAs):
- Representative classes used in `ContactCta` and NotFound CTAs:
  - `inline-flex items-center gap-3 bg-[#43AF57] text-white px-10 py-4 rounded-xl font-bold text-base hover:bg-[#15803d] transition-all shadow-md group`
- Interaction details:
  - Hover: `hover:bg-[#15803d]` (darker green)
  - Group hover effect for icon: `group-hover:translate-x-1.5 transition-transform duration-300`
  - Press animation: Framer Motion uses `whileTap={{ scale: 0.98 }}` in some CTAs.

Primary small CTA (navbar Book Demo):
- `.btn-demo` CSS (in `src/index.css`):
  - `font-size: 14px; font-weight: 600; padding: 8px 20px; background: var(--primary-green); color: #fff; border-radius: 7px; box-shadow: 0 3px 10px rgba(57, 180, 74, 0.25); transition: var(--transition)`
  - Hover: translateY(-2px); background `var(--primary-green-dark)`; shadow intensifies.

Secondary/Outline button (used in alternate CTAs):
- Example classes:
  - `bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-xl transition-all duration-200 border border-slate-200`
  - Border radius: `rounded-xl` (~12px)

Badges
- Example badge (ContactCta and other CTAs):
  - `inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-8 shadow-sm`
- Characteristics: small uppercase pill, 1.5rem horizontal padding, `rounded-full`, `shadow-sm`.

Form controls
- Inputs use a shared inline style object named `inputStyle` in `Contact.tsx` and Partner Hub:
  - `fontFamily: var(--font-family); fontSize: 14px; padding: 10px 14px; border: 1.5px solid var(--border-color); borderRadius: 12px; background: #fff; color: var(--text-primary); outline: none; transition: var(--transition); width: 100%`
- Error state border: `1.5px solid #ef4444` (red)

Images and media
- Product images sometimes use `loading="eager"` and `fetchPriority="high"` for above-the-fold imagery.

Misc utilities
- `.responsive-section` and `.hero-section` are used across layouts as container patterns (max width `--max-width` and centered content). Use `--max-width: 1200px`.

### Global effects (animations, shadows, patterns)
Defined in `src/index.css`.

Key animations:
- `@keyframes marquee`: horizontal infinite scroll for partner logos (used with `.animate-marquee`)
- `fadeInDown`: used for dropdown/intro animations (from opacity 0 translateY(-20px) to visible)
- `fadeIn`: subtle upward fade for content blocks
- `pulse`: simple opacity/scale pulse (used for small UI accents)
- `slideIn`: for subtle entrance from right
- `scroll-logos`: used for continuous logo scrolling

Framer Motion patterns (JS animated elements):
- Components using `framer-motion`: `ContactCta`, `NotFound`, `PartnerHub`, `Team`, `ContactCta` etc.
- Frequently used patterns:
  - `initial` / `animate` / `transition` with durations 0.4–0.8s
  - `whileInView` + `viewport={{ once: true }}` for entrance when element scrolls into view
  - `whileHover` and `whileTap` for interactive scaling (CTAs)
  - Repeating background orbs animated with `animate={{ y: [0, -30, 0], x: [...] }}` and `transition: { duration, repeat: Infinity }

Custom shadows and glass effects:
- `.nav` uses `backdrop-filter: blur(12px)` plus `border-bottom: 1px solid var(--border-color)` for a translucent app shell.
- `--shadow-sm` and `--shadow-md` are the canonical elevation tokens; avoid arbitrary shadow values.

---

## 3. Page & Section Breakdown

Below is an exhaustive (component-by-component and section-by-section) breakdown for pages present in the repository.

Note: where a section is a standalone component (e.g., `Hero`, `Products`), that component is documented in place.

### Home (`src/pages/Home.tsx`)
- Purpose: marketing landing page — communicate product value, trust signals, product overview, metrics, and contact lead capture.
- Major sections in order:
  1. PageSeo (meta + JSON-LD)
  2. `Hero` (component)
  3. `TrustedSection` (logos carousel)
  4. `Products` (component with tabs)
  5. `Stats` (metrics)
  6. `Features` (feature list)
  ---
  7. `Contact` (contact form)

#### Hero (`src/components/Hero.tsx`)
- Purpose: first impression, core value proposition, CTA.
- Layout: full-width centered content; `maxWidth: 1000px`; uses inline styles for responsive font sizes via `clamp()` for heading (`clamp(32px, 5vw, 56px)`)
- Mobile vs Desktop: font sizes scale with viewport, hero badge stacks above heading; hero uses `display:flex` and centers content
- Key elements: badge (inline pill), H1 with accent span (green), descriptive paragraph, call-to-action buttons (primary & secondary), trust indicators (AppExchange badge)
- Animations: CSS `fadeInDown` and `pulse` on small badge dot; hero buttons have subtle transitions

#### TrustedSection
- Purpose: trust logos to establish credibility
- Layout: horizontal scroller/loop (marquee) with `.animate-marquee` and `scroll-logos` animation
- Elements: logos from `src/assets/TrustedPartner` and `TrustedEnterprise`
- Responsiveness: wraps on small screens

#### Products (`src/components/Products.tsx`)
- Purpose: showcase product suite with tabbed content
- Layout: left-side tab list (buttons) + right-side content area (image + two-column grid)
- Responsiveness: mobile stacks tabs vertically; desktop uses two-column grid (`gridTemplateColumns: "1.2fr 1fr"` in product content)
- Key elements: tab buttons (`.tab-btn`), product image (uses `loading="eager"` and `fetchPriority="high"` for above-the-fold), features list
- Animations: content area uses `fadeIn` CSS

#### Stats
- Purpose: display trust/traction metrics
- Layout: grid or flex list of number + label; responsive 1–3 columns depending on breakpoint
- Elements: numeric counters, headings, small supporting copy

#### Features
- Purpose: list product capabilities and value differentiators
- Layout: card grid that collapses to single column on small screens
- Animations: subtle fade and slide in on entrance

#### Contact (component reused on Home and its own page)
- Purpose: lead capture
- Layout: two-column grid — contact info (left) + form (right) with `gridTemplateColumns: "1fr 1.2fr"` on desktop and single column stack on mobile
- Elements: input fields (name, email, phone, company, product select, message), RecaptchaBadge, Google Maps iframe, validation messages
- Validation: client-side validators for email format and phone digits (7–15 digits). Form prevents submit until reCAPTCHA token is acquired.
- Submission: `fetch` POST to `VITE_LEAD_SUBMIT_URL` with `recaptchaToken` + form values
- Errors: show inline errors and a `submitError` block for server errors (403 treated distinctly with messaging)

### Partner Hub (`src/pages/PartnerHub.tsx`)
- Purpose: partner program details and application form
- Sections:
  - Hero-like top with page title + description (managed by `PageSeo` and inlined JSON-LD)
  - Why Partner (feature list with icons)
  - Trusted partners carousel/grid (logos)
  - Application form (very similar validation and flow to Contact)
  - Contact CTA (reused `ContactCta`)
- Layout:
  - Grids for content/cards and a partners logo grid; responsive breakpoints reduce columns on small screens
- Animations: uses `framer-motion` for card/element entrance and subtle background orbs

### Team, PrivacyPolicy, TermsOfService, NotFound
- Team (`src/pages/Team.tsx`) — team bios, advisory board; layout is responsive card grid.
- Privacy & Terms — static content pages with readable typographic scale; `PageSeo` included.
- NotFound (`src/pages/NotFound.tsx`) — large 404 heading, CTAs back home; uses `framer-motion` to animate 404 block entrance.

### Small UI modules (reused)
- `PageSeo` — encapsulates meta tags and Open Graph tags. Use absolute URLs for `og:image`.
- `CanonicalManager` — updates the `<link rel="canonical">` in `index.html`.
- `RobotsManager` — injects a restrictive `robots` meta when not in production (reads `VITE_APP_ENV || import.meta.env.MODE || "development"`). Keep this working to avoid staging indexing.
- `StructuredData` — inlined JSON-LD injection for `Organization`, `WebSite`, `WebPage` types. It appends script tags into `document.head` using `useEffect`.

---

## 4. Global Layouts & Navigation

### Navbar (behavior & structure)
- Sticky app shell: `position: sticky; top: 0; z-index: 100; background: rgba(255,255,255,0.97); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border-color); height: 70px;`
- Elements:
  - Logo: left-aligned `<img className="nav-logo" />` — `height: 90px` on desktop and `52px` on mobile
  - Nav links: `ul.nav-menu` — gap 28px desktop, gap 12px mobile
  - Book Demo CTA: `.btn-demo` (primary small CTA)
  - Mobile hamburger: toggles `isMenuOpen` state and conditionally renders a `mobile-menu-overlay` with links stacked vertically
- Anchor/hash navigation handling:
  - Links with hashes call `handleLinkClick` which smooth-scrolls to target element with offset `70px` if on same path; otherwise uses `navigate(targetPath, { state: { scrollTo: hash } })`
- Active state highlighting:
  - There is no explicit code setting an `active` class on nav items; hover uses CSS to change color to `var(--primary-green)`

### Footer
- Dark background: `background: var(--navy); color: rgba(255,255,255,0.85); paddingTop: 60; paddingBottom: 32; borderTop: 1px solid rgba(255,255,255,0.08)`
- Grid layout: `gridTemplateColumns: "2.5fr 1fr 1fr 1.5fr"` with gap 60px on desktop; stack/wrap on small screens
- Columns:
  - Brand + description + Salesforce partner badge
  - Products links (internal)
  - Company links (internal + external)
  - Contact info block
- Footer bottom: copyright + links to privacy/terms

---

## Appendix — Implementation & Coding Conventions
- Internal navigation: always use `<Link to="...">` from `react-router-dom` for internal links. When handling hash navigation, use the `handleLinkClick` helper pattern that cleanly scrolls and sets `state.scrollTo` when navigating.
- Scripts: reCAPTCHA script is injected by `useRecaptcha` into `document.body` with `async` and `defer` attributes and `onload` handler.
- Lazy loading: use `React.lazy(() => import("..."))` + `<Suspense fallback={null}>` for below-the-fold sections (Home page uses this pattern).
- Prefetches: fonts are preloaded in `index.html` using `<link rel="preload" as="font" crossorigin>`; some images use `fetchPriority="high"`.

---

