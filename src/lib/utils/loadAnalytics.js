export const loadAnalytics = (siteId = 'devmart.sr') => {
  if (typeof window === 'undefined') return;
  
  // Check if script already loaded
  const existingScript = document.querySelector('script[data-domain]');
  if (existingScript) return;
  
  const script = document.createElement('script');
  script.defer = true;
  script.dataset.domain = siteId;
  script.src = 'https://plausible.io/js/script.js';
  document.head.appendChild(script);
};
