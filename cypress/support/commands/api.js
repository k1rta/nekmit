const Ajv = require('ajv')

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
