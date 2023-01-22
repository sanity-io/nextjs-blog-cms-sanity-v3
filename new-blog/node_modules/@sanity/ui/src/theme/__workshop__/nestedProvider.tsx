import {Card, Flex, Text, ThemeProvider} from '@sanity/ui'
import React from 'react'

export default function NestedProviderStory() {
  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <ThemeProvider>
        <Card padding={[3, 4, 5]} radius={3} tone="primary">
          <Text>
            This card is wrapped in a nested <code>ThemeProvider</code>
          </Text>
        </Card>
      </ThemeProvider>
    </Flex>
  )
}
