# Deployment Guide – Devmart Digtek Pro

**Project:** Devmart Digtek Pro  
**Repository:** https://github.com/devmartsuriname/devmart-digitek-pro  
**Staging:** Vercel (auto-deploy from GitHub)  
**Production:** Hostinger VPS with Nginx reverse proxy, SSL, and Cloudflare CDN

---

## Deployment Strategy Overview

```
Development → GitHub → Vercel (Staging) → Hostinger VPS (Production)
     ↓           ↓            ↓                      ↓
  Local Dev   Version      Preview               Live Site
             Control      Testing             devmart.sr
```

---

## Environment Setup

### Environment Variables

Required environment variables for all environments:

```bash
# Supabase (Lovable Cloud)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Email Provider (Resend)
VITE_EMAIL_PROVIDER=resend
VITE_RESEND_API_KEY=your-resend-api-key
VITE_FROM_EMAIL=noreply@devmart.sr
VITE_TO_EMAIL=info@devmart.sr

# Analytics (Plausible)
VITE_ANALYTICS_PROVIDER=plausible
VITE_PLAUSIBLE_DOMAIN=devmart.sr

# App Configuration
VITE_APP_URL=https://devmart.sr  # Change per environment
VITE_APP_ENV=production           # development | staging | production
```

### Environment-Specific Configurations

**Development (.env.development):**
```bash
VITE_APP_URL=http://localhost:8080
VITE_APP_ENV=development
```

**Staging (.env.staging):**
```bash
VITE_APP_URL=https://devmart-staging.vercel.app
VITE_APP_ENV=staging
```

**Production (.env.production):**
```bash
VITE_APP_URL=https://devmart.sr
VITE_APP_ENV=production
```

---

## Staging Deployment (Vercel)

### Initial Setup

1. **Connect GitHub Repository to Vercel:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import `devmartsuriname/devmart-digitek-pro`
   - Select main branch for production
   - Configure build settings:
     - **Framework Preset:** Vite
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
     - **Install Command:** `npm install`

2. **Configure Environment Variables:**
   - Go to Project Settings → Environment Variables
   - Add all required variables from `.env.example`
   - Set environment scope: **Preview** (for staging)

3. **Enable Preview Deployments:**
   - Settings → Git → Enable automatic preview deployments
   - Every PR will get a unique preview URL
   - Main branch deploys to staging

### Auto-Deploy on Push

Vercel automatically deploys on:
- **Push to main branch** → Staging deployment
- **Pull request creation** → Preview deployment (unique URL per PR)

### Custom Domain (Optional)

To use a custom staging domain:
1. Go to Project Settings → Domains
2. Add `staging.devmart.sr`
3. Configure DNS (CNAME):
   ```
   staging.devmart.sr  CNAME  cname.vercel-dns.com
   ```
4. SSL automatically provisioned by Vercel

### Build Optimization

**Vite Build Settings (`vite.config.js`):**
```javascript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'bootstrap': ['bootstrap', 'react-bootstrap'],
          'slick': ['react-slick', 'slick-carousel'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
```

---

## Production Deployment (Hostinger VPS)

### Prerequisites

- **Hostinger VPS Plan:** VPS 1 or higher (2GB RAM minimum)
- **Domain:** devmart.sr (pointed to VPS IP)
- **Server Access:** SSH with root/sudo privileges

### Server Setup

#### 1. Initial Server Configuration

**Connect via SSH:**
```bash
ssh root@your-vps-ip
```

**Update System:**
```bash
apt update && apt upgrade -y
```

**Install Node.js (v18+):**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs
node -v  # Verify installation
npm -v
```

**Install Nginx:**
```bash
apt install -y nginx
systemctl start nginx
systemctl enable nginx
```

**Install Certbot (SSL):**
```bash
apt install -y certbot python3-certbot-nginx
```

**Install Git:**
```bash
apt install -y git
```

#### 2. Create Deployment User

```bash
adduser deploy
usermod -aG sudo deploy
su - deploy
```

#### 3. Clone Repository

```bash
cd /var/www
sudo mkdir devmart
sudo chown deploy:deploy devmart
cd devmart
git clone https://github.com/devmartsuriname/devmart-digitek-pro.git .
```

#### 4. Install Dependencies & Build

```bash
npm install
npm run build
```

**Build output will be in `/var/www/devmart/dist`**

#### 5. Configure Nginx

**Create Nginx config:**
```bash
sudo nano /etc/nginx/sites-available/devmart
```

**Add configuration:**
```nginx
server {
    listen 80;
    server_name devmart.sr www.devmart.sr;
    
    root /var/www/devmart/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_comp_level 6;
    gzip_min_length 1000;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # React Router fallback (SPA)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy (if needed for edge functions)
    location /api/ {
        proxy_pass https://your-supabase-url.supabase.co/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Deny access to hidden files
    location ~ /\. {
        deny all;
    }
}
```

**Enable site:**
```bash
sudo ln -s /etc/nginx/sites-available/devmart /etc/nginx/sites-enabled/
sudo nginx -t  # Test configuration
sudo systemctl reload nginx
```

#### 6. Configure SSL (Let's Encrypt)

```bash
sudo certbot --nginx -d devmart.sr -d www.devmart.sr
```

**Follow prompts:**
- Enter email for renewal notifications
- Agree to Terms of Service
- Choose whether to redirect HTTP to HTTPS (recommended: Yes)

**Auto-renewal (already configured by Certbot):**
```bash
sudo systemctl status certbot.timer  # Verify timer is active
```

#### 7. Environment Variables

**Create `.env.production`:**
```bash
nano /var/www/devmart/.env.production
```

**Add production environment variables:**
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_EMAIL_PROVIDER=resend
VITE_RESEND_API_KEY=your-resend-api-key
VITE_FROM_EMAIL=noreply@devmart.sr
VITE_TO_EMAIL=info@devmart.sr
VITE_ANALYTICS_PROVIDER=plausible
VITE_PLAUSIBLE_DOMAIN=devmart.sr
VITE_APP_URL=https://devmart.sr
VITE_APP_ENV=production
```

**Rebuild with production env:**
```bash
npm run build
```

---

## CI/CD Pipeline (GitHub Actions)

### Automated Deployment Workflow

**Create `.github/workflows/deploy.yml`:**

```yaml
name: Deploy to Production

on:
  push:
    branches:
      - main
  workflow_dispatch:  # Manual trigger

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build project
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
          VITE_EMAIL_PROVIDER: ${{ secrets.VITE_EMAIL_PROVIDER }}
          VITE_RESEND_API_KEY: ${{ secrets.VITE_RESEND_API_KEY }}
          VITE_FROM_EMAIL: ${{ secrets.VITE_FROM_EMAIL }}
          VITE_TO_EMAIL: ${{ secrets.VITE_TO_EMAIL }}
          VITE_ANALYTICS_PROVIDER: ${{ secrets.VITE_ANALYTICS_PROVIDER }}
          VITE_PLAUSIBLE_DOMAIN: ${{ secrets.VITE_PLAUSIBLE_DOMAIN }}
          VITE_APP_URL: ${{ secrets.VITE_APP_URL }}
          VITE_APP_ENV: production
        run: npm run build
      
      - name: Deploy to VPS
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USERNAME }}
          key: ${{ secrets.VPS_SSH_KEY }}
          source: "dist/*"
          target: "/var/www/devmart/"
          strip_components: 1
      
      - name: Restart Nginx
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USERNAME }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: sudo systemctl reload nginx
```

### GitHub Secrets Configuration

Add the following secrets in GitHub repo settings (Settings → Secrets → Actions):

- `VPS_HOST` - VPS IP address
- `VPS_USERNAME` - SSH user (e.g., deploy)
- `VPS_SSH_KEY` - Private SSH key for authentication
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anon key
- `VITE_RESEND_API_KEY` - Resend API key
- `VITE_FROM_EMAIL` - From email address
- `VITE_TO_EMAIL` - Admin email address
- `VITE_PLAUSIBLE_DOMAIN` - Plausible domain
- `VITE_APP_URL` - Production URL

---

## Cloudflare CDN Configuration

### Setup Cloudflare

1. **Add Domain to Cloudflare:**
   - Sign up at [Cloudflare](https://dash.cloudflare.com/)
   - Add `devmart.sr` as a site
   - Update nameservers at domain registrar to Cloudflare's

2. **DNS Configuration:**
   ```
   Type    Name    Content               Proxy Status
   A       @       your-vps-ip           Proxied (Orange Cloud)
   A       www     your-vps-ip           Proxied (Orange Cloud)
   CNAME   staging cname.vercel-dns.com  Proxied
   ```

3. **SSL/TLS Settings:**
   - SSL/TLS → Overview → **Full (strict)**
   - Edge Certificates → Always Use HTTPS: **On**
   - Minimum TLS Version: **TLS 1.2**

4. **Caching Rules:**
   - Go to Caching → Configuration
   - Browser Cache TTL: **4 hours**
   - Enable Tiered Caching (if available)

5. **Page Rules (optional):**
   ```
   URL Pattern: devmart.sr/*
   Settings:
     - Cache Level: Standard
     - Edge Cache TTL: 2 hours
     - Browser Cache TTL: 4 hours
   ```

6. **Performance Optimization:**
   - Speed → Optimization
   - Auto Minify: Check HTML, CSS, JS
   - Brotli: **On**
   - HTTP/2 to Origin: **On**
   - HTTP/3 (QUIC): **On**

---

## Monitoring & Logging

### Server Monitoring

**Install PM2 (optional for process management):**
```bash
npm install -g pm2
pm2 startup systemd  # Auto-start on reboot
```

**Nginx Logs:**
```bash
# Access logs
sudo tail -f /var/log/nginx/access.log

# Error logs
sudo tail -f /var/log/nginx/error.log
```

### Uptime Monitoring

**Tools:**
- [UptimeRobot](https://uptimerobot.com/) - Free tier (5-minute checks)
- [Pingdom](https://www.pingdom.com/) - Advanced monitoring

**Configure:**
- Monitor: `https://devmart.sr`
- Check interval: 5 minutes
- Alert email: admin@devmart.sr

### Error Tracking

**Install Sentry (optional):**
```bash
npm install @sentry/react
```

**Initialize in `src/main.jsx`:**
```javascript
import * as Sentry from "@sentry/react";

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: "your-sentry-dsn",
    integrations: [new Sentry.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}
```

---

## Backup Strategy

### Database Backups (Supabase)

- **Automatic Backups:** Supabase provides daily snapshots (retention per plan)
- **Manual Backups:** Export schema + data before major changes
  ```bash
  # Export schema
  supabase db dump -f schema.sql

  # Export data
  supabase db dump --data-only -f data.sql
  ```

### Storage Backups

**Sync Supabase Storage to AWS S3/Cloudflare R2 (optional):**
- Use edge functions or cron jobs to mirror uploads
- Retain 30 days of file versions

### Code Backups

- **GitHub Repository:** Primary source of truth
- **Tags/Releases:** Tag major versions (`v1.0.0`, `v2.0.0`)
- **Restore Points:** Documented in `/docs/restore-point.md`

---

## Rollback Procedure

### Rollback to Previous Version

**On VPS:**
```bash
cd /var/www/devmart
git fetch --all
git checkout <commit-hash>  # Or tag like v1.0.0
npm install
npm run build
sudo systemctl reload nginx
```

**On Vercel:**
- Go to Deployments → Select previous successful deployment
- Click "Promote to Production"

---

## Performance Benchmarks

### Target Metrics (Production)

- **Lighthouse Performance:** ≥ 90
- **Lighthouse SEO:** ≥ 95
- **Lighthouse Accessibility:** ≥ 95
- **Lighthouse Best Practices:** ≥ 90
- **Largest Contentful Paint (LCP):** < 2.5s
- **Cumulative Layout Shift (CLS):** < 0.1
- **Interaction to Next Paint (INP):** < 200ms
- **Time to First Byte (TTFB):** < 300ms

### Run Lighthouse Audit

```bash
npm install -g lighthouse
lighthouse https://devmart.sr --view
```

---

## Troubleshooting

### Common Issues

**1. 404 on Refresh (React Router):**
- Verify Nginx `try_files` directive includes `/index.html` fallback
- Check Nginx config: `sudo nginx -t`

**2. Environment Variables Not Loading:**
- Ensure `.env.production` exists and has correct values
- Rebuild: `npm run build`
- Verify `import.meta.env.VITE_*` in code

**3. SSL Certificate Renewal Failed:**
- Check Certbot timer: `sudo systemctl status certbot.timer`
- Manual renewal: `sudo certbot renew --dry-run`
- Ensure ports 80 and 443 are open

**4. Slow Load Times:**
- Enable Gzip/Brotli in Nginx
- Verify Cloudflare caching is active (orange cloud)
- Check image optimization (WebP format, lazy loading)

**5. Database Connection Errors:**
- Verify Supabase URL and anon key in `.env`
- Check Supabase project status
- Review RLS policies (may block queries)

---

## Post-Deployment Checklist

- [ ] Verify site loads at `https://devmart.sr`
- [ ] Test all public pages (Home, Services, Portfolio, Blog, etc.)
- [ ] Test admin login and dashboard access
- [ ] Submit contact form and verify email notification
- [ ] Check analytics tracking (Plausible events)
- [ ] Run Lighthouse audit (targets: Perf ≥90, SEO ≥95, A11y ≥95)
- [ ] Test on mobile devices (iOS, Android)
- [ ] Verify SSL certificate (A+ rating on [SSL Labs](https://www.ssllabs.com/ssltest/))
- [ ] Submit sitemap to Google Search Console
- [ ] Set up uptime monitoring (UptimeRobot)
- [ ] Configure error tracking (Sentry)
- [ ] Test backup/restore procedure
- [ ] Update DNS TTL to normal (3600s after initial deployment)

---

## Maintenance Schedule

### Daily
- Monitor uptime alerts
- Review error logs (Sentry)
- Check Supabase usage

### Weekly
- Review analytics (traffic, conversions)
- Check for security updates (`npm audit`)
- Backup database manually (optional)

### Monthly
- Lighthouse audit
- Review and optimize slow queries
- Update dependencies (`npm update`)
- Review server resource usage (CPU, RAM, Disk)

### Quarterly
- Full security audit
- Review and update content
- Performance optimization review
- Backup testing (restore from backup)

---

## Status

**Current Environment:** Development  
**Staging URL:** (To be configured after Phase 1)  
**Production URL:** (To be configured after Phase 6)  
**Last Updated:** 2025-10-03
