export class IconCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const label = this.getAttribute('label');
    const href = this.getAttribute('href');
    const icon = this.getAttribute('icon');
    const color = this.getAttribute('color') || 'blue';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }
        .card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem;
          border-radius: 0.5rem;
          transition: transform 0.2s;
          background: var(--card-bg, #3f4f6f);
        }
        .card:hover {
          transform: translateY(-4px);
        }
        .icon {
          font-size: 2rem;
          color: ${color};
        }
        .label {
          margin-top: 0.5rem;
          font-size: 0.875rem;
          color: #374151;
        }
      </style>
      <a href="${href}" class="card">
        <span class="icon">${icon}</span>
        <span class="label">${label}</span>
      </a>
    `;
  }
}

customElements.define('icon-card', IconCard);
