/**
 * Portfolio footer component
 */
class PortfolioFooter extends HTMLElement {
  connectedCallback(): void {
    const year: number = new Date().getFullYear();
    this.innerHTML = `
      <footer class="bg-gray-900 border-t border-gray-800 py-8 mt-20">
        <div class="container mx-auto px-6 text-center text-gray-400">
          <p>© ${year} Your Name. Built with Vite + Tailwind + Playwright</p>
        </div>
      </footer>
    `;
  }
}

customElements.define('portfolio-footer', PortfolioFooter);
