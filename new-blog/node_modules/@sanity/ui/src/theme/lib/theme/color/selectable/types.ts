import {ThemeColorGenericState} from '../_generic'

/**
 * @deprecated Use `ThemeColorGenericState` instead.
 * @public
 */
export type ThemeColorSelectableState = ThemeColorGenericState

/**
 * @public
 */
export interface ThemeColorSelectableStates {
  enabled: ThemeColorSelectableState
  hovered: ThemeColorSelectableState
  pressed: ThemeColorSelectableState
  selected: ThemeColorSelectableState
  disabled: ThemeColorSelectableState
}

/**
 * @public
 */
export interface ThemeColorSelectable {
  default: ThemeColorSelectableStates
  primary: ThemeColorSelectableStates
  positive: ThemeColorSelectableStates
  caution: ThemeColorSelectableStates
  critical: ThemeColorSelectableStates
}
