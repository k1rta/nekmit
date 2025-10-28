import './style.css';
import './components/header';
import './components/footer';
import './components/icon-card';
import { initTooltips, LandscapeDetector } from './utils/tooltip';

/**
 * Initialize tooltips and landscape detector after DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
  initTooltips();

  // Initialize landscape orientation detector for mobile devices
  new LandscapeDetector();
});

console.log('Portfolio loaded successfully');
