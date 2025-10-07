/**
 * Admin UI Design System Configuration
 * Centralized design tokens for the Devmart Admin Dashboard
 * Version: 0.14.0
 */

export const adminTheme = {
  colors: {
    primary: '#6A47ED',
    accent: '#C6F806',
    background: '#17012C',
    cardGradient: 'linear-gradient(180deg, #1a102e 0%, #0e081d 100%)',
    cardGradientHover: 'linear-gradient(180deg, #221841 0%, #13102a 100%)',
  },
  shadows: {
    light: '0 0 10px rgba(100, 60, 255, 0.15)',
    hover: '0 0 12px rgba(180, 100, 255, 0.25)',
    glow: '0 4px 20px rgba(106, 71, 237, 0.3)',
  },
  spacing: {
    cardPadding: '0.75rem', // 12px
    cardPaddingLarge: '1rem', // 16px
    sectionMargin: '1rem', // 16px
    gridGap: '0.75rem', // 12px
    sidebarWidth: '240px',
    sidebarWidthCollapsed: '56px',
  },
  transitions: {
    fast: '0.2s ease',
    normal: '0.3s ease',
    slow: '0.4s ease',
  },
  typography: {
    pageTitle: '1.75rem', // 28px
    sectionTitle: '1.125rem', // 18px
    cardLabel: '0.875rem', // 14px
    bodyText: '1rem', // 16px
    small: '0.75rem', // 12px
  },
};

export default adminTheme;
