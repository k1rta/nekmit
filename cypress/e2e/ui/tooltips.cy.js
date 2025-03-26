import { getTooltipItems, getTooltipStyles } from '../../utils/tooltipHelpers.js'

describe('Tooltips', () => {
  let texts, iconStyles

  before(() => {
    cy.fixture('ui/tooltips').then((data) => {
      texts = data.texts
      iconStyles = data.styles
    })
  })

  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the correct styles for icons and tooltips', () => {
    const items = getTooltipItems(texts)
    const tooltipProps = getTooltipStyles(iconStyles)
    cy.validateIconWithTooltip(items, tooltipProps)
  })
})
