function normalizeUrl(url) {
  return decodeURIComponent(url).replace(/\/+$/, '').trim()
}

function isExternalLink(href) {
  return /^https?:\/\//.test(href)
}

function validateExternalLink($a, href) {
  expect($a, `External link "${href}" should open in a new tab`).to.have.attr('target', '_blank')
  expect($a, `External link "${href}" should have rel="noopener noreferrer"`).to.have.attr(
    'rel',
    'noopener noreferrer'
  )
}

function isMailtoLink(href) {
  return href.startsWith('mailto:')
}

function validateMailtoLink(href) {
  expect(href, `Mailto link "${href}" should be in a valid format`).to.match(
    /^mailto:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  )
}

function isPdfLink(href) {
  return /\.pdf(?:$|[?#])/.test(href)
}

function validatePdfLink(href) {
  expect(href, `PDF link "${href}" should end with .pdf`).to.match(/\.pdf(?:$|[?#])/)
}

Cypress.Commands.add('normalizeUrl', normalizeUrl)
Cypress.Commands.add('isMailtoLink', isMailtoLink)

export {
  normalizeUrl,
  isExternalLink,
  validateExternalLink,
  isMailtoLink,
  validateMailtoLink,
  isPdfLink,
  validatePdfLink,
}
