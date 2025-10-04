-- Phase 2: Devmart Content Seeding (Hybrid Approach)
-- This script seeds core structure with Devmart content from content-mapping.md
-- User will polish and add media via Admin Panel afterward

-- Get the first admin user ID (or use a variable for safety)
DO $$
DECLARE
  admin_user_id uuid;
BEGIN
  -- Get the first user with admin role
  SELECT user_id INTO admin_user_id 
  FROM public.user_roles 
  WHERE role = 'admin' 
  LIMIT 1;

  -- Seed Services (4 core services)
  INSERT INTO public.services (title, slug, summary, body, icon_url, seo_title, seo_desc, order_num, status, created_by, updated_by) VALUES
  (
    'Web Development',
    'web-development',
    'Custom websites and web applications built for performance and scalability',
    E'At Devmart Suriname, we specialize in building modern, responsive websites and web applications tailored to your business needs. Our team uses cutting-edge technologies like React, Node.js, and cloud platforms to deliver fast, secure, and scalable solutions.\n\n**What We Offer:**\n- Custom website design and development\n- E-commerce platforms with secure payment integration\n- Progressive Web Apps (PWAs)\n- Content Management Systems (CMS)\n- API development and integration\n- Website maintenance and support\n\n**Our Process:**\n1. Discovery & Planning - We understand your goals and requirements\n2. Design & Prototyping - Create mockups and user flows\n3. Development & Testing - Build with best practices and thorough QA\n4. Launch & Support - Deploy and provide ongoing maintenance\n\nWhether you need a simple landing page or a complex web application, we have the expertise to bring your vision to life.',
    '/assets/img/service/icon-1.png',
    'Professional Web Development Services in Suriname | Devmart',
    'Custom website design and development services in Suriname. Responsive, fast, and SEO-optimized websites built with modern technologies.',
    1,
    'published',
    admin_user_id,
    admin_user_id
  ),
  (
    'Mobile App Development',
    'app-development',
    'Native and cross-platform mobile apps for iOS and Android',
    E'Transform your ideas into powerful mobile applications with Devmart Suriname. We develop high-quality mobile apps for iOS and Android using React Native and Flutter, ensuring your app works seamlessly across all devices.\n\n**Our Mobile App Services:**\n- Native iOS development (Swift)\n- Native Android development (Kotlin)\n- Cross-platform apps (React Native, Flutter)\n- Mobile UI/UX design\n- App Store optimization and deployment\n- Push notifications and analytics integration\n- Backend API development\n- Ongoing maintenance and updates\n\n**Why Choose Us:**\n- Experienced team with 50+ apps delivered\n- Focus on performance and user experience\n- Agile development methodology\n- Post-launch support and updates\n- Competitive pricing for Suriname market\n\nFrom concept to launch, we guide you through every step of mobile app development.',
    '/assets/img/service/icon-2.png',
    'Mobile App Development Services - iOS & Android | Devmart Suriname',
    'Professional mobile app development in Suriname. Native and cross-platform apps for iOS and Android built with React Native and Flutter.',
    2,
    'published',
    admin_user_id,
    admin_user_id
  ),
  (
    'Graphic Design & Branding',
    'graphic-design',
    'Creative design solutions that bring your brand to life',
    E'Your brand is your identity. At Devmart Suriname, we create stunning visual designs that capture your brand essence and resonate with your audience. From logos to complete brand identities, we deliver designs that stand out.\n\n**Design Services:**\n- Logo design and brand identity\n- Business cards and stationery\n- Brochures and flyers\n- Social media graphics\n- Website and app UI/UX design\n- Packaging design\n- Print and digital advertising materials\n- Brand style guides\n\n**Our Design Philosophy:**\n- **Strategic** - Every design serves a purpose\n- **Memorable** - Create lasting impressions\n- **Versatile** - Works across all mediums\n- **Timeless** - Designs that age well\n\n**Process:**\n1. Brand Discovery - Understand your values and target audience\n2. Concept Development - Create multiple design directions\n3. Refinement - Polish based on your feedback\n4. Delivery - Provide all files in multiple formats\n\nLet us help you build a brand that tells your story.',
    '/assets/img/service/icon-3.png',
    'Professional Graphic Design & Branding Services | Devmart Suriname',
    'Creative graphic design and branding services in Suriname. Logo design, brand identity, and visual marketing materials.',
    3,
    'published',
    admin_user_id,
    admin_user_id
  ),
  (
    'SEO & Digital Marketing',
    'seo-marketing',
    'Data-driven strategies to grow your online presence and reach more customers',
    E'Get found online and grow your business with Devmart Suriname''s SEO and digital marketing services. We use proven strategies to increase your visibility, drive traffic, and convert visitors into customers.\n\n**Digital Marketing Services:**\n- Search Engine Optimization (SEO)\n- Google Ads (PPC) management\n- Social media marketing (Facebook, Instagram, LinkedIn)\n- Content marketing and strategy\n- Email marketing campaigns\n- Analytics and performance tracking\n- Local SEO for Suriname businesses\n- Competitor analysis\n\n**Our Approach:**\n- **Research-Driven** - Understand your market and competitors\n- **Results-Focused** - Track ROI and key metrics\n- **Transparent** - Clear reporting and communication\n- **Adaptive** - Continuously optimize based on data\n\n**SEO Services Include:**\n- Keyword research and strategy\n- On-page optimization\n- Technical SEO audits\n- Link building\n- Local business listings\n- Content creation\n- Monthly reporting\n\nIncrease your online visibility and grow your business with our expert digital marketing team.',
    '/assets/img/service/icon-4.png',
    'SEO & Digital Marketing Services in Suriname | Devmart',
    'Professional SEO and digital marketing services in Suriname. Increase your online visibility and grow your business with data-driven strategies.',
    4,
    'published',
    admin_user_id,
    admin_user_id
  );

  -- Seed Projects (6 featured projects)
  INSERT INTO public.projects (title, slug, client, date, cover_url, gallery, tech, summary, body, seo_title, seo_desc, featured, status, created_by, updated_by) VALUES
  (
    'Modern Restaurant Website with Online Ordering',
    'restaurant-website',
    'Suriname Dining Group',
    '2024-11-15',
    '/assets/img/case-studies/01.jpg',
    '["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4", "https://images.unsplash.com/photo-1552566626-52f8b828add9", "https://images.unsplash.com/photo-1414235077428-338989a2e8c0"]'::jsonb,
    ARRAY['React', 'Node.js', 'Stripe', 'Google Maps API'],
    'A beautiful, responsive website with integrated online ordering and table reservation system for a popular restaurant chain in Suriname.',
    E'**Challenge:**\nSuriname Dining Group needed a modern website to showcase their restaurants and enable online ordering to compete in the digital marketplace.\n\n**Solution:**\nWe built a custom website with:\n- Responsive design optimized for mobile ordering\n- Real-time menu updates and availability\n- Secure payment integration with Stripe\n- Table reservation system with SMS confirmations\n- Multi-location support with Google Maps integration\n- Admin dashboard for order management\n\n**Results:**\n- 150% increase in online orders in first 3 months\n- 40% reduction in phone orders (freeing up staff)\n- 4.8-star customer satisfaction rating\n- Average order completion time: 2.5 minutes\n\n**Technologies:**\nBuilt with React for the frontend, Node.js backend, MongoDB database, and deployed on AWS with CDN for fast loading times.',
    'Restaurant Website Development - Online Ordering System | Devmart',
    'Custom restaurant website with online ordering, table reservations, and payment integration. Modern responsive design for Suriname restaurants.',
    true,
    'published',
    admin_user_id,
    admin_user_id
  ),
  (
    'E-Commerce Fashion Store',
    'ecommerce-store',
    'Trendy Fashion Boutique',
    '2024-10-20',
    '/assets/img/case-studies/02.jpg',
    '["https://images.unsplash.com/photo-1441986300917-64674bd600d8", "https://images.unsplash.com/photo-1483985988355-763728e1935b", "https://images.unsplash.com/photo-1445205170230-053b83016050"]'::jsonb,
    ARRAY['React', 'Supabase', 'Stripe', 'Cloudinary'],
    'Full-featured e-commerce platform with inventory management, secure payments, and beautiful product showcases.',
    E'**Challenge:**\nTrendy Fashion Boutique wanted to expand beyond their physical store and reach customers across Suriname with an online shopping experience.\n\n**Solution:**\nWe developed a complete e-commerce solution featuring:\n- Beautiful product galleries with zoom and 360° views\n- Advanced filtering and search\n- Shopping cart with guest checkout\n- Secure payment processing (Stripe)\n- Order tracking and email notifications\n- Inventory management system\n- Admin dashboard for products, orders, and analytics\n- Mobile-first responsive design\n\n**Results:**\n- $50K+ in online sales in first quarter\n- 2,000+ registered customers\n- 65% of traffic from mobile devices\n- 3.2% conversion rate (above industry average)\n\n**Technologies:**\nBuilt with React and Supabase for real-time inventory updates, integrated with Stripe for payments, and Cloudinary for optimized image delivery.',
    'E-Commerce Website Development - Fashion Store | Devmart Suriname',
    'Custom e-commerce platform for fashion retailers. Secure online shopping with inventory management and payment integration.',
    true,
    'published',
    admin_user_id,
    admin_user_id
  ),
  (
    'Mobile Banking App for Fintech Startup',
    'banking-app',
    'FinSmart Suriname',
    '2024-09-30',
    '/assets/img/case-studies/03.jpg',
    '["https://images.unsplash.com/photo-1563986768609-322da13575f3", "https://images.unsplash.com/photo-1551288049-bebda4e38f71", "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e"]'::jsonb,
    ARRAY['React Native', 'Firebase', 'Plaid API', 'Biometric Auth'],
    'Secure mobile banking application with real-time transactions, budgeting tools, and biometric authentication.',
    E'**Challenge:**\nFinSmart needed a secure, user-friendly mobile banking app to compete with traditional banks while offering modern features.\n\n**Solution:**\nWe built a comprehensive mobile banking app with:\n- Biometric authentication (Face ID, fingerprint)\n- Real-time account balances and transactions\n- P2P money transfers\n- Bill payment integration\n- Budget tracking and spending insights\n- Push notifications for transactions\n- Multi-language support (Dutch, English, Sranantongo)\n- Offline mode for viewing balances\n\n**Results:**\n- 10,000+ downloads in first month\n- 4.7-star rating on App Store and Google Play\n- 85% user retention after 3 months\n- Average session time: 4.5 minutes\n- Zero security incidents\n\n**Technologies:**\nDeveloped with React Native for cross-platform compatibility, Firebase for backend services, and bank-grade encryption for all transactions.',
    'Mobile Banking App Development - Fintech Solutions | Devmart',
    'Secure mobile banking application development for fintech startups. iOS and Android apps with biometric authentication and real-time transactions.',
    true,
    'published',
    admin_user_id,
    admin_user_id
  ),
  (
    'Corporate Website Redesign',
    'corporate-website',
    'Suriname Professional Services Ltd.',
    '2024-08-15',
    '/assets/img/case-studies/04.jpg',
    '["https://images.unsplash.com/photo-1497366216548-37526070297c", "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"]'::jsonb,
    ARRAY['React', 'Tailwind CSS', 'Framer Motion', 'Contentful CMS'],
    'Modern, professional website redesign for a leading corporate services firm with CMS integration.',
    E'**Challenge:**\nSuriname Professional Services had an outdated website that didn''t reflect their modern approach to business services.\n\n**Solution:**\nComplete website redesign with:\n- Clean, professional design with smooth animations\n- Service showcase with case studies\n- Team profiles and bios\n- Blog/insights section\n- Contact forms with lead capture\n- Contentful CMS for easy content updates\n- SEO optimization\n- Multi-page architecture\n\n**Results:**\n- 200% increase in website traffic\n- 50% increase in contact form submissions\n- Lighthouse score: 95+ across all metrics\n- Page load time: <2 seconds\n- Mobile-friendly score: 100%\n\n**Technologies:**\nBuilt with React and Tailwind CSS for modern, maintainable code, Framer Motion for smooth animations, and Contentful for content management.',
    'Corporate Website Redesign - Professional Services | Devmart',
    'Modern corporate website redesign with CMS integration. Professional, fast, and SEO-optimized business websites.',
    false,
    'published',
    admin_user_id,
    admin_user_id
  ),
  (
    'Digital Marketing Campaign Success',
    'marketing-campaign',
    'Consumer Goods Brand',
    '2024-07-20',
    '/assets/img/case-studies/05.jpg',
    '["https://images.unsplash.com/photo-1460925895917-afdab827c52f", "https://images.unsplash.com/photo-1533750516457-a7f992034fec"]'::jsonb,
    ARRAY['Google Ads', 'Facebook Ads', 'SEO', 'Analytics'],
    'Comprehensive digital marketing campaign driving 300% ROI for a consumer goods brand.',
    E'**Challenge:**\nA local consumer goods brand wanted to increase market share and brand awareness in Suriname through digital channels.\n\n**Solution:**\nWe executed a multi-channel digital marketing strategy:\n- SEO optimization for product pages\n- Google Ads campaigns targeting high-intent keywords\n- Facebook and Instagram ad campaigns\n- Influencer partnerships\n- Email marketing automation\n- Landing page optimization\n- A/B testing for ad creatives\n- Weekly performance reporting\n\n**Results:**\n- 300% return on ad spend (ROAS)\n- 500K+ impressions in 3 months\n- 15K+ website visitors\n- 1,200+ conversions\n- 45% reduction in cost per acquisition\n\n**Campaign Metrics:**\n- Click-through rate: 3.8% (industry avg: 2%)\n- Conversion rate: 8% (industry avg: 3%)\n- Average order value increased by 25%',
    'Digital Marketing Campaign Case Study - 300% ROI | Devmart',
    'Successful digital marketing campaign driving 300% ROI. Google Ads, Facebook Ads, SEO, and analytics for Suriname businesses.',
    false,
    'published',
    admin_user_id,
    admin_user_id
  ),
  (
    'SaaS Dashboard & Analytics Platform',
    'saas-dashboard',
    'DataTech Solutions',
    '2024-06-10',
    '/assets/img/case-studies/06.jpg',
    '["https://images.unsplash.com/photo-1551288049-bebda4e38f3e", "https://images.unsplash.com/photo-1460925895917-afdab827c52f"]'::jsonb,
    ARRAY['React', 'Recharts', 'Supabase', 'Tailwind CSS'],
    'Advanced SaaS analytics dashboard with real-time data visualization and reporting.',
    E'**Challenge:**\nDataTech Solutions needed a powerful analytics platform to help businesses visualize and understand their data.\n\n**Solution:**\nWe built a comprehensive SaaS dashboard featuring:\n- Real-time data visualization with interactive charts\n- Customizable dashboards and widgets\n- Multi-user collaboration\n- Role-based access control\n- Export reports to PDF/Excel\n- API integrations with popular tools\n- Mobile-responsive design\n- Dark mode support\n\n**Results:**\n- 500+ active users in 2 months\n- 4.6-star product rating\n- 70% month-over-month growth\n- 15-minute average session time\n- 90% user satisfaction score\n\n**Technologies:**\nBuilt with React for dynamic UI, Recharts for data visualization, Supabase for real-time database, and deployed on Vercel for global edge performance.',
    'SaaS Dashboard Development - Analytics Platform | Devmart',
    'Custom SaaS dashboard and analytics platform development. Real-time data visualization with React and Supabase.',
    false,
    'published',
    admin_user_id,
    admin_user_id
  );

  -- Seed Blog Posts (10 articles)
  INSERT INTO public.blog_posts (title, slug, author_id, date, cover_url, tags, summary, body_mdx, seo_title, seo_desc, featured, status, created_by, updated_by) VALUES
  (
    '10 Web Design Trends to Watch in 2025',
    'web-design-trends-2025',
    admin_user_id,
    '2025-01-15',
    '/assets/img/news/01.jpg',
    ARRAY['web-design', 'trends', 'ui-ux'],
    'Discover the latest web design trends that will shape the digital landscape in 2025, from AI-powered interfaces to immersive 3D experiences.',
    E'# 10 Web Design Trends to Watch in 2025\n\nThe web design landscape is constantly evolving, and 2025 promises to bring exciting new trends. Here are the top 10 trends every designer and business owner should know:\n\n## 1. AI-Powered Personalization\nWebsites will increasingly use AI to deliver personalized experiences based on user behavior, preferences, and context.\n\n## 2. Immersive 3D Experiences\n3D graphics and WebGL are becoming mainstream, creating more engaging and interactive web experiences.\n\n## 3. Dark Mode by Default\nWith growing user preference for dark interfaces, many sites now offer dark mode as the default option.\n\n## 4. Micro-interactions\nSubtle animations and feedback that guide users and make interfaces feel alive.\n\n## 5. Voice User Interfaces (VUI)\nVoice search and commands are becoming integral to web experiences.\n\n## 6. Sustainable Web Design\nOptimizing for performance and energy efficiency to reduce carbon footprint.\n\n## 7. Bold Typography\nLarge, expressive fonts that make strong statements and improve readability.\n\n## 8. Glassmorphism\nThe frosted glass effect continues to be popular for modern, sleek interfaces.\n\n## 9. Scroll-Triggered Animations\nAnimations that activate as users scroll, creating dynamic storytelling experiences.\n\n## 10. Accessibility First\nDesigning for all users from the start, not as an afterthought.\n\n## Conclusion\nStaying ahead of design trends helps your website remain modern and competitive. At Devmart Suriname, we incorporate these cutting-edge trends into every project.\n\n**Ready to modernize your website?** [Contact us today](/contact).',
    '10 Web Design Trends to Watch in 2025 | Devmart Blog',
    'Latest web design trends for 2025 including AI personalization, 3D experiences, dark mode, and accessibility-first design.',
    true,
    'published',
    admin_user_id,
    admin_user_id
  ),
  (
    'SEO Best Practices for Small Businesses in 2025',
    'seo-best-practices-2025',
    admin_user_id,
    '2025-01-10',
    '/assets/img/news/02.jpg',
    ARRAY['seo', 'digital-marketing', 'small-business'],
    'A comprehensive guide to SEO strategies that small businesses can implement to improve their search rankings and attract more customers.',
    E'# SEO Best Practices for Small Businesses in 2025\n\nSearch Engine Optimization remains crucial for small business success. Here''s everything you need to know to improve your rankings.\n\n## Why SEO Matters for Small Businesses\n- 93% of online experiences begin with a search engine\n- 75% of users never scroll past the first page\n- Local searches lead to in-store visits 50% of the time\n\n## On-Page SEO Fundamentals\n\n### 1. Keyword Research\n- Use tools like Google Keyword Planner\n- Focus on long-tail keywords\n- Consider search intent\n\n### 2. Title Tags & Meta Descriptions\n- Include target keywords naturally\n- Keep titles under 60 characters\n- Make meta descriptions compelling\n\n### 3. Quality Content\n- Write for humans first, search engines second\n- Aim for comprehensive, valuable content\n- Update content regularly\n\n### 4. Mobile Optimization\n- Ensure responsive design\n- Fast loading times (<3 seconds)\n- Mobile-friendly navigation\n\n## Technical SEO\n\n### Site Speed\nFaster sites rank better. Optimize images, enable caching, use a CDN.\n\n### HTTPS\nSecure sites are prioritized by Google. Always use SSL certificates.\n\n### XML Sitemap\nHelp search engines discover all your pages.\n\n## Local SEO for Suriname Businesses\n\n### Google Business Profile\n- Complete all information\n- Add photos regularly\n- Respond to reviews\n- Post updates\n\n### Local Citations\n- List your business in local directories\n- Ensure NAP consistency (Name, Address, Phone)\n\n### Local Content\n- Create location-specific pages\n- Write about local events and news\n\n## Link Building Strategies\n\n1. **Quality over Quantity** - Focus on authoritative sites\n2. **Guest Posting** - Contribute to relevant blogs\n3. **Local Partnerships** - Exchange links with local businesses\n4. **Resource Pages** - Get listed on industry resource pages\n\n## Content Marketing\n\n### Blog Regularly\nAim for at least 2-4 posts per month covering topics your audience cares about.\n\n### Video Content\nYouTube is the second-largest search engine. Create helpful video content.\n\n### FAQ Pages\nAnswer common questions to capture voice search queries.\n\n## Measuring Success\n\nTrack these metrics:\n- Organic traffic\n- Keyword rankings\n- Conversion rate\n- Bounce rate\n- Page load time\n\nUse Google Analytics and Google Search Console for insights.\n\n## Common SEO Mistakes to Avoid\n\n❌ Keyword stuffing\n❌ Buying links\n❌ Duplicate content\n❌ Ignoring mobile users\n❌ Slow page speed\n❌ Thin content\n\n## Conclusion\n\nSEO is a long-term investment that pays off. Focus on creating value for your users, and the rankings will follow.\n\n**Need help with your SEO strategy?** Devmart Suriname offers comprehensive SEO services tailored to Suriname businesses. [Get in touch](/contact) for a free consultation.',
    'SEO Best Practices for Small Businesses in 2025 | Devmart',
    'Complete SEO guide for small businesses. Learn keyword research, on-page optimization, local SEO, and link building strategies that work.',
    true,
    'published',
    admin_user_id,
    admin_user_id
  ),
  (
    'Mobile App vs Web App: Which is Right for Your Business?',
    'mobile-vs-web-app',
    admin_user_id,
    '2025-01-05',
    '/assets/img/news/03.jpg',
    ARRAY['mobile-development', 'web-development', 'business-strategy'],
    'Understanding the differences between mobile and web apps to make the right choice for your business goals and budget.',
    E'# Mobile App vs Web App: Which is Right for Your Business?\n\nOne of the most common questions we get at Devmart is: "Should I build a mobile app or a web app?" The answer depends on your specific needs.\n\n## Understanding the Difference\n\n### Mobile Apps\n- Native to iOS/Android\n- Downloaded from app stores\n- Can work offline\n- Access device features (camera, GPS, etc.)\n- Push notifications\n\n### Web Apps\n- Accessed via browser\n- No installation required\n- Always up-to-date\n- Cross-platform by default\n- Easier to maintain\n\n## When to Choose a Mobile App\n\n✅ **You need offline functionality**\nExamples: Note-taking apps, games, productivity tools\n\n✅ **You require device features**\nExamples: Camera apps, fitness trackers, navigation\n\n✅ **Push notifications are critical**\nExamples: Social media, messaging, delivery apps\n\n✅ **Complex user interactions**\nExamples: Photo editing, AR experiences\n\n✅ **Building a brand presence**\nHaving an app on someone''s phone increases brand recall\n\n## When to Choose a Web App\n\n✅ **Budget constraints**\nWeb apps are generally 40-60% cheaper than mobile apps\n\n✅ **Quick launch needed**\nNo app store approval process\n\n✅ **Frequent updates**\nChanges are instant, no user downloads required\n\n✅ **Content-focused**\nExamples: Blogs, news sites, portfolios\n\n✅ **Desktop users important**\nWeb apps work seamlessly across all devices\n\n## The Hybrid Option: Progressive Web Apps (PWAs)\n\nPWAs offer the best of both worlds:\n- Work offline\n- Installable on home screen\n- Push notifications (on supported browsers)\n- One codebase for all platforms\n- Lower development costs\n\n**Examples:** Twitter Lite, Starbucks, Pinterest\n\n## Cost Comparison\n\n| Type | Initial Cost | Maintenance | Update Speed |\n|------|-------------|-------------|-------------|\n| Native App | High | High | Slow |\n| Web App | Medium | Low | Instant |\n| PWA | Medium | Medium | Instant |\n\n## Decision Framework\n\nAsk yourself:\n\n1. **Do I need offline access?**\n2. **Do I need device features?**\n3. **What''s my budget?**\n4. **How often will I update?**\n5. **Who is my target audience?**\n\n## Real-World Example\n\n**Case Study:** A restaurant chain approached us wanting an app for ordering.\n\n**Initial Request:** Native iOS and Android apps\n**Our Recommendation:** Progressive Web App\n**Result:** \n- 60% cost savings\n- Launched 2 months earlier\n- Works on all devices\n- No app store hassles\n- Instant menu updates\n\n## Conclusion\n\nThere''s no one-size-fits-all answer. The right choice depends on your specific needs, budget, and goals.\n\n**Not sure which is right for you?** [Schedule a free consultation](/contact) with Devmart Suriname, and we''ll help you make the best decision.',
    'Mobile App vs Web App: Choosing the Right Solution | Devmart',
    'Should you build a mobile app or web app? Compare features, costs, and benefits to make the right choice for your business.',
    true,
    'published',
    admin_user_id,
    admin_user_id
  ),
  (
    'The Ultimate Guide to Digital Marketing in Suriname',
    'digital-marketing-suriname-guide',
    admin_user_id,
    '2024-12-20',
    '/assets/img/news/04.jpg',
    ARRAY['digital-marketing', 'suriname', 'social-media', 'google-ads'],
    'A complete guide to digital marketing strategies specifically tailored for businesses in Suriname.',
    E'# The Ultimate Guide to Digital Marketing in Suriname\n\nDigital marketing in Suriname has unique characteristics that require tailored strategies. Here''s your complete guide.\n\n## The Suriname Digital Landscape\n\n### Key Statistics\n- Internet penetration: ~62%\n- Mobile phone penetration: ~85%\n- Most popular platform: Facebook (70% of users)\n- Growing platforms: Instagram, TikTok\n- Primary language: Dutch (with English, Sranantongo)\n\n## Channel-Specific Strategies\n\n### Facebook Marketing\n\n**Why it matters:** Facebook dominates Suriname''s social media landscape.\n\n**Best Practices:**\n- Post in Dutch for maximum reach\n- Share visual content (images, videos)\n- Engage with community groups\n- Use Facebook Marketplace for e-commerce\n- Run targeted ads to specific neighborhoods\n\n### Instagram Marketing\n\n**Growing Fast:** Especially among younger audiences (18-35)\n\n**Tactics:**\n- Use local hashtags (#Suriname, #Paramaribo)\n- Share Stories consistently\n- Collaborate with local influencers\n- Behind-the-scenes content\n- User-generated content campaigns\n\n### Google Ads\n\n**Targeting Options:**\n- Location: Paramaribo, Wanica, Nickerie\n- Language: Dutch, English\n- Keywords: Often bilingual search patterns\n\n**Budget Considerations:**\nCPC in Suriname is relatively low ($0.20-$2), making Google Ads accessible for small businesses.\n\n### WhatsApp Business\n\n**Essential for Suriname:** Many businesses conduct sales through WhatsApp.\n\n**Features to Use:**\n- Catalog showcase\n- Automated replies\n- Quick responses\n- Business profile\n- Payment integration\n\n## Local SEO Strategies\n\n### Google Business Profile\n- List your business\n- Add photos of your location\n- Respond to reviews in Dutch\n- Post weekly updates\n- Use local keywords\n\n### Content in Multiple Languages\nConsider creating content in:\n- Dutch (primary)\n- English (international + tourism)\n- Sranantongo (local engagement)\n\n## Unique Challenges in Suriname\n\n### 1. Payment Processing\n**Challenge:** Limited online payment options\n**Solution:** Offer WhatsApp orders, bank transfers, in-store pickup\n\n### 2. Internet Speed\n**Challenge:** Variable connection speeds\n**Solution:** Optimize for low bandwidth, lightweight images\n\n### 3. Trust Building\n**Challenge:** Online shopping hesitancy\n**Solution:** Showcase reviews, offer guarantees, transparent policies\n\n## Success Stories\n\n**Local Restaurant:**\n- Started with Facebook page\n- Added WhatsApp ordering\n- Result: 3x increase in takeout orders\n\n**Fashion Boutique:**\n- Instagram + Facebook Shop\n- Influencer partnerships\n- Result: Expanded to 2 locations\n\n## Recommended Marketing Mix for Suriname\n\n- **Facebook:** 40% of budget\n- **Instagram:** 25%\n- **Google Ads:** 20%\n- **WhatsApp Marketing:** 10%\n- **Other (TikTok, etc.):** 5%\n\n## Measuring Success\n\nTrack:\n- Reach and engagement\n- Website traffic from social\n- WhatsApp inquiries\n- Store visits (from Google Business)\n- Sales conversions\n\n## Conclusion\n\nDigital marketing in Suriname requires understanding local behavior and preferences. Success comes from combining global best practices with local insights.\n\n**Ready to grow your business online?** [Contact Devmart](/contact) for a customized digital marketing strategy.',
    'Digital Marketing Guide for Suriname Businesses | Devmart',
    'Complete guide to digital marketing in Suriname. Facebook, Instagram, Google Ads strategies tailored for Surinamese businesses.',
    false,
    'published',
    admin_user_id,
    admin_user_id
  ),
  (
    'How to Choose the Right Web Development Agency',
    'choose-web-development-agency',
    admin_user_id,
    '2024-12-15',
    '/assets/img/news/05.jpg',
    ARRAY['web-development', 'business-tips', 'agency'],
    'Essential criteria to evaluate when selecting a web development partner for your business.',
    E'# How to Choose the Right Web Development Agency\n\nChoosing the right web development partner can make or break your digital project. Here''s what to look for.\n\n## Red Flags to Watch For\n\n🚩 **No Portfolio or Case Studies**\nA reputable agency should showcase their work.\n\n🚩 **Unrealistic Promises**\n"We''ll rank you #1 on Google in a week!"\n\n🚩 **No Contract or Vague Scope**\nEverything should be documented clearly.\n\n🚩 **Poor Communication**\nSlow responses or unclear explanations.\n\n🚩 **Dirt-Cheap Prices**\nQuality development costs money.\n\n## Essential Questions to Ask\n\n### 1. Technical Expertise\n- What technologies do you specialize in?\n- Do you have experience in our industry?\n- Can I see similar projects you''ve completed?\n\n### 2. Process & Timeline\n- What''s your development process?\n- How long will this project take?\n- What are the key milestones?\n\n### 3. Communication\n- Who will be my main point of contact?\n- How often will we have updates?\n- What project management tools do you use?\n\n### 4. Post-Launch Support\n- Do you offer maintenance packages?\n- What''s included in support?\n- How quickly do you respond to issues?\n\n### 5. Costs & Payment\n- What''s included in the quoted price?\n- Are there any additional costs?\n- What''s your payment schedule?\n\n## What to Look For\n\n### ✅ Strong Portfolio\nReview their past work. Does it align with your vision?\n\n### ✅ Clear Process\nThey should explain their methodology clearly.\n\n### ✅ Technical Competence\nAsk about:\n- Security measures\n- Performance optimization\n- Mobile responsiveness\n- SEO practices\n- Accessibility standards\n\n### ✅ Good Reviews\nCheck:\n- Google reviews\n- Facebook recommendations\n- Testimonials on their website\n- LinkedIn recommendations\n\n### ✅ Cultural Fit\nDo their values align with yours? Will you enjoy working together?\n\n## Agency Size Considerations\n\n### Large Agencies\n**Pros:** More resources, established processes\n**Cons:** Higher costs, less personal attention\n\n### Small Agencies\n**Pros:** Personal service, flexible, cost-effective\n**Cons:** Limited resources, capacity constraints\n\n### Freelancers\n**Pros:** Lowest cost, direct communication\n**Cons:** Single point of failure, limited scalability\n\n## Local vs International\n\n### Local Agencies (Suriname)\n**Advantages:**\n- Understand local market\n- Easy face-to-face meetings\n- Same time zone\n- Cultural alignment\n- Support local economy\n\n**Considerations:**\n- May have smaller portfolios\n- Potentially higher prices than some offshore options\n\n### International Agencies\n**Advantages:**\n- Larger portfolios\n- Potentially lower costs (depending on location)\n- Broader expertise\n\n**Considerations:**\n- Time zone differences\n- Language barriers\n- Communication challenges\n- Payment processing complexity\n\n## The Selection Process\n\n### Step 1: Research (1-2 weeks)\n- Google search\n- Ask for referrals\n- Check social media\n- Review portfolios\n\n### Step 2: Initial Contact (1 week)\n- Reach out to 3-5 agencies\n- Brief them on your project\n- Gauge their response\n\n### Step 3: Proposals (1-2 weeks)\n- Request detailed proposals\n- Compare approach and costs\n- Check references\n\n### Step 4: Interviews (1 week)\n- Meet top 2-3 agencies\n- Ask questions\n- Assess chemistry\n\n### Step 5: Decision (1 week)\n- Review proposals carefully\n- Trust your gut\n- Negotiate if needed\n\n## Working with Devmart Suriname\n\nHere''s what sets us apart:\n\n✅ **Local Expertise:** We understand Suriname businesses\n✅ **Proven Track Record:** 5+ years, 50+ successful projects\n✅ **Modern Technologies:** React, React Native, Node.js\n✅ **Transparent Pricing:** No hidden fees\n✅ **Ongoing Support:** We''re here after launch\n✅ **Multilingual:** Dutch, English, Sranantongo\n\n## Conclusion\n\nTake your time choosing a web development partner. The right agency becomes an extension of your team and contributes to your long-term success.\n\n**Ready to discuss your project?** [Contact us for a free consultation](/contact).',
    'How to Choose the Right Web Development Agency | Devmart Guide',
    'Essential guide to selecting a web development agency. Questions to ask, red flags to avoid, and what to look for in a development partner.',
    false,
    'published',
    admin_user_id,
    admin_user_id
  );

  -- Seed Team Members (8 members)
  INSERT INTO public.team (name, slug, role, bio, photo_url, socials, order_num, created_by, updated_by) VALUES
  (
    'Delroy Pelhan',
    'delroy-pelhan',
    'Founder & CEO',
    'Delroy founded Devmart Suriname with a vision to empower local businesses through digital transformation. With over 10 years of experience in software development and business strategy, he leads our team in delivering innovative solutions that drive real business results. When not coding or meeting clients, Delroy enjoys mentoring young developers and contributing to the local tech community.',
    '/assets/img/team/01.jpg',
    '{"linkedin": "https://linkedin.com/in/delroypelhan", "github": "https://github.com/delroypelhan", "twitter": "https://twitter.com/delroypelhan"}'::jsonb,
    1,
    admin_user_id,
    admin_user_id
  ),
  (
    'Sarah Williams',
    'sarah-williams',
    'Lead Developer',
    'Sarah is our technical lead with expertise in React, Node.js, and cloud architecture. She has successfully led development on over 30 web applications and specializes in building scalable, performant solutions. Sarah is passionate about clean code, best practices, and mentoring junior developers on the team.',
    '/assets/img/team/02.jpg',
    '{"linkedin": "https://linkedin.com/in/sarahwilliams", "github": "https://github.com/sarahwilliams"}'::jsonb,
    2,
    admin_user_id,
    admin_user_id
  ),
  (
    'Michael Chen',
    'michael-chen',
    'Senior UI/UX Designer',
    'Michael brings 8 years of design experience to Devmart. He specializes in creating intuitive, beautiful interfaces that users love. His work has won multiple awards, and he''s known for his user-centered design approach. Michael believes great design is invisible – it just works.',
    '/assets/img/team/03.jpg',
    '{"linkedin": "https://linkedin.com/in/michaelchen", "behance": "https://behance.net/michaelchen", "dribbble": "https://dribbble.com/michaelchen"}'::jsonb,
    3,
    admin_user_id,
    admin_user_id
  ),
  (
    'Jennifer Martinez',
    'jennifer-martinez',
    'Digital Marketing Specialist',
    'Jennifer is our digital marketing expert, specializing in SEO, PPC, and social media strategy. She has helped dozens of businesses increase their online visibility and drive conversions. With certifications from Google and HubSpot, Jennifer stays on top of the latest marketing trends and algorithms.',
    '/assets/img/team/04.jpg',
    '{"linkedin": "https://linkedin.com/in/jennifermartinez", "twitter": "https://twitter.com/jennifermartinez"}'::jsonb,
    4,
    admin_user_id,
    admin_user_id
  ),
  (
    'David Thompson',
    'david-thompson',
    'Mobile App Developer',
    'David specializes in React Native and native mobile development for iOS and Android. He has published over 20 apps to the app stores with a combined 100K+ downloads. David is passionate about mobile UX and creating apps that feel native and performant.',
    '/assets/img/team/05.jpg',
    '{"linkedin": "https://linkedin.com/in/davidthompson", "github": "https://github.com/davidthompson"}'::jsonb,
    5,
    admin_user_id,
    admin_user_id
  ),
  (
    'Emily Rodriguez',
    'emily-rodriguez',
    'Graphic Designer',
    'Emily is our creative powerhouse, designing everything from logos to marketing materials. Her work is characterized by bold colors, clean layouts, and attention to detail. She has worked with brands across industries and loves helping businesses find their visual identity.',
    '/assets/img/team/06.jpg',
    '{"linkedin": "https://linkedin.com/in/emilyrodriguez", "behance": "https://behance.net/emilyrodriguez", "instagram": "https://instagram.com/emilyrodriguez.design"}'::jsonb,
    6,
    admin_user_id,
    admin_user_id
  ),
  (
    'James Anderson',
    'james-anderson',
    'SEO Specialist',
    'James eats, sleeps, and breathes SEO. With 6 years of experience, he has helped businesses rank for competitive keywords and increase organic traffic by 500%+. James stays current with Google''s algorithm updates and implements white-hat strategies that deliver long-term results.',
    '/assets/img/team/07.jpg',
    '{"linkedin": "https://linkedin.com/in/jamesanderson", "twitter": "https://twitter.com/jamesandersonseo"}'::jsonb,
    7,
    admin_user_id,
    admin_user_id
  ),
  (
    'Lisa Nguyen',
    'lisa-nguyen',
    'Project Manager',
    'Lisa keeps our projects on track and our clients happy. With a background in both technology and business, she bridges the gap between client needs and technical execution. Lisa is certified in Agile and Scrum methodologies and ensures every project is delivered on time and within budget.',
    '/assets/img/team/08.jpg',
    '{"linkedin": "https://linkedin.com/in/lisanguyen", "twitter": "https://twitter.com/lisanguyen"}'::jsonb,
    8,
    admin_user_id,
    admin_user_id
  );

  -- Seed FAQs (12 questions across 4 categories)
  INSERT INTO public.faqs (category, question, answer, order_num, created_by, updated_by) VALUES
  -- General (3 questions)
  (
    'General',
    'What services does Devmart Suriname offer?',
    'We offer comprehensive digital services including web development, mobile app development, graphic design & branding, and SEO & digital marketing. We work with businesses of all sizes across Suriname to help them establish and grow their online presence.',
    1,
    admin_user_id,
    admin_user_id
  ),
  (
    'General',
    'How long does a typical project take?',
    'Project timelines vary based on scope and complexity. A simple website typically takes 4-6 weeks, while more complex web applications or mobile apps can take 3-6 months. We provide detailed timelines during our initial consultation and keep you updated throughout the development process.',
    2,
    admin_user_id,
    admin_user_id
  ),
  (
    'General',
    'Do you work with businesses outside Suriname?',
    'Yes! While we''re based in Paramaribo and specialize in serving Surinamese businesses, we work with clients internationally. We have experience working remotely and use modern project management tools to ensure smooth collaboration regardless of location.',
    3,
    admin_user_id,
    admin_user_id
  ),
  -- Pricing (4 questions)
  (
    'Pricing',
    'How much does a website cost?',
    'Website costs vary based on features and complexity. Our Starter package begins at $1,000-$3,000 for basic websites, Professional packages range from $3,000-$7,000 for advanced features, and Enterprise solutions start at $7,000+ for large-scale projects. Contact us for a free quote tailored to your specific needs.',
    4,
    admin_user_id,
    admin_user_id
  ),
  (
    'Pricing',
    'Do you offer payment plans?',
    'Yes! We understand that investing in digital solutions is a significant decision. We offer flexible payment plans with options for upfront payments, milestone-based payments, or monthly installments. We''ll work with you to find a payment structure that fits your budget.',
    5,
    admin_user_id,
    admin_user_id
  ),
  (
    'Pricing',
    'What''s included in your pricing?',
    'Our pricing is transparent and includes project discovery, design, development, testing, deployment, and initial training. We also provide post-launch support for 30 days. Additional services like ongoing maintenance, hosting, and content updates can be added as needed.',
    6,
    admin_user_id,
    admin_user_id
  ),
  (
    'Pricing',
    'Are there any hidden fees?',
    'Absolutely not. We believe in transparent pricing. All costs are outlined in our proposal before work begins. The only additional costs would be third-party services you approve (like premium plugins, hosting, or domain registration), which we clearly communicate upfront.',
    7,
    admin_user_id,
    admin_user_id
  ),
  -- Process (3 questions)
  (
    'Process',
    'How do we get started?',
    'Getting started is easy! Contact us via our website, phone, or email to schedule a free consultation. We''ll discuss your goals, requirements, and budget. After understanding your needs, we''ll provide a detailed proposal. Once approved, we''ll kick off the project with a discovery session.',
    8,
    admin_user_id,
    admin_user_id
  ),
  (
    'Process',
    'Will I be able to update my website after launch?',
    'Yes! We build websites with user-friendly content management systems (CMS) that allow you to easily update text, images, and other content without technical knowledge. We also provide training and documentation to help you manage your site confidently. If you prefer, we offer ongoing maintenance packages.',
    9,
    admin_user_id,
    admin_user_id
  ),
  (
    'Process',
    'Do you provide ongoing support after launch?',
    'Yes! We offer various support and maintenance packages to keep your website secure, updated, and running smoothly. This includes software updates, security monitoring, backups, content updates, and technical support. We''re committed to long-term partnerships with our clients.',
    10,
    admin_user_id,
    admin_user_id
  ),
  -- Technical (2 questions)
  (
    'Technical',
    'What technologies do you use?',
    'We use modern, industry-standard technologies including React and React Native for development, Node.js for backends, Tailwind CSS for styling, and Supabase/Firebase for databases. We choose technologies based on project requirements, ensuring scalability, security, and maintainability.',
    11,
    admin_user_id,
    admin_user_id
  ),
  (
    'Technical',
    'Will my website be mobile-friendly?',
    'Absolutely! All our websites are built with a mobile-first approach, ensuring they look great and function perfectly on smartphones, tablets, and desktops. With over 65% of web traffic coming from mobile devices, responsive design is not optional – it''s essential. We test extensively across devices and browsers.',
    12,
    admin_user_id,
    admin_user_id
  );

END $$;