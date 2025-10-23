import './style.css';
import './components/header';
import './components/footer';
import './components/icon-card';
import { initTooltips } from './utils/tooltip';

/**
 * Initialize tooltips after DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
  initTooltips();
});

console.log('Portfolio loaded successfully');
