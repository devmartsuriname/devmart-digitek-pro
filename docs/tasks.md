# Task Breakdown – Devmart Digtek Pro

**Project:** Devmart Digtek Pro  
**Template:** Digtek React Home-3 (pixel-perfect implementation)  
**Backend:** Lovable Cloud (Supabase)  
**Decisions:** Plausible Analytics | Resend Email | Pricing in Phase 1 | Seed Content

---

## Phase 0: Documentation & Foundation ✅

### 0.1 Documentation Structure
- [x] Create `/docs/PRD.md` with complete requirements
- [x] Create `/docs/tasks.md` with phase breakdowns
- [x] Create `/docs/backend.md` for schema & RLS
- [x] Create `/docs/architecture.md` for ports/adapters
- [x] Create `/docs/restore-point.md` for baseline state
- [x] Create `/docs/changelog.md` for version tracking
- [x] Create `/docs/deployment.md` for deployment plan
- [x] Create `/docs/content-mapping.md` for Devmart content
- [x] Commit documentation to repo

### 0.2 Migration-Ready Architecture Setup
- [ ] Create `src/lib/repos/` folder for repository interfaces
- [ ] Create `src/lib/services/` folder for business logic
- [ ] Create `src/lib/schemas/` folder for Zod DTOs
- [ ] Create `src/lib/adapters/` folder for provider implementations
  - [ ] `adapters/supabase/` for Supabase adapter
  - [ ] `adapters/mock/` for dev/testing
- [ ] Create `src/lib/storage/` folder for storage adapter
- [ ] Create `src/lib/email/` folder for email adapter (Resend)
- [ ] Create `src/lib/analytics/` folder for analytics adapter (Plausible)
- [ ] Define base repository interfaces:
  - [ ] `IServiceRepository.ts`
  - [ ] `IProjectRepository.ts`
  - [ ] `IBlogRepository.ts`
  - [ ] `ITeamRepository.ts`
  - [ ] `IFAQRepository.ts`
  - [ ] `ILeadRepository.ts`
  - [ ] `ISettingsRepository.ts`
  - [ ] `IMediaRepository.ts`

### 0.3 Environment & Config Setup
- [ ] Create `.env.example` with all required keys
- [ ] Create `src/lib/config.ts` for centralized config
- [ ] Add provider toggle logic (email, analytics, storage)
- [ ] Document environment variables in README

---

## Phase 1: Backend Setup & Authentication

### 1.1 Lovable Cloud Connection
- [ ] Enable Lovable Cloud in project settings
- [ ] Initialize Supabase client in `src/integrations/supabase/client.ts`
- [ ] Test connection with simple query
- [ ] Update `/docs/backend.md` with connection details

### 1.2 Database Schema & Migrations
- [ ] Create `services` table with fields:
  - id, slug (unique), title, summary, body, icon_url
  - seo_title, seo_desc, order, status (draft/published)
  - created_at, updated_at
- [ ] Create `projects` table with fields:
  - id, slug (unique), title, client, date, cover_url
  - gallery (jsonb), tech (text[]), summary, body
  - seo_title, seo_desc, featured, status, created_at, updated_at
- [ ] Create `blog_posts` table with fields:
  - id, slug (unique), title, author_id (fk), date, cover_url
  - tags (text[]), summary, body_mdx, seo_title, seo_desc
  - featured, status, views, created_at, updated_at
- [ ] Create `team` table with fields:
  - id, slug (unique), name, role, bio, photo_url
  - socials (jsonb), order, created_at, updated_at
- [ ] Create `faqs` table with fields:
  - id, category, question, answer, order, created_at, updated_at
- [ ] Create `media` table with fields:
  - id, url, alt, width, height, type, folder, created_at
- [ ] Create `leads` table with fields:
  - id, name, email, phone, subject, message
  - source, status (new/contacted/closed), created_at
- [ ] Create `settings` table (singleton) with fields:
  - id, site_name, logo_url, theme, primary_color
  - contact_email, contact_phone, social (jsonb)
  - analytics (jsonb), meta_title, meta_desc
- [ ] Add unique constraints on all slug fields
- [ ] Add check constraints for status fields
- [ ] Add indexes on slug, status, featured, date fields
- [ ] Update `/docs/backend.md` with schema details

### 1.3 Row-Level Security (RLS) Policies
- [ ] Create `app_role` enum (admin, editor, viewer)
- [ ] Create `profiles` table:
  - id (fk to auth.users), full_name, avatar_url
  - created_at, updated_at
- [ ] Create `user_roles` table:
  - id, user_id (fk to auth.users), role (fk to app_role)
  - unique(user_id, role)
- [ ] Create trigger for auto-creating profile on signup
- [ ] Create `has_role()` security definer function
- [ ] Apply RLS policies to all tables:
  - **Public read:** Published content for anon/authenticated
  - **Admin full:** All operations for admin role
  - **Editor edit:** Update draft content for editor role
  - **Viewer read:** Read-only for viewer role
- [ ] Test RLS with different role levels
- [ ] Update `/docs/backend.md` with RLS policies

### 1.4 Storage Buckets & Policies
- [ ] Create `project-covers` bucket (public)
- [ ] Create `blog-covers` bucket (public)
- [ ] Create `team-photos` bucket (public)
- [ ] Create `media-library` bucket (public)
- [ ] Set RLS policies for authenticated uploads
- [ ] Create storage adapter in `src/lib/storage/`
- [ ] Update `/docs/backend.md` with bucket details

### 1.5 Authentication System
- [ ] Create `/auth` route and page component
- [ ] Build Login/Signup tabs with Digtek styling
- [ ] Add email + password forms with Zod validation
- [ ] Implement `useAuth` hook with session management
- [ ] Add `supabase.auth.onAuthStateChange` listener
- [ ] Create protected route wrapper component
- [ ] Add logout functionality to header
- [ ] Configure email redirect URLs
- [ ] Test auth flow (signup → login → logout)
- [ ] Update `/docs/changelog.md`

---

## Phase 2: Admin CMS - Dashboard Shell

### 2.1 Admin Layout with Left Sidebar
- [ ] Create nested `/admin` route structure
- [ ] Create `AdminLayout.jsx` component with:
  - Left sidebar navigation (collapsible)
  - Top header (breadcrumbs, search, user menu)
  - Content area with max-width container
- [ ] Style with Digtek colors (theme: #6A47ED, theme2: #C6F806)
- [ ] Add sidebar navigation items:
  - Dashboard, Services, Projects, Blog, Team
  - FAQ, Media, Leads, Settings
- [ ] Implement role-based navigation visibility
- [ ] Create `ProtectedRoute` wrapper with role checks
- [ ] Add loading states and skeletons
- [ ] Add empty states with CTAs
- [ ] Update `/docs/architecture.md`

### 2.2 Dashboard (Home) Page
- [ ] Create `Dashboard.jsx` component
- [ ] Add stats cards:
  - Total Services (published)
  - Total Projects (published)
  - Total Blog Posts (published)
  - Total Leads (by status)
- [ ] Add charts (Recharts):
  - Blog posts by month (last 6 months)
  - Leads by status (pie chart)
- [ ] Add recent activity section:
  - Latest 5 leads
  - Latest 3 blog posts
- [ ] Add quick action buttons
- [ ] Fetch data via repositories
- [ ] Update `/docs/changelog.md`

---

## Phase 3: Admin CMS - Content Modules

### 3.1 Services CRUD
- [ ] Create `ServicesList.jsx` (list page):
  - Table with title, status, order, actions
  - Search by title
  - Sort by order, title, date
  - Bulk actions (publish, draft, delete)
  - "Add Service" button
- [ ] Create `ServiceForm.jsx` (create/edit):
  - Fields: title, slug, summary, body (rich text)
  - Icon URL, SEO title, SEO description, order, status
  - Zod validation
  - Preview mode
  - Save states with toast feedback
- [ ] Implement `SupabaseServiceRepository`
- [ ] Apply RLS policies
- [ ] Test CRUD operations with different roles
- [ ] Update `/docs/backend.md`

### 3.2 Projects CRUD
- [ ] Create `ProjectsList.jsx` (list page)
- [ ] Create `ProjectForm.jsx` (create/edit):
  - Additional fields: gallery upload, tech stack
  - Client name, project date, featured toggle
  - External links (project URL, GitHub URL)
- [ ] Implement gallery drag-drop ordering
- [ ] Implement `SupabaseProjectRepository`
- [ ] Apply RLS policies
- [ ] Test CRUD operations
- [ ] Update `/docs/backend.md`

### 3.3 Blog CRUD
- [ ] Create `BlogList.jsx` (list page)
- [ ] Create `BlogForm.jsx` (create/edit):
  - MDX editor (TipTap or ReactQuill)
  - Tags (multi-select chips with auto-complete)
  - Author dropdown, cover image upload
  - Featured toggle, publish date
  - Auto-calculate reading time
- [ ] Implement `SupabaseBlogRepository`
- [ ] Create public blog detail page with:
  - MDX rendering
  - Reading progress bar
  - Share buttons (Twitter, LinkedIn, Facebook)
  - Related posts (same tags)
- [ ] Apply RLS policies
- [ ] Test CRUD operations
- [ ] Update `/docs/backend.md`

### 3.4 Team CRUD
- [ ] Create `TeamList.jsx` (list page)
- [ ] Create `TeamForm.jsx` (create/edit):
  - Fields: name, slug, role, bio
  - Photo upload, socials (JSON), order
- [ ] Implement order drag-drop
- [ ] Implement `SupabaseTeamRepository`
- [ ] Apply RLS policies
- [ ] Test CRUD operations
- [ ] Update `/docs/backend.md`

### 3.5 FAQ CRUD
- [ ] Create `FAQList.jsx` (list page)
- [ ] Create `FAQForm.jsx` (create/edit):
  - Fields: category, question, answer (rich text), order
- [ ] Add accordion preview
- [ ] Add search by question
- [ ] Implement `SupabaseFAQRepository`
- [ ] Apply RLS policies
- [ ] Test CRUD operations
- [ ] Update `/docs/backend.md`

### 3.6 Media Library ✅ COMPLETE (v0.11.0)
- [x] Create `MediaLibrary.jsx` with:
  - Grid view of all uploads
  - Drag-drop upload
  - Alt text editing
  - Folder organization
  - Copy URL button
  - Delete with confirmation
  - Filters (type, folder)
- [x] Implement `SupabaseMediaRepository`
- [x] Integrate with Supabase Storage
- [x] Apply RLS policies (read, insert, delete, update)
- [x] Update `/docs/backend.md`

### 3.7 Leads Inbox ✅ COMPLETE (v0.12.0)
- [x] Create `LeadsList.jsx` with:
  - Table: name, email, phone, subject, source, status, date
  - Status toggle (new → contacted → closed)
  - Export to CSV
  - Search/filter by status, name, email, subject
  - Expandable rows for full message
  - Lead detail modal
- [x] Implement `SupabaseLeadRepository`
- [x] Create `useLeads` hook with status management
- [x] Create public contact form:
  - Fields: name, email, phone, subject, message
  - Honeypot field (hidden, anti-spam)
  - Zod validation
  - Rate limiting (client-side: 1 per 5 min per session)
  - Privacy notice
  - Success/error handling
- [x] Apply RLS policies
- [x] Test lead capture flow
- [x] Update `/docs/backend.md`
- [x] Update `/docs/changelog.md`
- [ ] Email notification to admin (requires RESEND_API_KEY - Phase 3)
- [ ] Server-side rate limiting (IP-based - Phase 3)

### 3.8 Settings ✅
- [x] Create `Settings.jsx` with tabs:
  - [x] General: site name, meta title, meta description
  - [x] Branding: logo URL, primary color, theme
  - [x] Social: Facebook, Twitter, LinkedIn, Instagram, YouTube URLs
  - [x] Analytics: Plausible site ID, Google Analytics ID
  - [x] Contact: email, phone
- [x] Implement `SupabaseSettingsRepository`
- [x] Create `useSettings` hook
- [x] Add save per tab with Zod validation
- [x] Create ColorPicker utility component
- [x] Apply RLS policies (admin only)
- [x] Test settings structure (ready for manual testing)
- [x] Update `/docs/backend.md`
- [x] Update `/docs/changelog.md`
- [x] Create `/docs/tasks-phase-2.8.md`

---

## Phase 4: SEO Implementation

### 4.1 SEO Head Component
- [ ] Create `SEOHead.tsx` component with props:
  - title, description, canonical, ogImage, ogType
  - article metadata (publishedTime, author, tags)
  - jsonLd schema
- [ ] Generate JSON-LD schemas:
  - Organization (homepage)
  - WebPage (all pages)
  - Service (service detail)
  - Article (blog post)
  - CreativeWork (project detail)
  - BreadcrumbList (all pages)
- [ ] Add OpenGraph and Twitter Card tags
- [ ] Add canonical URLs
- [ ] Integrate with all public pages
- [ ] Update `/docs/architecture.md`

### 4.2 Sitemap & Robots.txt
- [ ] Generate XML sitemap from database:
  - Services, projects, blog posts, static pages
- [ ] Add priority and changefreq per page type
- [ ] Create `/sitemap.xml` route
- [ ] Create `/robots.txt` with sitemap reference
- [ ] Test sitemap in Google Search Console
- [ ] Update `/docs/changelog.md`

---

## Phase 5: Performance & Polish

### 5.1 Performance Optimization
- [ ] Implement image optimization:
  - Lazy load all below-fold images
  - Use `loading="lazy"` attribute
  - Generate responsive variants (Supabase transform)
  - Add LQIP for hero images
- [ ] Implement code splitting:
  - Route-level lazy loading with React.lazy
  - Suspense boundaries with loading skeletons
- [ ] Optimize bundle:
  - Analyze bundle size (vite-bundle-visualizer)
  - Tree-shake unused Bootstrap components
  - Replace react-slick if lighter alternative exists
- [ ] Run Lighthouse audits
- [ ] Update `/docs/changelog.md`

### 5.2 Accessibility (WCAG 2.1 AA)
- [x] Add skip to content links (both layouts)
- [x] Add ARIA labels for interactive elements (search, buttons, navigation)
- [x] **Icon-only buttons: Added aria-label to 50+ buttons (Step 1 complete)**
  - [x] All table action buttons (edit, delete)
  - [x] Media grid buttons (copy URL, edit, delete)
  - [x] Form utility buttons (slug regenerate)
  - [x] Modal utility buttons (copy email)
  - [x] Toggle/expand buttons (leads table)
- [x] Add focus indicators (custom styles with theme colors)
- [x] Add landmark roles (main, banner, navigation, dialog, search)
- [x] Implement reduced motion support
- [x] Convert interactive elements to proper semantic HTML (button vs a)
- [x] **Modal focus traps (Step 2 complete)**
  - [x] Installed `focus-trap-react` dependency
  - [x] MediaEditModal: FocusTrap, Esc key, focus restoration
  - [x] LeadDetailModal: Esc key handler, ARIA attributes
  - [x] MDXPreview: FocusTrap, Esc key, focus restoration
  - [x] All modals have role="dialog" and aria-modal="true"
  - [x] Focus returns to trigger element on close
- [ ] Test keyboard navigation (tab order in forms)
- [ ] Complete ARIA implementation (aria-describedby, aria-live)
- [ ] Check color contrast (≥4.5:1 for all text)
- [ ] Test with screen reader (NVDA/VoiceOver)
- [ ] Run accessibility audit (Lighthouse + axe DevTools)
- [x] Update `/docs/changelog.md` (Step 2 modal focus traps)

### 5.3 Analytics & Events
- [ ] Add Plausible analytics script
- [ ] Track conversion events:
  - Contact form submission
  - CTA clicks
  - Service page views
  - Project detail views
  - Blog post reads (scroll depth)
- [ ] Add custom events via adapter
- [ ] Test event tracking
- [ ] Update `/docs/analytics.md` (create if needed)

### 5.4 Error Handling
- [ ] Create React Error Boundaries
- [ ] Create 404 page styled as Digtek
- [ ] Create 500 page for server errors
- [ ] Add toast notifications for form errors
- [ ] Add retry logic for failed API calls
- [ ] Test error scenarios
- [ ] Update `/docs/changelog.md`

---

## Phase 6: Testing & Deployment

### 6.1 Testing
- [ ] Manual testing per module checklist (PRD Section 15)
- [ ] Lighthouse audits (Perf ≥90, SEO ≥95, A11y ≥95, BP ≥90)
- [ ] Core Web Vitals (LCP <2.5s, CLS <0.1, INP <200ms)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsive testing (iPhone, Android)
- [ ] Role-based access testing (Admin, Editor, Viewer)
- [ ] Update `/docs/changelog.md`

### 6.2 Content Seeding
- [ ] Create seed scripts for:
  - 4-6 Services (Web Dev, App Dev, Graphic Design, SEO)
  - 8-12 Projects (diverse portfolio)
  - 10-15 Blog posts (industry topics)
  - 8-10 Team members
  - 10-15 FAQs (common questions)
  - Site settings (Devmart info)
- [ ] Run seed script in admin panel or via migration
- [ ] Verify all content displays correctly
- [ ] Update `/docs/content-mapping.md`

### 6.3 Deployment
- [ ] Set up staging on Vercel:
  - Connect GitHub repo
  - Configure auto-deploy on push
  - Enable preview URLs for branches
- [ ] Set up production on Hostinger VPS:
  - Configure reverse proxy (Nginx/Caddy)
  - Set up SSL with Let's Encrypt
  - Configure CDN (Cloudflare)
  - Set environment variables
  - Set up CI/CD pipeline (GitHub Actions)
- [ ] Test staging deployment
- [ ] Test production deployment
- [ ] Configure custom domain
- [ ] Update `/docs/deployment.md`

---

## Phase 7: Go-Live & Monitoring

### 7.1 Pre-Launch Checklist
- [ ] Final Lighthouse audit
- [ ] Final accessibility audit
- [ ] Verify all forms working
- [ ] Verify email notifications
- [ ] Verify analytics tracking
- [ ] Verify SEO meta tags
- [ ] Test backup/restore
- [ ] Update `/docs/changelog.md`

### 7.2 Launch
- [ ] Deploy to production
- [ ] Point domain to production
- [ ] Submit sitemap to Google Search Console
- [ ] Set up uptime monitoring
- [ ] Set up error tracking (Sentry/Bugsnag)
- [ ] Announce launch
- [ ] Update `/docs/changelog.md`

### 7.3 Post-Launch (72h hotfix window)
- [ ] Monitor error logs
- [ ] Monitor analytics
- [ ] Monitor form submissions
- [ ] Monitor performance metrics
- [ ] Address any critical issues
- [ ] Update `/docs/changelog.md`

---

## Status Tracking

**Current Phase:** Phase 3.1.1 Part B ✅ COMPLETE (SEOHead Dynamic Pages)  
**Next Phase:** Phase 3 Part C (OptimizedImage Migration)  
**Overall Progress:** 63% complete  

**Last Updated:** 2025-01-05 (v0.19.1 - SEOHead Dynamic Pages Complete)

**Phase 3 SEO Status:**
- ✅ 3.1.1 Part A - SEOHead Static Pages (Home, About, Services, Portfolio, Team, Pricing, FAQ, Contact)
- ✅ 3.1.1 Part B - SEOHead Dynamic Pages (Service, Project, Blog, Team detail pages)
- ⏳ 3.1.1 Part C - OptimizedImage Migration (replace hardcoded img tags)
- ⏳ 3.1.1 Part D - Analytics Event Completion (CTA clicks, view tracking)
- ⏳ 3.1.1 Part E - Testing & Documentation (Lighthouse, A11y, docs)

**Phase 2 Module Status:**
- ✅ 2.1 - Admin Dashboard Shell
- ✅ 2.2 - Services CRUD (v0.6.0)
- ✅ 2.3 - Projects CRUD (v0.7.0)
- ✅ 2.4 - Blog CRUD (v0.8.0)
- ✅ 2.5 - Team CRUD (v0.9.0)
- ✅ 2.6 - FAQ CRUD (v0.10.0)
- ✅ 2.7 - Media Library (v0.11.0)
- ✅ 2.8 - Leads Inbox (v0.12.0)
- ✅ 2.9 - Settings (v0.13.0)
- ✅ 2.10 - Frontend Database Integration (v0.15.0)

**Phase 2 Summary:**
- All admin CRUD modules complete
- Repository pattern fully implemented
- RLS policies enforced across all tables
- Type-safe data flow (Zod → Repository → Supabase)
- Professional admin UI with Digtek styling
- Toast notifications and loading states
- Mobile-responsive design
- **All public pages now dynamically fetch from database**
- **Dynamic slug-based routing for detail pages**
- **Loading, error, and 404 handling implemented**
- **Blog author relationship verified complete:**
  - ✅ FK constraint exists: `blog_posts.author_id` → `profiles.id` (ON DELETE SET NULL)
  - ✅ Query syntax fixed (v0.15.3)
  - ✅ Profile name updated (v0.15.4)
  - ✅ Database integrity confirmed (v0.15.5)
- ✅ Phase 2.5 Checklist: **ALL ITEMS COMPLETE**
- Ready for Phase 3 (Performance & SEO optimization)
