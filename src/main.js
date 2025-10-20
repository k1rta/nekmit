import './style.css';
import './components/header.js';
import './components/footer.js';
import './components/icon-card.js';
import { initTooltips } from './utils/tooltip.js';

// Initialize tooltips after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initTooltips();
});

console.log('Portfolio loaded successfully');
