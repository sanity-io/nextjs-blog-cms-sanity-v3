import {CSSObject} from 'styled-components'
import {getResponsiveProp, getResponsiveSpace} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsivePaddingStyleProps} from './types'

export function responsivePaddingStyle(
  props: ResponsivePaddingStyleProps & ThemeProps
): CSSObject[][] {
  const {theme} = props

  return [
    getResponsiveSpace(theme, ['padding'], getResponsiveProp(props.$padding)),
    getResponsiveSpace(theme, ['paddingLeft', 'paddingRight'], getResponsiveProp(props.$paddingX)),
    getResponsiveSpace(theme, ['paddingTop', 'paddingBottom'], getResponsiveProp(props.$paddingY)),
    getResponsiveSpace(theme, ['paddingTop'], getResponsiveProp(props.$paddingTop)),
    getResponsiveSpace(theme, ['paddingRight'], getResponsiveProp(props.$paddingRight)),
    getResponsiveSpace(theme, ['paddingBottom'], getResponsiveProp(props.$paddingBottom)),
    getResponsiveSpace(theme, ['paddingLeft'], getResponsiveProp(props.$paddingLeft)),
  ].filter(Boolean) as CSSObject[][]
}
