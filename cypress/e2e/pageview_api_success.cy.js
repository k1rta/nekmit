describe('Pageview API - Success Cases', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/pageview').as('pageview')
    cy.visit('')
  })

  it('should validate API response schema', () => {
    cy.wait('@pageview').then((interception) => {
      cy.validateApiSchema(interception.response.body, 'pageview.json')

      expect(interception.response.body).to.have.property('page', '/')
      expect(interception.response.body).to.have.property(
        'environment',
        Cypress.env('ENVIRONMENT') || 'localhost'
      )
      expect(interception.response.body).to.have.property('timestamp').that.is.a('string')
    })
  })

  it('should send the correct request body when recording a pageview', () => {
    cy.wait('@pageview').then((interception) => {
      expect(interception.request.headers).to.have.property('content-type', 'application/json')
      cy.validateRequestBody(interception.request.body)
    })
  })

  it('should return HTTP 200 when pageview is recorded successfully', () => {
    cy.wait('@pageview').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
      expect(interception.response.body).to.have.property(
        'message',
        'Pageview recorded in Firebase'
      )
      expect(interception.response.body).to.have.property('timestamp').that.is.a('string')
    })
  })

  it('should ensure the pageview API is called only once per page load', () => {
    cy.reload()
    cy.wait('@pageview').its('response.statusCode').should('eq', 200)
  })
})
