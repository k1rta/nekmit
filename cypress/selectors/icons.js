const navigation = '[data-cy="navigation"]'
const links = `${navigation} a`
const icons = `${links}.icon`

const resumeIcon = `${navigation} [data-cy="resume-icon"]`
const resumeTooltipText = `${navigation} [data-cy="resume-tooltip-text"]`
const portfolioIcon = `${navigation} [data-cy="portfolio-icon"]`
const portfolioTooltipText = `${navigation} [data-cy="portfolio-tooltip-text"]`
const githubIcon = `${navigation} [data-cy="github-icon"]`
const githubTooltipText = `${navigation} [data-cy="github-tooltip-text"]`
const mailIcon = `${navigation} [data-cy="mail-icon"]`
const mailTooltipText = `${navigation} [data-cy="mail-tooltip-text"]`
const companyIcon = `${navigation} [data-cy="company-icon"]`
const companyTooltipText = `${navigation} [data-cy="company-tooltip-text"]`

const iconSelectors = {
  navigation,
  links,
  icons,
  resumeIcon,
  resumeTooltipText,
  portfolioIcon,
  portfolioTooltipText,
  githubIcon,
  githubTooltipText,
  mailIcon,
  mailTooltipText,
  companyIcon,
  companyTooltipText,
}

export default iconSelectors
