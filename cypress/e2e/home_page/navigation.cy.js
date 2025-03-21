import navigation from '../../selectors/navigation.js'

describe('Navigation', () => {
  let texts, css, links, icons, effects

  before(() => {
    cy.fixture('home_page/texts').then((data) => (texts = data))
    cy.fixture('home_page/css').then((data) => (css = data))
    cy.fixture('home_page/icons').then((data) => (icons = data))
    cy.fixture('home_page/links').then((data) => (links = data))
    cy.fixture('home_page/effects').then((data) => (effects = data))
  })

  beforeEach(() => {
    cy.visit('')
    cy.get(navigation.navigation)
      .should('be.visible')
      .and('have.css', 'padding', css.navigationPadding)
      .and('have.css', 'margin', css.navigationMargin)
  })

  it('should render all navigation icons and validate their visibility', () => {
    cy.get(navigation.navigationIcons).each(($icon) => {
      cy.wrap($icon)
        .should('be.visible') // Ensure the icon container is visible
        .and('have.class', 'icon') // Ensure it has the base "icon" class
    })
  })

  it('should validate the Font Awesome icon classes for navigation', () => {
    cy.get(navigation.navigationIcons).each(($icon, index) => {
      cy.wrap($icon).should('have.class', 'icon').and('have.class', icons[index])
    })
  })

  it('should validate links (external, email, PDFs)', () => {
    cy.get(navigation.navigationLinks).each(($a) => {
      cy.validateLinks($a, links)
    })
  })

  it('should display the correct styles for icons and tooltips', () => {
    // Validate Resume Icon and Tooltip
    cy.validateIconWithTooltip(
      navigation.resumeIcon,
      navigation.resumeTooltipText,
      texts.resumeTooltipText,
      {
        visibility: css.iconsTooltipTextVisibility,
        visibilityWhenHovered: css.iconsTooltipTextVisibilityWhenHovered,
        color: css.iconsTooltipTextColor,
        fontFamily: css.iconsTooltipTextFontFamily,
        fontSize: css.iconsTooltipTextFontSize,
        cursor: css.iconsCursor,
        width: css.iconsWidth,
      },
      {
        animationDelay: effects.resumeIconAnimationDelay,
        animation: effects.resumeIconAnimation,
      }
    )

    // Validate Portfolio Icon and Tooltip
    cy.validateIconWithTooltip(
      navigation.portfolioIcon,
      navigation.portfolioTooltipText,
      texts.portfolioTooltipText,
      {
        visibility: css.iconsTooltipTextVisibility,
        visibilityWhenHovered: css.iconsTooltipTextVisibilityWhenHovered,
        color: css.iconsTooltipTextColor,
        fontFamily: css.iconsTooltipTextFontFamily,
        fontSize: css.iconsTooltipTextFontSize,
        cursor: css.iconsCursor,
        width: css.iconsWidth,
      },
      {
        animationDelay: effects.portfolioIconAnimationDelay,
        animation: effects.portfolioIconAnimation,
      }
    )

    // Validate GitHub Icon and Tooltip
    cy.validateIconWithTooltip(
      navigation.githubIcon,
      navigation.githubTooltipText,
      texts.githubTooltipText,
      {
        visibility: css.iconsTooltipTextVisibility,
        visibilityWhenHovered: css.iconsTooltipTextVisibilityWhenHovered,
        color: css.iconsTooltipTextColor,
        fontFamily: css.iconsTooltipTextFontFamily,
        fontSize: css.iconsTooltipTextFontSize,
        cursor: css.iconsCursor,
        width: css.iconsWidth,
      },
      {
        animationDelay: effects.githubIconAnimationDelay,
        animation: effects.githubIconAnimation,
      }
    )

    // Validate Mail Icon and Tooltip
    cy.validateIconWithTooltip(
      navigation.mailIcon,
      navigation.mailTooltipText,
      texts.mailTooltipText,
      {
        visibility: css.iconsTooltipTextVisibility,
        visibilityWhenHovered: css.iconsTooltipTextVisibilityWhenHovered,
        color: css.iconsTooltipTextColor,
        fontFamily: css.iconsTooltipTextFontFamily,
        fontSize: css.iconsTooltipTextFontSize,
        cursor: css.iconsCursor,
        width: css.iconsWidth,
      },
      {
        animationDelay: effects.mailIconAnimationDelay,
        animation: effects.mailIconAnimation,
      }
    )

    // Validate Company Icon and Tooltip
    cy.validateIconWithTooltip(
      navigation.companyIcon,
      navigation.companyTooltipText,
      texts.companyTooltipText,
      {
        visibility: css.iconsTooltipTextVisibility,
        visibilityWhenHovered: css.iconsTooltipTextVisibilityWhenHovered,
        color: css.iconsTooltipTextColor,
        fontFamily: css.iconsTooltipTextFontFamily,
        fontSize: css.iconsTooltipTextFontSize,
        cursor: css.iconsCursor,
        width: css.iconsWidth,
      },
      {
        animationDelay: effects.companyIconAnimationDelay,
        animation: effects.companyIconAnimation,
      }
    )
  })
})
