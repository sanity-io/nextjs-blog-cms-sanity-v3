import {Card, Flex, Text} from '@sanity/ui'
import React from 'react'
import styled from 'styled-components'

const StyledCard = styled(Card).attrs({forwardedAs: 'ol'})``

export default function StyledCardStory() {
  return (
    <Flex align="center" height="fill" justify="center">
      <StyledCard>
        <Text as="li">Styled</Text>
      </StyledCard>
    </Flex>
  )
}
