-- Add missing UPDATE policies for media table
-- Allows admins and editors to update media metadata (alt text, folder)
create policy "Admins can update media"
  on public.media
  for update
  using (has_role(auth.uid(), 'admin'::app_role));

create policy "Editors can update media"
  on public.media
  for update
  using (has_role(auth.uid(), 'editor'::app_role));