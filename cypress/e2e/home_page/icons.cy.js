import icons from '../../selectors/icons.js'

describe('Icons section', () => {
  let texts, css, links, effects, avatars

  before(() => {
    cy.fixture('home_page/texts').then((data) => (texts = data))
    cy.fixture('home_page/css').then((data) => (css = data))
    cy.fixture('home_page/avatars').then((data) => (avatars = data))
    cy.fixture('home_page/links').then((data) => (links = data))
    cy.fixture('home_page/effects').then((data) => (effects = data))
  })

  beforeEach(() => {
    cy.visit('')
    cy.get(icons.navigation)
      .should('be.visible')
      .and('have.css', 'padding', css.navigationPadding)
      .and('have.css', 'margin', css.navigationMargin)
  })

  it('should render all navigation icons and validate their visibility', () => {
    cy.get(icons.icons).each(($icon) => {
      cy.wrap($icon)
        .should('be.visible') // Ensure the icon container is visible
        .and('have.class', 'icon') // Ensure it has the base "icon" class
    })
  })

  it('should validate the Font Awesome icon classes for navigation', () => {
    cy.get(icons.icons).each(($icon, index) => {
      cy.wrap($icon).should('have.class', 'icon').and('have.class', avatars[index])
    })
  })

  it('should validate links (external, email, PDFs)', () => {
    cy.get(icons.links).each(($a) => {
      cy.validateLinks($a, links)
    })
  })

  it('should display the correct styles for icons and tooltips', () => {
    // Validate Resume Icon and Tooltip
    cy.validateIconWithTooltip(
      icons.resumeIcon,
      icons.resumeTooltipText,
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
      icons.portfolioIcon,
      icons.portfolioTooltipText,
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
      icons.githubIcon,
      icons.githubTooltipText,
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
      icons.mailIcon,
      icons.mailTooltipText,
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
      icons.companyIcon,
      icons.companyTooltipText,
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
