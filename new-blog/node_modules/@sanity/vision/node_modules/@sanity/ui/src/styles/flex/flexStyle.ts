import {CSSObject} from 'styled-components'
import {rem, _responsive} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveFlexStyleProps} from './types'

const BASE_STYLE: CSSObject = {
  '&&:not([hidden])': {
    display: 'flex',
  },
}

export function responsiveFlexStyle(): Array<
  CSSObject | ((props: ResponsiveFlexStyleProps & ThemeProps) => CSSObject[])
> {
  return [
    BASE_STYLE,
    responsiveFlexAlignStyle,
    responsiveFlexGapStyle,
    responsiveFlexWrapStyle,
    responsiveFlexJustifyStyle,
    responsiveFlexDirectionStyle,
  ]
}

export function responsiveFlexAlignStyle(
  props: ResponsiveFlexStyleProps & ThemeProps
): CSSObject[] {
  const {theme} = props
  const {media} = theme.sanity

  return _responsive(media, props.$align, (align) => {
    return {alignItems: align}
  })
}

function responsiveFlexGapStyle(props: ResponsiveFlexStyleProps & ThemeProps) {
  const {theme} = props
  const {media, space} = theme.sanity

  return _responsive(media, props.$gap, (gap) => ({
    gap: gap ? rem(space[gap]) : undefined,
  }))
}

export function responsiveFlexWrapStyle(props: ResponsiveFlexStyleProps & ThemeProps): CSSObject[] {
  const {theme} = props
  const {media} = theme.sanity

  return _responsive(media, props.$wrap, (wrap) => {
    return {flexWrap: wrap}
  })
}

export function responsiveFlexJustifyStyle(
  props: ResponsiveFlexStyleProps & ThemeProps
): CSSObject[] {
  const {theme} = props
  const {media} = theme.sanity

  return _responsive(media, props.$justify, (justify) => {
    return {justifyContent: justify}
  })
}

export function responsiveFlexDirectionStyle(
  props: ResponsiveFlexStyleProps & ThemeProps
): CSSObject[] {
  const {theme} = props
  const {media} = theme.sanity

  return _responsive(media, props.$direction, (direction) => {
    return {flexDirection: direction}
  })
}
