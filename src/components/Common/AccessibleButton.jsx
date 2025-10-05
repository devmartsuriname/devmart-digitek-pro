import PropTypes from 'prop-types';

/**
 * AccessibleButton Component
 * Button with built-in accessibility features (ARIA, keyboard support)
 * 
 * @param {string} variant - Button style variant
 * @param {string} size - Button size (sm, md, lg)
 * @param {boolean} disabled - Disabled state
 * @param {boolean} loading - Loading state
 * @param {string} ariaLabel - Accessible label (required if no children text)
 * @param {string} ariaDescribedBy - ID of element describing button
 * @param {function} onClick - Click handler
 * @param {ReactNode} children - Button content
 */
const AccessibleButton = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  ariaLabel,
  ariaDescribedBy,
  onClick,
  children,
  className = '',
  ...props
}) => {
  const variantClasses = {
    primary: 'theme-btn',
    secondary: 'theme-btn bg-secondary',
    outline: 'theme-btn-outline',
    ghost: 'theme-btn-ghost',
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  };

  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  const handleKeyDown = (e) => {
    // Support Enter and Space keys
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e);
    }
  };

  return (
    <button
      type="button"
      className={`
        ${variantClasses[variant] || variantClasses.primary}
        ${sizeClasses[size]}
        ${disabled || loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
        transition-all duration-200
      `}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {loading && (
        <span className="inline-block mr-2 animate-spin" aria-hidden="true">
          ⏳
        </span>
      )}
      {children}
    </button>
  );
};

AccessibleButton.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  ariaLabel: PropTypes.string,
  ariaDescribedBy: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default AccessibleButton;
