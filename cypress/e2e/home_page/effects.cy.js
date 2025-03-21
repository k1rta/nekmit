import footer from '../../selectors/footer.js'

describe('Footer section', () => {
  let texts, css, links

  before(() => {
    cy.fixture('home_page/texts').then((data) => (texts = data))
    cy.fixture('home_page/css').then((data) => (css = data))
    cy.fixture('home_page/links').then((data) => (links = data))
  })

  beforeEach(() => {
    cy.visit('')
  })

  it('should display the correct styles', () => {
    cy.get(footer.footer)
      .should('be.visible')
      .and('contain.text', texts.footerText)
      .and('have.css', 'background', css.footerBackgroundColor)
      .and('have.css', 'color', css.footerTextColor)
      .and('have.css', 'font-family', css.footerTextFontFamily)
      .and('have.css', 'font-size', css.footerTextFontSize)
      .and('have.css', 'padding', css.footerTextPadding)
      .and('have.css', 'width', css.footerTextWidth)
  })

  it('should display the link with correct styles', () => {
    cy.get(footer.footerLink)
      .should('be.visible')
      .and('contain.text', texts.footerLinkText)
      .and('have.css', 'color', css.footerLinkColor)
      .and('have.css', 'cursor', css.footerLinkCursor)
      .and('have.css', 'text-decoration', css.footerLinkTextDecoration)
  })

  it('should have valid and working link', () => {
    cy.get(footer.footerLink).each(($a) => {
      cy.validateLinks($a, links)
    })
  })

  it('should navigate to a valid page', () => {
    cy.get(footer.footerLink)
      .should('have.attr', 'href')
      .then((href) => {
        cy.request(href).its('status').should('be.oneOf', [200, 301, 302])
      })
  })
})
