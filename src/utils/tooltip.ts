import tippy, { type Props as TippyProps } from 'tippy.js';
import 'tippy.js/dist/tippy.css';

/**
 * Initialize tooltips for all elements with [data-tooltip] attribute
 */
export function initTooltips(): void {
  tippy('[data-tooltip]', {
    content: reference => reference.getAttribute('data-tooltip') || '',
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
  } as Partial<TippyProps>);
}

/**
 * Landscape orientation detector for mobile devices
 */
export class LandscapeDetector {
  private banner: HTMLElement | null;
  private maxHeight: number = 600;
  private maxWidth: number = 900;

  constructor() {
    this.banner = document.getElementById('landscape-banner');
    this.init();
  }

  private init(): void {
    if (!this.banner) return;

    // Check orientation on load with a small delay to ensure DOM is ready
    // Immediate check
    this.checkOrientation();
    // Double-check after a small delay for reliability
    setTimeout(() => this.checkOrientation(), 10);

    // Listen for orientation changes
    window.addEventListener('orientationchange', () => this.checkOrientation());
    window.addEventListener('resize', () => this.checkOrientation());
  }

  private checkOrientation(): void {
    if (!this.banner) return;

    const isLandscape = window.innerWidth > window.innerHeight;
    const isMobile = window.innerWidth <= this.maxWidth && window.innerHeight <= this.maxHeight;
    const shouldShowBanner = isLandscape && isMobile;

    if (shouldShowBanner) {
      this.showBanner();
    } else {
      this.hideBanner();
    }
  }

  private showBanner(): void {
    if (!this.banner) return;
    this.banner.classList.remove('hidden');
    this.banner.classList.add('flex');
    // Add class to body to hide main content and footer
    document.body.classList.add('landscape-mode-active');
  }

  private hideBanner(): void {
    if (!this.banner) return;
    this.banner.classList.add('hidden');
    this.banner.classList.remove('flex');
    // Remove class from body to show main content and footer
    document.body.classList.remove('landscape-mode-active');
  }
}
