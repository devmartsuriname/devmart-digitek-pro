# Product Requirements Document (PRD)

**Project:** Devmart Digtek Pro  
**Owner:** Devmart Suriname (Delroy Pelhan)  
**Repo:** [https://github.com/devmartsuriname/devmart-digitek-pro](https://github.com/devmartsuriname/devmart-digitek-pro)  
**Frontend Template:** **Digtek – Digital Marketing Agency ReactJs Template** (Home‑3)  
**Platform:** Lovable (React + Tailwind + Supabase by default)  
**Goal:** A modular, performant, migration‑friendly marketing website + admin CMS to power Devmart's digital presence and lead generation.

---

## 1) Executive Summary

Devmart Digtek Pro is a modern, responsive website and admin dashboard built on Lovable using the **Digtek React template (Home‑3)** for pixel‑perfect UI. The system is modular to enable rapid iteration, safe feature expansion, and future migration without vendor lock‑in. The website showcases services, portfolio, blog, and contact; the admin dashboard manages content via a lightweight CMS with role‑based access.

---

## 2) Objectives & KPIs

**Objectives**

1. Present Devmart as a premium, modern digital agency.
2. Generate qualified leads via optimized CTAs and forms.
3. Enable non‑technical content updates through an admin CMS.
4. Ensure fast performance and SEO best practices from day one.
5. Keep architecture migration‑ready (no hard vendor lock‑in).

**KPIs**

* Lighthouse: Perf ≥ 90, SEO ≥ 95, Access ≥ 95, Best Practices ≥ 90
* Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms
* Conversion: ≥ 3% website → lead form submission
* TTFB < 300ms (CDN enabled), First Contentful Paint < 1.5s
* Admin task success (non‑tech): publish/edit in < 5 minutes

---

## 3) Scope

### In Scope

* Public website (Home‑3 UI), Services, Portfolio, Blog, About, Contact
* Admin CMS (left nav sidebar) to manage Services, Projects, Blog, Team, FAQ, Settings
* Lead capture via Contact & CTA forms + storage + email notification
* SEO (meta, OG/Twitter, JSON‑LD) + Sitemap + Robots
* Analytics & events
* Role‑based access (Admin, Editor, Viewer)

### Out of Scope (Phase 1)

* E‑commerce, user accounts for public visitors, multi‑tenant
* Advanced marketing automation (only hooks/placeholders)
* Translations (optional Phase 2)

---

## 4) Non‑Functional Requirements

* **Performance:** Image optimization, code splitting, lazy loading, SSR/SSG ready
* **Security:** RLS policies (if Supabase), OWASP‑A‑aware forms, rate limiting on submissions
* **Accessibility:** WCAG 2.1 AA; keyboard support; aria labels
* **SEO:** Clean URLs, canonical, schema.org, structured data
* **Observability:** Basic error boundaries, telemetry hooks
* **Migration‑friendly:** Strict separation of UI, domain models, and data access (ports/adapters). No template‑logic inside server calls. Abstract provider clients.

---

## 5) Technology Choices

* **Frontend:** React + Vite, Tailwind CSS, shadcn/ui (only for admin where needed), Framer Motion (animations), Recharts (admin metrics)
* **Template:** **Digtek React Home‑3** – **copy 1:1 pixel‑perfect. No redesign, no deviations.**
* **Backend (Lovable default):** Supabase (Postgres, RLS, Auth) – abstract via a Repository layer to allow later swap to another DB (PlanetScale/MySQL, Mongo, REST/GraphQL)
* **API Layer:** Type‑safe services with adapters per provider (e.g., `db/*Repository.ts`)
* **Forms:** React Hook Form + Zod validation
* **Image/CDN:** Cloudinary/Imgix or Supabase Storage with optimization policy
* **Analytics:** Plausible (decision applied)
* **Email:** Resend (decision applied)
* **CI/CD:** GitHub Actions; Vercel/Netlify (preview) + Hostinger VPS (final)
* **Docs:** `/docs/architecture.md`, `/docs/backend.md`, `/docs/changelog.md`

---

## 6) Information Architecture (Public)

* **/** Home (Home‑3)
* **/about** About Devmart
* **/services** Services Overview
  * **/services/web-development**
  * **/services/app-development**
  * **/services/graphic-design**
  * **/services/seo-marketing**
* **/portfolio** Projects grid
  * **/portfolio/:slug** Project detail
* **/blog** Articles list
  * **/blog/:slug** Article detail
* **/team** Team list
  * **/team/:slug** Team member detail
* **/pricing** Pricing page (included in Phase 1)
* **/faq**
* **/contact**

---

## 7) Home (Landing) – **Digtek Home‑3**

**Authoritative Instruction:** The **Digtek – Digital Marketing Agency ReactJs Template** is **already React**. **Copy the Home‑3 page and components 1:1 pixel perfect** from the demo. **Do not build a custom design. Do not deviate.**

**Sections (as per Home‑3 demo):**

1. **Hero (exact same)** – headline, subheadline, primary CTA(s), hero visual/illustration, trust badges/logos
2. **Services Highlights** – 3‑6 service cards with icons
3. **About/Why Us** – short value proposition + key stats
4. **Process/How We Work** – step blocks
5. **Selected Projects** – portfolio teaser grid
6. **Testimonials** – slider/cards
7. **Blog Teaser** – latest 3 posts
8. **CTA Banner** – contact/estimate
9. **Footer** – links, social, contacts

**Content mapping:** Use the Devmart content library (see "Devmart Digtek Mapping").

---

## 8) UX/UI Design – Special Instruction (Lovable GitHub Method)

* GitHub repo is **created**: `devmartsuriname/devmart-digitek-pro`.
* **Method:** Use the **GitHub Method for Lovable**. Import/commit the **Digtek template**; then implement modules.
* **STRICT:** The template is already React → **copy file structure and styles 1:1** (pixel perfect).
* **Backend UI/UX:** Build an **Admin Dashboard** with a **left navigation sidebar**, modern professional style, aligned with Digtek colors/typography. Reuse template tokens where possible.

**Housekeeping (always):**

* Update `/docs/backend.md` and `/docs/architecture.md` with each step
* Maintain `/docs/changelog.md`

---

## 9) Admin CMS (Dashboard)

**Layout:** Left sidebar navigation, top header (search, user menu), content area with cards/tables/forms.
**Roles:** Admin, Editor, Viewer.

**Modules:**

1. **Dashboard** – KPIs (total projects, published blog posts, active services, leads), recent activity
2. **Services** – CRUD categories & services; fields: title, slug, summary, body (rich), icon, SEO, order
3. **Projects/Portfolio** – CRUD projects; fields: title, slug, client, date, cover, gallery, tech stack, summary, body, links, SEO, featured
4. **Blog** – CRUD posts; fields: title, slug, author, date, cover, tags, summary, body (MDX), SEO, featured
5. **Team** – CRUD members; fields: name, slug, role, bio, photo, socials, order
6. **FAQ** – CRUD QA; fields: question, answer, category, order
7. **Media** – Storage browser (bucket/folder), image presets, alt text
8. **Leads** – view/export contact submissions, mark as contacted
9. **Settings** – site meta, branding, navigation, social, analytics keys, mail provider, contact info

**Admin Checklists (per module)**

* **List page:** searchable, sortable, paginated, bulk actions, empty state
* **Create/Edit form:** Zod validation, preview, save states, autosave (optional), toast feedback
* **Permissions:** Admin full; Editor no destructive settings; Viewer read‑only
* **RLS (if Supabase):** row‑level policies per role
* **Audit:** created_by, updated_by, timestamps; optional activity log
* **SEO:** title, description, open graph; slugs unique
* **Images:** upload with automatic responsive sizes; alt text required
* **Publishing:** draft/published; schedule optional (Phase 2)

---

## 10) Data Model (Initial)

**services**(id, slug*, title, summary, body, icon_url, seo_title, seo_desc, order_num, status, created_by, updated_by, created_at, updated_at)  
**projects**(id, slug*, title, client, date, cover_url, gallery[], tech[], summary, body, seo_title, seo_desc, featured, status, created_by, updated_by, created_at, updated_at)  
**blog_posts**(id, slug*, title, author_id, date, cover_url, tags[], summary, body_mdx, seo_title, seo_desc, featured, status, views, created_by, updated_by, created_at, updated_at)  
**team**(id, slug*, name, role, bio, photo_url, socials jsonb, order_num, created_by, updated_by, created_at, updated_at)  
**faqs**(id, category, question, answer, order_num, created_by, updated_by, created_at, updated_at)  
**media**(id, url, alt, width, height, type, created_at)  
**leads**(id, name, email, phone, subject, message, source, status, created_at)  
**settings**(id/singleton, site_name, logo_url, theme, primary_color, contact_email, social jsonb, analytics jsonb)

> Migration‑friendly note: expose all CRUD via typed repositories; never import provider SDKs directly in UI components.

---

## 11) APIs & Integration

* Repository pattern: `src/lib/repos/*` (db‑agnostic).
* DTOs & Zod schemas: `src/lib/schemas/*`.
* Services layer: `src/lib/services/*` (business logic).
* Storage: `src/lib/storage/*` (adapter for Supabase/Cloudinary).
* Email: `src/lib/email/*` (Resend adapter).
* Analytics: `src/lib/analytics/*` (Plausible adapter).

---

## 12) Routing & SEO

* Human‑readable slugs
* `SEOHead` component for meta + JSON‑LD (Organization, Service, Article, CreativeWork, Website, WebPage)
* XML sitemap generation + robots.txt
* 404/500 pages styled as per Digtek

---

## 13) Content & Media Guidelines

* Image aspect ratios: hero 16:9, cards 4:3, avatars 1:1
* WebP preferred, JPEG fallback; lazy load all non‑critical
* Alt text mandatory; captions optional
* Copy tone: modern, clear, professional; avoid jargon

---

## 14) Project Plan & Priorities

**Phase 0 – Setup (P0)**

* [x] Import Digtek React **Home‑3** into repo (1:1 pixel perfect)
* [x] Base routing for public pages
* [x] Global styles/tokens matched to Digtek
* [ ] Lint, Prettier, Husky, commitlint
* [ ] CI (build + preview)

**Phase 1 – Public Site (P1)**

* [x] Home (Home‑3 exact)
* [x] About
* [x] Services list + details
* [x] Portfolio grid + detail
* [x] Blog list + detail (MDX)
* [x] Team list + detail
* [x] FAQ
* [x] Contact + lead capture
* [x] Pricing (included per decision)
* [ ] SEO (meta, OG, JSON‑LD) + sitemap/robots

**Phase 2 – Admin CMS (P2)**

* [ ] Admin shell (left sidebar, header, auth gates)
* [ ] Services CRUD
* [ ] Projects CRUD + media gallery
* [ ] Blog CRUD (MDX editor)
* [ ] Team CRUD
* [ ] FAQ CRUD
* [ ] Leads inbox + export
* [ ] Settings

**Phase 3 – Performance & Polish (P3)**

* [ ] Code splitting, route‑level suspense
* [ ] Image optimization (LQIP hero)
* [ ] Accessibility pass (WCAG AA)
* [ ] Analytics events + conversion goals
* [ ] Error boundaries & logging
* [ ] Final Lighthouse targets met

---

## 15) Detailed Checklists by Module (Build‑Order)

### A. Home (Home‑3) – **STRICT 1:1 COPY**

* [x] Import sections exactly as demo (DOM structure, classes)
* [x] Replace text/media via content source; keep layout intact
* [x] Verify breakpoints & animations
* [ ] LCP friendly hero (preload main image)
* [ ] CTAs wired to Contact/Services

### B. Services

* [x] `/services` grid from template cards
* [x] Detail page template with TOC, highlights
* [ ] SEO fields + slugs
* [ ] Admin CRUD + order/sort
* [ ] Cross‑links to portfolio/blog

### C. Portfolio

* [x] Grid + filters (tags/tech)
* [x] Detail layout (cover, gallery, result metrics)
* [ ] Admin CRUD + featured flag
* [ ] SEO + OpenGraph
* [ ] Link back to services

### D. Blog

* [x] List with pagination
* [x] Detail (MDX) + reading progress
* [ ] Admin CRUD; draft/publish
* [ ] SEO + schema Article
* [ ] Related posts

### E. Team

* [x] List grid
* [x] Detail (bio, socials)
* [ ] Admin CRUD
* [ ] Ordering

### F. FAQ

* [x] Accordion per category
* [ ] Admin CRUD
* [ ] Search

### G. Contact & Leads

* [x] Form with Zod validation, honeypot
* [ ] Store to `leads`; email notify
* [ ] Admin leads inbox; export CSV
* [ ] Rate limit + privacy note

### H. Settings

* [ ] Site meta, navigation, social, analytics
* [ ] Theme variables (tokens)
* [ ] Upload logos/icons

---

## 16) Acceptance Criteria

* [x] **Pixel‑perfect parity** with Digtek Home‑3 on public site
* [ ] All CRUD modules functional with RLS & roles
* [ ] Lighthouse & CWV targets achieved
* [ ] Admin users can publish content without dev support
* [ ] Docs updated; reproducible install via README

---

## 17) Risks & Mitigations

* **Template drift** → Strict code review for pixel‑parity
* **Vendor lock‑in** → Repositories/adapters, no SDKs in UI
* **Performance regressions** → CI Lighthouse checks
* **Content sprawl** → Governance, roles, review flow

---

## 18) Go‑Live Plan

* Staging on Vercel; domain on Hostinger VPS + reverse proxy/CDN
* Content seeding; redirects; UTM tracking verified
* Post‑launch monitoring & hotfix window (72h)

---

## 19) Final Implementation Notes (for Lovable)

1. The **Digtek React Template is already in React**. **Copy files 1:1** from the demo (Home‑3).
2. **Do NOT** invent new designs, classes, or spacing. **No deviations.**
3. Admin dashboard must reuse Digtek tokens/colors and use a **left sidebar** layout.
4. Keep data access through repositories; avoid direct SDK in components.
5. After each step:
   * Update `/docs/backend.md` and `/docs/architecture.md` with the changes from this step
   * Append to `/docs/changelog.md`
6. Await further instructions before expanding scope.

---

## Decisions Applied

* **Pricing Page:** Included in Phase 1
* **Analytics Provider:** Plausible
* **Email Provider:** Resend
* **Content Strategy:** Seed with placeholder content

---

**Status:** Phase 0 Documentation Complete ✅
