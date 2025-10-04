-- Fix leads table RLS policies: Convert RESTRICTIVE to PERMISSIVE
-- Drop existing restrictive SELECT policies
DROP POLICY IF EXISTS "Admins can view all leads" ON public.leads;
DROP POLICY IF EXISTS "Editors can view all leads" ON public.leads;

-- Drop existing restrictive UPDATE policies  
DROP POLICY IF EXISTS "Admins can update leads" ON public.leads;
DROP POLICY IF EXISTS "Editors can update leads" ON public.leads;

-- Recreate as PERMISSIVE policies (default behavior)
-- SELECT policies: Admins OR Editors can view (not both required)
CREATE POLICY "Admins can view all leads"
  ON public.leads
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Editors can view all leads"
  ON public.leads
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'editor'::app_role));

-- UPDATE policies: Admins OR Editors can update
CREATE POLICY "Admins can update leads"
  ON public.leads
  FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Editors can update leads"
  ON public.leads
  FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'editor'::app_role))
  WITH CHECK (has_role(auth.uid(), 'editor'::app_role));

-- Note: "Anyone can submit leads" INSERT policy is already correct