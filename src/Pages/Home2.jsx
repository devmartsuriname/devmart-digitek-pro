import About2 from "../Components/About/About2";
import Blog1 from "../Components/Blog/Blog1";
import CaseStudy2 from "../Components/CaseStudy/CaseStudy2";
import Counter1 from "../Components/Counter/Counter1";
import HeroBanner2 from "../Components/HeroBanner/HeroBanner2";
import Services3 from "../Components/Services/Services3";
import Team2 from "../Components/Team/Team2";
import Testimonial2 from "../Components/Testimonial/Testimonial2";
import WhatWeDo from "../Components/WhatWeDo/WhatWeDo";
import WhatWeDo2 from "../Components/WhatWeDo/WhatWeDo2";
import WhyChoose1 from "../Components/WhyChoose/WhyChoose1";

const Home2 = () => {
    return (
        <div>
            <HeroBanner2></HeroBanner2>
            <About2 addclass="about-section-2 section-padding pt-0"></About2>
            <Services3></Services3>
            <CaseStudy2></CaseStudy2>
            <WhatWeDo></WhatWeDo>
            <Counter1></Counter1>
            <WhatWeDo2></WhatWeDo2>
            <WhyChoose1></WhyChoose1>
            <Team2></Team2>
            <Testimonial2></Testimonial2>
            <Blog1></Blog1>
        </div>
    );
};

export default Home2;
