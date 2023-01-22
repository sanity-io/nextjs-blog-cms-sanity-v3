import {Card, Flex, Stack, Text} from '@sanity/ui'
import {useAction, useBoolean, useSelect} from '@sanity/ui-workshop'
import {
  WORKSHOP_CARD_AS_OPTIONS,
  WORKSHOP_CARD_TONE_OPTIONS,
  WORKSHOP_RADIUS_OPTIONS,
  WORKSHOP_SHADOW_OPTIONS,
  WORKSHOP_SPACE_OPTIONS,
} from '../../../__workshop__/constants'

export default function PropsStory() {
  const as = useSelect('As', WORKSHOP_CARD_AS_OPTIONS, 'div', 'Props')
  const border = useBoolean('Border', false, 'Props')
  const checkered = useBoolean('Checkered', false, 'Props')
  const padding = useSelect('Padding', WORKSHOP_SPACE_OPTIONS, 0, 'Props')
  const radius = useSelect('Radius', WORKSHOP_RADIUS_OPTIONS, 0, 'Props')
  const selected = useBoolean('Selected', false, 'Props')
  const shadow = useSelect('Shadow', WORKSHOP_SHADOW_OPTIONS, 0, 'Props')
  const tone = useSelect('Tone', WORKSHOP_CARD_TONE_OPTIONS, 'default', 'Props')

  return (
    <Flex align="center" height="fill" justify="center">
      <Card
        __unstable_checkered={checkered}
        as={as}
        border={border}
        onClick={useAction('onClick')}
        padding={padding}
        radius={radius}
        selected={selected}
        shadow={shadow}
        tone={tone}
      >
        <Stack space={3}>
          <Text>
            Card with <code>padding={padding}</code>, <code>tone={tone}</code>, and{' '}
            <code>shadow={shadow}</code>.
          </Text>
          <Text>
            Text with <a>link</a>.
          </Text>
          <Text accent>Accented text.</Text>
        </Stack>
      </Card>
    </Flex>
  )
}
