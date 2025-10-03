# Changelog – Devmart Digtek Pro

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Phase 1.2 - Database Schema Migration (Next)
- Create database schema with all tables
- Implement RLS policies with role-based access
- Configure storage buckets for images
- Build authentication UI (login/signup)
- Implement repository pattern with adapters

---

## [0.2.2] - 2025-10-03

### Added - Phase 1.1: Backend Initialization Review
- **Backend Documentation Review:**
  - Verified `/docs/backend.md` alignment with PRD Section 10 (Data Model) & Section 11 (APIs & Integration)
  - Confirmed all 10 tables with correct fields, constraints, and indexes
  - Validated 4-tier RLS policy pattern (public read published, admin full, editor limited, viewer read-only)
  - Verified storage buckets configuration (4 public buckets with proper RLS)
  - Confirmed API abstraction layer (repository pattern, DTOs, adapters)
  
- **Audit Fields Enhancement:**
  - Added `created_by` and `updated_by` fields to all content tables (services, projects, blog_posts, team, faqs)
  - Both fields reference `auth.users(id)` for proper audit trail
  
- **Documentation Sync:**
  - Updated PRD.md Section 10 data model naming to match backend.md
  - Standardized field names: `order` → `order_num`, `icon` → `icon_url`, `logo` → `logo_url`
  
- **Security Confirmation:**
  - Confirmed `blog_posts.author_id` uses "on delete set null" (keeps posts when author deleted)
  - Verified `has_role()` security definer function prevents RLS recursion
  
### Status
- Backend documentation complete and aligned with PRD ✅
- No discrepancies found between backend.md and PRD requirements
- Ready for Phase 1.2: Database Schema Migration

---

## [0.2.1] - 2025-10-03

### Removed - Home Variants Cleanup
- **Home Variants:**
  - Deleted Home Version 1 (`src/Pages/Home.jsx`)
  - Deleted Home Version 2 (`src/Pages/Home2.jsx`)
  - Removed `Main` layout (`src/Layout/Main.jsx`)
  - Removed `Header1` and `Footer1` components (used only by Home 1 & 2)
  - Removed variant-specific components:
    - `HeroBanner1.jsx`, `HeroBanner2.jsx`
    - `About1.jsx`
    - `Brand1.jsx`
    - `CaseStudy1.jsx`, `CaseStudy2.jsx`
    - `Marquee1.jsx`
    - `Services1.jsx`
    - `SuccessStories.jsx`
    - `Testimonial1.jsx`
    - `WhatWeDo.jsx`, `WhatWeDo2.jsx`
    - `WhyChoose1.jsx`
  - Removed duplicate routing configurations (`/home2`, `/home3`)
  - Removed Home dropdown from navigation menu

### Changed
- **Routing:**
  - Home-3 now serves as the default root page at `/`
  - All pages use consistent `Layout2` (Header2 + Footer2)
  - Removed conflicting `/` route definitions
- **Navigation:**
  - Simplified Home menu - removed version dropdown
  - Direct link to `/` (Home-3)

### Kept
- Shared components still used by other pages:
  - `About2` (used in AboutPage)
  - `Services3` (used in ServicesPage)
  - `Team2` (used in AboutPage)
  - `Testimonial2` (used in ServicesPage)

---

## [0.2.0] - 2025-10-03

### Added - Phase 0: Documentation & Architecture Foundation
- **Documentation Structure:**
  - Created `/docs/PRD.md` with complete Product Requirements Document
  - Created `/docs/tasks.md` with phased task breakdown and checklists
  - Created `/docs/backend.md` with database schema, RLS policies, storage configuration
  - Created `/docs/architecture.md` with ports/adapters pattern, repository interfaces, DTOs
  - Created `/docs/restore-point.md` for version tracking and rollback procedures
  - Created `/docs/changelog.md` (this file) for change tracking
  - Created `/docs/deployment.md` with staging and production deployment plan
  - Created `/docs/content-mapping.md` with Devmart content mapping to Digtek template

### Decisions Applied
- **Pricing Page:** Included in Phase 1 (already exists in template)
- **Analytics Provider:** Plausible (privacy-focused, simpler)
- **Email Provider:** Resend (modern, developer-friendly)
- **Content Strategy:** Seed with placeholder Devmart content

### Architecture Defined
- **Pattern:** Ports and Adapters (Hexagonal Architecture) for migration-readiness
- **Layers:** UI → Services → Repositories → Adapters → Providers
- **Abstraction:** All external providers (Supabase, Resend, Plausible) accessed via interfaces
- **Validation:** Zod schemas for all DTOs with runtime validation
- **Testing:** Mock adapters for testing and development

### Repository Interfaces Defined
- `IServiceRepository` - Services CRUD
- `IProjectRepository` - Projects/Portfolio CRUD
- `IBlogRepository` - Blog posts CRUD
- `ITeamRepository` - Team members CRUD
- `IFAQRepository` - FAQ items CRUD
- `ILeadRepository` - Contact form submissions
- `IMediaRepository` - Media library
- `ISettingsRepository` - Site configuration (singleton)

### Folder Structure Planned
```
src/lib/
  ├── repos/           # Repository interfaces (DB-agnostic)
  ├── adapters/        # Provider-specific implementations
  │   ├── supabase/    # Supabase adapters
  │   └── mock/        # Mock adapters (testing)
  ├── services/        # Business logic layer
  ├── schemas/         # Zod DTOs and validation
  ├── storage/         # Storage adapter
  ├── email/           # Email adapter (Resend)
  ├── analytics/       # Analytics adapter (Plausible)
  ├── hooks/           # Custom React hooks
  ├── utils/           # Utility functions
  └── config.ts        # Centralized configuration
```

### Database Schema Defined
- **Authentication:** `profiles`, `user_roles` with `app_role` enum (admin, editor, viewer)
- **Content:** `services`, `projects`, `blog_posts`, `team`, `faqs`
- **Media:** `media` table for media library
- **Leads:** `leads` table for contact form submissions
- **Settings:** `settings` table (singleton) for site configuration

### Security Defined
- **RLS Policies:** Public read (published), Admin full access, Editor edit, Viewer read-only
- **Role Storage:** Separate `user_roles` table (prevents privilege escalation)
- **Security Definer Function:** `has_role()` to prevent RLS recursion
- **Storage Policies:** Authenticated uploads, public read for all buckets

### Next Steps
- Phase 1.1: Enable Lovable Cloud in project settings
- Phase 1.2: Create database schema via SQL migrations
- Phase 1.3: Apply RLS policies with role-based access
- Phase 1.4: Configure storage buckets for images
- Phase 1.5: Build authentication system (login/signup/logout)

---

## [0.1.0] - 2025-10-03

### Added - Baseline Template (Home-3)
- **Digtek React Template (Home-3)** fully implemented pixel-perfect
- **Public Pages:**
  - Home (Home-3 variant) - Primary landing page
  - Home2, Home (alternative variants)
  - About Page
  - Services Page (list + detail)
  - Portfolio/Case Studies (grid + detail)
  - Blog (list + detail with sidebar)
  - Team (list + detail)
  - FAQ Page
  - Contact Page
  - Pricing Page
- **Components:**
  - HeroBanner (3 variants)
  - Services (3 variants)
  - CaseStudy (4 variants)
  - Blog (4 variants)
  - Testimonial (3 variants)
  - Team (3 variants)
  - WhyChoose (4 variants)
  - Counter (3 variants)
  - Pricing (2 variants)
  - FAQ, CTA, Brand, Marquee components
- **Layout:**
  - Header (2 variants) with navigation
  - Footer (2 variants)
  - Main layout wrapper
- **Styling:**
  - Bootstrap 5.3.3 fully integrated
  - Digtek custom CSS (`src/assets/main.css`)
  - Responsive design (mobile, tablet, desktop)
- **Routing:**
  - React Router 7.1.2 with all public routes
- **Images:**
  - All Digtek template images in `public/assets/img/`
- **Dependencies:**
  - React 18.3.1, Vite, Bootstrap 5.3.3
  - React Slick (carousels), html-react-parser
  - Bootstrap Icons

### Technical Details
- **Build Tool:** Vite with React plugin
- **Package Manager:** npm
- **Dev Server:** Port 8080
- **Entry Point:** `src/main.jsx`
- **Router:** `src/Routes/Routes.jsx`

### Notes
- All content is hardcoded (no CMS integration yet)
- No backend or database connectivity
- No authentication system
- Static marketing website ready for backend integration

---

## Version Numbering Guide

- **Major version (X.0.0):** Phase completion (e.g., 1.0.0 = Phase 1 complete)
- **Minor version (0.X.0):** Significant feature additions within a phase
- **Patch version (0.0.X):** Bug fixes, minor tweaks, documentation updates

### Planned Versions

- **0.1.0** - Baseline Template ✅
- **0.2.0** - Documentation & Architecture ✅
- **1.0.0** - Backend Setup & Authentication (Phase 1)
- **2.0.0** - Admin CMS Core (Phase 2/3)
- **3.0.0** - SEO & Performance (Phase 4/5)
- **4.0.0** - Production Ready (Phase 6/7)

---

## Commit Message Guidelines

Use conventional commit format:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation only
- `style:` - Formatting, missing semi-colons, etc.
- `refactor:` - Code restructuring without feature changes
- `test:` - Adding tests
- `chore:` - Maintenance tasks

**Examples:**
- `feat: add Supabase service repository`
- `fix: resolve RLS policy recursion issue`
- `docs: update backend.md with storage policies`
- `refactor: extract email logic to adapter`

---

## Status

**Current Version:** 0.2.1  
**Current Phase:** Phase 0 Complete ✅ (Home variants cleanup complete)  
**Next Phase:** Phase 1 - Backend Setup & Authentication  
**Last Updated:** 2025-10-03
