import {CSSObject} from 'styled-components'
import {BaseTheme, ThemeColor, ThemeColorName, ThemeColorSchemeKey} from './lib/theme'

/**
 * @public
 */
export type RootTheme = BaseTheme<Styles>

/**
 * TODO: Rename to `ThemeStyles`
 * @public
 */
export interface Styles {
  button?: {
    root?: CSSObject
  }
  card?: {
    root?: CSSObject
  }
}

/**
 * @public
 */
export interface Theme {
  sanity: Omit<RootTheme, 'color'> & {
    color: ThemeColor
  }
}

/**
 * @public
 */
export interface ThemeContextValue {
  version: 0.0
  scheme: ThemeColorSchemeKey
  theme: RootTheme
  tone: ThemeColorName
}
