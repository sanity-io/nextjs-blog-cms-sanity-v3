import {ThemeColorBase} from '../base'
import {ThemeColorBuilderOpts} from '../factory'
import {ThemeColorMuted} from '../muted'
import {ThemeColorSolid} from '../solid'
import {createButtonTones} from './createButtonTones'
import {ThemeColorButton} from './types'

export function createButtonModes(
  opts: ThemeColorBuilderOpts,
  base: ThemeColorBase,
  dark: boolean,
  solid: ThemeColorSolid,
  muted: ThemeColorMuted
): ThemeColorButton {
  return {
    default: createButtonTones(opts, base, dark, solid, muted, 'default'),
    ghost: createButtonTones(opts, base, dark, solid, muted, 'ghost'),
    bleed: createButtonTones(opts, base, dark, solid, muted, 'bleed'),
  }
}
