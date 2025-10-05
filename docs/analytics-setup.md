# Analytics Setup Guide – Devmart Digtek Pro

**Version:** 0.17.1  
**Provider:** Plausible Analytics  
**Last Updated:** 2025-01-05

---

## Overview

Devmart Digtek Pro uses **Plausible Analytics** - a privacy-friendly, lightweight, and open-source analytics platform. No cookies, GDPR/CCPA compliant by default.

---

## Setup Instructions

### 1. Create Plausible Account

1. Go to [plausible.io](https://plausible.io)
2. Sign up for an account (or self-host)
3. Add your domain: `devmart.sr`
4. Get your tracking script details

### 2. Update Domain Configuration

**File:** `src/lib/adapters/plausible/PlausibleAdapter.js`

```javascript
// Update this line with your domain
const PLAUSIBLE_DOMAIN = 'devmart.sr'; // Your domain

// If self-hosting, update API host
const PLAUSIBLE_API_HOST = 'https://plausible.io'; // Or your self-hosted URL
```

**File:** `src/lib/utils/loadAnalytics.js`

```javascript
export const loadAnalytics = (siteId = 'devmart.sr') => {
  // Update default siteId to your domain
}
```

### 3. Verify Installation

1. Deploy your site to production (or use `localhost` in Plausible settings for testing)
2. Visit your site
3. Check Plausible dashboard → Real-time view
4. You should see your visit appear within 30 seconds

---

## Tracked Events

### Automatic Events (No Code Required)

✅ **Page Views**  
Automatically tracked on every route change via `usePageViewTracking` hook.

✅ **Outbound Links**  
Automatically tracked when users click external links via `useOutboundLinkTracking` hook.

### Custom Events (Already Implemented)

#### 1. Form Submissions
**Event:** `Form Submit: Contact Form`  
**Tracked in:** `ContactForm.jsx` (when implemented)  
**Properties:**
- `status`: 'success' | 'error'

#### 2. CTA Clicks
**Event:** `CTA Click`  
**Properties:**
- `text`: Button text
- `location`: Where CTA is located (Hero, Footer, etc.)

**Usage:**
```javascript
import { trackCTAClick } from '@/lib/adapters/plausible/PlausibleAdapter';

<button onClick={() => trackCTAClick('Get Started', 'Hero')}>
  Get Started
</button>
```

#### 3. Service Page Views
**Event:** `Service View`  
**Properties:**
- `service`: Service name

**Usage:**
```javascript
import { trackServiceView } from '@/lib/adapters/plausible/PlausibleAdapter';

useEffect(() => {
  if (service) {
    trackServiceView(service.title);
  }
}, [service]);
```

#### 4. Project/Portfolio Views
**Event:** `Project View`  
**Properties:**
- `project`: Project name

**Usage:**
```javascript
import { trackProjectView } from '@/lib/adapters/plausible/PlausibleAdapter';

useEffect(() => {
  if (project) {
    trackProjectView(project.title);
  }
}, [project]);
```

#### 5. Blog Post Views
**Event:** `Blog Post View`  
**Properties:**
- `title`: Post title
- `tags`: Comma-separated tags

**Usage:**
```javascript
import { trackBlogView } from '@/lib/adapters/plausible/PlausibleAdapter';

useEffect(() => {
  if (post) {
    trackBlogView(post.title, post.tags);
  }
}, [post]);
```

#### 6. Scroll Depth
**Event:** `Scroll Depth`  
**Properties:**
- `depth`: 25%, 50%, 75%, 100%
- `page`: Page identifier

**Usage:**
```javascript
import { useScrollTracking } from '@/lib/hooks/useAnalytics';

// In component
useScrollTracking('blog-post');
```

#### 7. Video Plays
**Event:** `Video Play`  
**Properties:**
- `title`: Video title

**Usage:**
```javascript
import { trackVideoPlay } from '@/lib/adapters/plausible/PlausibleAdapter';

<button onClick={() => trackVideoPlay('Product Demo')}>
  Play Video
</button>
```

#### 8. Social Shares
**Event:** `Social Share`  
**Properties:**
- `platform`: Twitter, LinkedIn, Facebook
- `content`: Content title being shared

**Usage:**
```javascript
import { trackSocialShare } from '@/lib/adapters/plausible/PlausibleAdapter';

const handleShare = (platform) => {
  trackSocialShare(platform, document.title);
  // ... open share dialog
};
```

---

## Setting Up Goals in Plausible

### 1. Conversion Goals

Navigate to: **Settings → Goals → Add Goal**

**Recommended Goals:**

1. **Form Submissions**
   - Goal Type: Custom Event
   - Event Name: `Form Submit: Contact Form`

2. **CTA Engagement**
   - Goal Type: Custom Event
   - Event Name: `CTA Click`

3. **Content Engagement**
   - Goal Type: Custom Event
   - Event Name: `Scroll Depth`

4. **Service Interest**
   - Goal Type: Custom Event
   - Event Name: `Service View`

5. **Portfolio Interest**
   - Goal Type: Custom Event
   - Event Name: `Project View`

### 2. Funnel Analysis

Create funnels to track user journeys:

**Example Funnel: "Lead Generation"**
1. Homepage visit (`/`)
2. Services page (`/service`)
3. Contact form view (`/contact`)
4. Form submission (`Form Submit: Contact Form`)

---

## Implementation Checklist

### Public Pages

- [ ] **Home (`/`)**
  - [ ] Add CTA tracking to hero buttons
  - [ ] Add scroll depth tracking
  
- [ ] **Services (`/service`, `/services/:slug`)**
  - [ ] Track service views
  - [ ] Add CTA tracking
  
- [ ] **Portfolio (`/portfolio`, `/portfolio/:slug`)**
  - [ ] Track project views
  - [ ] Add scroll depth tracking
  
- [ ] **Blog (`/blog`, `/blog/:slug`)**
  - [ ] Track blog post views
  - [ ] Add scroll depth tracking
  - [ ] Track social shares
  
- [ ] **Contact (`/contact`)**
  - [ ] Track form submissions
  - [ ] Track form field interactions

### Admin Panel

- [ ] **Dashboard**
  - [ ] Display analytics summary (via Plausible API)
  - [ ] Show conversion rates
  - [ ] Top performing content

---

## Privacy & GDPR Compliance

Plausible is privacy-first and doesn't use cookies:

✅ **No cookies**  
✅ **No personal data collected**  
✅ **GDPR compliant by default**  
✅ **CCPA compliant**  
✅ **No consent banner required** (in most jurisdictions)

**Data Collected:**
- Page URL
- Referrer
- Browser type
- Operating system
- Device type
- Country (based on IP, not stored)

**Data NOT Collected:**
- IP addresses (not stored)
- Personal information
- Cross-site tracking
- Cookies or local storage

---

## Monitoring & Reports

### Real-Time Dashboard
Access: `https://plausible.io/devmart.sr`

**Metrics:**
- Current visitors
- Top pages
- Traffic sources
- Geographic distribution
- Devices & browsers

### Custom Reports

Create saved reports for:
- Weekly performance summaries
- Monthly conversion reports
- Quarterly traffic analysis

### Email Reports

Set up automated email reports:
- Daily summaries (for high-traffic sites)
- Weekly reports (recommended)
- Monthly overviews

---

## Troubleshooting

### Events Not Showing Up

1. **Check script loaded:**
   ```javascript
   console.log(typeof window.plausible); // Should be 'function'
   ```

2. **Check domain matches:**
   - Plausible dashboard domain: `devmart.sr`
   - Script `data-domain` attribute: `devmart.sr`
   - Must match exactly

3. **Check ad blockers:**
   - Some ad blockers block Plausible
   - Test in incognito mode

4. **Check browser console:**
   - Look for errors
   - Check Network tab for script load

### Script Not Loading

1. **Verify script URL:**
   ```
   https://plausible.io/js/script.js
   ```

2. **Check CSP headers:**
   - Allow `plausible.io` in Content-Security-Policy

3. **Check self-hosting:**
   - If self-hosted, update `PLAUSIBLE_API_HOST`

---

## API Integration (Optional)

For server-side tracking or dashboard integration:

1. Generate API key in Plausible settings
2. Store in Supabase secrets
3. Use in edge functions or server routes

**Example: Fetch Stats**
```javascript
const response = await fetch('https://plausible.io/api/v1/stats/aggregate', {
  headers: {
    'Authorization': `Bearer ${PLAUSIBLE_API_KEY}`,
  },
  params: {
    site_id: 'devmart.sr',
    period: '30d',
    metrics: 'visitors,pageviews,bounce_rate',
  },
});
```

---

## Resources

- [Plausible Documentation](https://plausible.io/docs)
- [Plausible Events API](https://plausible.io/docs/events-api)
- [Plausible Stats API](https://plausible.io/docs/stats-api)
- [Self-Hosting Guide](https://plausible.io/docs/self-hosting)

---

**Status:** ✅ Phase 3.4 Complete  
**Next:** Phase 3.5 - Error Handling & Boundaries
