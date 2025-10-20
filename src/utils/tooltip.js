import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

export function initTooltips() {
  tippy('[data-tooltip]', {
    content: reference => reference.getAttribute('data-tooltip'),
    placement: 'bottom',
    animation: 'fade',
    theme: 'custom',
    arrow: true,
    delay: [200, 0],
    offset: [0, 15], // Add nice distance below icons
    // Enhanced mobile/touch support
    touch: ['hold', 500], // Show tooltip on long press (500ms)
    hideOnClick: true, // Hide when tapping elsewhere
    interactive: false, // Prevent tooltip from interfering with touch
    // Better mobile behavior
    trigger: 'mouseenter focus', // Desktop: hover, Mobile: focus/touch
  });
}
