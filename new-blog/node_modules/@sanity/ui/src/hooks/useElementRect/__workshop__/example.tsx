import {Box, Card, Code, Container, Stack, Text, useElementRect} from '@sanity/ui'
import {useMemo, useState} from 'react'
import React from 'react'
import {Grid} from '../../../primitives'

export default function ExampleStory() {
  const [element, setElement] = useState<HTMLElement | null>(null)
  const rect = useElementRect(element)
  const size = useMemo(() => ({width: rect?.width || 0, height: rect?.height || 0}), [rect])

  return (
    <Box padding={[3, 4, 5]}>
      <Container width={1}>
        <Stack space={4}>
          <Grid columns={[1, 2, 3]}>
            <Card ref={setElement} tone="transparent">
              <Text>rect</Text>
            </Card>
          </Grid>

          <div style={{height: 11}}>
            <Card scheme="dark" style={{position: 'absolute', ...size}} />
          </div>

          <Code language="json">{JSON.stringify(size)}</Code>
        </Stack>
      </Container>
    </Box>
  )
}
