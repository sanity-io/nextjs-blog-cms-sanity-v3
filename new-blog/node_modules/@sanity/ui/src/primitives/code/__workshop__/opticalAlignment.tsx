import {AddCircleIcon} from '@sanity/icons'
import {Box, Card, Code, Flex, Stack} from '@sanity/ui'
import React from 'react'

export default function OpticalAlignment() {
  return (
    <Box padding={[4, 5, 6]}>
      <Stack space={1}>
        <Flex>
          <Card padding={0} scheme="dark">
            <Code size={4}>Hamburgefonstiv M</Code>
          </Card>
        </Flex>

        <Flex>
          <Card padding={0} scheme="dark">
            <Code size={3}>Hamburgefonstiv M</Code>
          </Card>
        </Flex>

        <Flex>
          <Card padding={0} scheme="dark">
            <Code size={2}>Hamburgefonstiv M</Code>
          </Card>
        </Flex>

        <Flex>
          <Card padding={0} scheme="dark">
            <Code size={1}>Hamburgefonstiv M</Code>
          </Card>
        </Flex>

        <Flex>
          <Card padding={0} scheme="dark">
            <Code size={0}>Hamburgefonstiv M</Code>
          </Card>
        </Flex>

        <Flex>
          <Card padding={2} scheme="dark">
            <Code>
              <AddCircleIcon />
            </Code>
          </Card>
        </Flex>
      </Stack>
    </Box>
  )
}
