import {
  normalizeUrl,
  isExternalLink,
  validateExternalLink,
  isMailtoLink,
  validateMailtoLink,
  isPdfLink,
  validatePdfLink,
} from '../commands/shared'

Cypress.Commands.add('validateLinks', ($a, links) => {
  const href = $a.attr('href')

  expect(href, 'Link href should be defined and not empty').to.not.be.undefined.and.not.be.empty

  const normalizedHref = normalizeUrl(href)
  const normalizedExpectedLinks = links.map(normalizeUrl)

  expect(
    normalizedExpectedLinks,
    `Expected link "${normalizedHref}" to be in the list of expected links`
  ).to.include(normalizedHref)

  if (isExternalLink(href)) {
    validateExternalLink($a, href)
  } else if (isMailtoLink(href)) {
    validateMailtoLink(href)
  } else if (isPdfLink(href)) {
    validatePdfLink(href)
  }

  if (href.startsWith('http')) {
    cy.request(href).its('status').should('eq', 200)
  }
})

Cypress.Commands.add('validateNavigationIcons', (selector, expectedIcons) => {
  cy.get(selector).each(($icon, index) => {
    cy.wrap($icon)
      .should('be.visible')
      .and('have.class', 'icon')
      .and('have.class', expectedIcons[index])
  })
})

Cypress.Commands.add('validateIconWithTooltip', (items, tooltipProps) => {
  items.forEach((item) => {
    const { iconSelector, tooltipSelector, expectedText } = item
    const tooltipCss = typeof tooltipProps === 'function' ? tooltipProps() : tooltipProps

    cy.get(tooltipSelector)
      .should('not.be.visible')
      .and('have.css', 'visibility', tooltipCss.visibility)

    cy.get(iconSelector)
      .should('be.visible')
      .and('have.css', 'cursor', tooltipCss.cursor)
      .and('have.css', 'width', tooltipCss.width)
      .realHover()

    cy.get(tooltipSelector)
      .should('be.visible')
      .and('have.text', expectedText)
      .and('have.css', 'visibility', tooltipCss.visibilityWhenHovered)
      .and('have.css', 'color', tooltipCss.color)
      .and('have.css', 'font-family', tooltipCss.fontFamily)
      .and('have.css', 'font-size', tooltipCss.fontSize)
  })
})

Cypress.Commands.add('validateAnimation', (elements, animationMap) => {
  elements.forEach((el, i) => {
    const animationProps = typeof animationMap === 'function' ? animationMap(i) : animationMap
    cy.get(el).should(($el) => {
      Object.entries(animationProps).forEach(([prop, value]) => {
        const expected = Array.isArray(value) ? value[i] : value
        expect($el).to.have.css(prop, expected)
      })
    })
  })
})
