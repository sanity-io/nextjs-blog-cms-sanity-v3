/**
 * @public
 */
export type ThemeFontKey = 'code' | 'heading' | 'label' | 'text'

/**
 * @public
 */
export type ThemeFontWeightKey = 'regular' | 'medium' | 'semibold' | 'bold'

/**
 * @public
 */
export interface ThemeFontSize {
  ascenderHeight: number
  descenderHeight: number
  fontSize: number
  iconSize: number
  letterSpacing: number
  lineHeight: number
}

/**
 * @public
 */
export interface ThemeFontWeight {
  regular: number
  medium: number
  semibold: number
  bold: number
}

/**
 * @public
 */
export interface ThemeFont {
  family: string
  weights: ThemeFontWeight
  sizes: ThemeFontSize[]
  /** @deprecated No longer supported. */
  horizontalOffset?: number
}

/**
 * @public
 */
export interface ThemeFonts {
  code: ThemeFont
  heading: ThemeFont
  label: ThemeFont
  text: ThemeFont
}
