import {Box, Checkbox, Flex, Text} from '@sanity/ui'
import React from 'react'

export default function ReadOnlyStory() {
  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Flex align="center" as="label">
        <Checkbox id="checkbox-example" readOnly />
        <Box marginLeft={3}>
          <Text>Label</Text>
        </Box>
      </Flex>
    </Flex>
  )
}
