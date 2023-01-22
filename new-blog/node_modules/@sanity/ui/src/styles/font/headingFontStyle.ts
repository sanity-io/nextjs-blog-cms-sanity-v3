import {CSSObject} from 'styled-components'
import {ThemeProps} from '../types'
import {responsiveFont} from './responsiveFont'
import {ResponsiveFontStyleProps} from './types'

/**
 * Get responsive CSS for the `heading` font style.
 * @internal
 */
export function responsiveHeadingFont(props: ResponsiveFontStyleProps & ThemeProps): CSSObject[] {
  return responsiveFont('heading', props)
}
