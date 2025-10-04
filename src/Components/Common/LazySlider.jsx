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
  
  // Fix accessibility: Prevent tab focus on hidden slides using MutationObserver
  useEffect(() => {
    const updateFocusableElements = () => {
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
            // Store original tabindex if it exists
            if (!el.hasAttribute('data-original-tabindex') && el.hasAttribute('tabindex')) {
              el.setAttribute('data-original-tabindex', el.getAttribute('tabindex'));
            }
            el.setAttribute('tabindex', '-1');
            el.setAttribute('aria-hidden', 'true');
          } else {
            // Restore original tabindex or remove it
            const originalTabindex = el.getAttribute('data-original-tabindex');
            if (originalTabindex) {
              el.setAttribute('tabindex', originalTabindex);
              el.removeAttribute('data-original-tabindex');
            } else {
              el.removeAttribute('tabindex');
            }
            el.removeAttribute('aria-hidden');
          }
        });
      });
    };
    
    // Initial setup with delay for react-slick to initialize
    const initTimer = setTimeout(updateFocusableElements, 100);
    
    // Set up MutationObserver to watch for DOM changes
    let observer;
    const setupObserver = () => {
      const slider = sliderRef.current;
      if (!slider) return;
      
      const sliderElement = slider.innerSlider?.list || document.querySelector('.slick-list');
      if (!sliderElement) return;
      
      observer = new MutationObserver(() => {
        updateFocusableElements();
      });
      
      // Watch for attribute changes on slides (aria-hidden)
      observer.observe(sliderElement, {
        attributes: true,
        attributeFilter: ['aria-hidden', 'class'],
        subtree: true,
        childList: true
      });
    };
    
    const observerTimer = setTimeout(setupObserver, 150);
    
    // Also run on resize and slide change events
    const handleResize = () => updateFocusableElements();
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(initTimer);
      clearTimeout(observerTimer);
      window.removeEventListener('resize', handleResize);
      if (observer) {
        observer.disconnect();
      }
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
