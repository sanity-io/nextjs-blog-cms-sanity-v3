import {CSSObject} from 'styled-components'
import {getResponsiveProp, rem, responsive} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveRadiusStyleProps} from './types'

export function responsiveRadiusStyle(props: ResponsiveRadiusStyleProps & ThemeProps): CSSObject[] {
  const {theme} = props
  const {media, radius} = theme.sanity

  return responsive(media, getResponsiveProp(props.$radius), (radiusIndex) => ({
    borderRadius: rem(radius[radiusIndex]),
  }))
}
