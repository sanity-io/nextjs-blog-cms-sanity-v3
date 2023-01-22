import {SpinnerIcon} from '@sanity/icons'
import styled, {keyframes} from 'styled-components'
import {Box} from '../../primitives'

/**
 * @internal
 */
export const Root = styled.div`
  line-height: 0;
`

/**
 * @internal
 */
export const ListBox = styled(Box)`
  & > ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

/**
 * @internal
 */
export const AnimatedSpinnerIcon = styled(SpinnerIcon)`
  animation: ${rotate} 500ms linear infinite;
`
