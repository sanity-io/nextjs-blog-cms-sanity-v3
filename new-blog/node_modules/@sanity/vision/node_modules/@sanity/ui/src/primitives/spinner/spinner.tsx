import {SpinnerIcon} from '@sanity/icons'
import {forwardRef} from 'react'
import styled, {keyframes} from 'styled-components'
import {Text} from '../text'

/**
 * @public
 */
export interface SpinnerProps {
  muted?: boolean
  size?: number | number[]
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Root = styled(Text)`
  & > span > svg {
    animation: ${rotate} 500ms linear infinite;
  }
`

/**
 * @public
 */
export const Spinner = forwardRef(function Spinner(
  props: SpinnerProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'size'>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <Root data-ui="Spinner" {...props} ref={ref}>
      <SpinnerIcon />
    </Root>
  )
})
