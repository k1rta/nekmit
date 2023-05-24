describe('Homepage', () => {

  beforeEach(() => {
    cy.visit('')
  });

  it('check header element', () => {
    cy.get('h1').should('be.visible').and('have.text', 'Nekmit')
  });
  
  it('check paragraph element', () => {
    cy.get('p')
      .should('be.visible')
      .and('have.text', 'Software testing for great products  •  Customized testing solutions & methodologies  •  Automation')
  });

  it('check all links to sites', () => {
    cy.get("a:not([href*='mailto:'])").each(page => {
      cy.request(page.prop('href'))
    })
  });
})