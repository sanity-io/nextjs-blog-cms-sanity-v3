/**
 * @public
 */
export interface ColorHueConfig {
  darkest: string
  mid: string
  lightest: string
  midPoint: number
  title: string
}

/**
 * @public
 */
export interface ColorValue {
  hex: string
  title: string
}

/**
 * @public
 */
export type ColorTintKey =
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | '950'

/**
 * @public
 */
export type ColorTints = {
  [key in ColorTintKey]: ColorValue
}

/**
 * @public
 */
export type ColorHueKey =
  | 'gray'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'cyan'
  | 'blue'
  | 'purple'
  | 'magenta'

/**
 * @public
 */
export interface ColorPalette {
  // Color values
  black: ColorValue
  white: ColorValue

  // Color tints
  gray: ColorTints
  red: ColorTints
  orange: ColorTints
  yellow: ColorTints
  green: ColorTints
  cyan: ColorTints
  blue: ColorTints
  purple: ColorTints
  magenta: ColorTints
}
