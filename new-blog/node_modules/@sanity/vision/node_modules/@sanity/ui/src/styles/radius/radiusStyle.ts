import {CSSObject} from 'styled-components'
import {rem, _responsive} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveRadiusStyleProps} from './types'

export function responsiveRadiusStyle(props: ResponsiveRadiusStyleProps & ThemeProps): CSSObject[] {
  const {theme} = props
  const {media, radius} = theme.sanity

  return _responsive(media, props.$radius, (radiusIndex) => ({
    borderRadius: rem(radius[radiusIndex]),
  }))
}
