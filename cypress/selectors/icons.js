const navigation = '[data-cy="navigation"]'
const links = `${navigation} a`
const icons = `${links}.icon`

const iconsSelectors = {
  navigation: navigation,
  links: links,
  icons: icons,
  resumeIcon: `${navigation} [data-cy="resume-icon"]`,
  resumeTooltipText: `${navigation} [data-cy="resume-tooltip-text"]`,
  portfolioIcon: `${navigation} [data-cy="portfolio-icon"]`,
  portfolioTooltipText: `${navigation} [data-cy="portfolio-tooltip-text"]`,
  githubIcon: `${navigation} [data-cy="github-icon"]`,
  githubTooltipText: `${navigation} [data-cy="github-tooltip-text"]`,
  mailIcon: `${navigation} [data-cy="mail-icon"]`,
  mailTooltipText: `${navigation} [data-cy="mail-tooltip-text"]`,
  companyIcon: `${navigation} [data-cy="company-icon"]`,
  companyTooltipText: `${navigation} [data-cy="company-tooltip-text"]`,
}

export default iconsSelectors
