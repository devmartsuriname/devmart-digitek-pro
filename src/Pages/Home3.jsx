import Blog2 from "../Components/Blog/Blog2";
import CaseStudy3 from "../Components/CaseStudy/CaseStudy3";
import Counter2 from "../Components/Counter/Counter2";
import HeroBanner3 from "../Components/HeroBanner/HeroBanner3";
import Marquee2 from "../Components/Marquee/Marquee2";
import Marquee3 from "../Components/Marquee/Marquee3";
import Services2 from "../Components/Services/Services2";
import Testimonial3 from "../Components/Testimonial/Testimonial3";
import WhyChoose2 from "../Components/WhyChoose/WhyChoose2";
import SEOHead from "../components/SEO/SEOHead";
import { useSettings } from "../lib/hooks/useSettings";
import { generateOrganizationSchema, generateWebSiteSchema } from "../lib/schemas/jsonLd";
import { getCanonicalUrl, getOgImageUrl } from "../lib/utils/seoHelpers";

const Home3 = () => {
    const { settings } = useSettings();

    return (
        <div>
            <SEOHead
                title={settings?.meta_title || "Digital Marketing & Web Development Agency in Suriname"}
                description={settings?.meta_desc || "Leading digital marketing and web development agency in Suriname. We create stunning websites, mobile apps, and effective digital marketing campaigns."}
                canonical={getCanonicalUrl('/')}
                ogImage={getOgImageUrl('/assets/img/hero/hero-image-3.png')}
                ogType="website"
                jsonLd={[
                    generateOrganizationSchema(settings),
                    generateWebSiteSchema(settings)
                ]}
                siteName={settings?.site_name}
            />
            <HeroBanner3></HeroBanner3>
            <Services2></Services2>
            <WhyChoose2></WhyChoose2>
            <Marquee2></Marquee2>
            <CaseStudy3></CaseStudy3>
            <Marquee3></Marquee3>
            <Testimonial3></Testimonial3>
            <Counter2></Counter2>
            <Blog2></Blog2>
        </div>
    );
};

export default Home3;