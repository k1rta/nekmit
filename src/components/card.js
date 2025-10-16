/**
 * Reusable Card Web Component
 *
 * Usage:
 * <info-card
 *   title="Card Title"
 *   subtitle="Optional subtitle"
 *   theme="default|primary|success|warning|error">
 *   <slot>Card content goes here</slot>
 * </info-card>
 */

class InfoCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['title', 'subtitle', 'theme'];
  }

  attributeChangedCallback() {
    this.render();
  }

  getThemeColors() {
    const theme = this.getAttribute('theme') || 'default';
    const themes = {
      default: {
        bg: 'bg-white',
        border: 'border-gray-200',
        title: 'text-gray-900',
        subtitle: 'text-gray-600',
      },
      primary: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        title: 'text-blue-900',
        subtitle: 'text-blue-700',
      },
      success: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        title: 'text-green-900',
        subtitle: 'text-green-700',
      },
      warning: {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        title: 'text-yellow-900',
        subtitle: 'text-yellow-700',
      },
      error: {
        bg: 'bg-red-50',
        border: 'border-red-200',
        title: 'text-red-900',
        subtitle: 'text-red-700',
      },
    };
    return themes[theme] || themes.default;
  }

  render() {
    const title = this.getAttribute('title') || '';
    const subtitle = this.getAttribute('subtitle') || '';
    const colors = this.getThemeColors();

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        .card {
          background: white;
          border-radius: 0.75rem;
          border: 1px solid #e5e7eb;
          padding: 1.5rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
        }
        
        .card:hover {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          transform: translateY(-2px);
        }
        
        .card-header {
          margin-bottom: 1rem;
        }
        
        .card-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #111827;
          margin: 0 0 0.25rem 0;
        }
        
        .card-subtitle {
          font-size: 0.875rem;
          color: #6b7280;
          margin: 0;
        }
        
        .card-content {
          color: #374151;
          line-height: 1.6;
        }
        
        .theme-primary .card {
          background: #eff6ff;
          border-color: #bfdbfe;
        }
        
        .theme-primary .card-title {
          color: #1e3a8a;
        }
        
        .theme-primary .card-subtitle {
          color: #3b82f6;
        }
        
        .theme-success .card {
          background: #f0fdf4;
          border-color: #bbf7d0;
        }
        
        .theme-success .card-title {
          color: #14532d;
        }
        
        .theme-success .card-subtitle {
          color: #22c55e;
        }
        
        .theme-warning .card {
          background: #fefce8;
          border-color: #fde047;
        }
        
        .theme-warning .card-title {
          color: #713f12;
        }
        
        .theme-warning .card-subtitle {
          color: #eab308;
        }
        
        .theme-error .card {
          background: #fef2f2;
          border-color: #fecaca;
        }
        
        .theme-error .card-title {
          color: #7f1d1d;
        }
        
        .theme-error .card-subtitle {
          color: #ef4444;
        }
      </style>
      
      <div class="card theme-${this.getAttribute('theme') || 'default'}">
        ${
          title
            ? `
          <div class="card-header">
            <h3 class="card-title">${title}</h3>
            ${subtitle ? `<p class="card-subtitle">${subtitle}</p>` : ''}
          </div>
        `
            : ''
        }
        <div class="card-content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('info-card', InfoCard);

export default InfoCard;
