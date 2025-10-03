-- Add address and google_maps_url fields to settings table
ALTER TABLE public.settings 
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS google_maps_url TEXT;