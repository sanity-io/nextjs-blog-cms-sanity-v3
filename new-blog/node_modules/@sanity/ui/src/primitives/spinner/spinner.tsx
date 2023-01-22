import {SpinnerIcon} from '@sanity/icons'
import React, {forwardRef, useMemo} from 'react'
import styled from 'styled-components'
import {spinnerSizeStyle, spinnerStyle} from './styles'

/**
 * @public
 */
export interface SpinnerProps {
  muted?: boolean
  size?: number | number[]
}

const Root = styled.div<{$muted?: boolean; $size: number[]}>(spinnerStyle, spinnerSizeStyle)

/**
 * @public
 */
export const Spinner = forwardRef(function Spinner(
  props: SpinnerProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'size'>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const {muted, size = 2, ...restProps} = props
  const $size = useMemo(() => (Array.isArray(size) ? size : [size]), [size])

  return (
    <Root data-ui="Spinner" {...restProps} $muted={muted} $size={$size} ref={ref}>
      <SpinnerIcon />
    </Root>
  )
})
