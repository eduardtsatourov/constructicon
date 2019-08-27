import merge from 'lodash/merge'

export default (props, traits, keyframes) => {
  const { delay, styles } = props
  const { treatments, rhythm, shadows, colors } = traits

  return merge(
    {},
    {
      root: {
        position: 'absolute',
        zIndex: 9999,
        maxWidth: '17em',
        transform: 'translate(-50%, calc(-100% + 0.5em))'
      },
      tip: {
        ...treatments.body,
        ...treatments.popup,
        opacity: 0,
        padding: rhythm(0.5),
        textAlign: 'center',
        backgroundColor: colors.light,
        fontSize: '0.9em',
        display: 'inline-block',
        boxShadow: shadows.light,
        animation: `${keyframes.fadeIn} 0.25s ${delay}ms ease forwards`,
        ':after': {
          content: '""',
          position: 'absolute',
          background: colors.light,
          height: rhythm(0.5),
          width: rhythm(0.5),
          bottom: rhythm(-0.2),
          left: '50%',
          transform: 'translate(-50%, 0) rotate(45deg)'
        }
      }
    },
    styles
  )
}

export const keyframes = {
  fadeIn: {
    from: {
      transform: 'translateY(0.5em)',
      opacity: 0
    },
    to: {
      transform: 'translateY(0)',
      opacity: 1
    }
  }
}
