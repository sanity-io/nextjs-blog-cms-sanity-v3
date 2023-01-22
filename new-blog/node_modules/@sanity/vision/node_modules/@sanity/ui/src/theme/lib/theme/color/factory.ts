import {ThemeColorGenericState} from './_generic'
import {ThemeColorBase} from './base'
import {ThemeColorButtonModeKey, ThemeColorButtonStates} from './button'
import {createButtonModes} from './button/createButtonModes'
import {ThemeColorCardState} from './card'
import {createCardStates} from './card/createCardStates'
import {defaultOpts} from './defaults'
import {ThemeColorInputState} from './input'
import {createInputModes} from './input/createInputModes'
import {ThemeColorMuted, ThemeColorMutedTone} from './muted'
import {createMutedTones} from './muted/createMuted'
import {ThemeColorSelectableState} from './selectable'
import {createSelectableTones} from './selectable/createSelectableTones'
import {ThemeColorSolid, ThemeColorSolidTone} from './solid'
import {createSolidTones} from './solid/createSolidTones'
import {ThemeColorSpotKey} from './spot'
import {createSpot} from './spot/createSpot'
import {ThemeColorSyntax} from './syntax'
import {
  ThemeColorName,
  ThemeColorScheme,
  ThemeColorSchemes,
  ThemeColor,
  ThemeColorToneKey,
} from './types'

/**
 * @public
 */
export interface ThemeColorBuilderOpts {
  base: (opts: {dark: boolean; name: ThemeColorName}) => ThemeColorBase
  solid: (opts: {
    base: ThemeColorBase
    dark: boolean
    tone: ThemeColorToneKey
    name: ThemeColorName
    state: 'enabled' | 'disabled' | 'hovered' | 'pressed' | 'selected'
  }) => ThemeColorGenericState
  muted: (opts: {
    base: ThemeColorBase
    dark: boolean
    tone: ThemeColorToneKey
    name: ThemeColorName
    state: 'enabled' | 'disabled' | 'hovered' | 'pressed' | 'selected'
  }) => ThemeColorGenericState
  card: (opts: {
    base: ThemeColorBase
    dark: boolean
    muted: ThemeColorMuted
    name: ThemeColorName
    solid: ThemeColorSolid
    state: 'enabled' | 'disabled' | 'hovered' | 'pressed' | 'selected'
  }) => ThemeColorCardState
  button: (opts: {
    dark: boolean
    mode: ThemeColorButtonModeKey
    base: ThemeColorBase
    solid: ThemeColorSolidTone
    muted: ThemeColorMutedTone
  }) => ThemeColorButtonStates
  input: (opts: {
    base: ThemeColorBase
    solid: ThemeColorSolidTone
    muted: ThemeColorMutedTone
    dark: boolean
    mode: 'default' | 'invalid'
    state: 'enabled' | 'disabled' | 'hovered' | 'readOnly'
  }) => ThemeColorInputState
  selectable: (opts: {
    dark: boolean
    base: ThemeColorBase
    solid: ThemeColorSolid
    muted: ThemeColorMuted
    state: 'enabled' | 'disabled' | 'hovered' | 'pressed' | 'selected'
    tone: 'default' | 'primary' | 'positive' | 'caution' | 'critical'
  }) => ThemeColorSelectableState
  syntax: (opts: {base: ThemeColorBase; dark: boolean}) => ThemeColorSyntax
  spot: (opts: {base: ThemeColorBase; dark: boolean; key: ThemeColorSpotKey}) => string
}

/**
 * @public
 */
export type PartialThemeColorBuilderOpts = Partial<ThemeColorBuilderOpts>

/**
 * @public
 */
export function createColorTheme(
  partialOpts: PartialThemeColorBuilderOpts = {}
): ThemeColorSchemes {
  const builders: ThemeColorBuilderOpts = {...defaultOpts, ...partialOpts}

  return {
    light: _createColorScheme(builders, false),
    dark: _createColorScheme(builders, true),
  }
}

/**
 * @internal
 */
function _createColorScheme(opts: ThemeColorBuilderOpts, dark: boolean): ThemeColorScheme {
  return {
    default: _createColor(opts, dark, 'default'),
    transparent: _createColor(opts, dark, 'transparent'),
    primary: _createColor(opts, dark, 'primary'),
    positive: _createColor(opts, dark, 'positive'),
    caution: _createColor(opts, dark, 'caution'),
    critical: _createColor(opts, dark, 'critical'),
  }
}

/**
 * @internal
 */
function _createColor(
  opts: ThemeColorBuilderOpts,
  dark: boolean,
  name: ThemeColorName
): ThemeColor {
  const base = opts.base({dark, name})
  const solid = createSolidTones(opts, base, dark, name)
  const muted = createMutedTones(opts, base, dark, name)

  return {
    base,
    button: createButtonModes(opts, base, dark, solid, muted),
    card: createCardStates(opts, base, dark, name, solid, muted),
    dark,
    input: createInputModes(opts, base, dark, solid, muted),
    selectable: createSelectableTones(opts, base, dark, solid, muted),
    spot: createSpot(opts, base, dark),
    syntax: opts.syntax({base, dark}),
    solid,
    muted,
  }
}
