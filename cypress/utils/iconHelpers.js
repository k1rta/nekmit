export const iconKeys = ['resume', 'portfolio', 'github', 'mail', 'company']

// Tooltip mapping for UI/UX validation
export const getTooltipTestItems = () => {
  return iconKeys.map((key) => ({
    iconSelector: icons[`${key}Icon`],
    tooltipSelector: icons[`${key}TooltipText`],
    expectedText: key.charAt(0).toUpperCase() + key.slice(1),
  }))
}

// Animation mapping for visual behavior validation
export const getAnimationProps = (animations, delays) => (i) => {
  const key = iconKeys[i]
  const delay = delays[key] || '0s'

  return {
    animation: `${animations.icons.baseAnimation} ${delay} 1 normal forwards running ${animations.icons.animationName}`,
    'animation-delay': delay,
    opacity: animations.icons.opacity,
    transform: animations.icons.transform,
  }
}
