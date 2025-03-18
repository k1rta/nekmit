const Ajv = require('ajv')

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('validateLink', ($a, links) => {
  const href = $a.attr('href')
  expect(href, 'href should be defined').to.not.be.undefined

  const decodedHref = decodeURIComponent(href).replace(/\/$/, '').trim()
  const decodedExpectedLinks = links.map((link) =>
    decodeURIComponent(link).replace(/\/$/, '').trim()
  )

  expect(decodedExpectedLinks, `Expected link: ${decodedHref}`).to.include(decodedHref)

  if (href.startsWith('http')) {
    expect($a, `External link should open in a new tab: ${href}`).to.have.attr('target', '_blank')
  } else if (href.startsWith('mailto:')) {
    expect(href, 'Email should be in a valid format').to.match(/^mailto:.+@.+\..+$/)
  } else if (href.endsWith('.pdf')) {
    expect(href, 'PDF link should end with .pdf').to.match(/\.pdf$/)
  }
})

Cypress.Commands.add('validateApiSchema', (response, schemaFile) => {
  cy.fixture(schemaFile).then((schema) => {
    const ajv = new Ajv()
    const validate = ajv.compile(schema)
    const valid = validate(response)
    if (!valid) {
      cy.log('Schema Validation Errors:', JSON.stringify(validate.errors, null, 2))
      console.error('Schema Validation Errors:', validate.errors)
    }
    expect(valid, 'Response should match schema').to.be.true
  })
})

Cypress.Commands.add('validateRequestBody', (requestBody) => {
  const expectedPage = Cypress.config('baseUrl').endsWith('nekmit/') ? '/nekmit/' : '/'
  expect(requestBody).to.have.property('page', expectedPage)
  const expectedEnv = Cypress.config('baseUrl').includes('localhost') ? 'localhost' : 'production'
  expect(requestBody).to.have.property('environment', expectedEnv)
  expect(requestBody).to.have.property('timestamp').that.is.a('string')
})

Cypress.Commands.add('debugApiResponse', (responseBody) => {
  cy.log('API Response:', JSON.stringify(responseBody, null, 2))
})
