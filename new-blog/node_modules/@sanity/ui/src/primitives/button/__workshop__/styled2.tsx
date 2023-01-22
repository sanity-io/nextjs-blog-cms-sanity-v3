import {Button, Flex} from '@sanity/ui'
import React from 'react'
import styled from 'styled-components'

const StyledButton2 = styled(Button)<{$color?: boolean}>`
  &:hover {
    background-color: red;
    box-shadow: none;
  }
`

export default function StyledButton2Story() {
  const props = {href: '#', text: 'Test'}

  return (
    <Flex align="center" height="fill" justify="center">
      <StyledButton2 $color forwardedAs="a" {...props} />
    </Flex>
  )
}
