-- Update service icons to use template icons from public/assets/img/service/
-- This updates existing services with the proper template icon paths

UPDATE services 
SET icon_url = '/assets/img/service/icon-1.png', 
    updated_at = now()
WHERE slug = 'web-development';

UPDATE services 
SET icon_url = '/assets/img/service/icon-2.png',
    updated_at = now()
WHERE slug = 'app-development';

UPDATE services 
SET icon_url = '/assets/img/service/icon-3.png',
    updated_at = now()
WHERE slug = 'graphic-design';

UPDATE services 
SET icon_url = '/assets/img/service/icon-4.png',
    updated_at = now()
WHERE slug = 'seo-marketing';

UPDATE services 
SET icon_url = '/assets/img/service/icon-5.png',
    updated_at = now()
WHERE slug = 'social-media-marketing';

UPDATE services 
SET icon_url = '/assets/img/service/icon-6.png',
    updated_at = now()
WHERE slug = 'content-marketing';