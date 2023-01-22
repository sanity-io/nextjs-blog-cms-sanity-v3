import {black as blackHex, white as whiteHex} from './config'
import {ColorValue} from './types'

export * from './hues'
export * from './constants'
export * from './types'

/**
 * The black color value.
 * @public
 */
export const black: ColorValue = {title: 'Black', hex: blackHex}

/**
 * The white color value.
 * @public
 */
export const white: ColorValue = {title: 'White', hex: whiteHex}
