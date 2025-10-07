import { lazy, Suspense, forwardRef, useEffect, useRef, useState } from 'react';
import { logger } from '@/lib/utils/logger';

const Slider = lazy(() => import('react-slick'));

// Debounce utility to prevent rapid-fire updates
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

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
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Disable autoplay on initial load to prevent flickering
  const effectiveSettings = {
    ...settings,
    autoplay: isInitialized ? settings?.autoplay : false,
  };
  
  // Re-enable autoplay after initial render
  useEffect(() => {
    if (settings?.autoplay && !isInitialized) {
      const timer = setTimeout(() => {
        setIsInitialized(true);
        // Manually start autoplay if slider is ready
        if (sliderRef.current?.slickPlay) {
          sliderRef.current.slickPlay();
        }
      }, 1000); // Wait 1 second before starting autoplay
      
      return () => clearTimeout(timer);
    }
  }, [settings?.autoplay, isInitialized]);
  
  // Fix accessibility: Prevent tab focus on hidden slides using optimized MutationObserver
  useEffect(() => {
    let isUpdating = false; // Prevent concurrent updates
    
    const updateFocusableElements = () => {
      // Safeguard: prevent concurrent updates
      if (isUpdating) return;
      
      try {
        isUpdating = true;
        
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
      } catch (error) {
        logger.error('LazySlider accessibility update error', error);
      } finally {
        isUpdating = false;
      }
    };
    
    // Debounced version with increased delay for stability (300ms instead of 100ms)
    const debouncedUpdate = debounce(updateFocusableElements, 300);
    
    // Initial setup with delay for react-slick to initialize
    const initTimer = setTimeout(updateFocusableElements, 500);
    
    // Set up MutationObserver to watch for DOM changes
    let observer;
    const setupObserver = () => {
      const slider = sliderRef.current;
      if (!slider) return;
      
      const sliderElement = slider.innerSlider?.list || document.querySelector('.slick-list');
      if (!sliderElement) return;
      
      observer = new MutationObserver((mutations) => {
        // Only react to aria-hidden changes AND ensure slider is not transitioning
        const hasAriaChange = mutations.some(
          mutation => mutation.type === 'attributes' && mutation.attributeName === 'aria-hidden'
        );
        
        if (hasAriaChange) {
          // Extra debouncing during transitions to prevent flicker
          debouncedUpdate();
        }
      });
      
      // Optimized observer config - only watch aria-hidden attribute
      observer.observe(sliderElement, {
        attributes: true,
        attributeFilter: ['aria-hidden'], // ONLY watch aria-hidden, not class or other attributes
        subtree: true, // Still need to watch children slides
        childList: false // Don't watch for added/removed nodes
      });
    };
    
    const observerTimer = setTimeout(setupObserver, 600);
    
    // Debounced resize handler with increased delay
    const handleResize = debounce(updateFocusableElements, 400);
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
        {...effectiveSettings} 
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
