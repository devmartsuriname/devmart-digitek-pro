# Devmart Digtek Pro

Modern digital marketing agency website built with React, Tailwind CSS, and Supabase. Features a pixel-perfect implementation of the Digtek React template (Home-3) with a full-featured admin CMS for content management.

![Devmart Digtek Pro](https://a7bd6632-f5a5-4607-a676-cdb92b324573.lovableproject.com/assets/img/hero/hero-image-3.png)

## ✨ Features

- 🎨 **Pixel-perfect Design** - Digtek React template (Home-3) implementation
- 🔐 **Role-based Admin CMS** - Three access levels (Admin, Editor, Viewer)
- 📝 **Full Content Management**
  - Services management with rich text editor
  - Portfolio/Projects with gallery and tech stack
  - Blog with MDX support, tags, and view tracking
  - Team members with social links
  - FAQ with categories
  - Media library with drag-drop upload
- 📧 **Lead Capture** - Contact forms with email notifications via Resend
- 🔍 **SEO Optimized**
  - JSON-LD structured data (Organization, Service, Article, etc.)
  - OpenGraph and Twitter Card meta tags
  - Automatic sitemap generation
  - Canonical URLs
- 📊 **Analytics** - Privacy-first Plausible Analytics integration
- ♿ **Accessibility** - WCAG 2.1 AA compliant with keyboard navigation
- 🚀 **Performance** - Code splitting, lazy loading, optimized images
- 🔒 **Security** - Row-Level Security (RLS) policies on all tables

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router 7** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Bootstrap 5** - Component styling (template requirement)
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **React Hot Toast** - Toast notifications

### Backend
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Authentication & user management
  - Storage for media files
  - Edge Functions for serverless logic
- **Resend** - Transactional email service
- **Plausible** - Privacy-friendly analytics

### Development
- **ESLint** - Code linting
- **Rollup Plugin Visualizer** - Bundle analysis

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Supabase account
- Resend API key (for email notifications)
- Plausible account (optional, for analytics)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/devmartsuriname/devmart-digitek-pro.git
   cd devmart-digitek-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your credentials:
   ```bash
   VITE_SUPABASE_URL=your-supabase-project-url
   VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-anon-key
   VITE_SUPABASE_PROJECT_ID=your-project-id
   VITE_PLAUSIBLE_DOMAIN=yourdomain.com  # optional
   ```

4. **Set up Supabase**
   - Create a new Supabase project
   - Run the migrations from `supabase/migrations/` in order
   - Configure storage buckets (project-covers, blog-covers, team-photos, media-library)
   - Add your Resend API key to Supabase secrets: `RESEND_API_KEY`

5. **Create an admin user**
   - Sign up via `/auth` page
   - In Supabase SQL Editor, run:
     ```sql
     INSERT INTO user_roles (user_id, role)
     VALUES ('your-user-id', 'admin');
     ```

6. **Start development server**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:8080`

## 📁 Project Structure

```
devmart-digitek-pro/
├── public/               # Static assets (images, fonts, etc.)
├── src/
│   ├── Components/       # Reusable UI components
│   │   ├── Admin/        # Admin CMS components
│   │   ├── Auth/         # Authentication components
│   │   ├── Common/       # Shared components
│   │   └── ...           # Template components (Hero, Services, etc.)
│   ├── Pages/            # Page components
│   │   ├── Admin/        # Admin CMS pages
│   │   └── ...           # Public pages
│   ├── Layout/           # Layout wrappers
│   ├── Routes/           # Routing configuration
│   ├── lib/
│   │   ├── adapters/     # Provider adapters (Supabase, Plausible)
│   │   ├── repos/        # Repository interfaces
│   │   ├── schemas/      # Zod validation schemas
│   │   ├── hooks/        # Custom React hooks
│   │   ├── contexts/     # React contexts (Auth, etc.)
│   │   └── utils/        # Utility functions
│   ├── integrations/     # Third-party integrations
│   │   └── supabase/     # Supabase client & types
│   └── assets/           # CSS, images
├── supabase/
│   ├── functions/        # Edge Functions
│   └── migrations/       # Database migrations
└── docs/                 # Project documentation
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run analyze` - Analyze bundle size

### Admin CMS Access

1. Navigate to `/auth`
2. Sign up or log in
3. Access admin dashboard at `/admin`

**Note:** You need an admin role assigned in the `user_roles` table to access the CMS.

### Adding Content

- **Services:** Navigate to Admin → Services
- **Projects:** Navigate to Admin → Projects
- **Blog:** Navigate to Admin → Blog
- **Team:** Navigate to Admin → Team
- **FAQ:** Navigate to Admin → FAQ
- **Media:** Navigate to Admin → Media Library

## 📚 Documentation

- [Product Requirements Document (PRD)](docs/PRD.md) - Project scope and requirements
- [Architecture Guide](docs/architecture.md) - System architecture and design patterns
- [Backend Schema](docs/backend.md) - Database schema and RLS policies
- [Task Breakdown](docs/tasks.md) - Development phases and task list
- [Changelog](docs/changelog.md) - Version history and updates
- [Deployment Guide](docs/deployment.md) - Deployment instructions
- [Content Mapping](docs/content-mapping.md) - Devmart content structure

## 🚢 Deployment

### Staging (Vercel)
```bash
# Connect GitHub repo to Vercel
# Configure environment variables in Vercel dashboard
# Auto-deploy on push to main branch
```

### Production (Hostinger VPS)
```bash
# Build production bundle
npm run build

# Deploy to VPS
# Configure Nginx/Caddy reverse proxy
# Set up SSL with Let's Encrypt
# Configure CDN (Cloudflare)
```

For detailed deployment instructions, see [docs/deployment.md](docs/deployment.md)

## 🧪 Testing

### Performance Testing
```bash
# Build and preview
npm run build
npm run preview

# Run Lighthouse audit in Chrome DevTools
# Target scores: Performance ≥90, SEO ≥95, Accessibility ≥95, Best Practices ≥90
```

### Accessibility Testing
- Keyboard navigation test
- Screen reader test (NVDA/JAWS)
- Color contrast validation
- ARIA labels verification

## 🔒 Security

- Row-Level Security (RLS) enabled on all tables
- Role-based access control (Admin, Editor, Viewer)
- Secure file uploads with bucket policies
- Rate limiting on lead submissions
- Honeypot fields for spam prevention

## 🤝 Contributing

This is a private project for Devmart Suriname. Internal team members can:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

Proprietary - © 2025 Devmart Suriname (Delroy Pelhan). All rights reserved.

## 🙏 Credits

- **Template:** Digtek – Digital Marketing Agency ReactJs Template
- **Owner:** Devmart Suriname
- **Lead Developer:** Delroy Pelhan
- **Platform:** Built with [Lovable](https://lovable.dev)
- **Backend:** Powered by [Supabase](https://supabase.com)

## 📞 Support

For questions or support, contact:
- **Email:** info@devmart.sr
- **Website:** [www.devmart.sr](https://www.devmart.sr)

---

Built with ❤️ by [Devmart Suriname](https://www.devmart.sr)
