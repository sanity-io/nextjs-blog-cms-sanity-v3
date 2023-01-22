import {Card, Checkbox, Flex, Stack} from '@sanity/ui'

export default function MultipleTonesStory() {
  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Stack>
        <Card padding={3} tone="primary">
          <Checkbox />
        </Card>
        <Card padding={3} tone="positive">
          <Checkbox />
        </Card>
        <Card padding={3} tone="caution">
          <Checkbox />
        </Card>
        <Card padding={3} tone="critical">
          <Checkbox />
        </Card>
      </Stack>
    </Flex>
  )
}
