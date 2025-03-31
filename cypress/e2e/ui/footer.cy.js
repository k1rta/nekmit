import footer from '../../selectors/footer'

describe('Footer', () => {
  let footerData

  before(() => {
    cy.fixture('ui/footer').then((data) => {
      footerData = data
    })
  })

  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the footer with correct styles', () => {
    cy.get(footer.footer)
      .should('be.visible')
      .and('have.css', 'background', footerData.styles.background)
      .and('have.css', 'color', footerData.styles.color)
      .and('have.css', 'font-family', footerData.styles.fontFamily)
      .and('have.css', 'font-size', footerData.styles.fontSize)
      .and('have.css', 'padding', footerData.styles.padding)
      .and('have.css', 'width', footerData.styles.width)
  })

  it('should display the correct footer text', () => {
    cy.get(footer.footerText)
      .invoke('text')
      .then((text) => {
        const cleanText = text.replace(/\s+/g, ' ').trim()
        expect(cleanText).to.equal(footerData.text.footerText)
      })
  })

  it('should style the footer link correctly', () => {
    cy.get(footer.footerLink)
      .should('be.visible')
      .and('have.css', 'color', footerData.linkStyles.color)
      .and('have.css', 'cursor', footerData.linkStyles.cursor)
      .and('have.css', 'text-decoration', footerData.linkStyles.textDecoration)
  })
})
