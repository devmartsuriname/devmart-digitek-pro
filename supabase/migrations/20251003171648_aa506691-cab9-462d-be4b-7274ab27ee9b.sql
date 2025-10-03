-- ============================================================================
-- MIGRATION: Phase 1.2 - Complete Database Setup
-- Description: Auth tables, content tables, RLS policies, storage buckets, indexes
-- ============================================================================

-- ============================================================================
-- PART 1: AUTHENTICATION TABLES & ROLES
-- ============================================================================

-- Create app_role enum for role-based access control
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'viewer');

-- Create profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create user_roles table for role assignments
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Create security definer function to check user roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  );
$$;

-- Create function to auto-populate profiles on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$;

-- Create trigger to execute handle_new_user on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Create trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================================
-- PART 2: CONTENT TABLES
-- ============================================================================

-- Create services table
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  summary TEXT,
  body TEXT,
  icon_url TEXT,
  seo_title TEXT,
  seo_desc TEXT,
  order_num INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create projects table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  client TEXT,
  date DATE,
  cover_url TEXT,
  gallery JSONB DEFAULT '[]'::jsonb,
  tech TEXT[] DEFAULT '{}'::text[],
  summary TEXT,
  body TEXT,
  seo_title TEXT,
  seo_desc TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  cover_url TEXT,
  tags TEXT[] DEFAULT '{}'::text[],
  summary TEXT,
  body_mdx TEXT,
  seo_title TEXT,
  seo_desc TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  views INTEGER NOT NULL DEFAULT 0,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create team table
CREATE TABLE public.team (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  role TEXT,
  bio TEXT,
  photo_url TEXT,
  socials JSONB DEFAULT '{}'::jsonb,
  order_num INTEGER NOT NULL DEFAULT 0,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create faqs table
CREATE TABLE public.faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  order_num INTEGER NOT NULL DEFAULT 0,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create media table
CREATE TABLE public.media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  alt TEXT,
  width INTEGER,
  height INTEGER,
  type TEXT,
  folder TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create leads table
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  source TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create settings table (singleton)
CREATE TABLE public.settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_name TEXT,
  logo_url TEXT,
  theme TEXT,
  primary_color TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  social JSONB DEFAULT '{}'::jsonb,
  analytics JSONB DEFAULT '{}'::jsonb,
  meta_title TEXT,
  meta_desc TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create unique index to enforce singleton pattern on settings
CREATE UNIQUE INDEX settings_singleton_idx ON public.settings ((true));

-- Create triggers for updated_at on all content tables
CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_team_updated_at
  BEFORE UPDATE ON public.team
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_faqs_updated_at
  BEFORE UPDATE ON public.faqs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON public.settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================================
-- PART 3: ROW-LEVEL SECURITY POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- PROFILES POLICIES
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- USER_ROLES POLICIES
CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert roles"
  ON public.user_roles FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles"
  ON public.user_roles FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- SERVICES POLICIES (4-tier pattern)
CREATE POLICY "Anyone can view published services"
  ON public.services FOR SELECT
  USING (status = 'published');

CREATE POLICY "Admins have full access to services"
  ON public.services FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Editors can create services"
  ON public.services FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Editors can update services"
  ON public.services FOR UPDATE
  USING (public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Viewers can view all services"
  ON public.services FOR SELECT
  USING (public.has_role(auth.uid(), 'viewer'));

-- PROJECTS POLICIES (4-tier pattern)
CREATE POLICY "Anyone can view published projects"
  ON public.projects FOR SELECT
  USING (status = 'published');

CREATE POLICY "Admins have full access to projects"
  ON public.projects FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Editors can create projects"
  ON public.projects FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Editors can update projects"
  ON public.projects FOR UPDATE
  USING (public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Viewers can view all projects"
  ON public.projects FOR SELECT
  USING (public.has_role(auth.uid(), 'viewer'));

-- BLOG_POSTS POLICIES (4-tier pattern)
CREATE POLICY "Anyone can view published blog posts"
  ON public.blog_posts FOR SELECT
  USING (status = 'published');

CREATE POLICY "Admins have full access to blog posts"
  ON public.blog_posts FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Editors can create blog posts"
  ON public.blog_posts FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Editors can update blog posts"
  ON public.blog_posts FOR UPDATE
  USING (public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Viewers can view all blog posts"
  ON public.blog_posts FOR SELECT
  USING (public.has_role(auth.uid(), 'viewer'));

-- TEAM POLICIES (4-tier pattern)
CREATE POLICY "Anyone can view team members"
  ON public.team FOR SELECT
  USING (true);

CREATE POLICY "Admins have full access to team"
  ON public.team FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Editors can create team members"
  ON public.team FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Editors can update team members"
  ON public.team FOR UPDATE
  USING (public.has_role(auth.uid(), 'editor'));

-- FAQS POLICIES (4-tier pattern)
CREATE POLICY "Anyone can view FAQs"
  ON public.faqs FOR SELECT
  USING (true);

CREATE POLICY "Admins have full access to FAQs"
  ON public.faqs FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Editors can create FAQs"
  ON public.faqs FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Editors can update FAQs"
  ON public.faqs FOR UPDATE
  USING (public.has_role(auth.uid(), 'editor'));

-- MEDIA POLICIES
CREATE POLICY "Anyone can view media"
  ON public.media FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can upload media"
  ON public.media FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can delete media"
  ON public.media FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Editors can delete media"
  ON public.media FOR DELETE
  USING (public.has_role(auth.uid(), 'editor'));

-- LEADS POLICIES
CREATE POLICY "Anyone can submit leads"
  ON public.leads FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all leads"
  ON public.leads FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Editors can view all leads"
  ON public.leads FOR SELECT
  USING (public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Admins can update leads"
  ON public.leads FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Editors can update leads"
  ON public.leads FOR UPDATE
  USING (public.has_role(auth.uid(), 'editor'));

-- SETTINGS POLICIES
CREATE POLICY "Anyone can view settings"
  ON public.settings FOR SELECT
  USING (true);

CREATE POLICY "Admins can update settings"
  ON public.settings FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert settings"
  ON public.settings FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============================================================================
-- PART 4: STORAGE BUCKETS & POLICIES
-- ============================================================================

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('project-covers', 'project-covers', true),
  ('blog-covers', 'blog-covers', true),
  ('team-photos', 'team-photos', true),
  ('media-library', 'media-library', true);

-- Storage policies for project-covers
CREATE POLICY "Authenticated users can upload project covers"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'project-covers' AND auth.uid() IS NOT NULL);

CREATE POLICY "Anyone can view project covers"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'project-covers');

CREATE POLICY "Authenticated users can delete project covers"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'project-covers' AND auth.uid() IS NOT NULL);

-- Storage policies for blog-covers
CREATE POLICY "Authenticated users can upload blog covers"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'blog-covers' AND auth.uid() IS NOT NULL);

CREATE POLICY "Anyone can view blog covers"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog-covers');

CREATE POLICY "Authenticated users can delete blog covers"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'blog-covers' AND auth.uid() IS NOT NULL);

-- Storage policies for team-photos
CREATE POLICY "Authenticated users can upload team photos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'team-photos' AND auth.uid() IS NOT NULL);

CREATE POLICY "Anyone can view team photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'team-photos');

CREATE POLICY "Authenticated users can delete team photos"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'team-photos' AND auth.uid() IS NOT NULL);

-- Storage policies for media-library
CREATE POLICY "Authenticated users can upload to media library"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'media-library' AND auth.uid() IS NOT NULL);

CREATE POLICY "Anyone can view media library"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'media-library');

CREATE POLICY "Authenticated users can delete from media library"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'media-library' AND auth.uid() IS NOT NULL);

-- ============================================================================
-- PART 5: PERFORMANCE INDEXES
-- ============================================================================

-- Services indexes
CREATE INDEX idx_services_slug ON public.services(slug);
CREATE INDEX idx_services_status ON public.services(status);
CREATE INDEX idx_services_order_num ON public.services(order_num);

-- Projects indexes
CREATE INDEX idx_projects_slug ON public.projects(slug);
CREATE INDEX idx_projects_status ON public.projects(status);
CREATE INDEX idx_projects_featured ON public.projects(featured);
CREATE INDEX idx_projects_date_desc ON public.projects(date DESC);

-- Blog posts indexes
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX idx_blog_posts_featured ON public.blog_posts(featured);
CREATE INDEX idx_blog_posts_date_desc ON public.blog_posts(date DESC);
CREATE INDEX idx_blog_posts_author_id ON public.blog_posts(author_id);
CREATE INDEX idx_blog_posts_tags ON public.blog_posts USING GIN(tags);

-- Team indexes
CREATE INDEX idx_team_slug ON public.team(slug);
CREATE INDEX idx_team_order_num ON public.team(order_num);

-- FAQs indexes
CREATE INDEX idx_faqs_category ON public.faqs(category);
CREATE INDEX idx_faqs_order_num ON public.faqs(order_num);

-- Media indexes
CREATE INDEX idx_media_type ON public.media(type);
CREATE INDEX idx_media_folder ON public.media(folder);
CREATE INDEX idx_media_created_at_desc ON public.media(created_at DESC);

-- Leads indexes
CREATE INDEX idx_leads_status ON public.leads(status);
CREATE INDEX idx_leads_created_at_desc ON public.leads(created_at DESC);
CREATE INDEX idx_leads_email ON public.leads(email);

-- User roles indexes
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_user_roles_role ON public.user_roles(role);