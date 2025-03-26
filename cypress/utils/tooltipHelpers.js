import icons from '../selectors/icons'

export const getTooltipItems = (texts) => [
  {
    iconSelector: icons.resumeIcon,
    tooltipSelector: icons.resumeTooltipText,
    expectedText: texts.resumeTooltipText,
  },
  {
    iconSelector: icons.portfolioIcon,
    tooltipSelector: icons.portfolioTooltipText,
    expectedText: texts.portfolioTooltipText,
  },
  {
    iconSelector: icons.githubIcon,
    tooltipSelector: icons.githubTooltipText,
    expectedText: texts.githubTooltipText,
  },
  {
    iconSelector: icons.mailIcon,
    tooltipSelector: icons.mailTooltipText,
    expectedText: texts.mailTooltipText,
  },
  {
    iconSelector: icons.companyIcon,
    tooltipSelector: icons.companyTooltipText,
    expectedText: texts.companyTooltipText,
  },
]

export const getTooltipStyles = (iconStyles) => ({
  visibility: iconStyles.iconsTooltipTextVisibility,
  visibilityWhenHovered: iconStyles.iconsTooltipTextVisibilityWhenHovered,
  color: iconStyles.iconsTooltipTextColor,
  fontFamily: iconStyles.iconsTooltipTextFontFamily,
  fontSize: iconStyles.iconsTooltipTextFontSize,
  cursor: iconStyles.iconsCursor,
  width: iconStyles.iconsWidth,
})
