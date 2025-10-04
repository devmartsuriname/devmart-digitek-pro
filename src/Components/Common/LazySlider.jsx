import { lazy, Suspense, forwardRef, useEffect, useRef } from 'react';

const Slider = lazy(() => import('react-slick'));

const SliderSkeleton = ({ slidesToShow = 3, className = '' }) => {
  return (
    <div className={`d-flex gap-3 ${className}`}>
      {Array.from({ length: slidesToShow }).map((_, i) => (
        <div key={i} className="flex-fill">
          <div className="placeholder-glow">
            <div className="placeholder col-12 bg-secondary" style={{ height: '300px', borderRadius: '8px' }}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

const LazySlider = forwardRef(({ children, settings, className, ...props }, ref) => {
  const slidesToShow = settings?.slidesToShow || 1;
  const sliderRef = useRef(null);
  
  // Fix accessibility: Prevent tab focus on hidden slides
  useEffect(() => {
    const handleSlideChange = () => {
      const slider = sliderRef.current;
      if (!slider) return;
      
      // Get all slides
      const slides = slider.innerSlider?.list?.querySelectorAll('.slick-slide');
      if (!slides) return;
      
      slides.forEach(slide => {
        const isHidden = slide.getAttribute('aria-hidden') === 'true';
        const focusableElements = slide.querySelectorAll(
          'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        
        focusableElements.forEach(el => {
          if (isHidden) {
            el.setAttribute('tabindex', '-1');
          } else {
            el.removeAttribute('tabindex');
          }
        });
      });
    };
    
    // Run on mount and after slider changes
    const timer = setTimeout(handleSlideChange, 100);
    
    // Listen for slide changes
    const interval = setInterval(handleSlideChange, 500);
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [children]);
  
  return (
    <Suspense fallback={<SliderSkeleton slidesToShow={slidesToShow} className={className} />}>
      <Slider 
        ref={(node) => {
          sliderRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }} 
        {...settings} 
        className={className} 
        {...props}
      >
        {children}
      </Slider>
    </Suspense>
  );
});

LazySlider.displayName = 'LazySlider';

export default LazySlider;
