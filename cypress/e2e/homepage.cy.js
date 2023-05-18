import homepage from "../selectors/homepage";

describe('Homepage', () => {

  it('click all links with loop', () => {

    const pages = ['homepage.code', 'homepage.bugs', 'homepage.email']
  
    cy.visit('index.html')
  
    pages.forEach(page => {
  
      cy.contains(page).click()
      cy.location('pathname').should('eq', `/${page}`)
      cy.go('back')
  
    })
  
  });
  
})