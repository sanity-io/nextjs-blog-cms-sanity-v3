import {CSSObject} from 'styled-components'
import {ThemeProps} from '../../styles'
import {BadgeStyleProps} from './types'

export function badgeStyle(props: BadgeStyleProps & ThemeProps): CSSObject {
  const {$mode, $tone, theme} = props
  const palette = theme.sanity.color[$mode === 'outline' ? 'muted' : 'solid']
  const color = palette[$tone] || palette.default

  return {
    backgroundColor: color.enabled.bg,
    color: color.enabled.fg,
    boxShadow: `inset 0 0 0 1px ${color.enabled.border}`,
    cursor: 'default',

    '&:not([hidden])': {
      display: 'inline-block',
    },
  }
}
