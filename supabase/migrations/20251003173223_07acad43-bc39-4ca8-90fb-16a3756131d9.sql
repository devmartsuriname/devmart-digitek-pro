-- Promote info@devmart.sr to admin role
INSERT INTO public.user_roles (user_id, role)
VALUES ('c36e726c-df4e-40af-b72b-4e6c9c7e16da', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;