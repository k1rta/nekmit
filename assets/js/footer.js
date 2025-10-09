/* eslint-env browser, node */
/**
 * Reusable footer component for consistent footer across pages
 * Single source of truth for footer content and styling
 */

function createFooterHTML() {
  return `
    <footer id="footer" data-testid="footer">
      <div class="footerfade-red">
        <span class="row" data-testid="copyright">&copy; Nekmit LLC • Design: <a href="http://html5up.net">HTML5 UP</a></span>
      </div>
    </footer>
  `;
}

function insertFooter(containerId) {
  if (typeof document !== 'undefined') {
    // eslint-disable-next-line no-undef
    const container = document.getElementById(containerId);
    if (container) {
      container.insertAdjacentHTML('beforeend', createFooterHTML());
    }
  }
}

// For modal usage - returns complete footer structure
function createModalFooterHTML() {
  return `
    <footer id="modal-footer" class="modal-footer" data-testid="footer">
      <div class="footerfade-cyan">
        <span class="row" data-testid="copyright">&copy; Nekmit LLC • Design: <a href="http://html5up.net">HTML5 UP</a></span>
      </div>
    </footer>
  `;
}

// Export for use in other scripts
// eslint-disable-next-line no-undef
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  // eslint-disable-next-line no-undef
  module.exports = { createFooterHTML, insertFooter, createModalFooterHTML };
}
