import {CSSObject} from 'styled-components'
import {getResponsiveProp, rem, responsive} from '../helpers'
import {ThemeProps} from '../types'

export interface TextInputResponsivePaddingStyleProps {
  $fontSize?: number | number[]
  $iconLeft?: boolean
  $iconRight?: boolean
  $padding?: number | number[]
  $space?: number | number[]
}

export function responsiveInputPaddingStyle(
  props: TextInputResponsivePaddingStyleProps & ThemeProps
): CSSObject[] {
  const {$iconLeft, $iconRight, theme} = props
  const {fonts, media, space: spaceScale} = theme.sanity
  const padding = getResponsiveProp(props.$padding, [0])
  const space = getResponsiveProp(props.$space, [0])
  const size = getResponsiveProp(props.$fontSize, [0])
  const len = Math.max(padding.length, space.length, size.length)
  const _padding: number[] = []
  const _space: number[] = []
  const _size: number[] = []

  for (let i = 0; i < len; i += 1) {
    _padding[i] = padding[i] === undefined ? _padding[i - 1] : padding[i]
    _space[i] = space[i] === undefined ? _space[i - 1] : space[i]
    _size[i] = size[i] === undefined ? _size[i - 1] : size[i]
  }

  return responsive(media, _padding, (_, i) => {
    const fontSize = fonts.text.sizes[_size[i]] || fonts.text.sizes[2]
    const emSize = fontSize.lineHeight - fontSize.ascenderHeight - fontSize.descenderHeight
    const p = spaceScale[_padding[i]]
    const s = spaceScale[_space[i]]

    const styles = {
      paddingTop: rem(p - fontSize.ascenderHeight),
      paddingRight: rem(p),
      paddingBottom: rem(p - fontSize.descenderHeight),
      paddingLeft: rem(p),
    }

    if ($iconRight) styles.paddingRight = rem(p + emSize + s)
    if ($iconLeft) styles.paddingLeft = rem(p + emSize + s)

    return styles
  })
}

export function responsiveInputPaddingIconsStyle(
  props: {
    padding?: number | number[]
    size?: number | number[]
    space?: number | number[]
  } & ThemeProps
): CSSObject[] {
  return responsiveInputPaddingStyle({...props, $iconLeft: true, $iconRight: true})
}

export function responsiveInputPaddingIconLeftStyle(
  props: {
    padding?: number | number[]
    size?: number | number[]
    space?: number | number[]
  } & ThemeProps
): CSSObject[] {
  return responsiveInputPaddingStyle({...props, $iconLeft: true})
}

export function responsiveInputPaddingIconRightStyle(
  props: {
    padding?: number | number[]
    size?: number | number[]
    space?: number | number[]
  } & ThemeProps
): CSSObject[] {
  return responsiveInputPaddingStyle({...props, $iconRight: true})
}
