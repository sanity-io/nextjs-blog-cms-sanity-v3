import {Button, Flex} from '@sanity/ui'
import React from 'react'
import styled from 'styled-components'

const StyledButton1 = styled.a`
  &:hover {
    background-color: red;
    box-shadow: none;
  }
`

export default function StyledButton1Story() {
  return (
    <Flex align="center" height="fill" justify="center">
      <Button as={StyledButton1} href="#" text="Test" />
    </Flex>
  )
}
