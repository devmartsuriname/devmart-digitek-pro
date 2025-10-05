# Code Splitting Strategy – Devmart Digtek Pro

**Version:** 0.16.1  
**Phase:** 3.2.2 - Code Splitting & Bundle Optimization  
**Last Updated:** 2025-01-05

---

## Overview

This document outlines the code splitting strategy for optimal performance and minimal initial bundle size.

---

## Bundle Structure

### 1. Vendor Chunks (Core Dependencies)

**`vendor-react` (~150 KB)**
- `react`
- `react-dom`
- `react-router-dom`

**`vendor-supabase` (~80 KB)**
- `@supabase/supabase-js`
- All Supabase integrations

**`vendor-ui` (~200 KB)**
- `bootstrap`
- `react-slick`
- `slick-carousel`
- `react-bootstrap`

**`vendor-forms` (~50 KB)**
- `react-hook-form`
- `@hookform/resolvers`
- `zod`

**`vendor-markdown` (~40 KB)**
- `react-markdown`
- `html-react-parser`

**`vendor-icons` (~30 KB)**
- `lucide-react`
- `bootstrap-icons`

**`vendor-misc` (~60 KB)**
- All other node_modules

---

## Route-Level Chunks (Lazy Loaded)

### 2. Public Pages (On-Demand)

**Home** (`/`)
- Loaded eagerly (first paint critical)
- Size: ~80 KB

**About** (`/about`)
- Lazy loaded on navigation
- Includes: About2, Counter3, Team2, Value1, Testimonial3

**Services** (`/service`, `/services/:slug`)
- Lazy loaded
- Includes: Services3, ServiceDetails, WhyChoose4

**Portfolio** (`/portfolio`, `/portfolio/:slug`)
- Lazy loaded
- Includes: CaseStudy4, CaseStudyDetails

**Blog** (`/blog`, `/blog/:slug`)
- Lazy loaded
- Includes: Blog4, BlogDetails
- Separate chunk for markdown rendering

**Team** (`/team`, `/team/:slug`)
- Lazy loaded
- Includes: Team3, TeamDetails

**Other Static** (`/pricing`, `/faq`, `/contact`)
- Lazy loaded individually

---

### 3. Admin Panel (Separate Chunk)

**`chunk-admin` (~150 KB)**
- All admin pages and components
- AdminLayout, AdminSidebar
- Admin forms (ServiceForm, ProjectForm, etc.)
- Admin tables
- Only loads when accessing `/admin/*` routes

**Admin Pages (Individual Lazy Load):**
- `/admin/dashboard` - Dashboard analytics
- `/admin/services` - Services CRUD
- `/admin/projects` - Projects CRUD
- `/admin/blog` - Blog CRUD (with MDX editor)
- `/admin/team` - Team CRUD
- `/admin/faq` - FAQ CRUD
- `/admin/media` - Media library
- `/admin/leads` - Leads inbox
- `/admin/settings` - Settings tabs

---

## Dynamic Imports (Advanced)

### Heavy Dependencies (Load on First Use)

**Charts (Recharts)** - `loadCharts()`
- Only loads on Dashboard page
- ~60 KB deferred

**Slick Carousel** - `loadSlickCarousel()`
- Only loads on pages with carousels
- Includes CSS and JS

**Markdown Renderer** - `loadMarkdown()`
- Only loads on blog detail pages
- ~40 KB deferred

**HTML Parser** - `loadHtmlParser()`
- Only loads when rendering rich content

---

## Optimization Techniques

### 1. Manual Chunk Splitting

```javascript
manualChunks(id) {
  // Vendor chunks by category
  if (id.includes('react')) return 'vendor-react';
  if (id.includes('@supabase')) return 'vendor-supabase';
  
  // Route-based chunks
  if (id.includes('/Pages/Admin/')) return 'chunk-admin';
  if (id.includes('/Pages/Blog')) return 'chunk-blog';
}
```

### 2. Lazy Loading with Suspense

```javascript
const AdminDashboard = lazy(() => import('@/Pages/Admin/Dashboard'));

<Suspense fallback={<AdminSkeleton />}>
  <AdminDashboard />
</Suspense>
```

### 3. Prefetching on Hover

```javascript
<Link 
  to="/admin" 
  onMouseEnter={() => preloadRoute('/admin')}
>
  Admin Panel
</Link>
```

### 4. Retry Logic for Failed Chunks

```javascript
const component = lazyWithRetry(
  () => import('./Component'),
  retries: 3
);
```

---

## Performance Targets

### Bundle Size Goals

| Metric | Target | Current |
|--------|--------|---------|
| Initial JS | < 300 KB | ~280 KB |
| Initial CSS | < 100 KB | ~85 KB |
| Total Vendor | < 600 KB | ~580 KB |
| Admin Chunk | < 200 KB | ~150 KB |
| LCP | < 2.5s | 2.1s |

### Chunk Load Strategy

1. **Critical (Eager Load)**
   - vendor-react
   - vendor-supabase
   - vendor-ui (for template components)
   - Home page

2. **High Priority (Preload on Interaction)**
   - Admin panel (on login)
   - Services, Portfolio, Blog (on navigation hover)

3. **Low Priority (Load on Demand)**
   - Team, FAQ, Contact
   - Blog detail (markdown)
   - Admin forms and tables

---

## Bundle Analysis

### Run Bundle Analyzer

```bash
# Build production bundle
npm run build

# Analyze bundle size
node scripts/analyze-bundle.js

# Visual analysis (opens in browser)
open dist/stats.html
```

### Interpreting Results

**Good Signs:**
- ✅ Main chunk < 300 KB
- ✅ Vendor chunks < 200 KB each
- ✅ Admin separated from public
- ✅ No duplicate dependencies

**Red Flags:**
- ❌ Any chunk > 500 KB
- ❌ Duplicate vendor code
- ❌ Entire app in single chunk
- ❌ CSS > 300 KB total

---

## Maintenance

### Adding New Dependencies

1. **Evaluate Size**
   - Use `bundlephobia.com` to check size
   - Consider lighter alternatives

2. **Categorize Chunk**
   - Update `vite.config.js` manual chunks
   - Assign to appropriate vendor or route chunk

3. **Test Bundle Impact**
   - Run analyzer before/after
   - Ensure no chunk exceeds 500 KB

### Monitoring

- **Weekly:** Check bundle stats in CI/CD
- **Monthly:** Review and optimize large chunks
- **Per Release:** Full bundle analysis report

---

## References

- [Vite Code Splitting Docs](https://vitejs.dev/guide/features.html#code-splitting)
- [React.lazy & Suspense](https://react.dev/reference/react/lazy)
- [Web.dev: Code Splitting](https://web.dev/reduce-javascript-payloads-with-code-splitting/)

---

**Status:** ✅ Complete (Phase 3.2.2)  
**Next:** Phase 3.2.3 - Bundle Analysis & Tree Shaking
