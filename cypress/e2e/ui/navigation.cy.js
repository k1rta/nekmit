import icons from '../../selectors/icons.js'
import footer from '../../selectors/footer.js'

describe('Navigation', () => {
  let iconStyles, links, icon_avatars

  before(() => {
    cy.fixture('ui/navigation').then((data) => {
      links = data.links
      iconStyles = data.styles
      icon_avatars = data.iconAvatars
    })
  })

  beforeEach(() => {
    cy.visit('/')
    cy.get(icons.navigation)
      .should('be.visible')
      .and('have.css', 'padding', iconStyles.navigationPadding)
      .and('have.css', 'margin', iconStyles.navigationMargin)
  })

  it('should render all navigation icons and validate their visibility', () => {
    cy.get(icons.icons).each(($icon) => {
      cy.wrap($icon).should('be.visible').and('have.class', 'icon')
    })
  })

  it('should validate the Font Awesome icon classes for navigation', () => {
    cy.get(icons.icons).each(($icon, index) => {
      cy.wrap($icon).should('have.class', 'icon').and('have.class', icon_avatars[index])
    })
  })

  it('should validate links (external, email, PDFs)', () => {
    cy.get(icons.links).each(($a) => {
      cy.validateLinks($a, links)
    })
  })

  it('should validate the footer navigation link', () => {
    cy.get(footer.footerLink).each(($a) => {
      cy.validateLinks($a, links)
    })
  })
})
