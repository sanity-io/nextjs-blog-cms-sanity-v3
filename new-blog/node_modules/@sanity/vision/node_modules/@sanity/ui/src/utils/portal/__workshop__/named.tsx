import {Card, Container, Portal, PortalProvider, Stack, Text} from '@sanity/ui'
import {useState} from 'react'

export default function NamedStory() {
  const [portal1Element, setPortal1Element] = useState<HTMLDivElement | null>(null)
  const [portal2Element, setPortal2Element] = useState<HTMLDivElement | null>(null)
  const [portal3Element, setPortal3Element] = useState<HTMLDivElement | null>(null)

  return (
    <PortalProvider
      __unstable_elements={{
        portal1: portal1Element,
        portal2: portal2Element,
        portal3: portal3Element,
      }}
    >
      <Container width={1}>
        <Card height="fill" padding={4}>
          <Stack space={2}>
            <Text size={1} weight="semibold">
              Portal 1
            </Text>
            <Card border padding={3} ref={setPortal1Element} />
          </Stack>
        </Card>
        <Card height="fill" padding={4}>
          <Stack space={2}>
            <Text size={1} weight="semibold">
              Portal 2
            </Text>
            <Card border padding={3} ref={setPortal2Element} />
          </Stack>
        </Card>
        <Card height="fill" padding={4}>
          <Stack space={2}>
            <Text size={1} weight="semibold">
              Portal 3
            </Text>
            <Card border padding={3} ref={setPortal3Element} />
          </Stack>
        </Card>
      </Container>

      <Portal __unstable_name="portal1">
        <Text>Portal 1</Text>
      </Portal>

      <Portal __unstable_name="portal2">
        <Text>Portal 2</Text>
      </Portal>

      <Portal __unstable_name="portal3">
        <Text>Portal 3A</Text>
      </Portal>

      <Portal __unstable_name="portal3">
        <Text>Portal 3B</Text>
      </Portal>
    </PortalProvider>
  )
}
