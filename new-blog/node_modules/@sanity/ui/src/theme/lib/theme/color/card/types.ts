import {ThemeColorGenericState} from '../_generic'

/**
 * @deprecated Use `ThemeColorGenericState` instead.
 * @public
 */
export type ThemeColorCardState = ThemeColorGenericState

/**
 * @public
 */
export interface ThemeColorCard {
  enabled: ThemeColorCardState
  hovered: ThemeColorCardState
  pressed: ThemeColorCardState
  selected: ThemeColorCardState
  disabled: ThemeColorCardState
}
