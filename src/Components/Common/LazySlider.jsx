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
      
      // Get the actual slider DOM element - react-slick wraps everything
      const sliderElement = slider.innerSlider?.list || document.querySelector('.slick-list');
      if (!sliderElement) return;
      
      // Get all slides including cloned ones
      const slides = sliderElement.querySelectorAll('.slick-slide');
      if (!slides || slides.length === 0) return;
      
      slides.forEach(slide => {
        const isHidden = slide.getAttribute('aria-hidden') === 'true';
        const focusableElements = slide.querySelectorAll(
          'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        
        focusableElements.forEach(el => {
          if (isHidden) {
            el.setAttribute('tabindex', '-1');
            el.setAttribute('aria-hidden', 'true');
          } else {
            // Only remove tabindex if we added it (don't affect intentional tabindex)
            if (el.getAttribute('tabindex') === '-1') {
              el.removeAttribute('tabindex');
            }
            el.removeAttribute('aria-hidden');
          }
        });
      });
    };
    
    // Run after mount with enough delay for react-slick to initialize
    const timer = setTimeout(handleSlideChange, 300);
    
    // Listen for slide changes more frequently
    const interval = setInterval(handleSlideChange, 200);
    
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
