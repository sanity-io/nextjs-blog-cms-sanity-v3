/**
 * The black color value.
 * @public
 */
export declare const black: ColorValue

/**
 * @public
 */
export declare const blue: ColorTints

/**
 * The color hues provided by `@sanity/color`.
 * @public
 */
export declare const COLOR_HUES: ColorHueKey[]

/**
 * The color tints provided by `@sanity/color`
 * @public
 */
export declare const COLOR_TINTS: ColorTintKey[]

/**
 * @public
 */
export declare interface ColorHueConfig {
  darkest: string
  mid: string
  lightest: string
  midPoint: number
  title: string
}

/**
 * @public
 */
export declare type ColorHueKey =
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
export declare interface ColorPalette {
  black: ColorValue
  white: ColorValue
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

/**
 * @public
 */
export declare type ColorTintKey =
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
export declare type ColorTints = {
  [key in ColorTintKey]: ColorValue
}

/**
 * @public
 */
export declare interface ColorValue {
  hex: string
  title: string
}

/**
 * @public
 */
export declare const cyan: ColorTints

/**
 * @public
 */
export declare const gray: ColorTints

/**
 * @public
 */
export declare const green: ColorTints

/**
 * @public
 */
export declare const hues: {
  gray: ColorTints
  blue: ColorTints
  purple: ColorTints
  magenta: ColorTints
  red: ColorTints
  orange: ColorTints
  yellow: ColorTints
  green: ColorTints
  cyan: ColorTints
}

/**
 * @public
 */
export declare const magenta: ColorTints

/**
 * @public
 */
export declare const orange: ColorTints

/**
 * @public
 */
export declare const purple: ColorTints

/**
 * @public
 */
export declare const red: ColorTints

/**
 * The white color value.
 * @public
 */
export declare const white: ColorValue

/**
 * @public
 */
export declare const yellow: ColorTints

export {}
