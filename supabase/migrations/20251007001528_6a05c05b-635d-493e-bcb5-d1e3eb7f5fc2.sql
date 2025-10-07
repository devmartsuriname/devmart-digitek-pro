-- Fix blog_posts.author_id foreign key to point to profiles instead of auth.users
-- This is a critical data integrity and security fix

-- Step 1: Drop the incorrect foreign key constraint
ALTER TABLE public.blog_posts 
DROP CONSTRAINT IF EXISTS blog_posts_author_id_fkey;

-- Step 2: Add the correct foreign key constraint pointing to profiles
ALTER TABLE public.blog_posts 
ADD CONSTRAINT blog_posts_author_id_fkey 
FOREIGN KEY (author_id) 
REFERENCES public.profiles(id) 
ON DELETE SET NULL;

-- Step 3: Update any orphaned records (where author_id points to auth.users but not in profiles)
-- Set them to NULL to maintain data integrity
UPDATE public.blog_posts
SET author_id = NULL
WHERE author_id IS NOT NULL 
  AND author_id NOT IN (SELECT id FROM public.profiles);