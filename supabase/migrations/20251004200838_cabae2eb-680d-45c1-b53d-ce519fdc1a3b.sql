-- Fix RLS policies for leads table to prevent public access to sensitive customer data
-- This addresses the security issue: Customer Contact Information Could Be Stolen by Competitors or Spammers

-- First, drop existing policies if any
DROP POLICY IF EXISTS "Anyone can submit leads" ON public.leads;
DROP POLICY IF EXISTS "Anyone can view leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can view all leads" ON public.leads;
DROP POLICY IF EXISTS "Editors can view all leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can update leads" ON public.leads;
DROP POLICY IF EXISTS "Editors can update leads" ON public.leads;

-- Enable RLS on leads table (if not already enabled)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow anonymous users to INSERT leads (for contact form submissions)
-- This is essential for the public contact form to work
CREATE POLICY "Anyone can submit leads"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy 2: Only admins and editors can SELECT (view) leads
-- This protects sensitive customer contact information from unauthorized access
CREATE POLICY "Admins and editors can view all leads"
ON public.leads
FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin'::app_role) OR 
  public.has_role(auth.uid(), 'editor'::app_role)
);

-- Policy 3: Only admins and editors can UPDATE leads (change status, etc.)
CREATE POLICY "Admins and editors can update leads"
ON public.leads
FOR UPDATE
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin'::app_role) OR 
  public.has_role(auth.uid(), 'editor'::app_role)
)
WITH CHECK (
  public.has_role(auth.uid(), 'admin'::app_role) OR 
  public.has_role(auth.uid(), 'editor'::app_role)
);

-- No DELETE policy - leads should be kept for audit trail as per backend.md

-- Add helpful comment
COMMENT ON TABLE public.leads IS 'Customer contact form submissions. RLS enforced: Public INSERT only, admin/editor SELECT/UPDATE only.';