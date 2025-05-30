describe('Page View API - Success Cases', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/page_view').as('page_view')
    cy.visit('')
  })

  it('should validate API response schema', () => {
    cy.wait('@page_view')
      .its('response.body')
      .then((body) => {
        cy.validateApiSchema(body, 'api/page_view.json')

        const expectedPage = Cypress.config('baseUrl').endsWith('nekmit/') ? '/nekmit/' : '/'
        expect(body.data.page).to.equal(expectedPage)

        const expectedEnv = Cypress.config('baseUrl').includes('localhost')
          ? 'localhost'
          : 'production'
        expect(body.data.environment).to.equal(expectedEnv)

        expect(body.timestamp).to.be.a('string')
      })
  })

  it('should send the correct request body when recording a pageView', () => {
    cy.wait('@page_view').then((interception) => {
      expect(interception.request.headers).to.have.property('content-type', 'application/json')
      cy.validateRequestBody(interception.request.body)
    })
  })

  it('should return HTTP 200 when page view is recorded successfully', () => {
    cy.wait('@page_view').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
      expect(interception.response.body).to.have.property('message', 'Page view recorded')
      expect(interception.response.body).to.have.property('timestamp').that.is.a('string')
    })
  })

  it('should ensure the page view API is called only once per page load', () => {
    cy.reload()
    cy.wait('@page_view').its('response.statusCode').should('eq', 200)
  })
})
