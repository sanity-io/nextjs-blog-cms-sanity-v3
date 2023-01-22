import {AddCircleIcon} from '@sanity/icons'
import {Box, Card, Flex, Label, Stack} from '@sanity/ui'
import React from 'react'

export default function OpticalAlignment() {
  return (
    <Box padding={[4, 5, 6]}>
      <Stack space={1}>
        <Flex>
          <Card padding={0} scheme="dark">
            <Label size={4}>Hamburgefonstiv M</Label>
          </Card>
        </Flex>

        <Flex>
          <Card padding={0} scheme="dark">
            <Label size={3}>Hamburgefonstiv M</Label>
          </Card>
        </Flex>

        <Flex>
          <Card padding={0} scheme="dark">
            <Label size={2}>Hamburgefonstiv M</Label>
          </Card>
        </Flex>

        <Flex>
          <Card padding={0} scheme="dark">
            <Label size={1}>Hamburgefonstiv M</Label>
          </Card>
        </Flex>

        <Flex>
          <Card padding={0} scheme="dark">
            <Label size={0}>Hamburgefonstiv M</Label>
          </Card>
        </Flex>

        <Flex>
          <Card padding={2} scheme="dark">
            <Label>
              <AddCircleIcon />
            </Label>
          </Card>
        </Flex>
      </Stack>
    </Box>
  )
}
