import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'jquery'
import "slick-carousel/slick/slick.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/main.css';
import './assets/accessibility.css';

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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
