/**
 * Reusable Footer Web Component
 * Can be used across all pages
 *
 * Usage: <footer-component></footer-component>
 */

class FooterComponent extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();
    this.innerHTML = `
      <footer class="bg-gray-900 border-t border-gray-800 py-8 mt-20">
        <div class="container mx-auto px-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            <!-- About Section -->
            <div>
              <h3 class="text-white font-semibold mb-3">Nekmit Portfolio</h3>
              <p class="text-gray-400 text-sm">
                Modern portfolio with automated testing, health monitoring, and CI/CD pipeline.
              </p>
            </div>
            
            <!-- Quick Links -->
            <div>
              <h3 class="text-white font-semibold mb-3">Quick Links</h3>
              <ul class="space-y-2 text-sm">
                <li><a href="/" class="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="/api-docs.html" class="text-gray-400 hover:text-white transition-colors">API Docs</a></li>
                <li><a href="/test-reports/" class="text-gray-400 hover:text-white transition-colors">Test Reports</a></li>
                <li><a href="https://github.com/k1rta/nekmit" target="_blank" rel="noopener" class="text-gray-400 hover:text-white transition-colors">GitHub</a></li>
              </ul>
            </div>
            
            <!-- Tech Stack -->
            <div>
              <h3 class="text-white font-semibold mb-3">Built With</h3>
              <ul class="space-y-2 text-sm text-gray-400">
                <li>⚡ Vite</li>
                <li>🎨 Tailwind CSS</li>
                <li>🧪 Playwright</li>
                <li>🔄 GitHub Actions</li>
              </ul>
            </div>
          </div>
          
          <!-- Copyright -->
          <div class="border-t border-gray-800 pt-6 text-center text-gray-400 text-sm">
            <p>© ${year} Nekmit OÜ. All rights reserved.</p>
            <p class="mt-2">Built with ❤️ using modern web technologies</p>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('footer-component', FooterComponent);

// Keep backward compatibility
customElements.define('portfolio-footer', FooterComponent);

export default FooterComponent;
