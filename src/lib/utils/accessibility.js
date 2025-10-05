/**
 * Accessibility Utilities
 * Helpers for WCAG 2.1 AA compliance, keyboard navigation, and screen readers
 */

/**
 * Calculate contrast ratio between two colors
 * @param {string} color1 - Hex color (e.g., '#ffffff')
 * @param {string} color2 - Hex color
 * @returns {number} - Contrast ratio (1-21)
 */
export const getContrastRatio = (color1, color2) => {
  const getLuminance = (hex) => {
    // Convert hex to RGB
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    // Calculate relative luminance
    const [rs, gs, bs] = [r, g, b].map((c) => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Check if color contrast meets WCAG AA standards
 * @param {string} foreground - Foreground color (hex)
 * @param {string} background - Background color (hex)
 * @param {string} level - 'AA' or 'AAA'
 * @param {boolean} largeText - Is text large (18pt+ or 14pt+ bold)?
 * @returns {object} - { passes: boolean, ratio: number, required: number }
 */
export const checkContrastCompliance = (
  foreground,
  background,
  level = 'AA',
  largeText = false
) => {
  const ratio = getContrastRatio(foreground, background);

  const requirements = {
    AA: largeText ? 3 : 4.5,
    AAA: largeText ? 4.5 : 7,
  };

  const required = requirements[level];
  const passes = ratio >= required;

  return {
    passes,
    ratio: ratio.toFixed(2),
    required,
    level,
  };
};

/**
 * Trap focus within a modal/dialog
 * @param {HTMLElement} element - Container element
 * @returns {function} - Cleanup function
 */
export const trapFocus = (element) => {
  const focusableElements = element.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  const handleTabKey = (e) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstFocusable) {
        lastFocusable?.focus();
        e.preventDefault();
      }
    } else {
      // Tab
      if (document.activeElement === lastFocusable) {
        firstFocusable?.focus();
        e.preventDefault();
      }
    }
  };

  element.addEventListener('keydown', handleTabKey);

  // Focus first element
  firstFocusable?.focus();

  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleTabKey);
  };
};

/**
 * Announce message to screen readers
 * @param {string} message - Message to announce
 * @param {string} priority - 'polite' or 'assertive'
 */
export const announceToScreenReader = (message, priority = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

/**
 * Check if element is visible on screen
 * @param {HTMLElement} element - Element to check
 * @returns {boolean}
 */
export const isElementVisible = (element) => {
  if (!element) return false;

  const style = window.getComputedStyle(element);
  const rect = element.getBoundingClientRect();

  return (
    style.display !== 'none' &&
    style.visibility !== 'hidden' &&
    style.opacity !== '0' &&
    rect.width > 0 &&
    rect.height > 0
  );
};

/**
 * Add keyboard navigation to a list/menu
 * @param {HTMLElement} container - Container element
 * @param {string} itemSelector - Selector for focusable items
 * @returns {function} - Cleanup function
 */
export const enableKeyboardNavigation = (container, itemSelector = '[role="menuitem"]') => {
  const items = Array.from(container.querySelectorAll(itemSelector));
  let currentIndex = 0;

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        currentIndex = (currentIndex + 1) % items.length;
        items[currentIndex]?.focus();
        break;

      case 'ArrowUp':
        e.preventDefault();
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        items[currentIndex]?.focus();
        break;

      case 'Home':
        e.preventDefault();
        currentIndex = 0;
        items[0]?.focus();
        break;

      case 'End':
        e.preventDefault();
        currentIndex = items.length - 1;
        items[items.length - 1]?.focus();
        break;

      case 'Escape':
        e.preventDefault();
        container.dispatchEvent(new CustomEvent('menu-close'));
        break;
    }
  };

  container.addEventListener('keydown', handleKeyDown);

  return () => {
    container.removeEventListener('keydown', handleKeyDown);
  };
};

/**
 * Generate unique ID for ARIA relationships
 * @param {string} prefix - ID prefix
 * @returns {string} - Unique ID
 */
export const generateAriaId = (prefix = 'aria') => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Check if user prefers reduced motion
 * @returns {boolean}
 */
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Disable animations for users who prefer reduced motion
 */
export const respectReducedMotion = () => {
  if (prefersReducedMotion()) {
    document.documentElement.classList.add('reduce-motion');
  }
};

/**
 * Set document language
 * @param {string} lang - Language code (e.g., 'en', 'nl')
 */
export const setDocumentLanguage = (lang = 'en') => {
  document.documentElement.setAttribute('lang', lang);
};

/**
 * Add skip to content link (for keyboard users)
 * @param {string} targetId - ID of main content area
 */
export const addSkipLink = (targetId = 'main-content') => {
  const existingLink = document.querySelector('.skip-link');
  if (existingLink) return;

  const skipLink = document.createElement('a');
  skipLink.href = `#${targetId}`;
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Skip to main content';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: #000;
    color: #fff;
    padding: 8px;
    text-decoration: none;
    z-index: 100;
  `;

  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
  });

  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });

  document.body.insertBefore(skipLink, document.body.firstChild);
};

/**
 * Audit page for common accessibility issues
 * @returns {array} - Array of issues found
 */
export const auditAccessibility = () => {
  const issues = [];

  // Check for images without alt text
  const images = document.querySelectorAll('img');
  images.forEach((img, index) => {
    if (!img.hasAttribute('alt')) {
      issues.push({
        type: 'missing-alt',
        element: img,
        message: `Image ${index + 1} missing alt attribute`,
        severity: 'error',
      });
    }
  });

  // Check for buttons without accessible name
  const buttons = document.querySelectorAll('button');
  buttons.forEach((btn, index) => {
    if (!btn.textContent.trim() && !btn.getAttribute('aria-label') && !btn.getAttribute('aria-labelledby')) {
      issues.push({
        type: 'missing-label',
        element: btn,
        message: `Button ${index + 1} has no accessible name`,
        severity: 'error',
      });
    }
  });

  // Check for form inputs without labels
  const inputs = document.querySelectorAll('input, select, textarea');
  inputs.forEach((input, index) => {
    if (!input.id) {
      issues.push({
        type: 'missing-id',
        element: input,
        message: `Input ${index + 1} has no ID for label association`,
        severity: 'warning',
      });
    } else {
      const label = document.querySelector(`label[for="${input.id}"]`);
      if (!label && !input.getAttribute('aria-label') && !input.getAttribute('aria-labelledby')) {
        issues.push({
          type: 'missing-label',
          element: input,
          message: `Input ${index + 1} has no associated label`,
          severity: 'error',
        });
      }
    }
  });

  // Check for missing page title
  if (!document.title || document.title.trim() === '') {
    issues.push({
      type: 'missing-title',
      message: 'Page has no title',
      severity: 'error',
    });
  }

  // Check for missing lang attribute
  if (!document.documentElement.getAttribute('lang')) {
    issues.push({
      type: 'missing-lang',
      message: 'HTML element missing lang attribute',
      severity: 'error',
    });
  }

  return issues;
};

/**
 * Log accessibility audit results to console
 */
export const logAccessibilityAudit = () => {
  const issues = auditAccessibility();

  if (issues.length === 0) {
    console.log('✅ No accessibility issues found');
    return;
  }

  console.group(`🔍 Accessibility Audit (${issues.length} issues)`);

  const errors = issues.filter(i => i.severity === 'error');
  const warnings = issues.filter(i => i.severity === 'warning');

  if (errors.length > 0) {
    console.group(`❌ Errors (${errors.length})`);
    errors.forEach(issue => console.error(issue.message, issue.element));
    console.groupEnd();
  }

  if (warnings.length > 0) {
    console.group(`⚠️ Warnings (${warnings.length})`);
    warnings.forEach(issue => console.warn(issue.message, issue.element));
    console.groupEnd();
  }

  console.groupEnd();
};
