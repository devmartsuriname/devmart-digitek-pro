import { useState } from "react";
import PricingCard from "../Card/PricingCard";

const Pricng2 = () => {

    const [isActive, setIsActive] = useState('monthly');

    return (
        <section className="pricing-section fix section-padding">
            <div className="container">
                <div className="section-title-area">
                    <div className="section-title">
                        <div className="sub-title bg-color-2 wow fadeInUp">
                            <span>OUR PRICING PLANS</span>
                        </div>
                        <h2 className="wow fadeInUp" data-wow-delay=".3s">
                            Transparent Pricing for <br/> Every Business
                        </h2>
                    </div>
                    <div className="pricing-content">
                        <div className="pricing-tab-header">
                            <ul className="nav" role="tablist">
                                <li className={`nav-item wow fadeInUp ${isActive === 'monthly' ? 'active' : ''}`} onClick={() => setIsActive('monthly')}  data-wow-delay=".3s" role="presentation">
                                    <a href="#monthly" data-bs-toggle="tab" className="nav-link active" aria-selected="true" role="tab">
                                    Monthly
                                    </a>
                                </li>
                                <li className={`nav-item ${isActive === 'yearly' ? 'active' : ''}`} onClick={() => setIsActive('yearly')}  data-wow-delay=".5s" role="presentation">
                                    <a href="#yearly" data-bs-toggle="tab" className="nav-link" aria-selected="false" role="tab" tabIndex="-1">
                                    Yearly
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="tab-content">
                    <div className={`tab-pane ${isActive === 'monthly' ? 'active' : ''}`} id="monthly" role="tabpanel">
                        <div className="row g-4">
                            <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".3s">
                                    <PricingCard
                                        addclass="pricing-box-items"
                                        title="Starter"
                                        price="$1,000 - $3,000"
                                        month="Project"
                                        FeatureList={[
                                            "5-page responsive website",
                                            "Basic SEO setup",
                                            "Contact form integration",
                                            "Mobile optimization",
                                            "1 month support included",
                                            "Fast delivery (2-4 weeks)",
                                            "Perfect for small businesses",
                                        ]}
                                        btnurl="/contact"
                                        btnname="Get Started"
                                    ></PricingCard>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".5s">
                                    <PricingCard
                                        addclass="pricing-box-items style-2"
                                        title="Professional"
                                        price="$3,000 - $7,000"
                                        month="Project"
                                        FeatureList={[
                                            "10-page responsive website",
                                            "Advanced SEO optimization",
                                            "Blog/CMS integration",
                                            "E-commerce (up to 50 products)",
                                            "Analytics setup & tracking",
                                            "3 months support included",
                                            "Ideal for growing businesses",
                                        ]}
                                        btnurl="/contact"
                                        btnname="Get Started"
                                    ></PricingCard>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".7s">
                                <PricingCard
                                        addclass="pricing-box-items"
                                        title="Enterprise"
                                        price="$7,000+"
                                        month="Project"
                                        FeatureList={[
                                            "Custom web application",
                                            "Advanced features & integrations",
                                            "Dedicated project manager",
                                            "Priority support 24/7",
                                            "6 months support included",
                                            "Ongoing maintenance available",
                                            "Built for large organizations",
                                        ]}
                                        btnurl="/contact"
                                        btnname="Get Started"
                                    ></PricingCard>
                            </div>
                        </div>
                    </div>
                    <div id="yearly" className={`tab-pane ${isActive === 'yearly' ? 'active' : ''}`} role="tabpanel">
                        <div className="row g-4">
                            <div className="col-xl-4 col-lg-6 col-md-6">
                                    <PricingCard
                                        addclass="pricing-box-items"
                                        title="Starter"
                                        price="$900 - $2,700"
                                        month="Year"
                                        FeatureList={[
                                            "5-page responsive website",
                                            "Basic SEO setup",
                                            "Contact form integration",
                                            "Mobile optimization",
                                            "12 months support included",
                                            "Quarterly updates",
                                            "Save 10% vs monthly",
                                        ]}
                                        btnurl="/contact"
                                        btnname="Get Started"
                                    ></PricingCard>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6">
                                     <PricingCard
                                        addclass="pricing-box-items style-2"
                                        title="Professional"
                                        price="$2,700 - $6,300"
                                        month="Year"
                                        FeatureList={[
                                            "10-page responsive website",
                                            "Advanced SEO optimization",
                                            "Blog/CMS integration",
                                            "E-commerce (up to 50 products)",
                                            "Analytics & monthly reports",
                                            "12 months support included",
                                            "Save 10% vs monthly",
                                        ]}
                                        btnurl="/contact"
                                        btnname="Get Started"
                                    ></PricingCard>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6">

                            <PricingCard
                                        addclass="pricing-box-items"
                                        title="Enterprise"
                                        price="$6,300+"
                                        month="Year"
                                        FeatureList={[
                                            "Custom web application",
                                            "Advanced features & integrations",
                                            "Dedicated project manager",
                                            "Priority support 24/7",
                                            "12 months premium support",
                                            "Ongoing maintenance & updates",
                                            "Save 10% vs monthly",
                                        ]}
                                        btnurl="/contact"
                                        btnname="Get Started"
                                    ></PricingCard>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricng2;