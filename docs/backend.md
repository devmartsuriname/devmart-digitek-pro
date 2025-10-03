# Backend Documentation – Devmart Digtek Pro

**Backend Provider:** Lovable Cloud (Supabase)  
**Database:** PostgreSQL with Row-Level Security (RLS)  
**Storage:** Supabase Storage (public buckets)  
**Auth:** Supabase Auth (email/password)  
**Email:** Resend (via adapter)  
**Analytics:** Plausible (via adapter)

---

## Database Schema

### Tables Overview

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `profiles` | User profiles (linked to auth.users) | id, full_name, avatar_url |
| `user_roles` | Role assignments (admin/editor/viewer) | user_id, role |
| `services` | Services/offerings | slug, title, body, icon_url, status |
| `projects` | Portfolio projects | slug, title, client, gallery, tech, featured |
| `blog_posts` | Blog articles (MDX) | slug, title, body_mdx, tags, featured |
| `team` | Team members | slug, name, role, bio, photo_url, socials |
| `faqs` | FAQ items | category, question, answer, order |
| `media` | Media library | url, alt, width, height, folder |
| `leads` | Contact form submissions | name, email, phone, message, status |
| `settings` | Site configuration (singleton) | site_name, logo_url, social, analytics |

---

## Detailed Schema

### 1. Authentication & Roles

#### `app_role` (enum)
```sql
create type public.app_role as enum ('admin', 'editor', 'viewer');
```

#### `profiles`
```sql
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Trigger to auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
```

#### `user_roles`
```sql
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  created_at timestamp with time zone default now(),
  unique (user_id, role)
);

-- Security definer function to check roles (prevents RLS recursion)
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;
```

---

### 2. Content Tables

#### `services`
```sql
create table public.services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text,
  body text,
  icon_url text,
  seo_title text,
  seo_desc text,
  order_num integer default 0,
  status text check (status in ('draft', 'published')) default 'draft',
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create index idx_services_slug on public.services(slug);
create index idx_services_status on public.services(status);
create index idx_services_order on public.services(order_num);
```

#### `projects`
```sql
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  client text,
  date date,
  cover_url text,
  gallery jsonb default '[]'::jsonb,
  tech text[] default '{}'::text[],
  summary text,
  body text,
  seo_title text,
  seo_desc text,
  featured boolean default false,
  status text check (status in ('draft', 'published')) default 'draft',
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create index idx_projects_slug on public.projects(slug);
create index idx_projects_status on public.projects(status);
create index idx_projects_featured on public.projects(featured);
create index idx_projects_date on public.projects(date desc);
```

#### `blog_posts`
```sql
create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  author_id uuid references public.profiles(id) on delete set null,
  date date default current_date,
  cover_url text,
  tags text[] default '{}'::text[],
  summary text,
  body_mdx text,
  seo_title text,
  seo_desc text,
  featured boolean default false,
  status text check (status in ('draft', 'published')) default 'draft',
  views integer default 0,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create index idx_blog_posts_slug on public.blog_posts(slug);
create index idx_blog_posts_status on public.blog_posts(status);
create index idx_blog_posts_featured on public.blog_posts(featured);
create index idx_blog_posts_date on public.blog_posts(date desc);
create index idx_blog_posts_tags on public.blog_posts using gin(tags);
```

#### `team`
```sql
create table public.team (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  role text,
  bio text,
  photo_url text,
  socials jsonb default '{}'::jsonb,
  order_num integer default 0,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create index idx_team_slug on public.team(slug);
create index idx_team_order on public.team(order_num);
```

#### `faqs`
```sql
create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  category text,
  question text not null,
  answer text,
  order_num integer default 0,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create index idx_faqs_category on public.faqs(category);
create index idx_faqs_order on public.faqs(order_num);
```

#### `media`
```sql
create table public.media (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  alt text,
  width integer,
  height integer,
  type text,
  folder text,
  created_at timestamp with time zone default now()
);

create index idx_media_type on public.media(type);
create index idx_media_folder on public.media(folder);
```

#### `leads`
```sql
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text,
  source text default 'contact_form',
  status text check (status in ('new', 'contacted', 'closed')) default 'new',
  created_at timestamp with time zone default now()
);

create index idx_leads_status on public.leads(status);
create index idx_leads_created_at on public.leads(created_at desc);
```

#### `settings`
```sql
create table public.settings (
  id uuid primary key default gen_random_uuid(),
  site_name text,
  logo_url text,
  theme text default 'light',
  primary_color text default '#6A47ED',
  contact_email text,
  contact_phone text,
  social jsonb default '{}'::jsonb,
  analytics jsonb default '{}'::jsonb,
  meta_title text,
  meta_desc text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Ensure only one settings row exists (singleton pattern)
create unique index idx_settings_singleton on public.settings((id is not null));
```

---

## Row-Level Security (RLS) Policies

### General Policy Pattern

All content tables follow this pattern:

1. **Public Read (Published):** Anonymous and authenticated users can read published content
2. **Admin Full Access:** Admins can perform all operations
3. **Editor Edit:** Editors can create/update draft content
4. **Viewer Read Only:** Viewers can read all content (for internal review)

### Example Policies (for `services`)

```sql
-- Enable RLS
alter table public.services enable row level security;

-- Public can view published services
create policy "Public can view published services"
on public.services
for select
to anon, authenticated
using (status = 'published');

-- Admin full access
create policy "Admin full access to services"
on public.services
for all
to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

-- Editor can create/update drafts
create policy "Editor can create services"
on public.services
for insert
to authenticated
with check (public.has_role(auth.uid(), 'editor'));

create policy "Editor can update draft services"
on public.services
for update
to authenticated
using (
  public.has_role(auth.uid(), 'editor') 
  and status = 'draft'
)
with check (
  public.has_role(auth.uid(), 'editor')
);

-- Viewer can read all (for review)
create policy "Viewer can read all services"
on public.services
for select
to authenticated
using (public.has_role(auth.uid(), 'viewer'));
```

### Settings Table (Admin Only)

```sql
alter table public.settings enable row level security;

create policy "Admin can manage settings"
on public.settings
for all
to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

-- Public can read settings (for site config)
create policy "Public can read settings"
on public.settings
for select
to anon, authenticated
using (true);
```

### Leads Table

```sql
alter table public.leads enable row level security;

-- Public can insert leads (contact form)
create policy "Public can create leads"
on public.leads
for insert
to anon, authenticated
with check (true);

-- Admin and Editor can view/manage leads
create policy "Staff can view leads"
on public.leads
for select
to authenticated
using (
  public.has_role(auth.uid(), 'admin') 
  or public.has_role(auth.uid(), 'editor')
);

create policy "Admin can update leads"
on public.leads
for update
to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));
```

---

## Storage Buckets

### Bucket Configuration

```sql
-- Create public buckets
insert into storage.buckets (id, name, public) values
  ('project-covers', 'project-covers', true),
  ('blog-covers', 'blog-covers', true),
  ('team-photos', 'team-photos', true),
  ('media-library', 'media-library', true);
```

### Storage RLS Policies

```sql
-- Allow authenticated users to upload
create policy "Authenticated users can upload to project-covers"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'project-covers');

-- Allow public read
create policy "Public can read project-covers"
on storage.objects
for select
to public
using (bucket_id = 'project-covers');

-- Allow authenticated users to delete (admin only via app logic)
create policy "Authenticated users can delete project-covers"
on storage.objects
for delete
to authenticated
using (bucket_id = 'project-covers');

-- Repeat for other buckets: blog-covers, team-photos, media-library
```

---

## Edge Functions (Future)

*Placeholder for future edge functions (email, webhooks, scheduled tasks)*

- `send-lead-notification` – Send email when lead is created
- `generate-sitemap` – Scheduled sitemap generation
- `process-image` – Image optimization pipeline

---

## Migration Strategy

All schema changes must be tracked in migration files:

```
supabase/migrations/
  001_create_auth_tables.sql
  002_create_content_tables.sql
  003_create_rls_policies.sql
  004_create_storage_buckets.sql
  005_create_indexes.sql
```

**Migration Naming Convention:**
`{number}_{description}.sql`

**Rollback Strategy:**
Each migration should have a corresponding down migration for rollback.

---

## API Abstraction Layer

### Repository Pattern

All database access goes through repository interfaces defined in `src/lib/repos/`:

```typescript
// src/lib/repos/IServiceRepository.ts
export interface IServiceRepository {
  getAll(filters?: ServiceFilters): Promise<Service[]>;
  getBySlug(slug: string): Promise<Service | null>;
  create(data: CreateServiceDTO): Promise<Service>;
  update(id: string, data: UpdateServiceDTO): Promise<Service>;
  delete(id: string): Promise<void>;
}
```

**Implementation:**
- `src/lib/adapters/supabase/ServiceRepository.ts` (Supabase adapter)
- `src/lib/adapters/mock/ServiceRepository.ts` (Mock for testing)

### DTO Validation (Zod)

All DTOs defined in `src/lib/schemas/`:

```typescript
// src/lib/schemas/service.ts
import { z } from 'zod';

export const CreateServiceSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1).max(200),
  summary: z.string().max(500).optional(),
  body: z.string().optional(),
  icon_url: z.string().url().optional(),
  seo_title: z.string().max(60).optional(),
  seo_desc: z.string().max(160).optional(),
  order_num: z.number().int().default(0),
  status: z.enum(['draft', 'published']).default('draft'),
});

export type CreateServiceDTO = z.infer<typeof CreateServiceSchema>;
```

---

## Email Integration (Resend)

### Adapter Location
`src/lib/email/resend.ts`

### Use Cases
1. **Lead Notification:** Send email to admin when lead is submitted
2. **Welcome Email:** Send to new users on signup (optional)
3. **Password Reset:** Handled by Supabase Auth

### Configuration
```typescript
// src/lib/email/resend.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendLeadNotification(lead: Lead) {
  await resend.emails.send({
    from: 'noreply@devmart.sr',
    to: 'info@devmart.sr',
    subject: `New Lead: ${lead.subject}`,
    html: `<p>Name: ${lead.name}</p><p>Email: ${lead.email}</p><p>Message: ${lead.message}</p>`,
  });
}
```

---

## Analytics Integration (Plausible)

### Adapter Location
`src/lib/analytics/plausible.ts`

### Events to Track
1. Contact form submission
2. CTA clicks (e.g., "Get Started", "View Project")
3. Service page views
4. Project detail views
5. Blog post reads (scroll depth)

### Configuration
```typescript
// src/lib/analytics/plausible.ts
export function trackEvent(eventName: string, props?: Record<string, any>) {
  if (window.plausible) {
    window.plausible(eventName, { props });
  }
}

// Usage
trackEvent('Contact Form Submit', { source: 'homepage' });
```

---

## Performance Considerations

### Database Optimization
- **Indexes:** Added on frequently queried fields (slug, status, featured, date)
- **Pagination:** Implement cursor-based pagination for large lists
- **Caching:** Cache settings table (rarely changes)

### Storage Optimization
- **Image Transforms:** Use Supabase image transformations for responsive images
- **CDN:** Cloudflare CDN for static assets
- **Lazy Loading:** All images below fold

### Query Optimization
- **Selective Columns:** Only fetch required columns (not `SELECT *`)
- **Batch Queries:** Combine related queries where possible
- **Connection Pooling:** Supabase handles automatically

---

## Security Checklist

- [x] RLS enabled on all tables
- [x] Roles stored in separate `user_roles` table (prevents privilege escalation)
- [x] Security definer function for role checks (prevents RLS recursion)
- [ ] Rate limiting on contact form (IP-based)
- [ ] Honeypot field in contact form (anti-spam)
- [ ] Input validation with Zod on all forms
- [ ] HTTPS enforced in production
- [ ] Supabase API keys stored in `.env` (not committed)
- [ ] CORS configured for production domain only
- [ ] SQL injection prevention (parameterized queries)

---

## Testing Strategy

### Unit Tests
- Repository implementations (mock Supabase client)
- DTO validation (Zod schemas)
- Utility functions

### Integration Tests
- Auth flow (signup, login, logout)
- CRUD operations with RLS (different roles)
- File upload/download
- Email sending (mock Resend)

### E2E Tests (Optional)
- Full user journeys (Playwright/Cypress)
- Admin workflows (create service → publish → verify on public site)

---

## Monitoring & Logging

### Error Tracking
- **Sentry** (or similar) for runtime errors
- **Supabase Logs** for database queries/errors

### Uptime Monitoring
- **UptimeRobot** or **Pingdom** for availability checks

### Performance Monitoring
- **Lighthouse CI** for continuous performance audits
- **Vercel Analytics** for Core Web Vitals

---

## Backup & Recovery

### Database Backups
- **Supabase Automatic Backups:** Daily snapshots (retained per plan)
- **Manual Backups:** Export schema + data before major changes

### Storage Backups
- **Cloudflare R2** or **AWS S3** for bucket mirroring (optional)

### Recovery Plan
1. Restore from latest Supabase snapshot
2. Re-apply any migrations since snapshot
3. Verify data integrity
4. Test critical flows (auth, forms, admin CRUD)

---

## Status

**Phase:** Phase 2.2 Complete ✅ - Projects CRUD Module Implemented  
**Next Steps:** Phase 2.3 - Blog CRUD Module (MDX Editor + Tags)  
**Last Updated:** 2025-01-05

### Repository Implementation Status

| Repository | Interface | Supabase Adapter | Zod Schema | Status |
|------------|-----------|------------------|------------|--------|
| Services | ✅ IServiceRepository | ✅ SupabaseServiceRepository | ✅ service.ts | Complete |
| Projects | ✅ IProjectRepository | ✅ SupabaseProjectRepository | ✅ project.ts | Complete |
| Blog | ✅ IBlogRepository | ✅ SupabaseBlogRepository | ✅ blog.ts | Complete |
| Team | ✅ ITeamRepository | ✅ SupabaseTeamRepository | ✅ team.ts | Complete |
| FAQ | ✅ IFAQRepository | ✅ SupabaseFAQRepository | ✅ faq.ts | Complete |
| Media | ✅ IMediaRepository | ✅ SupabaseMediaRepository | ✅ media.ts | Complete |
| Leads | ✅ ILeadRepository | ✅ SupabaseLeadRepository | ✅ lead.ts | Complete |
| Settings | ✅ ISettingsRepository | ✅ SupabaseSettingsRepository | ✅ settings.ts | Complete |

### CRUD Modules Implementation Status

| Module | Hook | Form Component | Table Component | Status |
|--------|------|----------------|-----------------|--------|
| Services | ✅ useServices | ✅ ServiceForm | ✅ ServiceTable | ✅ v0.6.0 |
| Projects | ✅ useProjects | ✅ ProjectForm | ✅ ProjectTable | ✅ v0.7.0 |
| Blog | 🟡 Pending | 🟡 Pending | 🟡 Pending | Phase 2.3 |
| Team | 🟡 Pending | 🟡 Pending | 🟡 Pending | Phase 2.4 |
| FAQ | 🟡 Pending | 🟡 Pending | 🟡 Pending | Phase 2.5 |
| Media | 🟡 Pending | 🟡 Pending | 🟡 Pending | Phase 2.6 |
| Leads | 🟡 Pending | 🟡 Pending | 🟡 Pending | Phase 2.7 |
| Settings | 🟡 Pending | 🟡 Pending | N/A | Phase 2.8 |

### Files Created (Phase 1.4)

**Schemas (8 files):**
- `src/lib/schemas/service.ts` - Service + DTOs
- `src/lib/schemas/project.ts` - Project + DTOs
- `src/lib/schemas/blog.ts` - BlogPost + DTOs
- `src/lib/schemas/team.ts` - TeamMember + DTOs
- `src/lib/schemas/faq.ts` - FAQ + DTOs
- `src/lib/schemas/media.ts` - Media + DTOs
- `src/lib/schemas/lead.ts` - Lead + DTOs
- `src/lib/schemas/settings.ts` - Settings + DTOs

**Repository Interfaces (8 files):**
- `src/lib/repos/IServiceRepository.ts`
- `src/lib/repos/IProjectRepository.ts`
- `src/lib/repos/IBlogRepository.ts`
- `src/lib/repos/ITeamRepository.ts`
- `src/lib/repos/IFAQRepository.ts`
- `src/lib/repos/IMediaRepository.ts`
- `src/lib/repos/ILeadRepository.ts`
- `src/lib/repos/ISettingsRepository.ts`

**Supabase Adapters (8 files):**
- `src/lib/adapters/supabase/SupabaseServiceRepository.ts`
- `src/lib/adapters/supabase/SupabaseProjectRepository.ts`
- `src/lib/adapters/supabase/SupabaseBlogRepository.ts`
- `src/lib/adapters/supabase/SupabaseTeamRepository.ts`
- `src/lib/adapters/supabase/SupabaseFAQRepository.ts`
- `src/lib/adapters/supabase/SupabaseMediaRepository.ts`
- `src/lib/adapters/supabase/SupabaseLeadRepository.ts`
- `src/lib/adapters/supabase/SupabaseSettingsRepository.ts`

**Total:** 24 new files implementing full Repository Pattern
