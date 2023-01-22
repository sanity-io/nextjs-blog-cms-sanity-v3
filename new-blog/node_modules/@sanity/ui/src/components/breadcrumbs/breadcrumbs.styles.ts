import styled from 'styled-components'
import {Button} from '../../primitives'

export const Root = styled.ol`
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;
  align-items: center;
  white-space: nowrap;
  line-height: 0;
`

export const ExpandButton = styled(Button)`
  appearance: none;
  margin: -4px;
`
