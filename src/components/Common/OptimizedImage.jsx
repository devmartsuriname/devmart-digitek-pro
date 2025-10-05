import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { getOptimizedImageUrl, generateSrcSet } from '@/lib/utils/imageOptimization';

/**
 * OptimizedImage Component
 * Provides lazy loading, LQIP, responsive srcset, and WebP conversion
 * 
 * @param {string} src - Source image URL
 * @param {string} alt - Alt text (required for accessibility)
 * @param {string} className - Additional CSS classes
 * @param {number} width - Image width (for aspect ratio)
 * @param {number} height - Image height (for aspect ratio)
 * @param {array} sizes - Array of widths for responsive images (e.g., [320, 640, 1024])
 * @param {string} sizesAttr - Sizes attribute for responsive images
 * @param {boolean} eager - Skip lazy loading (for above-the-fold images)
 * @param {boolean} lqip - Enable Low Quality Image Placeholder (default: true)
 * @param {function} onLoad - Callback when image loads
 * @param {function} onError - Callback on error
 */
const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  sizes = [320, 640, 768, 1024, 1280, 1536],
  sizesAttr = '100vw',
  eager = false,
  lqip = true,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(eager);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (eager || !imgRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before image enters viewport
      }
    );

    observerRef.current.observe(imgRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [eager]);

  const handleLoad = (e) => {
    setIsLoaded(true);
    onLoad?.(e);
  };

  const handleError = (e) => {
    setHasError(true);
    setIsLoaded(true); // Remove blur even on error
    onError?.(e);
  };

  // Generate srcset for responsive images
  const srcSet = isInView ? generateSrcSet(src, sizes) : undefined;
  
  // Get optimized main image URL (WebP with fallback)
  const optimizedSrc = isInView ? getOptimizedImageUrl(src, { width: 1280, quality: 85 }) : undefined;
  
  // Low quality placeholder (tiny, blurred version)
  const placeholderSrc = lqip ? getOptimizedImageUrl(src, { width: 20, quality: 30, blur: 10 }) : src;

  // Calculate aspect ratio for consistent layout (prevent CLS)
  const aspectRatio = width && height ? `${width} / ${height}` : undefined;

  return (
    <div
      ref={imgRef}
      className={`optimized-image-wrapper ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        aspectRatio,
      }}
    >
      {/* Low Quality Image Placeholder */}
      {lqip && !isLoaded && (
        <img
          src={placeholderSrc}
          alt=""
          aria-hidden="true"
          className="optimized-image-placeholder"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'blur(10px)',
            transform: 'scale(1.1)', // Prevent blur edges
            transition: 'opacity 0.3s ease-in-out',
            opacity: isLoaded ? 0 : 1,
          }}
        />
      )}

      {/* Main optimized image */}
      {isInView && (
        <img
          src={optimizedSrc || src}
          srcSet={srcSet}
          sizes={sizesAttr}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`optimized-image ${isLoaded ? 'loaded' : 'loading'}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'opacity 0.3s ease-in-out',
            opacity: isLoaded ? 1 : 0,
          }}
          {...props}
        />
      )}

      {/* Error fallback */}
      {hasError && (
        <div
          className="optimized-image-error"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'hsl(var(--muted))',
            color: 'hsl(var(--muted-foreground))',
            fontSize: '0.875rem',
          }}
        >
          <span>Image failed to load</span>
        </div>
      )}
    </div>
  );
};

OptimizedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  sizes: PropTypes.arrayOf(PropTypes.number),
  sizesAttr: PropTypes.string,
  eager: PropTypes.bool,
  lqip: PropTypes.bool,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
};

export default OptimizedImage;
