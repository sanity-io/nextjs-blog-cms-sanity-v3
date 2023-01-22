import {CSSObject} from 'styled-components'
import {ThemeProps} from '../types'
import {responsiveFont} from './responsiveFont'
import {ResponsiveFontStyleProps} from './types'

/**
 * Get responsive CSS for the `text` font style.
 * @internal
 */
export function responsiveTextFont(props: ResponsiveFontStyleProps & ThemeProps): CSSObject[] {
  return responsiveFont('text', props)
}
