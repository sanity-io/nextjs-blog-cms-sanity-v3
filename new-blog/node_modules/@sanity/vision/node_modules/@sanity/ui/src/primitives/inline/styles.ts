import {CSSObject} from 'styled-components'
import {rem, _responsive, ThemeProps} from '../../styles'
import {ResponsiveInlineSpaceStyleProps} from './types'

export function inlineBaseStyle(): CSSObject {
  return {
    lineHeight: 0,

    '&&:not([hidden])': {
      display: 'block',
    },

    '& > div': {
      display: 'inline-block',
      verticalAlign: 'middle',
    },
  }
}

export function inlineSpaceStyle(props: ResponsiveInlineSpaceStyleProps & ThemeProps): CSSObject[] {
  const {theme} = props

  return _responsive(theme.sanity.media, props.$space, (spaceIndex) => {
    const space = rem(theme.sanity.space[spaceIndex])

    return {
      margin: `-${space} 0 0 -${space}`,
      '& > div': {padding: `${space} 0 0 ${space}`},
    }
  })
}
