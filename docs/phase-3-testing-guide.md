# Phase 3 Testing Guide – SEO, Performance & Analytics

**Version:** 1.0  
**Date:** 2025-01-05  
**Status:** Ready for Testing

---

## Overview

This guide provides step-by-step instructions for testing all Phase 3 implementations:
- SEO metadata and JSON-LD schemas
- Analytics event tracking
- Image optimization and performance
- Accessibility features
- Cross-browser compatibility

**Estimated Testing Time:** 4-6 hours

---

## Pre-Testing Checklist

- [ ] All Phase 3 code changes deployed
- [ ] Production build created (`npm run build`)
- [ ] Local preview server running (`npm run preview`)
- [ ] Plausible Analytics dashboard access configured
- [ ] Google Search Console access ready
- [ ] Browser DevTools available (Chrome recommended)

---

## Part 1: SEO Validation (1-2 hours)

### 1.1 Meta Tags Verification

**Test All Pages:**
- [ ] Home (`/`)
- [ ] About (`/about`)
- [ ] Services (`/services`)
- [ ] Portfolio (`/portfolio`)
- [ ] Blog (`/blog`)
- [ ] Team (`/team`)
- [ ] Pricing (`/pricing`)
- [ ] FAQ (`/faq`)
- [ ] Contact (`/contact`)

**For Each Page:**

1. **Inspect HTML Head:**
   - Right-click → Inspect → Elements tab
   - Navigate to `<head>` section
   - Verify presence of:
     - `<title>` tag (under 60 characters)
     - `<meta name="description">` (under 160 characters)
     - `<link rel="canonical">` (absolute URL)
     - `<meta property="og:title">`
     - `<meta property="og:description">`
     - `<meta property="og:image">`
     - `<meta property="og:url">`
     - `<meta name="twitter:card">`

2. **Check for Duplicates:**
   - Verify only ONE `<title>` tag exists
   - Verify only ONE `<meta name="description">` exists
   - No duplicate canonical tags

3. **Validate JSON-LD:**
   - In DevTools Elements, search for `<script type="application/ld+json">`
   - Copy JSON content
   - Paste into [Google Rich Results Test](https://search.google.com/test/rich-results)
   - Verify no errors

**Expected Results:**
- ✅ All pages have unique titles and descriptions
- ✅ Canonical URLs are absolute and correct
- ✅ OpenGraph and Twitter Card tags present
- ✅ JSON-LD validates without errors

---

### 1.2 Dynamic Page SEO (Service, Project, Blog, Team Details)

**Test Dynamic Routes:**

1. **Service Detail Page:**
   - Navigate to `/services/web-development` (or any service)
   - Verify title includes service name
   - Verify description from service summary
   - Check for `Service` JSON-LD schema
   - Verify OpenGraph image from service icon

2. **Project Detail Page:**
   - Navigate to `/portfolio/[project-slug]`
   - Verify title includes project name
   - Verify description from project summary
   - Check for `CreativeWork` JSON-LD schema
   - Verify OpenGraph image from project cover

3. **Blog Post Detail Page:**
   - Navigate to `/blog/[post-slug]`
   - Verify title includes post title
   - Verify description from post summary
   - Check for `Article` JSON-LD schema with:
     - Author name
     - Publication date
     - Tags array
   - Verify OpenGraph image from blog cover

4. **Team Member Detail Page:**
   - Navigate to `/team/[member-slug]`
   - Verify title includes member name
   - Verify description from member bio
   - Check for `Person` JSON-LD schema

**Expected Results:**
- ✅ SEO meta tags dynamically populated from database
- ✅ JSON-LD schemas include dynamic content
- ✅ No null or undefined values in meta tags

---

### 1.3 Sitemap & Robots.txt Validation

1. **Test Sitemap:**
   - Navigate to `/sitemap.xml`
   - Verify XML renders properly
   - Check for URLs of:
     - Static pages (home, about, services, etc.)
     - Service detail pages
     - Project detail pages
     - Blog post pages
     - Team member pages
   - Verify `<priority>` and `<changefreq>` tags present
   - Verify `<lastmod>` dates are valid

2. **Test Robots.txt:**
   - Navigate to `/robots.txt`
   - Verify contains:
     ```
     User-agent: *
     Allow: /
     Sitemap: https://devmart.sr/sitemap.xml
     ```

3. **Google Search Console (Optional):**
   - Submit sitemap URL to Google Search Console
   - Wait 24 hours for indexing status

**Expected Results:**
- ✅ Sitemap is valid XML with all dynamic pages
- ✅ Robots.txt references sitemap
- ✅ No 404 errors in sitemap URLs

---

### 1.4 SEO Tools Validation

**Google Rich Results Test:**
1. Visit [Google Rich Results Test](https://search.google.com/test/rich-results)
2. Enter page URL (e.g., `https://devmart.sr/`)
3. Verify schemas detected:
   - Organization
   - WebSite
   - BreadcrumbList
4. Check for errors or warnings
5. Repeat for:
   - Blog post (should detect Article schema)
   - Service page (should detect Service schema)
   - Project page (should detect CreativeWork schema)

**OpenGraph Preview:**
1. Visit [OpenGraph Preview](https://www.opengraph.xyz/)
2. Enter page URL
3. Verify preview card displays:
   - Correct title
   - Correct description
   - Correct image
4. Test on multiple pages

**Expected Results:**
- ✅ All schemas validated by Google
- ✅ OpenGraph previews look correct
- ✅ No errors in structured data

---

## Part 2: Analytics Validation (1-2 hours)

### 2.1 Plausible Dashboard Access

1. **Login to Plausible:**
   - Navigate to [Plausible Analytics](https://plausible.io/)
   - Login with account credentials
   - Select `devmart.sr` site

2. **Verify Script Loaded:**
   - Open browser DevTools → Network tab
   - Reload any page
   - Search for `script.js` from `plausible.io`
   - Verify script loads successfully (Status 200)

**Expected Results:**
- ✅ Plausible dashboard accessible
- ✅ Script loads without errors

---

### 2.2 Page View Tracking

**Test Automatic Page Views:**

1. **Clear Plausible Data (Optional):**
   - In Plausible dashboard, note current page view count

2. **Navigate Through Site:**
   - Visit Home page → wait 5 seconds
   - Navigate to About → wait 5 seconds
   - Navigate to Services → wait 5 seconds
   - Navigate to Blog → wait 5 seconds
   - Navigate to Contact → wait 5 seconds

3. **Check Plausible Dashboard:**
   - Refresh Plausible dashboard
   - Verify page views increased by 5
   - Check "Top Pages" report:
     - Should show `/`, `/about`, `/services`, `/blog`, `/contact`

**Expected Results:**
- ✅ Page views tracked on every route change
- ✅ Correct page paths shown in dashboard

---

### 2.3 CTA Click Tracking

**Test Hero Banner CTA:**

1. **Open Homepage:**
   - Navigate to `/`
   - Open DevTools Console
   - Clear console

2. **Click "GET STARTED" Button:**
   - Click primary CTA in hero banner
   - Check console for event tracking confirmation
   - Should see: `[Plausible] Event: CTA Click`

3. **Verify in Plausible Dashboard:**
   - Refresh dashboard → Goal Conversions
   - Look for event: `CTA Click: GET STARTED`
   - Verify custom property: `location: Hero Banner`

**Test Contact CTA:**

1. **Navigate to Any Page with Contact CTA:**
   - Scroll to contact section
   - Click "Get in Touch" button

2. **Verify in Dashboard:**
   - Check for event: `CTA Click: Get in Touch`
   - Verify custom property: `location: CTA Contact Section`

**Expected Results:**
- ✅ CTA clicks tracked with button text
- ✅ Location context captured
- ✅ Events visible in Plausible dashboard

---

### 2.4 Page View Tracking (Dynamic Pages)

**Test Service View Tracking:**

1. **Navigate to Service Detail:**
   - Go to `/services/web-development` (or any service)
   - Wait 5 seconds

2. **Check Plausible Dashboard:**
   - Refresh dashboard → Custom Events
   - Look for: `Service View: Web Development`

**Test Project View Tracking:**

1. **Navigate to Project Detail:**
   - Go to `/portfolio/[project-slug]`
   - Wait 5 seconds

2. **Check Dashboard:**
   - Look for: `Project View: {Project Title}`

**Test Blog View Tracking:**

1. **Navigate to Blog Post:**
   - Go to `/blog/[post-slug]`
   - Wait 5 seconds

2. **Check Dashboard:**
   - Look for: `Blog View: {Post Title}`
   - Should include tags as custom property

**Expected Results:**
- ✅ Service views tracked with title
- ✅ Project views tracked with title
- ✅ Blog views tracked with title and tags

---

### 2.5 Scroll Depth Tracking (Blog Posts)

**Test Scroll Milestones:**

1. **Navigate to Blog Post:**
   - Go to `/blog/[post-slug]`

2. **Scroll Slowly:**
   - Scroll to 25% of page → wait 2 seconds
   - Scroll to 50% → wait 2 seconds
   - Scroll to 75% → wait 2 seconds
   - Scroll to 100% (bottom) → wait 2 seconds

3. **Check Console:**
   - Should see 4 scroll tracking events logged

4. **Check Plausible Dashboard:**
   - Refresh → Custom Events
   - Look for:
     - `Scroll Depth: 25%`
     - `Scroll Depth: 50%`
     - `Scroll Depth: 75%`
     - `Scroll Depth: 100%`
   - Each should have custom property: `page: {post-slug}`

**Expected Results:**
- ✅ All 4 milestones tracked
- ✅ Events include page identifier
- ✅ No duplicate events on same milestone

---

### 2.6 Form Interaction Tracking

**Test Contact Form:**

1. **Navigate to Contact Page:**
   - Go to `/contact`
   - Clear DevTools console

2. **Interact with Form Fields:**
   - Click "Name" field → check console for `Form Field Focus: name`
   - Type name → click outside field → check for `Form Field Blur: name`
   - Repeat for Email, Phone, Subject, Message fields

3. **Submit Form (Success):**
   - Fill all required fields correctly
   - Click "Send Message"
   - Check console for `Form Submit: Contact Form (success: true)`

4. **Submit Form (Validation Error):**
   - Clear form
   - Click "Send Message" without filling fields
   - Check console for `Form Error: ...`

5. **Check Plausible Dashboard:**
   - Refresh → Custom Events
   - Look for:
     - `Form Field Focus: name` (multiple fields)
     - `Form Field Blur: email` (multiple fields)
     - `Form Submit: Contact Form` (success property)
     - `Form Error: ...` (if validation failed)

**Expected Results:**
- ✅ Field focus/blur tracked for all fields
- ✅ Form submission tracked with success/failure
- ✅ Validation errors tracked

---

### 2.7 Outbound Link Tracking

**Test External Link Clicks:**

1. **Add External Link (Test):**
   - Temporarily add a link to footer: `<a href="https://google.com" target="_blank">Google</a>`

2. **Click External Link:**
   - Click the link
   - Check console for `Outbound Link: https://google.com`

3. **Check Plausible Dashboard:**
   - Refresh → Custom Events
   - Look for: `Outbound Link: https://google.com`

**Expected Results:**
- ✅ External link clicks tracked automatically
- ✅ URL captured in event

---

## Part 3: Performance Testing (2-3 hours)

### 3.1 Lighthouse Audit

**Run Audit:**

1. **Build Production Version:**
   ```bash
   npm run build
   npm run preview
   ```

2. **Open Chrome DevTools:**
   - Navigate to production URL
   - Open DevTools (F12)
   - Click "Lighthouse" tab

3. **Configure Audit:**
   - Device: Desktop + Mobile (run separately)
   - Categories: Performance, SEO, Accessibility, Best Practices
   - Mode: Navigation (default)

4. **Run Audit for Each Page:**
   - Home (`/`)
   - About (`/about`)
   - Services (`/services`)
   - Blog (`/blog`)
   - Contact (`/contact`)

5. **Record Scores:**

| Page | Performance | SEO | Accessibility | Best Practices |
|------|-------------|-----|---------------|----------------|
| Home (Desktop) |  |  |  |  |
| Home (Mobile) |  |  |  |  |
| About (Desktop) |  |  |  |  |
| Services (Desktop) |  |  |  |  |
| Blog (Desktop) |  |  |  |  |
| Contact (Desktop) |  |  |  |  |

**Target Scores:**
- Performance: ≥ 90
- SEO: ≥ 95
- Accessibility: ≥ 95
- Best Practices: ≥ 90

**Expected Results:**
- ✅ All scores meet or exceed targets
- ✅ No critical errors in any category

---

### 3.2 Core Web Vitals

**Measure Core Web Vitals:**

1. **LCP (Largest Contentful Paint):**
   - Open DevTools → Performance tab
   - Record page load
   - Look for "LCP" marker
   - **Target:** < 2.5s

2. **CLS (Cumulative Layout Shift):**
   - Observe page load
   - Check for any visible content shifts
   - In Performance tab, check "Experience" section for CLS score
   - **Target:** < 0.1

3. **INP (Interaction to Next Paint):**
   - Click a button (e.g., CTA)
   - Measure time to visual feedback
   - **Target:** < 200ms

**Use Web Vitals Chrome Extension (Recommended):**
1. Install [Web Vitals Extension](https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma)
2. Navigate to each page
3. Click extension icon to see real-time metrics

**Expected Results:**
- ✅ LCP < 2.5s on all pages
- ✅ CLS < 0.1 on all pages
- ✅ INP < 200ms for all interactions

---

### 3.3 Image Optimization Verification

**Test OptimizedImage Component:**

1. **Check Hero Image (Above-the-Fold):**
   - Navigate to Home page
   - Open DevTools → Network tab
   - Filter by "Img"
   - Reload page
   - Verify hero image loads immediately (eager)
   - Check image format: should be WebP (if supported)
   - Check response headers for optimization

2. **Check Content Images (Below-the-Fold):**
   - Scroll slowly down page
   - In Network tab, watch for new image requests
   - Verify images load only when scrolled into view (lazy)
   - Verify LQIP (blurred placeholder) appears first

3. **Test Responsive Srcset:**
   - Open DevTools → Elements tab
   - Inspect an OptimizedImage `<img>` tag
   - Verify `srcset` attribute exists with multiple sizes:
     ```html
     srcset="
       /image.jpg?width=400 400w,
       /image.jpg?width=800 800w,
       /image.jpg?width=1200 1200w,
       /image.jpg?width=1600 1600w
     "
     ```
   - Resize browser window
   - Verify browser loads different image size

4. **Test WebP Fallback:**
   - In Chrome DevTools, disable WebP support:
     - Settings → Network conditions → User agent → Custom
     - Set to: `Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko`
   - Reload page
   - Verify images fall back to JPEG/PNG format

**Expected Results:**
- ✅ Hero images load eagerly (no lazy load)
- ✅ Content images lazy load on scroll
- ✅ LQIP placeholders visible before full load
- ✅ Responsive srcset generates multiple sizes
- ✅ WebP used when supported, falls back otherwise
- ✅ No layout shifts (CLS) during image load

---

### 3.4 Bundle Size Analysis

**Analyze Bundle:**

1. **Run Analyzer:**
   ```bash
   npm run build
   npm run analyze
   ```

2. **Review Bundle Report:**
   - Opens in browser automatically
   - Check largest chunks
   - Identify any unnecessarily large dependencies

**Target Metrics:**
- Total bundle size: < 1MB (gzipped)
- Largest chunk: < 300KB
- No unused dependencies

**Expected Results:**
- ✅ Bundle size within targets
- ✅ Code splitting effective (multiple chunks)
- ✅ No obvious bloat from unused libraries

---

## Part 4: Accessibility Testing (1-2 hours)

### 4.1 Keyboard Navigation

**Test Tab Order:**

1. **Navigate with Tab Key:**
   - Start at Home page
   - Press Tab repeatedly
   - Verify focus order follows logical sequence:
     - Logo → Navigation links → Hero CTA → Content links → Footer links

2. **Test on All Pages:**
   - Repeat for: About, Services, Blog, Contact, Admin pages

3. **Verify Focus Indicators:**
   - All focused elements should have visible outline/ring
   - Check for custom focus styles (theme colors)

**Test Keyboard Shortcuts:**

1. **Skip to Content:**
   - Press Tab immediately on page load
   - First focus should be "Skip to content" link
   - Press Enter → focus jumps to main content

2. **Modal Escape:**
   - Open any modal (e.g., Media Edit modal)
   - Press Escape key → modal closes

**Expected Results:**
- ✅ Logical tab order on all pages
- ✅ All interactive elements receive focus
- ✅ Focus indicators visible and styled
- ✅ Skip to content link works
- ✅ Modals close with Escape key

---

### 4.2 Screen Reader Testing

**Test with NVDA (Windows) or VoiceOver (Mac):**

1. **Install Screen Reader:**
   - **Windows:** Download [NVDA](https://www.nvaccess.org/)
   - **Mac:** Built-in VoiceOver (Cmd+F5)

2. **Test Homepage:**
   - Start screen reader
   - Navigate to Home page
   - Listen for:
     - Page title announcement
     - Landmark regions (banner, main, navigation)
     - Heading hierarchy (H1, H2, H3)
     - Image alt text descriptions
     - Button/link labels

3. **Test Forms:**
   - Navigate to Contact page
   - Tab through form fields
   - Verify announcements:
     - Field labels ("Your Name")
     - Required field indicators
     - Error messages (if validation fails)

4. **Test Tables:**
   - Navigate to Admin Dashboard → Services
   - Verify table structure announced
   - Column headers announced
   - Cell content read correctly

**Expected Results:**
- ✅ Headings announced in order (H1 → H2 → H3)
- ✅ Landmarks identified (main, nav, footer)
- ✅ Images have descriptive alt text
- ✅ Form fields have proper labels
- ✅ Error messages are announced
- ✅ Tables have proper structure

---

### 4.3 Color Contrast Testing

**Use WebAIM Contrast Checker:**

1. **Install Tool:**
   - Visit [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

2. **Test Key Colors:**
   - Text on background: `#FFFFFF` on `#17012C` → Verify ≥ 4.5:1
   - Button text on primary: `#FFFFFF` on `#6A47ED` → Verify ≥ 4.5:1
   - Link text: `#6A47ED` on `#FFFFFF` → Verify ≥ 4.5:1

3. **Use Axe DevTools (Automated):**
   - Install [Axe DevTools Extension](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd)
   - Open on any page → Run scan
   - Check for contrast issues

**Expected Results:**
- ✅ All text passes WCAG AA (4.5:1)
- ✅ No contrast failures in Axe DevTools

---

### 4.4 ARIA Implementation

**Verify ARIA Attributes:**

1. **Inspect Interactive Elements:**
   - Right-click buttons → Inspect
   - Verify `aria-label` on icon-only buttons
   - Verify `aria-describedby` on form fields
   - Verify `role="dialog"` on modals
   - Verify `aria-modal="true"` on modals

2. **Check Forms:**
   - Inspect Contact form
   - Verify `aria-required="true"` on required fields
   - Verify `aria-invalid="true"` on error fields
   - Verify error messages linked with `aria-describedby`

**Expected Results:**
- ✅ All icon buttons have `aria-label`
- ✅ Form fields have proper ARIA attributes
- ✅ Modals have `role="dialog"` and `aria-modal`
- ✅ Error states properly announced

---

## Part 5: Cross-Browser Testing (1 hour)

### 5.1 Browser Compatibility

**Test on All Major Browsers:**

1. **Chrome (Latest):**
   - [ ] Homepage loads correctly
   - [ ] All animations smooth
   - [ ] Forms submit successfully
   - [ ] Images load with WebP

2. **Firefox (Latest):**
   - [ ] Homepage loads correctly
   - [ ] CSS Grid layouts correct
   - [ ] Forms work properly
   - [ ] No console errors

3. **Safari (Latest - Mac):**
   - [ ] Homepage loads correctly
   - [ ] Webkit-specific styles applied
   - [ ] Forms submit successfully
   - [ ] Images load correctly

4. **Edge (Latest):**
   - [ ] Homepage loads correctly
   - [ ] All features functional
   - [ ] No layout issues

**Test Features:**
- Navigation menu
- Hero banner animations
- Form submission
- Image loading (lazy + eager)
- Modal open/close
- Admin dashboard (if authenticated)

**Expected Results:**
- ✅ Consistent layout across all browsers
- ✅ All features functional
- ✅ No console errors
- ✅ No visual glitches

---

### 5.2 Mobile Responsive Testing

**Test on Mobile Devices:**

1. **Chrome DevTools Device Emulation:**
   - Open DevTools → Toggle device toolbar
   - Test on:
     - iPhone 12 Pro (375x812)
     - iPhone SE (375x667)
     - iPad Air (820x1180)
     - Samsung Galaxy S20 (360x800)

2. **Real Device Testing (Recommended):**
   - Test on actual iOS device (Safari)
   - Test on actual Android device (Chrome)

**Check Responsive Breakpoints:**
- [ ] Mobile (<768px): Single column, hamburger menu
- [ ] Tablet (768-991px): Two columns, responsive grid
- [ ] Desktop (≥992px): Full layout, all features

**Test Mobile Features:**
- [ ] Touch navigation works
- [ ] Forms easy to fill on mobile
- [ ] Images load optimized sizes
- [ ] No horizontal scrolling
- [ ] Buttons large enough to tap (≥44x44px)

**Expected Results:**
- ✅ All content readable on mobile
- ✅ No layout breaking at any width
- ✅ Touch targets appropriately sized
- ✅ Fast loading on mobile networks

---

## Part 6: Final Verification

### 6.1 Checklist Summary

**SEO:**
- [ ] All 13 pages have proper meta tags
- [ ] JSON-LD schemas validate without errors
- [ ] Sitemap and robots.txt accessible
- [ ] Dynamic pages pull SEO from database

**Analytics:**
- [ ] Page views tracked on all routes
- [ ] CTA clicks tracked with context
- [ ] Service/Project/Blog views tracked
- [ ] Scroll depth tracked on blog posts
- [ ] Form interactions tracked completely
- [ ] Outbound links tracked automatically

**Performance:**
- [ ] Lighthouse scores meet targets (Perf ≥90, SEO ≥95, A11y ≥95, BP ≥90)
- [ ] Core Web Vitals pass (LCP <2.5s, CLS <0.1, INP <200ms)
- [ ] OptimizedImage loads images efficiently
- [ ] Hero images eager, content images lazy
- [ ] WebP format used with fallback

**Accessibility:**
- [ ] Keyboard navigation works completely
- [ ] Screen reader announces content correctly
- [ ] Color contrast passes WCAG AA
- [ ] ARIA attributes implemented properly
- [ ] Modal focus traps functional

**Cross-Browser:**
- [ ] Chrome, Firefox, Safari, Edge all functional
- [ ] Mobile responsive on all breakpoints
- [ ] Touch interactions work on mobile devices

---

### 6.2 Issue Tracking

**If Issues Found:**

1. **Document Issue:**
   - Page/component affected
   - Expected behavior
   - Actual behavior
   - Browser/device
   - Screenshot (if visual)

2. **Priority Classification:**
   - 🔴 Critical: Blocks usage, breaks functionality
   - 🟡 Major: Significant issue, workaround exists
   - 🟢 Minor: Cosmetic, low impact

3. **Report to Developer:**
   - Create GitHub issue with details
   - Include reproduction steps
   - Attach screenshots/videos

---

### 6.3 Sign-Off

**Phase 3 Testing Complete When:**
- [ ] All SEO validation passed
- [ ] All analytics events verified in Plausible
- [ ] All Lighthouse audits meet targets
- [ ] All accessibility tests passed
- [ ] All browsers tested without critical issues
- [ ] No blockers identified

**Signed Off By:** _______________________  
**Date:** _______________________

---

## Next Steps: Phase 4

After Phase 3 testing complete and signed off:
1. Deploy to staging environment (Vercel)
2. Run final production audits
3. Content seeding with real Devmart data
4. User acceptance testing (UAT)
5. Deploy to production (Hostinger VPS)
6. Go-live!

---

**End of Phase 3 Testing Guide**
