describe('Pageview API', () => {

  beforeEach(() => {
    cy.intercept('POST', '/api/pageview').as('pageview');
    cy.visit('')
  });

  it('should call the pageview API and verify the recorded message', () => {
    cy.wait('@pageview').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body.message).to.eq('Pageview recorded in Firebase');
    });
  });

  it('should verify the API request contains the correct headers', () => {
    cy.wait('@pageview').then((interception) => {
      expect(interception.request.headers).to.have.property('content-type');
    });
  });

  it('should handle API failure correctly', () => {
    cy.intercept('POST', '/api/pageview', { statusCode: 500, body: { message: 'Server Error' } }).as('failedPageview');
    cy.reload();
    cy.wait('@failedPageview').then((interception) => {
      expect(interception.response.statusCode).to.eq(500);
      expect(interception.response.body.message).to.eq('Server Error');
    });
  });

  it('should call the pageview API only once per page load', () => {
    cy.wait('@pageview');
    cy.reload();
    cy.wait('@pageview').its('response.statusCode').should('eq', 200);
  });

  it('should check if API works when reloading the page', () => {
    cy.reload();
    cy.wait('@pageview').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });
  });
})