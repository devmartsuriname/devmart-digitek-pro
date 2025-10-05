import { useEffect, useRef } from 'react';
import {
  trapFocus,
  announceToScreenReader,
  enableKeyboardNavigation,
  respectReducedMotion,
  setDocumentLanguage,
} from '@/lib/utils/accessibility';

/**
 * Hook to trap focus within a modal/dialog
 * @param {boolean} isOpen - Whether modal is open
 * @returns {ref} - Ref to attach to modal container
 */
export const useFocusTrap = (isOpen) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!isOpen || !ref.current) return;

    const cleanup = trapFocus(ref.current);

    return cleanup;
  }, [isOpen]);

  return ref;
};

/**
 * Hook to announce messages to screen readers
 * @returns {function} - Function to announce message
 */
export const useScreenReaderAnnouncement = () => {
  return (message, priority = 'polite') => {
    announceToScreenReader(message, priority);
  };
};

/**
 * Hook to enable keyboard navigation in a menu/list
 * @param {boolean} isOpen - Whether menu is open
 * @param {string} itemSelector - Selector for focusable items
 * @returns {ref} - Ref to attach to menu container
 */
export const useKeyboardNavigation = (isOpen, itemSelector = '[role="menuitem"]') => {
  const ref = useRef(null);

  useEffect(() => {
    if (!isOpen || !ref.current) return;

    const cleanup = enableKeyboardNavigation(ref.current, itemSelector);

    return cleanup;
  }, [isOpen, itemSelector]);

  return ref;
};

/**
 * Hook to respect user's reduced motion preference
 */
export const useReducedMotion = () => {
  useEffect(() => {
    respectReducedMotion();
  }, []);
};

/**
 * Hook to set document language
 * @param {string} lang - Language code
 */
export const useDocumentLanguage = (lang = 'en') => {
  useEffect(() => {
    setDocumentLanguage(lang);
  }, [lang]);
};

/**
 * Hook to manage ARIA live region
 * @returns {object} - { announceRef, announce }
 */
export const useAriaLiveRegion = () => {
  const announceRef = useRef(null);

  const announce = (message, priority = 'polite') => {
    if (!announceRef.current) return;
    
    announceRef.current.textContent = message;
    announceRef.current.setAttribute('aria-live', priority);
  };

  return { announceRef, announce };
};

/**
 * Hook to handle Escape key for closing modals/menus
 * @param {function} onEscape - Callback when Escape is pressed
 * @param {boolean} enabled - Whether to listen for Escape
 */
export const useEscapeKey = (onEscape, enabled = true) => {
  useEffect(() => {
    if (!enabled) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onEscape?.();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onEscape, enabled]);
};

/**
 * Hook to restore focus after modal/menu closes
 * @param {boolean} isOpen - Whether modal/menu is open
 * @returns {function} - Function to save current focus
 */
export const useRestoreFocus = (isOpen) => {
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Save current focus
      previousFocusRef.current = document.activeElement;
    } else {
      // Restore focus when closed
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus();
      }
      previousFocusRef.current = null;
    }
  }, [isOpen]);

  const saveFocus = () => {
    previousFocusRef.current = document.activeElement;
  };

  return saveFocus;
};
