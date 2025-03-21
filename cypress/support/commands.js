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

Cypress.Commands.add('validateLinks', ($a, links) => {
  // Ensure the link is visible
  cy.wrap($a).should('be.visible')

  const href = $a.attr('href')

  // Ensure href is defined and not empty
  expect(href, 'Link href should be defined and not empty').to.not.be.undefined.and.not.be.empty

  // Normalize href and expected links for comparison
  const normalizedHref = normalizeUrl(href)
  const normalizedExpectedLinks = links.map(normalizeUrl)

  // Validate the link is in the expected list
  expect(
    normalizedExpectedLinks,
    `Expected link "${normalizedHref}" to be in the list of expected links`
  ).to.include(normalizedHref)

  // Perform specific validations based on the type of link
  if (isExternalLink(href)) {
    validateExternalLink($a, href)
  } else if (isMailtoLink(href)) {
    validateMailtoLink(href)
  } else if (isPdfLink(href)) {
    validatePdfLink(href)
  }
})

// Helper function to normalize URLs
function normalizeUrl(url) {
  return decodeURIComponent(url).replace(/\/+$/, '').trim()
}

// Helper function to check if a link is external
function isExternalLink(href) {
  return /^https?:\/\//.test(href)
}

// Helper function to validate external links
function validateExternalLink($a, href) {
  expect($a, `External link "${href}" should open in a new tab`).to.have.attr('target', '_blank')
  expect($a, `External link "${href}" should have rel="noopener noreferrer"`).to.have.attr(
    'rel',
    'noopener noreferrer'
  )
}

// Helper function to check if a link is a mailto link
function isMailtoLink(href) {
  return href.startsWith('mailto:')
}

// Helper function to validate mailto links
function validateMailtoLink(href) {
  expect(href, `Mailto link "${href}" should be in a valid format`).to.match(
    /^mailto:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  )
}

// Helper function to check if a link is a PDF link
function isPdfLink(href) {
  return /\.pdf(?:$|[?#])/.test(href)
}

// Helper function to validate PDF links
function validatePdfLink(href) {
  expect(href, `PDF link "${href}" should end with .pdf`).to.match(/\.pdf(?:$|[?#])/)
}

Cypress.Commands.add('validateNavigationIcons', (selector, expectedIcons) => {
  cy.get(selector).each(($icon, index) => {
    cy.wrap($icon)
      .should('be.visible') // Ensure the icon is visible
      .and('have.class', 'icon') // Ensure it has the base "icon" class
      .and('have.class', expectedIcons[index]) // Ensure it has the expected class
  })
})

Cypress.Commands.add(
  'validateIconWithTooltip',
  (iconSelector, tooltipSelector, expectedText, cssProps, animationProps) => {
    // Validate the tooltip is initially not visible
    cy.get(tooltipSelector)
      .should('not.be.visible')
      .and('have.css', 'visibility', cssProps.visibility)

    // Validate the icon's animation and other properties
    cy.get(iconSelector)
      .should('be.visible')
      .and('have.css', 'animation-delay', animationProps.animationDelay)
      .and('have.css', 'animation', animationProps.animation)
      .and('have.css', 'cursor', cssProps.cursor)
      .and('have.css', 'width', cssProps.width)
      .realHover()

    // Validate the tooltip after hover
    cy.get(tooltipSelector)
      .should('be.visible')
      .and('have.text', expectedText)
      .and('have.css', 'visibility', cssProps.visibilityWhenHovered)
      .and('have.css', 'color', cssProps.color)
      .and('have.css', 'font-family', cssProps.fontFamily)
      .and('have.css', 'font-size', cssProps.fontSize)
  }
)

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
