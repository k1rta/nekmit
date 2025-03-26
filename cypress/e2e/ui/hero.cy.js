import hero from '../../selectors/hero.js'

describe('Hero', () => {
  let heroData

  before(() => {
    cy.fixture('ui/hero').then((data) => (heroData = data))
  })

  beforeEach(() => {
    cy.visit('')
    cy.get(hero.header).should('be.visible')
  })

  it('should validate the background color and font of the body', () => {
    cy.get(hero.body)
      .should('have.css', 'background-color', heroData.body.backgroundColor)
      .and('have.css', 'font-size', heroData.body.fontSize)
      .and('have.css', 'font-family', heroData.body.fontFamily)
      .and('have.css', 'padding', heroData.body.padding)
      .and('have.css', 'margin', heroData.body.margin)
  })

  it('should display the heading with correct styles and content', () => {
    cy.get(hero.headingText)
      .should('be.visible')
      .and('have.css', 'font-family', heroData.heading.fontFamily)
      .and('have.css', 'font-size', heroData.heading.fontSize)
      .and('have.css', 'font-weight', heroData.heading.fontWeight)
      .and('have.css', 'color', heroData.heading.color)
      .and('have.css', 'line-height', heroData.heading.lineHeight)
      .invoke('text')
      .then((text) => {
        const clean = text.replace(/\s+/g, ' ').trim()
        expect(clean).to.eq(heroData.text.heading)
      })
  })

  it('should display the paragraph with correct styles and content', () => {
    cy.get(hero.paragraphText)
      .should('be.visible')
      .and('have.css', 'font-family', heroData.paragraph.fontFamily)
      .and('have.css', 'color', heroData.paragraph.color)
      .and('have.css', 'font-size', heroData.paragraph.fontSize)
      .and('have.css', 'line-height', heroData.paragraph.lineHeight)
      .and('have.css', 'opacity', heroData.paragraph.opacity)
      .and('have.css', 'margin', heroData.paragraph.margin)
      .invoke('text')
      .then((text) => {
        const clean = text.replace(/\s+/g, ' ').trim()
        expect(clean).to.eq(heroData.text.paragraph)
      })
  })
})
