import {Card, Flex, Text} from '@sanity/ui'
import React from 'react'

export default function GapStory() {
  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Flex align="center" gap={[2, 3, 4]} justify="center" wrap="wrap">
        <Card padding={3} scheme="dark">
          <Text size={0}>Card 0</Text>
        </Card>
        <Card padding={3} scheme="dark">
          <Text size={1}>Card 1</Text>
        </Card>
        <Card padding={3} scheme="dark">
          <Text size={2}>Card 2</Text>
        </Card>
        <Card padding={3} scheme="dark">
          <Text size={3}>Card 3</Text>
        </Card>
        <Card padding={3} scheme="dark">
          <Text size={4}>Card 4</Text>
        </Card>
      </Flex>
    </Flex>
  )
}
