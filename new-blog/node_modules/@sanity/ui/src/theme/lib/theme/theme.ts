import {ThemeAvatar} from './avatar'
import {ThemeColorSchemes} from './color'
import {ThemeFonts, ThemeFontWeightKey} from './fonts'
import {ThemeInput} from './input'
import {ThemeLayer} from './layer'
import {ThemeShadow} from './shadow'

/**
 * @public
 */
export interface BaseTheme<
  // eslint-disable-next-line @typescript-eslint/ban-types
  Styles extends {} = {}
> {
  avatar: ThemeAvatar
  button: {
    textWeight: ThemeFontWeightKey
  }
  color: ThemeColorSchemes
  container: number[]
  focusRing: {
    offset: number
    width: number
  }
  fonts: ThemeFonts
  /**
   * THIS API MAY BE UNSTABLE. DO NOT USE IN PRODUCTION.
   * @beta
   */
  layer?: ThemeLayer
  media: number[]
  radius: number[]
  shadows: Array<ThemeShadow | null>
  space: number[]
  input: ThemeInput
  styles?: Styles
}
