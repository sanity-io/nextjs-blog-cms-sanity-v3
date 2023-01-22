import {CSSObject} from 'styled-components'
import {getResponsiveProp, getResponsiveSpace} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveMarginStyleProps} from './types'

export function responsiveMarginStyle(
  props: ResponsiveMarginStyleProps & ThemeProps
): CSSObject[][] {
  const {theme} = props

  return [
    getResponsiveSpace(theme, ['margin'], getResponsiveProp(props.$margin)),
    getResponsiveSpace(theme, ['marginLeft', 'marginRight'], getResponsiveProp(props.$marginX)),
    getResponsiveSpace(theme, ['marginTop', 'marginBottom'], getResponsiveProp(props.$marginY)),
    getResponsiveSpace(theme, ['marginTop'], getResponsiveProp(props.$marginTop)),
    getResponsiveSpace(theme, ['marginRight'], getResponsiveProp(props.$marginRight)),
    getResponsiveSpace(theme, ['marginBottom'], getResponsiveProp(props.$marginBottom)),
    getResponsiveSpace(theme, ['marginLeft'], getResponsiveProp(props.$marginLeft)),
  ].filter(Boolean) as CSSObject[][]
}
