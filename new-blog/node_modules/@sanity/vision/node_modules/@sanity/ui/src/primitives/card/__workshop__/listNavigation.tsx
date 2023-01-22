import {Box, Card, Flex, Skeleton, Text} from '@sanity/ui'
import {Stack} from '../../stack'

export default function ListNavigationStory() {
  return (
    <Box height="fill" padding={[3, 4, 5]} sizing="border">
      <Card height="fill" shadow={1}>
        <Flex height="fill">
          <Card flex={1} padding={2}>
            <List1 />
          </Card>
          <Card borderLeft flex={1} padding={2}>
            <List2 />
          </Card>
        </Flex>
      </Card>
    </Box>
  )
}

function List1() {
  return (
    <Stack space={1}>
      <Card __unstable_focusRing as="a" href="#" padding={2} radius={2}>
        <Preview />
      </Card>
      <Card __unstable_focusRing as="a" href="#" padding={2} pressed radius={2}>
        <Preview />
      </Card>
      <Card __unstable_focusRing as="a" href="#" padding={2} radius={2}>
        <Preview />
      </Card>
      <Card __unstable_focusRing as="a" href="#" padding={2} radius={2}>
        <Preview />
      </Card>
      <Card __unstable_focusRing as="a" href="#" padding={2} radius={2}>
        <Preview />
      </Card>
    </Stack>
  )
}

function List2() {
  return (
    <Stack space={1}>
      <Card __unstable_focusRing as="a" href="#" padding={2} radius={2}>
        <Preview />
      </Card>
      <Card __unstable_focusRing as="a" href="#" padding={2} pressed radius={2} selected>
        <Preview />
      </Card>
      <Card __unstable_focusRing as="a" href="#" padding={2} radius={2}>
        <Preview />
      </Card>
      <Card __unstable_focusRing as="a" href="#" padding={2} radius={2}>
        <Preview />
      </Card>
      <Card __unstable_focusRing as="a" href="#" padding={2} radius={2}>
        <Preview />
      </Card>
    </Stack>
  )
}

function Preview() {
  return (
    <Flex align="center">
      <Skeleton marginRight={2} radius={2} style={{width: 35, height: 35}} />
      <Stack flex={1} space={2}>
        <Text>Preview</Text>
        <Text muted size={1}>
          Preview
        </Text>
      </Stack>
    </Flex>
  )
}
