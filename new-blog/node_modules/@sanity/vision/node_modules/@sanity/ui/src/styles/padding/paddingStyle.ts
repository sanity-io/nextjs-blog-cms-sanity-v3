import {CSSObject} from 'styled-components'
import {_getResponsiveSpace} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsivePaddingStyleProps} from './types'

export function responsivePaddingStyle(
  props: ResponsivePaddingStyleProps & ThemeProps
): CSSObject[][] {
  const {theme} = props

  return [
    _getResponsiveSpace(theme, ['padding'], props.$padding),
    _getResponsiveSpace(theme, ['paddingLeft', 'paddingRight'], props.$paddingX),
    _getResponsiveSpace(theme, ['paddingTop', 'paddingBottom'], props.$paddingY),
    _getResponsiveSpace(theme, ['paddingTop'], props.$paddingTop),
    _getResponsiveSpace(theme, ['paddingRight'], props.$paddingRight),
    _getResponsiveSpace(theme, ['paddingBottom'], props.$paddingBottom),
    _getResponsiveSpace(theme, ['paddingLeft'], props.$paddingLeft),
  ].filter(Boolean) as CSSObject[][]
}
