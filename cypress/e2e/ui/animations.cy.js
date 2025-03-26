import hero from '../../selectors/hero.js'
import icons from '../../selectors/icons.js'
import { iconKeys, getAnimationProps } from '../../utils/iconHelpers.js'

describe('Animations', () => {
  let animations, navigation

  before(() => {
    cy.fixture('ui/animations').then((data) => (animations = data))
    cy.fixture('ui/navigation').then((data) => (navigation = data))
  })

  beforeEach(() => {
    cy.visit('/')
  })

  it('validates wrapper animation', () => {
    cy.get(hero.wrapper)
      .should('have.css', 'animation', animations.wrapper.animation)
      .and('have.css', 'opacity', animations.wrapper.opacity)
  })

  it('validates background animation', () => {
    cy.get(hero.bg).should('have.css', 'animation', animations.background.animation)
  })

  it('validates header animation', () => {
    cy.get(hero.header)
      .should('have.css', 'animation', animations.header.animation)
      .and('have.css', 'opacity', animations.header.opacity)
      .and('have.css', 'transform', animations.header.transform)
  })

  it('validates icon animations', () => {
    const iconSelectors = iconKeys.map((key) => icons[`${key}Icon`])
    const delays = navigation.iconDelays
    cy.validateAnimation(iconSelectors, getAnimationProps(animations, delays))
  })
})
