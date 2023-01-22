import {ThemeFontWeightKey} from '../../theme'
import {TextAlign} from '../../types'

/**
 * @internal
 */
export interface ResponsiveFontSizeStyleProps {
  $size: number[]
}

/**
 * @internal
 */
export interface FontWeightStyleProps {
  $weight?: ThemeFontWeightKey
}

/**
 * @internal
 */
export interface ResponsiveTextAlignStyleProps {
  $align: TextAlign[]
}

/**
 * @internal
 */
export interface ResponsiveFontStyleProps
  extends FontWeightStyleProps,
    ResponsiveFontSizeStyleProps,
    ResponsiveTextAlignStyleProps {
  $accent?: boolean
  $muted?: boolean
}
