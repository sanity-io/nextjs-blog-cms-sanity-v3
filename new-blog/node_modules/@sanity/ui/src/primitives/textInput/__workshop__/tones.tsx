import {Box, Card, Container, Stack, Text, TextInput} from '@sanity/ui'
import React from 'react'

export default function TonesStory() {
  return (
    <Container width={1}>
      <Stack padding={[3, 4, 5]} space={4}>
        <Card padding={3}>
          <TextInput
            placeholder="default"
            prefix={
              <Box padding={3}>
                <Text>prefix</Text>
              </Box>
            }
            suffix={
              <Box padding={3}>
                <Text>suffix</Text>
              </Box>
            }
          />
        </Card>
        <Card padding={3} tone="transparent">
          <TextInput
            placeholder="transparent"
            prefix={
              <Box padding={3}>
                <Text>prefix</Text>
              </Box>
            }
            suffix={
              <Box padding={3}>
                <Text>suffix</Text>
              </Box>
            }
          />
        </Card>
        <Card padding={3} tone="primary">
          <TextInput
            placeholder="primary"
            prefix={
              <Box padding={3}>
                <Text>prefix</Text>
              </Box>
            }
            suffix={
              <Box padding={3}>
                <Text>suffix</Text>
              </Box>
            }
          />
        </Card>
        <Card padding={3} tone="positive">
          <TextInput
            placeholder="positive"
            prefix={
              <Box padding={3}>
                <Text>prefix</Text>
              </Box>
            }
            suffix={
              <Box padding={3}>
                <Text>suffix</Text>
              </Box>
            }
          />
        </Card>
        <Card padding={3} tone="caution">
          <TextInput
            placeholder="caution"
            prefix={
              <Box padding={3}>
                <Text>prefix</Text>
              </Box>
            }
            suffix={
              <Box padding={3}>
                <Text>suffix</Text>
              </Box>
            }
          />
        </Card>
        <Card padding={3} tone="critical">
          <TextInput
            placeholder="critical"
            prefix={
              <Box padding={3}>
                <Text>prefix</Text>
              </Box>
            }
            suffix={
              <Box padding={3}>
                <Text>suffix</Text>
              </Box>
            }
          />
        </Card>
      </Stack>
    </Container>
  )
}
