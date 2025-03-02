describe('Pageview API - Error Handling', () => {
  beforeEach(() => {
    cy.visit('')
  })

  it('should return HTTP 500 when the server fails', () => {
    cy.intercept('POST', '/api/pageview', {
      statusCode: 500,
      body: { message: 'Server Error' },
    }).as('failedPageview')

    cy.reload()
    cy.wait('@failedPageview').then((interception) => {
      expect(interception.response.statusCode).to.eq(500)
      expect(interception.response.body.message).to.eq('Server Error')
    })
  })

  it('should return HTTP 404 when the API endpoint is missing', () => {
    cy.intercept('POST', '/api/pageview', {
      statusCode: 404,
      body: { message: 'Not Found' },
    }).as('notFoundPageview')

    cy.reload()
    cy.wait('@notFoundPageview').then((interception) => {
      expect(interception.response.statusCode).to.eq(404)
      expect(interception.response.body.message).to.eq('Not Found')
    })
  })

  it('should return HTTP 401 when the request is unauthorized', () => {
    cy.intercept('POST', '/api/pageview', {
      statusCode: 401,
      body: { message: 'Unauthorized' },
    }).as('unauthorizedPageview')

    cy.reload()
    cy.wait('@unauthorizedPageview').then((interception) => {
      expect(interception.response.statusCode).to.eq(401)
      expect(interception.response.body.message).to.eq('Unauthorized')
    })
  })

  it('should return HTTP 400 when required parameters are missing', () => {
    cy.intercept('POST', '/api/pageview', (req) => {
      req.body = {}
      req.reply({
        statusCode: 400,
        body: { message: 'Bad Request: Missing required parameters' },
      })
    }).as('badRequestPageview')

    cy.reload()
    cy.wait('@badRequestPageview').then((interception) => {
      expect(interception.response.statusCode).to.eq(400)
      expect(interception.response.body.message).to.eq('Bad Request: Missing required parameters')
    })
  })
})
