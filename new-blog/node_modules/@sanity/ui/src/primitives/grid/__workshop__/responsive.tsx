import {Card, Code, Container, Flex, Grid} from '@sanity/ui'
import React from 'react'

export default function ResponsiveStory() {
  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Container width="auto">
        <Grid
          id="responsive-grid"
          columns={[1, 2, 3, 4, 5, 6, 7]}
          gap={[0, 1, 2, 3, 4, 5, 6]}
          rows={[1, 2, 3, 4, 5, 6, 7]}
        >
          <Card tone="transparent">
            <Code>1</Code>
          </Card>
          <Card tone="transparent">
            <Code>2</Code>
          </Card>
          <Card tone="transparent">
            <Code>3</Code>
          </Card>
          <Card tone="transparent">
            <Code>4</Code>
          </Card>
          <Card tone="transparent">
            <Code>5</Code>
          </Card>
          <Card tone="transparent">
            <Code>6</Code>
          </Card>
          <Card tone="transparent">
            <Code>7</Code>
          </Card>
          <Card tone="transparent">
            <Code>8</Code>
          </Card>
          <Card tone="transparent">
            <Code>9</Code>
          </Card>
          <Card tone="transparent">
            <Code>10</Code>
          </Card>
          <Card tone="transparent">
            <Code>11</Code>
          </Card>
          <Card tone="transparent">
            <Code>12</Code>
          </Card>
        </Grid>
      </Container>
    </Flex>
  )
}
