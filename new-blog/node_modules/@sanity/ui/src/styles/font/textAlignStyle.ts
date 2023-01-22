import {CSSObject} from 'styled-components'
import {getResponsiveProp, responsive} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveTextAlignStyleProps} from './types'

/**
 * Get responsive text align styles.
 * @internal
 */
export function responsiveTextAlignStyle(
  props: ResponsiveTextAlignStyleProps & ThemeProps
): CSSObject[] {
  const {theme} = props

  return responsive(theme.sanity.media, getResponsiveProp(props.$align), (textAlign) => {
    return {textAlign}
  })
}
