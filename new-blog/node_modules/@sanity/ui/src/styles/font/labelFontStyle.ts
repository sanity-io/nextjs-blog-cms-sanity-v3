import {CSSObject} from 'styled-components'
import {ThemeProps} from '../types'
import {responsiveFont} from './responsiveFont'
import {ResponsiveFontStyleProps} from './types'

/**
 * Get responsive CSS for the `label` font style.
 * @internal
 */
export function responsiveLabelFont(props: ResponsiveFontStyleProps & ThemeProps): CSSObject[] {
  return responsiveFont('label', props)
}
