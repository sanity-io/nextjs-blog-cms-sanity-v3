import {css, CSSObject, FlattenSimpleInterpolation, keyframes} from 'styled-components'
import {rem, responsive, ThemeProps} from '../../styles'

const rotate = keyframes`
from {
  transform: rotate(0deg);
}

to {
  transform: rotate(360deg);
}
`

export function spinnerStyle(props: {$muted?: boolean} & ThemeProps): FlattenSimpleInterpolation {
  const {$muted} = props

  return css`
    animation: ${rotate} 500ms linear infinite;
    color: ${$muted ? 'var(--card-muted-fg-color)' : 'var(--card-fg-color)'};
  `
}

export function spinnerSizeStyle(props: {$size: number[]} & ThemeProps): CSSObject[] {
  const {$size} = props
  const {fonts, media} = props.theme.sanity

  return responsive(media, $size, (size) => {
    const {ascenderHeight, descenderHeight, lineHeight, iconSize} = fonts.text.sizes[size]
    const capHeight = lineHeight - ascenderHeight - descenderHeight

    return {
      width: rem(capHeight),
      height: rem(capHeight),

      '& > svg': {
        display: 'block',
        width: rem(iconSize),
        height: rem(iconSize),
        margin: (capHeight - iconSize) / 2,
      },
    }
  })
}
