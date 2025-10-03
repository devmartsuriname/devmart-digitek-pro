import About1 from "../Components/About/About1";
import Blog1 from "../Components/Blog/Blog1";
import Brand1 from "../Components/Brand/Brand1";
import CaseStudy1 from "../Components/CaseStudy/CaseStudy1";
import Counter1 from "../Components/Counter/Counter1";
import Cta1 from "../Components/Cta/Cta1";
import HeroBanner1 from "../Components/HeroBanner/HeroBanner1";
import Marquee1 from "../Components/Marquee/Marquee1";
import Services1 from "../Components/Services/Services1";
import SuccessStories from "../Components/SuccessStories/SuccessStories";
import Testimonial1 from "../Components/Testimonial/Testimonial1";

const Home = () => {
    return (
        <div>
            <HeroBanner1></HeroBanner1>
            <Brand1></Brand1>
            <About1></About1>
            <Services1></Services1>
            <CaseStudy1></CaseStudy1>
            <Counter1></Counter1>
            <Marquee1></Marquee1>
            <SuccessStories></SuccessStories>
            <Testimonial1></Testimonial1>
            <Cta1></Cta1>
            <Blog1></Blog1>
        </div>
    );
};

export default Home;
