import React, {cloneElement, forwardRef} from 'react'
import styled, {css} from 'styled-components'
import {EMPTY_RECORD} from '../../constants'
import {getResponsiveProp, rem, responsive, ThemeProps} from '../../styles'
import {AvatarSize} from '../../types'
import {childrenToElementArray} from '../helpers'
import {AvatarCounter} from './avatarCounter'

const BASE_STYLES = css`
  white-space: nowrap;

  & > div {
    vertical-align: top;

    &:not([hidden]) {
      display: inline-block;
    }
  }
`

function avatarStackStyle() {
  return BASE_STYLES
}

function responsiveAvatarStackSizeStyle(props: {size: AvatarSize | AvatarSize[]} & ThemeProps) {
  const {theme} = props
  const {avatar, media} = theme.sanity

  return responsive(media, getResponsiveProp(props.size), (size) => {
    const avatarSize = avatar.sizes[size]

    if (!avatarSize) return EMPTY_RECORD

    return {
      '& > div + div': {
        marginLeft: rem(avatarSize.distance),
      },
    }
  })
}

const Root = styled.div<{size: AvatarSize | AvatarSize[]}>(
  responsiveAvatarStackSizeStyle,
  avatarStackStyle
)

/**
 * @public
 */
export interface AvatarStackProps {
  children: React.ReactNode
  maxLength?: number
  size?: AvatarSize | AvatarSize[]
  /** @deprecated No longer supported. */
  tone?: 'navbar'
}

/**
 * @public
 */
export const AvatarStack = forwardRef(function AvatarStack(
  props: AvatarStackProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'ref'>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const {children: childrenProp, maxLength: maxLengthProp = 4, size = 0, tone, ...restProps} = props
  const maxLength = Math.max(maxLengthProp, 0)
  const children = childrenToElementArray(childrenProp).filter(
    (child) => typeof child !== 'string'
  ) as React.ReactElement[]
  const len = children.length
  const visibleCount = maxLength - 1
  const extraCount = len - visibleCount
  const visibleChildren = extraCount > 1 ? children.slice(extraCount, len) : children

  return (
    <Root data-ui="AvatarStack" {...restProps} ref={ref} size={size}>
      {len === 0 && (
        <div>
          <AvatarCounter count={len} />
        </div>
      )}

      {len !== 0 && extraCount > 1 && (
        <div>
          <AvatarCounter count={extraCount} size={size} />
        </div>
      )}

      {visibleChildren.map((child, childIndex) => (
        <div key={String(childIndex)}>{cloneElement(child, {size})}</div>
      ))}
    </Root>
  )
})
