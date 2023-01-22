import {CSSObject} from 'styled-components'
import {_getResponsiveSpace} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveMarginStyleProps} from './types'

export function responsiveMarginStyle(
  props: ResponsiveMarginStyleProps & ThemeProps
): CSSObject[][] {
  const {theme} = props

  return [
    _getResponsiveSpace(theme, ['margin'], props.$margin),
    _getResponsiveSpace(theme, ['marginLeft', 'marginRight'], props.$marginX),
    _getResponsiveSpace(theme, ['marginTop', 'marginBottom'], props.$marginY),
    _getResponsiveSpace(theme, ['marginTop'], props.$marginTop),
    _getResponsiveSpace(theme, ['marginRight'], props.$marginRight),
    _getResponsiveSpace(theme, ['marginBottom'], props.$marginBottom),
    _getResponsiveSpace(theme, ['marginLeft'], props.$marginLeft),
  ].filter(Boolean) as CSSObject[][]
}
