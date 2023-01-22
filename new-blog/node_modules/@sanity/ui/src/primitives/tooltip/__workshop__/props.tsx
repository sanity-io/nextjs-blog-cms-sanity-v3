import {Box, Button, Card, Flex, Text, Tooltip} from '@sanity/ui'
import React from 'react'

export default function PropsStory() {
  return (
    <Card height="fill">
      <Flex align="center" height="fill" justify="center" padding={4} sizing="border">
        <Tooltip
          content={
            <Box padding={2}>
              <Text size={1}>Tooltip content</Text>
            </Box>
          }
          placement="top"
          portal
        >
          <Button mode="bleed" text="Hover me" />
        </Tooltip>
      </Flex>
    </Card>
  )
}
