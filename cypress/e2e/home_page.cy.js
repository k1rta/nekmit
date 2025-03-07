import homepage from '../selectors/home_page.js'

describe('Home page', () => {
  const text = {
    headingText: 'Kirta-Linda Karits',
    paragraphText: '\n            Smarter Tests • Faster Automation • Better Releases\n          ',
    footerText: '\n          © Nekmit LLC. Design:\n            HTML5 UP.\n        ',
  }

  const css = {
    headingColor: 'rgb(99, 230, 190)',
    paragraphColor: 'rgb(99, 230, 190)',
    headingFontFamily: '"JetBrains Mono", monospace',
    paragraphFontFamily: '"JetBrains Mono", monospace',
    headingFontSize: '64px',
    paragraphFontSize: '20.8px',
    headingFontWeight: '700',
    paragraphFontWeight: '100',
    headingLetterSpacing: '0',
    paragraphLetterSpacing: '0',
    headingLineHeight: '64px',
    paragraphLineHeight: '28px',
    paragraphOpacity: '0.75',
    paragraphMargin: '15.6px 0px 5.2px',
  }

  const expectedIcons = [
    'fa-user-astronaut',
    'fa-check',
    'fa-github',
    'fa-paper-plane',
    'fa-briefcase',
  ]

  const expectedLinks = [
    'assets/Resume_KLK.pdf',
    'https://github.com/k1rta/nekmit/',
    'https://github.com/k1rta?tab=repositories',
    'mailto:kirtalindakarits@icloud.com',
    'https://ariregister.rik.ee/eng/company/14401168/Nekmit-O%C3%9C',
    'http://html5up.net/',
  ]

  beforeEach(() => {
    cy.visit('')
  })

  it('should load the page in under 2 seconds', () => {
    const start = performance.now()

    cy.visit('').then(() => {
      cy.window().then((win) => {
        const loadTime = performance.now() - start
        cy.log(`Page load time: ${loadTime.toFixed(2)}ms`)
        expect(loadTime).to.be.lessThan(2000)
      })
    })
  })

  it('should display the correct heading with proper styles', () => {
    cy.get(homepage.header).should('be.visible')
    cy.get(homepage.heading)
      .should('be.visible')
      .and('have.text', text.headingText)
      .and('have.css', 'font-family', css.headingFontFamily)
      .and('have.css', 'color', css.headingColor)
      .and('have.css', 'font-size', css.headingFontSize)
      .and('have.css', 'font-weight', css.headingFontWeight)
      .and('have.css', 'letter-spacing', css.headingLetterSpacing)
      .and('have.css', 'line-height', css.headingLineHeight)
  })

  it('should display the correct paragraph with proper styles', () => {
    cy.get(homepage.paragraph)
      .should('be.visible')
      .and('have.text', text.paragraphText)
      .and('have.css', 'font-family', css.paragraphFontFamily)
      .and('have.css', 'color', css.paragraphColor)
      .and('have.css', 'font-size', css.paragraphFontSize)
      .and('have.css', 'font-weight', css.paragraphFontWeight)
      .and('have.css', 'letter-spacing', css.paragraphLetterSpacing)
      .and('have.css', 'line-height', css.paragraphLineHeight)
      .and('have.css', 'opacity', css.paragraphOpacity)
      .and('have.css', 'margin', css.paragraphMargin)
  })

  it('should render all navigation icons and validate their visibility', () => {
    cy.get(homepage.navIcons).each(($icon) => {
      cy.wrap($icon)
        .should('be.visible') // Ensure the icon container is visible
        .and('have.class', 'icon') // Ensure it has the base "icon" class
    })
  })

  it('should validate the Font Awesome icon classes for navigation', () => {
    cy.get(homepage.navIcons).each(($icon, index) => {
      cy.wrap($icon).should('have.class', 'icon').and('have.class', expectedIcons[index])
    })
  })

  /* it('should show tooltips on hover', () => {
    cy.get(homepage.tooltip).each(($tooltip) => {
      cy.wrap($tooltip).trigger('mouseover', { force: true }) // Ensure hover event is triggered

      cy.wrap($tooltip)
        .find('.tooltiptext', { timeout: 5000 }) // Wait up to 5s for visibility
        .should('be.visible') // Tooltip should appear
        .and('have.css', 'opacity', '1') // Ensure tooltip is fully visible
    })
  }) */

  it('should validate all navigation links (external, email, PDFs)', () => {
    cy.get(homepage.navLinks).each(($a) => {
      cy.validateLink($a, expectedLinks)
    })
  })
  it('should display the correct footer text and validate external link', () => {
    cy.get(homepage.footer).should('be.visible').and('contain.text', text.footerText)

    cy.get(homepage.footer)
      .find('a')
      .each(($a) => {
        cy.validateLink($a, expectedLinks)
      })
  })

  it('should ensure animations are enabled on the wrapper', () => {
    cy.get(homepage.wrapper).should('have.css', 'animation-name', 'wrapper')
  })
})
