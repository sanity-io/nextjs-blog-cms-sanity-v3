import {forwardRef, useMemo} from 'react'
import styled, {css} from 'styled-components'
import {EMPTY_RECORD} from '../../constants'
import {useArrayProp} from '../../hooks'
import {rem, _responsive, ThemeProps} from '../../styles'
import {AvatarSize} from '../../types'
import {Text} from '../text'

function _responsiveAvatarCounterSizeStyle(props: {$size: AvatarSize[]} & ThemeProps) {
  const {theme} = props
  const {avatar, media} = theme.sanity

  return _responsive(media, props.$size, (size) => {
    const avatarSize = avatar.sizes[size]

    if (!avatarSize) return EMPTY_RECORD

    return {
      borderRadius: rem(avatarSize.size / 2),
      minWidth: rem(avatarSize.size),
      height: rem(avatarSize.size),
    }
  })
}

function _avatarCounterBaseStyle(props: ThemeProps) {
  const {theme} = props

  return css`
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    user-select: none;
    color: inherit;
    color: var(--card-fg-color);
    background: var(--card-bg-color);
    box-shadow: 0 0 0 1px var(--card-bg-color), inset 0 0 0 1.5px var(--card-hairline-hard-color);
    padding: 0 ${rem(theme.sanity.space[2])};

    &:not([hidden]) {
      display: flex;
    }
  `
}

const Root = styled.div<{$size: AvatarSize[]}>(
  _responsiveAvatarCounterSizeStyle,
  _avatarCounterBaseStyle
)

/**
 * @public
 */
export interface AvatarCounterProps {
  count: number
  size?: AvatarSize | AvatarSize[]
  /** @deprecated No longer supported. */
  tone?: 'navbar'
}

/**
 * @public
 */
export const AvatarCounter = forwardRef(function AvatarCounter(
  props: AvatarCounterProps,
  ref: React.Ref<HTMLDivElement>
) {
  const {count, size: sizeProp = 0} = props
  const size = useArrayProp(sizeProp)
  const counterSize = useMemo(() => size.map((s) => (s === 0 ? 0 : s + 1)), [size])

  return (
    <Root $size={size} data-ui="AvatarCounter" ref={ref}>
      <Text as="span" size={counterSize}>
        <strong>{count}</strong>
      </Text>
    </Root>
  )
})
