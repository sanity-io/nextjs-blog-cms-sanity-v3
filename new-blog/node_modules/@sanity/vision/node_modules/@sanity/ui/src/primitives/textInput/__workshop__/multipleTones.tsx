import {Card, Stack, TextInput} from '@sanity/ui'

export default function MultipleTonesStory() {
  return (
    <Stack>
      <Card padding={3} tone="primary">
        <TextInput />
      </Card>
      <Card padding={3} tone="positive">
        <TextInput />
      </Card>
      <Card padding={3} tone="caution">
        <TextInput />
      </Card>
      <Card padding={3} tone="critical">
        <TextInput />
      </Card>
    </Stack>
  )
}
