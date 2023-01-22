import {CSSObject} from 'styled-components'
import {_responsive, ThemeProps} from '../../styles'
import {DialogPosition} from '../../types'

/**
 * @internal
 */
export interface ResponsiveDialogPositionStyleProps {
  $position: DialogPosition[]
}

export function dialogStyle({theme}: ThemeProps): CSSObject {
  const color = theme.sanity.color.base

  return {
    '&:not([hidden])': {
      display: 'flex',
    },

    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
    background: color.shadow.umbra,
  }
}

export function responsiveDialogPositionStyle(
  props: ResponsiveDialogPositionStyleProps & ThemeProps
): CSSObject[] {
  const {theme} = props
  const {media} = theme.sanity

  return _responsive(media, props.$position, (position) => ({'&&': {position}}))
}
