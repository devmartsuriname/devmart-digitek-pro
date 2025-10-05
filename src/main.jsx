import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "slick-carousel/slick/slick.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/main.css';
import './assets/accessibility.css';

console.log('🟢 Main.jsx loaded');
console.log('🟢 Environment:', import.meta.env.MODE);

// Initialize accessibility features
import { respectReducedMotion, setDocumentLanguage } from './lib/utils/accessibility';

// Set document language
setDocumentLanguage('en');

// Respect reduced motion preference
respectReducedMotion();

// Track keyboard usage for focus styles
let isUsingKeyboard = false;

document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    isUsingKeyboard = true;
    document.body.classList.add('user-is-tabbing');
  }
});

document.addEventListener('mousedown', () => {
  isUsingKeyboard = false;
  document.body.classList.remove('user-is-tabbing');
});

console.log('🟢 Rendering App...');

try {
  const rootElement = document.getElementById('root');
  console.log('🟢 Root element found:', !!rootElement);
  
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
  
  console.log('🟢 App rendered successfully');
} catch (error) {
  console.error('🔴 Failed to render App:', error);
  document.body.innerHTML = `
    <div style="padding: 20px; font-family: sans-serif;">
      <h1 style="color: #ef4444;">Application Failed to Load</h1>
      <p><strong>Error:</strong> ${error.message}</p>
      <pre style="background: #1a1a1a; color: #fff; padding: 15px; border-radius: 8px; overflow: auto;">${error.stack}</pre>
    </div>
  `;
}
