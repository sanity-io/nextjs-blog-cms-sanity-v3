import {Button, Card, Container, Stack, TextInput} from '@sanity/ui'
import {useText} from '@sanity/ui-workshop'

export default function CustomValidityStory() {
  const customValidity = useText('Custom validity', 'Invalid value', 'Props') || undefined

  return (
    <Container as="form" onSubmit={(event) => event.preventDefault()} width={0}>
      <Card padding={4}>
        <Stack space={4}>
          <TextInput customValidity={customValidity} />
          <Button text="Submit" type="submit" />
        </Stack>
      </Card>
    </Container>
  )
}
