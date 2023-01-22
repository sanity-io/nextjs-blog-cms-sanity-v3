import {Card, Flex, Stack, Text} from '@sanity/ui'
import {useBoolean} from '@sanity/ui-workshop'
import React from 'react'

export default function InteractiveCardStory() {
  const selected = useBoolean('Selected', false, 'Props')
  const pressed = useBoolean('Pressed', false, 'Props')

  return (
    <Flex align="center" height="fill" justify="center">
      <div aria-selected={selected}>
        <Card __unstable_focusRing aria-pressed={pressed} as="button" padding={3} tabIndex={0}>
          <Stack space={3}>
            <Text>
              Text <code>Code</code>
            </Text>
            <Text muted>Muted</Text>
            <Text accent>Accent</Text>
          </Stack>
        </Card>
      </div>
    </Flex>
  )
}
