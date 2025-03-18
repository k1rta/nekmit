import home_page from '../selectors/home_page.js'

describe('Home page', () => {
  let text, css, icons, links

  before(() => {
    cy.fixture('text').then((data) => (text = data))
    cy.fixture('css').then((data) => (css = data))
    cy.fixture('icons').then((data) => (icons = data))
    cy.fixture('links').then((data) => (links = data))
  })

  beforeEach(() => {
    cy.visit('')
  })

  it('should validate the background color of the body', () => {
    cy.get(home_page.body).should('have.css', 'background-color', css.bodyBackgroundColor)
    cy.get(home_page.body).should('have.css', 'font-size', css.bodyFontSize)
    cy.get(home_page.body).should('have.css', 'font-family', css.bodyFontFamily)
    cy.get(home_page.body).should('have.css', 'padding', css.bodyPadding)
    cy.get(home_page.body).should('have.css', 'margin', css.bodyMargin)
  })

  it('should display the correct heading with proper styles', () => {
    cy.get(home_page.heading)
      .should('be.visible')
      .and('have.text', text.headingText)
      .and('have.css', 'font-family', css.headingFontFamily)
      .and('have.css', 'font-size', css.headingFontSize)
      .and('have.css', 'font-weight', css.headingFontWeight)
      .and('have.css', 'color', css.headingColor)
      .and('have.css', 'line-height', css.headingLineHeight)
  })

  it('should display the correct paragraph with proper styles', () => {
    cy.get(home_page.paragraph)
      .should('be.visible')
      .and('have.text', text.paragraphText)
      .and('have.css', 'font-family', css.paragraphFontFamily)
      .and('have.css', 'color', css.paragraphColor)
      .and('have.css', 'font-size', css.paragraphFontSize)
      .and('have.css', 'line-height', css.paragraphLineHeight)
      .and('have.css', 'opacity', css.paragraphOpacity)
      .and('have.css', 'margin', css.paragraphMargin)
  })

  it('should render all navigation icons and validate their visibility', () => {
    cy.get(home_page.navIcons).each(($icon, index) => {
      cy.wrap($icon).should('be.visible').and('have.class', 'icon').and('have.class', icons[index])
    })
  })

  it('should validate the Font Awesome icon classes for navigation', () => {
    cy.get(home_page.navIcons).each(($icon, index) => {
      cy.wrap($icon).should('have.class', 'icon').and('have.class', icons[index])
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
    cy.get(home_page.navLinks).each(($a) => {
      cy.validateLink($a, links)
    })
  })

  it('should display the correct footer text and validate external link', () => {
    cy.get(home_page.footer).should('be.visible').and('contain.text', text.footerText)

    cy.get(home_page.footer)
      .find('a')
      .each(($a) => {
        cy.validateLink($a, links)
      })
  })

  it('should ensure animations are enabled on the wrapper', () => {
    cy.get(home_page.wrapper).should('have.css', 'animation-name', 'wrapper')
  })
})
