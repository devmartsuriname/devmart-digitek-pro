import { lazy, Suspense, forwardRef } from 'react';

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
  
  return (
    <Suspense fallback={<SliderSkeleton slidesToShow={slidesToShow} className={className} />}>
      <Slider ref={ref} {...settings} className={className} {...props}>
        {children}
      </Slider>
    </Suspense>
  );
});

LazySlider.displayName = 'LazySlider';

export default LazySlider;
