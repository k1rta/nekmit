describe('Pageview API', () => {
  before(() => {
    cy.visit('')
  })

  it('should pass Lighthouse performance audit', () => {
    cy.lighthouse({
      performance: 85,
      accessibility: 90,
      bestPractices: 85,
      seo: 90,
    })
  })
})
