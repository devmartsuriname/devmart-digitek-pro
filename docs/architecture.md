# Architecture Documentation – Devmart Digtek Pro

**Architecture Pattern:** Ports and Adapters (Hexagonal Architecture)  
**Goal:** Migration-ready, vendor-agnostic, testable, maintainable  
**Stack:** React + Vite, Tailwind CSS, Supabase (via adapters), Resend, Plausible

---

## Authentication Flow

### Authentication System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  Public Routes (/)                           │
│  - Home, About, Services, Portfolio, Blog, Contact, etc.    │
│  - Header shows "Login" button when not authenticated        │
└─────────────────────────────────────────────────────────────┘
                               ↓
┌─────────────────────────────────────────────────────────────┐
│                  Auth Page (/auth)                           │
│  - Login Form (email + password)                             │
│  - Signup Form (email + password + confirm)                  │
│  - Tab toggle between Login/Signup                           │
│  - Redirects authenticated users to /admin/dashboard         │
└─────────────────────────────────────────────────────────────┘
                               ↓
┌─────────────────────────────────────────────────────────────┐
│              AuthContext (Session Management)                │
│  - useAuth hook provides: user, session, loading             │
│  - signIn(email, password) → authenticate user               │
│  - signUp(email, password) → register new user               │
│  - signOut() → clear session, redirect to /auth              │
│  - onAuthStateChange listener → auto-refresh tokens          │
└─────────────────────────────────────────────────────────────┘
                               ↓
┌─────────────────────────────────────────────────────────────┐
│              ProtectedRoute (Route Guard)                    │
│  - Checks auth state using useAuth hook                      │
│  - Shows loading spinner while checking session              │
│  - Redirects unauthenticated users to /auth                  │
│  - Allows authenticated users to access protected routes     │
└─────────────────────────────────────────────────────────────┘
                               ↓
┌─────────────────────────────────────────────────────────────┐
│           Admin Routes (/admin/*)                            │
│  ┌─────────────────┬────────────────────────────────────┐   │
│  │  Left Sidebar   │    Main Content Area               │   │
│  │  (250px)        │    (Dynamic Width)                 │   │
│  │                 │                                    │   │
│  │  📊 Dashboard   │  - Dashboard (stats, actions)      │   │
│  │  🛠️ Services    │  - Content modules (CRUD)          │   │
│  │  📁 Projects    │  - Forms, tables, editors          │   │
│  │  📝 Blog        │  - Media upload interfaces         │   │
│  │  👥 Team        │  - Settings panels                 │   │
│  │  ❓ FAQ         │                                    │   │
│  │  🖼️ Media       │                                    │   │
│  │  📧 Leads       │                                    │   │
│  │  ⚙️ Settings    │                                    │   │
│  └─────────────────┴────────────────────────────────────┘   │
│  Top Header: Logo | View Site | User Email | Logout         │
└─────────────────────────────────────────────────────────────┘
```

### Session Persistence

The Supabase client is pre-configured with:
- **localStorage storage:** Sessions persist across page reloads
- **persistSession: true:** Maintains session state
- **autoRefreshToken: true:** Automatically refreshes expired tokens

AuthContext listens to `onAuthStateChange` to:
- Update user/session state when tokens refresh
- Handle `SIGNED_OUT` event to clear state
- Sync auth state across browser tabs

### Security Features

✅ **Input Validation:** Zod schemas prevent injection attacks  
✅ **Session Management:** Handled by Supabase (secure, httpOnly tokens)  
✅ **Password Storage:** Bcrypt hashing via Supabase Auth  
✅ **HTTPS Required:** Enforced in production  
✅ **Email Validation:** Regex + Supabase validation  
✅ **Rate Limiting:** Built-in Supabase Auth rate limiting  
✅ **Role Separation:** Roles stored in `user_roles` table with RLS  

---

## Admin Layout Architecture

### Admin Interface Structure (Phase 1.3.1 Complete)

```
┌───────────────────────────────────────────────────────────────────┐
│                        Top Header (Fixed)                         │
│  [☰] [Logo] Devmart Admin    [🌐 View Site] [User] [Logout]      │
└───────────────────────────────────────────────────────────────────┘
        ↓                                    ↓
┌──────────────────┬────────────────────────────────────────────────┐
│  Left Sidebar    │         Main Content Area                      │
│  (250px, Fixed)  │         (Dynamic, Scrollable)                  │
│                  │                                                │
│  📊 Dashboard    │  ┌──────────────────────────────────────────┐ │
│  🛠️ Services     │  │  <Outlet />                              │ │
│  📁 Projects     │  │  - Current route component renders here │ │
│  📝 Blog         │  │  - Dashboard, Forms, Tables, Editors    │ │
│  👥 Team         │  │  - Full height, scrollable content      │ │
│  ❓ FAQ          │  └──────────────────────────────────────────┘ │
│  🖼️ Media        │                                                │
│  📧 Leads        │                                                │
│  ⚙️ Settings     │                                                │
│                  │                                                │
└──────────────────┴────────────────────────────────────────────────┘
```

### Responsive Behavior

**Desktop (≥992px):**
- Sidebar: Fixed, always visible, 250px wide
- Main content: Dynamic width, left margin 250px
- Toggle: Not visible

**Tablet (768-991px):**
- Sidebar: Overlay drawer, hidden by default
- Main content: Full width, no margin
- Toggle: Hamburger button visible in header
- Overlay: Semi-transparent backdrop with blur

**Mobile (<768px):**
- Sidebar: Full-screen drawer (280px), hidden by default
- Main content: Full width
- Toggle: Hamburger button visible in header
- Overlay: Full-screen backdrop with blur
- Auto-close: Sidebar closes on navigation click

### Sidebar Navigation Items

| Route | Icon | Label | Phase |
|-------|------|-------|-------|
| `/admin/dashboard` | `bi-speedometer2` | Dashboard | 1.3 ✅ |
| `/admin/services` | `bi-gear` | Services | 2.1 |
| `/admin/projects` | `bi-folder` | Projects | 2.2 |
| `/admin/blog` | `bi-file-text` | Blog | 2.3 |
| `/admin/team` | `bi-people` | Team | 2.4 |
| `/admin/faq` | `bi-question-circle` | FAQ | 2.5 |
| `/admin/media` | `bi-image` | Media | 2.6 |
| `/admin/leads` | `bi-envelope` | Leads | 2.7 |
| `/admin/settings` | `bi-gear-fill` | Settings | 2.8 |

### Styling Tokens (Digtek Theme)

```css
/* Sidebar */
background: #17012C;           /* var(--header) */
border-right: 1px solid rgba(255, 255, 255, 0.1);

/* Navigation Links */
color: #FFFFFF;                /* Default text */
font-size: 15px;
padding: 12px 20px;
transition: all 0.3s ease;

/* Active Link */
background: rgba(106, 71, 237, 0.15);  /* var(--theme) with alpha */
color: #6A47ED;                         /* var(--theme) */
border-left: 3px solid #6A47ED;
box-shadow: 0 0 15px rgba(106, 71, 237, 0.3);

/* Hover Link */
background: rgba(106, 71, 237, 0.1);
color: #FFFFFF;

/* Mobile Overlay */
background: rgba(0, 0, 0, 0.5);
backdrop-filter: blur(5px);
z-index: 1030;

/* Sidebar Z-Index */
z-index: 1040;
```

### Component Files

- **AdminLayout:** `src/Layout/AdminLayout.jsx`
  - Main container with flex layout
  - Top header (logo, toggle, user menu)
  - Sidebar integration
  - Main content area with `<Outlet />`
  - Responsive state management

- **AdminSidebar:** `src/Components/Admin/AdminSidebar.jsx`
  - Navigation menu with 9 items
  - Active route highlighting via `NavLink`
  - Mobile overlay with click-to-close
  - Custom scrollbar styling
  - Bootstrap Icons integration

### State Management

```jsx
// AdminLayout.jsx
const [sidebarOpen, setSidebarOpen] = useState(false);

// Toggle sidebar
const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

// Close sidebar (mobile)
const closeSidebar = () => setSidebarOpen(false);

// Auto-close on desktop resize
useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth >= 992 && sidebarOpen) {
      setSidebarOpen(false);
    }
  };
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, [sidebarOpen]);
```

---

## Active Home Page

**Primary Landing Page:** Home-3 (Digtek React Template Home-3 variant)
- **Route:** `/` (root)
- **Layout:** Layout2 (Header2 + Footer2)
- **Components:** HeroBanner3, Services2, WhyChoose2, WhyChoose3, Marquee2, Marquee3, CaseStudy3, Team1, Testimonial3, Counter2, Cta1, Blog1

**Note:** Home Version 1 and Home Version 2 have been removed from the codebase. Only Home-3 remains as the authoritative landing page per PRD requirements.

---

## Core Principles

1. **Separation of Concerns:** UI, business logic, and data access are strictly separated
2. **Dependency Inversion:** High-level modules don't depend on low-level modules; both depend on abstractions
3. **Provider Agnostic:** No direct SDK imports in UI components; all providers accessed via adapters
4. **Type Safety:** TypeScript strict mode; Zod for runtime validation
5. **Testability:** Mock implementations for all external dependencies

---

## Architecture Layers

```
┌─────────────────────────────────────────────────────────────┐
│                        UI Layer (React)                      │
│  - Pages, Components, Hooks                                  │
│  - No direct API calls or provider SDKs                      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      Services Layer                          │
│  - Business logic, validation, workflows                     │
│  - Uses repositories via interfaces                          │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                   Repository Interfaces                      │
│  - IServiceRepository, IProjectRepository, etc.              │
│  - DTOs (Data Transfer Objects) with Zod schemas            │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    Adapter Layer                             │
│  - Supabase adapters (SupabaseServiceRepository, etc.)       │
│  - Mock adapters (for testing/dev)                           │
│  - Resend email adapter, Plausible analytics adapter         │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                   External Providers                         │
│  - Supabase (DB, Auth, Storage)                              │
│  - Resend (Email)                                            │
│  - Plausible (Analytics)                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## Folder Structure

```
src/
├── Components/              # Digtek template components (pixel-perfect)
│   ├── About/
│   ├── Blog/
│   ├── CaseStudy/
│   ├── Services/
│   ├── Team/
│   ├── Testimonial/
│   └── ...
│
├── Pages/                   # Public pages (Home-3, About, Services, etc.)
│   ├── Home3.jsx            # Primary landing page (root)
│   ├── AboutPage.jsx
│   ├── ServicesPage.jsx
│   ├── BlogPage.jsx
│   └── ...
│
├── admin/                   # Admin CMS (new)
│   ├── layout/
│   │   ├── AdminLayout.jsx
│   │   ├── Sidebar.jsx
│   │   └── Header.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── ServicesList.jsx
│   │   ├── ServiceForm.jsx
│   │   ├── ProjectsList.jsx
│   │   ├── BlogList.jsx
│   │   └── ...
│   └── components/
│       ├── DataTable.jsx
│       ├── RichTextEditor.jsx
│       └── ImageUpload.jsx
│
├── lib/                     # Core library (migration-ready)
│   ├── repos/               # Repository interfaces (DB-agnostic)
│   │   ├── IServiceRepository.ts
│   │   ├── IProjectRepository.ts
│   │   ├── IBlogRepository.ts
│   │   ├── ITeamRepository.ts
│   │   ├── IFAQRepository.ts
│   │   ├── ILeadRepository.ts
│   │   ├── IMediaRepository.ts
│   │   └── ISettingsRepository.ts
│   │
│   ├── adapters/            # Provider-specific implementations
│   │   ├── supabase/        # Supabase adapters
│   │   │   ├── ServiceRepository.ts
│   │   │   ├── ProjectRepository.ts
│   │   │   ├── BlogRepository.ts
│   │   │   └── ...
│   │   └── mock/            # Mock adapters (for testing)
│   │       ├── MockServiceRepository.ts
│   │       └── ...
│   │
│   ├── services/            # Business logic layer
│   │   ├── ServiceService.ts
│   │   ├── ProjectService.ts
│   │   ├── BlogService.ts
│   │   └── ...
│   │
│   ├── schemas/             # Zod DTOs and validation schemas
│   │   ├── service.ts
│   │   ├── project.ts
│   │   ├── blog.ts
│   │   ├── team.ts
│   │   ├── lead.ts
│   │   └── ...
│   │
│   ├── storage/             # Storage adapter (Supabase/Cloudinary)
│   │   ├── IStorageAdapter.ts
│   │   └── SupabaseStorageAdapter.ts
│   │
│   ├── email/               # Email adapter (Resend/SendGrid)
│   │   ├── IEmailAdapter.ts
│   │   └── ResendAdapter.ts
│   │
│   ├── analytics/           # Analytics adapter (Plausible/GA4)
│   │   ├── IAnalyticsAdapter.ts
│   │   └── PlausibleAdapter.ts
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useServices.ts
│   │   ├── useProjects.ts
│   │   └── ...
│   │
│   ├── utils/               # Utility functions
│   │   ├── slugify.ts
│   │   ├── formatDate.ts
│   │   └── ...
│   │
│   └── config.ts            # Centralized configuration
│
├── integrations/            # Provider SDKs (isolated)
│   └── supabase/
│       ├── client.ts
│       └── types.ts
│
├── Routes/                  # Route definitions
│   └── Routes.jsx
│
├── Layout/                  # Public layout wrappers
│   ├── Main.jsx
│   └── Layout2.jsx
│
└── assets/                  # Static assets
    └── main.css             # Global styles (Digtek template)
```

---

## Repository Pattern (Ports)

### Interface Definition

**Location:** `src/lib/repos/IServiceRepository.ts`

```typescript
import { Service, CreateServiceDTO, UpdateServiceDTO, ServiceFilters } from '../schemas/service';

export interface IServiceRepository {
  /**
   * Get all services with optional filters
   */
  getAll(filters?: ServiceFilters): Promise<Service[]>;

  /**
   * Get a single service by slug
   */
  getBySlug(slug: string): Promise<Service | null>;

  /**
   * Create a new service
   */
  create(data: CreateServiceDTO): Promise<Service>;

  /**
   * Update an existing service
   */
  update(id: string, data: UpdateServiceDTO): Promise<Service>;

  /**
   * Delete a service by id
   */
  delete(id: string): Promise<void>;

  /**
   * Count total services (for pagination)
   */
  count(filters?: ServiceFilters): Promise<number>;
}
```

### Adapter Implementation (Supabase)

**Location:** `src/lib/adapters/supabase/ServiceRepository.ts`

```typescript
import { supabase } from '@/integrations/supabase/client';
import { IServiceRepository } from '@/lib/repos/IServiceRepository';
import { Service, CreateServiceDTO, UpdateServiceDTO, ServiceFilters } from '@/lib/schemas/service';

export class SupabaseServiceRepository implements IServiceRepository {
  async getAll(filters?: ServiceFilters): Promise<Service[]> {
    let query = supabase.from('services').select('*');

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    if (filters?.search) {
      query = query.ilike('title', `%${filters.search}%`);
    }

    const { data, error } = await query.order('order_num', { ascending: true });

    if (error) throw new Error(`Failed to fetch services: ${error.message}`);
    return data as Service[];
  }

  async getBySlug(slug: string): Promise<Service | null> {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to fetch service: ${error.message}`);
    }

    return data as Service | null;
  }

  async create(data: CreateServiceDTO): Promise<Service> {
    const { data: newService, error } = await supabase
      .from('services')
      .insert(data)
      .select()
      .single();

    if (error) throw new Error(`Failed to create service: ${error.message}`);
    return newService as Service;
  }

  async update(id: string, data: UpdateServiceDTO): Promise<Service> {
    const { data: updatedService, error } = await supabase
      .from('services')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update service: ${error.message}`);
    return updatedService as Service;
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (error) throw new Error(`Failed to delete service: ${error.message}`);
  }

  async count(filters?: ServiceFilters): Promise<number> {
    let query = supabase.from('services').select('*', { count: 'exact', head: true });

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    const { count, error } = await query;
    if (error) throw new Error(`Failed to count services: ${error.message}`);
    return count || 0;
  }
}
```

### Mock Implementation (Testing)

**Location:** `src/lib/adapters/mock/MockServiceRepository.ts`

```typescript
import { IServiceRepository } from '@/lib/repos/IServiceRepository';
import { Service, CreateServiceDTO, UpdateServiceDTO, ServiceFilters } from '@/lib/schemas/service';

export class MockServiceRepository implements IServiceRepository {
  private services: Service[] = [
    {
      id: '1',
      slug: 'web-development',
      title: 'Web Development',
      summary: 'Custom websites and web applications',
      body: 'Full body content...',
      icon_url: '/assets/img/icon/01.svg',
      seo_title: 'Web Development Services',
      seo_desc: 'Professional web development services',
      order_num: 1,
      status: 'published',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    // ... more mock data
  ];

  async getAll(filters?: ServiceFilters): Promise<Service[]> {
    let filtered = this.services;

    if (filters?.status) {
      filtered = filtered.filter((s) => s.status === filters.status);
    }

    if (filters?.search) {
      filtered = filtered.filter((s) =>
        s.title.toLowerCase().includes(filters.search!.toLowerCase())
      );
    }

    return Promise.resolve(filtered);
  }

  async getBySlug(slug: string): Promise<Service | null> {
    const service = this.services.find((s) => s.slug === slug);
    return Promise.resolve(service || null);
  }

  async create(data: CreateServiceDTO): Promise<Service> {
    const newService: Service = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.services.push(newService);
    return Promise.resolve(newService);
  }

  async update(id: string, data: UpdateServiceDTO): Promise<Service> {
    const index = this.services.findIndex((s) => s.id === id);
    if (index === -1) throw new Error('Service not found');

    this.services[index] = {
      ...this.services[index],
      ...data,
      updated_at: new Date().toISOString(),
    };

    return Promise.resolve(this.services[index]);
  }

  async delete(id: string): Promise<void> {
    this.services = this.services.filter((s) => s.id !== id);
    return Promise.resolve();
  }

  async count(filters?: ServiceFilters): Promise<number> {
    const filtered = await this.getAll(filters);
    return Promise.resolve(filtered.length);
  }
}
```

---

## DTO & Validation (Zod Schemas)

**Location:** `src/lib/schemas/service.ts`

```typescript
import { z } from 'zod';

// Database model
export const ServiceSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  title: z.string(),
  summary: z.string().nullable(),
  body: z.string().nullable(),
  icon_url: z.string().nullable(),
  seo_title: z.string().nullable(),
  seo_desc: z.string().nullable(),
  order_num: z.number().int(),
  status: z.enum(['draft', 'published']),
  created_at: z.string(),
  updated_at: z.string(),
});

// Create DTO (input)
export const CreateServiceSchema = z.object({
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens')
    .min(1, 'Slug is required'),
  title: z.string().min(1, 'Title is required').max(200, 'Title must be 200 characters or less'),
  summary: z.string().max(500, 'Summary must be 500 characters or less').optional(),
  body: z.string().optional(),
  icon_url: z.string().url('Invalid icon URL').optional(),
  seo_title: z.string().max(60, 'SEO title must be 60 characters or less').optional(),
  seo_desc: z.string().max(160, 'SEO description must be 160 characters or less').optional(),
  order_num: z.number().int().default(0),
  status: z.enum(['draft', 'published']).default('draft'),
});

// Update DTO (partial)
export const UpdateServiceSchema = CreateServiceSchema.partial();

// Filters
export const ServiceFiltersSchema = z.object({
  status: z.enum(['draft', 'published']).optional(),
  search: z.string().optional(),
  limit: z.number().int().positive().optional(),
  offset: z.number().int().nonnegative().optional(),
});

// Type exports
export type Service = z.infer<typeof ServiceSchema>;
export type CreateServiceDTO = z.infer<typeof CreateServiceSchema>;
export type UpdateServiceDTO = z.infer<typeof UpdateServiceSchema>;
export type ServiceFilters = z.infer<typeof ServiceFiltersSchema>;
```

---

## Services Layer (Business Logic)

**Location:** `src/lib/services/ServiceService.ts`

```typescript
import { IServiceRepository } from '@/lib/repos/IServiceRepository';
import { CreateServiceDTO, UpdateServiceDTO, ServiceFilters } from '@/lib/schemas/service';
import { slugify } from '@/lib/utils/slugify';

export class ServiceService {
  constructor(private repository: IServiceRepository) {}

  /**
   * Get all published services (public)
   */
  async getPublishedServices() {
    return this.repository.getAll({ status: 'published' });
  }

  /**
   * Get service by slug (public)
   */
  async getServiceBySlug(slug: string) {
    const service = await this.repository.getBySlug(slug);
    if (!service || service.status !== 'published') {
      throw new Error('Service not found');
    }
    return service;
  }

  /**
   * Create service with auto-slug (admin)
   */
  async createService(data: CreateServiceDTO) {
    // Auto-generate slug if not provided
    if (!data.slug) {
      data.slug = slugify(data.title);
    }

    // Check slug uniqueness
    const existing = await this.repository.getBySlug(data.slug);
    if (existing) {
      throw new Error('A service with this slug already exists');
    }

    return this.repository.create(data);
  }

  /**
   * Update service (admin)
   */
  async updateService(id: string, data: UpdateServiceDTO) {
    return this.repository.update(id, data);
  }

  /**
   * Delete service (admin)
   */
  async deleteService(id: string) {
    return this.repository.delete(id);
  }

  /**
   * Search services (admin)
   */
  async searchServices(filters: ServiceFilters) {
    return this.repository.getAll(filters);
  }
}
```

---

## Dependency Injection (React Hooks)

**Location:** `src/lib/hooks/useServices.ts`

```typescript
import { useState, useEffect } from 'react';
import { ServiceService } from '@/lib/services/ServiceService';
import { SupabaseServiceRepository } from '@/lib/adapters/supabase/ServiceRepository';
import { Service, ServiceFilters } from '@/lib/schemas/service';

// Create service instance (singleton)
const serviceRepository = new SupabaseServiceRepository();
const serviceService = new ServiceService(serviceRepository);

export function useServices(filters?: ServiceFilters) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        setLoading(true);
        const data = await serviceService.searchServices(filters || {});
        setServices(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch services');
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, [filters]);

  return { services, loading, error };
}

export function useService(slug: string) {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchService() {
      try {
        setLoading(true);
        const data = await serviceService.getServiceBySlug(slug);
        setService(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch service');
      } finally {
        setLoading(false);
      }
    }

    fetchService();
  }, [slug]);

  return { service, loading, error };
}
```

---

## Configuration Management

**Location:** `src/lib/config.ts`

```typescript
// Centralized configuration with environment toggles

export const config = {
  // Supabase
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },

  // Email Provider (toggle)
  email: {
    provider: import.meta.env.VITE_EMAIL_PROVIDER || 'resend', // 'resend' | 'sendgrid'
    resendApiKey: import.meta.env.VITE_RESEND_API_KEY,
    sendgridApiKey: import.meta.env.VITE_SENDGRID_API_KEY,
    fromEmail: import.meta.env.VITE_FROM_EMAIL || 'noreply@devmart.sr',
    toEmail: import.meta.env.VITE_TO_EMAIL || 'info@devmart.sr',
  },

  // Analytics Provider (toggle)
  analytics: {
    provider: import.meta.env.VITE_ANALYTICS_PROVIDER || 'plausible', // 'plausible' | 'ga4'
    plausibleDomain: import.meta.env.VITE_PLAUSIBLE_DOMAIN,
    ga4MeasurementId: import.meta.env.VITE_GA4_MEASUREMENT_ID,
  },

  // CDN/Storage Provider (toggle)
  cdn: {
    provider: import.meta.env.VITE_CDN_PROVIDER || 'supabase', // 'supabase' | 'cloudinary'
    cloudinaryCloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  },

  // App Settings
  app: {
    name: 'Devmart Suriname',
    url: import.meta.env.VITE_APP_URL || 'https://devmart.sr',
    env: import.meta.env.MODE, // 'development' | 'production'
  },
};

// Validation: throw error if required vars are missing
if (!config.supabase.url || !config.supabase.anonKey) {
  throw new Error('Missing Supabase configuration. Check .env file.');
}
```

---

## Migration Strategy

### From Supabase to Another Provider (Example: PlanetScale + MySQL)

**Step 1:** Create new adapter
```typescript
// src/lib/adapters/planetscale/ServiceRepository.ts
import { IPlanetScaleClient } from './client';
import { IServiceRepository } from '@/lib/repos/IServiceRepository';

export class PlanetScaleServiceRepository implements IServiceRepository {
  constructor(private db: IPlanetScaleClient) {}

  async getAll(filters) {
    const query = 'SELECT * FROM services WHERE status = ?';
    const rows = await this.db.execute(query, [filters?.status || 'published']);
    return rows;
  }

  // ... implement other methods
}
```

**Step 2:** Update hook to use new adapter
```typescript
// src/lib/hooks/useServices.ts
import { PlanetScaleServiceRepository } from '@/lib/adapters/planetscale/ServiceRepository';

const serviceRepository = new PlanetScaleServiceRepository(planetScaleClient);
const serviceService = new ServiceService(serviceRepository);
```

**Step 3:** No UI changes required!

---

## Testing Strategy

### Unit Tests (Repository)
```typescript
// src/lib/adapters/supabase/ServiceRepository.test.ts
import { describe, it, expect, vi } from 'vitest';
import { SupabaseServiceRepository } from './ServiceRepository';

describe('SupabaseServiceRepository', () => {
  it('should fetch all published services', async () => {
    const mockSupabase = {
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            order: vi.fn().mockResolvedValue({
              data: [{ id: '1', title: 'Web Development', status: 'published' }],
              error: null,
            }),
          }),
        }),
      }),
    };

    const repo = new SupabaseServiceRepository(mockSupabase);
    const services = await repo.getAll({ status: 'published' });

    expect(services).toHaveLength(1);
    expect(services[0].title).toBe('Web Development');
  });
});
```

### Integration Tests (Service Layer)
```typescript
// src/lib/services/ServiceService.test.ts
import { describe, it, expect } from 'vitest';
import { ServiceService } from './ServiceService';
import { MockServiceRepository } from '@/lib/adapters/mock/MockServiceRepository';

describe('ServiceService', () => {
  it('should create service with auto-slug', async () => {
    const repo = new MockServiceRepository();
    const service = new ServiceService(repo);

    const newService = await service.createService({
      title: 'App Development',
      summary: 'Mobile apps',
    });

    expect(newService.slug).toBe('app-development');
  });

  it('should throw error for duplicate slug', async () => {
    const repo = new MockServiceRepository();
    const service = new ServiceService(repo);

    await service.createService({ title: 'Web Dev', slug: 'web-dev' });

    await expect(
      service.createService({ title: 'Web Dev 2', slug: 'web-dev' })
    ).rejects.toThrow('A service with this slug already exists');
  });
});
```

---

## Performance Considerations

### Code Splitting
- Lazy load admin routes: `const AdminDashboard = React.lazy(() => import('@/admin/pages/Dashboard'))`
- Suspense boundaries with loading skeletons

### Caching Strategy
- **React Query** (optional) for server state management with caching
- **SWR** (optional) for stale-while-revalidate pattern

### Bundle Optimization
- Tree-shaking: Only import used functions
- Dynamic imports for heavy libraries (e.g., rich text editor)

---

## Security Best Practices

1. **Never store secrets in code:** Use `.env` and config.ts
2. **Validate all inputs:** Zod schemas on all DTOs
3. **RLS enforcement:** All queries via Supabase RLS
4. **Role checks server-side:** Never trust client-side role state
5. **HTTPS only:** Enforce SSL in production
6. **CORS configuration:** Restrict to production domain

---

## Documentation Maintenance

After every implementation step:
1. Update `/docs/architecture.md` with new patterns/folders
2. Update `/docs/backend.md` with schema changes
3. Append to `/docs/changelog.md` with what changed

---

## Status

**Current Version:** 0.7.0  
**Phase:** Phase 2.2 Complete ✅ (Services + Projects CRUD Complete)  
**Next Steps:** Phase 2.3 - Blog CRUD Module (MDX Editor + Tags + Featured Posts)  
**Last Updated:** 2025-01-05

---

## Phase 2: CRUD Modules Implementation

### Phase 2.1: Services CRUD ✅ (v0.6.0)

**Architecture:** Hook (useServices) → Repository (SupabaseServiceRepository) → Supabase  
**Components:** ServiceForm, ServiceTable, Services page  
**Features:**
- Create, read, update, delete services
- Slug auto-generation from title
- Preview mode for content review
- Status filtering (draft/published)
- Search by title
- Order-based sorting
- Zod validation with inline errors

**Files Created:**
- `src/lib/hooks/useServices.ts`
- `src/Components/Admin/Forms/ServiceForm.jsx`
- `src/Components/Admin/Tables/ServiceTable.jsx`
- `src/Pages/Admin/Services.jsx` (updated)

---

### Phase 2.2: Projects CRUD ✅ (v0.7.0)

**Architecture:** Hook (useProjects) → Repository (SupabaseProjectRepository) → Supabase  
**Components:** ProjectForm, ProjectTable, Projects page, DatePicker, FeaturedToggle, TechStackChips, GalleryManager  
**Features:**
- Create, read, update, delete projects
- Gallery management (image URLs with preview)
- Tech stack tagging (multi-select chips)
- Featured toggle (homepage display)
- Date picker (completion date)
- Client field
- Status filtering (draft/published)
- Featured filtering (all/featured/not featured)
- Tech filtering (search by tech name)
- Search by title
- Zod validation with inline errors

**Files Created:**
- `src/lib/hooks/useProjects.ts`
- `src/Components/Admin/Forms/ProjectForm.jsx`
- `src/Components/Admin/Tables/ProjectTable.jsx`
- `src/Components/Admin/Forms/DatePicker.jsx`
- `src/Components/Admin/Forms/FeaturedToggle.jsx`
- `src/Components/Admin/Forms/TechStackChips.jsx`
- `src/Components/Admin/Forms/GalleryManager.jsx`
- `src/Pages/Admin/Projects.jsx` (updated)

**Reusable Components:**
- DatePicker: Native HTML5 date input (dark mode styled)
- FeaturedToggle: Bootstrap switch for featured flag
- TechStackChips: Multi-tag input with keyboard shortcuts
- GalleryManager: Image URL manager with preview grid
