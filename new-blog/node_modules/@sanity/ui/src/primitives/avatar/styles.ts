import {CSSObject} from 'styled-components'
import {rem, responsive, ThemeProps} from '../../styles'
import {focusRingStyle} from '../../styles/internal'
import {AvatarRootStyleProps, ResponsiveAvatarSizeStyleProps} from './types'

export const avatarStyle = {
  root: avatarRootStyle,
  arrow: avatarArrowStyle,
  bgStroke: avatarBgStrokeStyle,
  stroke: avatarStrokeStyle,
  initials: avatarInitialsStyle,
}

function avatarArrowStyle(): CSSObject {
  return {
    position: 'absolute',
    boxSizing: 'border-box',
    zIndex: 0,
    opacity: 0,
    transition: 'all 0.2s linear',
    transform: 'rotate(-90deg) translate3d(0, 6px, 0)',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,

    '& > svg': {
      width: '11px',
      height: '7px',
      position: 'absolute',
      top: '-5px',
      left: '50%',
      transform: 'translateX(-6px)',

      '&:not([hidden])': {
        display: 'block',
      },
    },

    "[data-arrow-position='inside'] > &": {
      transform: 'rotate(-90deg) translate3d(0, 6px, 0)',
      opacity: 0,
    },

    "[data-arrow-position='top'] > &": {
      opacity: 1,
      transform: 'rotate(0deg)',
    },

    "[data-arrow-position='bottom'] > &": {
      opacity: 1,
      transform: 'rotate(-180deg)',
    },
  }
}

export function avatarRootStyle(props: AvatarRootStyleProps & ThemeProps): CSSObject {
  const {$color, theme} = props
  const {focusRing} = theme.sanity

  return {
    backgroundColor: $color,
    position: 'relative',
    boxSizing: 'border-box',
    userSelect: 'none',
    boxShadow: '0 0 0 1px var(--card-bg-color)',

    '&[data-status="inactive"]': {
      opacity: 0.5,
    },

    '&>svg': {
      '&:not([hidden])': {
        display: 'block',
      },
    },

    /* &:is(button) */
    '&[data-as="button"]': {
      '-webkit-font-smoothing': 'inherit',
      appearance: 'none',
      margin: 0,
      padding: 0,
      border: 0,
      font: 'inherit',
      color: 'inherit',
      outline: 'none',

      '&:focus': {
        boxShadow: focusRingStyle({focusRing}),
      },

      '&:focus:not(:focus-visible)': {
        boxShadow: 'none',
      },
    },
  }
}

export function responsiveAvatarSizeStyle(
  props: ResponsiveAvatarSizeStyleProps & ThemeProps
): CSSObject[] {
  const {theme} = props
  const {avatar, media} = theme.sanity

  return responsive(media, props.$size, (size) => {
    const avatarSize = avatar.sizes[size] || avatar.sizes[0]

    return {
      width: rem(avatarSize.size),
      height: rem(avatarSize.size),
      borderRadius: rem(avatarSize.size / 2),

      '&>svg': {
        width: rem(avatarSize.size),
        height: rem(avatarSize.size),
        borderRadius: rem(avatarSize.size / 2),
      },
    }
  })
}

export function avatarInitialsStyle(props: ThemeProps): CSSObject {
  const {theme} = props
  const {base} = theme.sanity.color

  return {
    width: '100%',
    height: '100%',
    color: base.fg,
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'uppercase',
    textAlign: 'center',
    borderRadius: '50%',

    '&:not([hidden])': {
      display: 'flex',
    },
  }
}

function avatarBgStrokeStyle(): CSSObject {
  return {
    strokeWidth: '4px',
    stroke: 'var(--card-bg-color)',
  }
}

function avatarStrokeStyle(): CSSObject {
  return {
    strokeWidth: '3px',

    '[data-status="editing"] &': {
      strokeSasharray: '2 4',
      strokeLinecap: 'round',
    },
  }
}
