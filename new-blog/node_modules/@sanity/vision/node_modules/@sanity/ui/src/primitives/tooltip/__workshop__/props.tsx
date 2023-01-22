import {Button, Card, Flex, Text, Tooltip} from '@sanity/ui'
import {useBoolean, useSelect, useText} from '@sanity/ui-workshop'
import {
  WORKSHOP_PLACEMENT_OPTIONS,
  WORKSHOP_SHADOW_OPTIONS,
  WORKSHOP_SPACE_OPTIONS,
} from '../../../__workshop__/constants'

export default function PropsStory() {
  const content = useText('Content', 'Tooltip content')
  const padding = useSelect('Padding', WORKSHOP_SPACE_OPTIONS, 2, 'Props')
  const placement = useSelect('Placement', WORKSHOP_PLACEMENT_OPTIONS, 'top')
  const portal = useBoolean('Portal', true)
  const shadow = useSelect('Shadow', WORKSHOP_SHADOW_OPTIONS, 2)

  return (
    <Card height="fill">
      <Flex align="center" height="fill" justify="center" padding={4} sizing="border">
        <Tooltip
          content={<Text size={1}>{content}</Text>}
          padding={padding}
          placement={placement}
          portal={portal}
          shadow={shadow}
        >
          <Button mode="bleed" text="Hover me" />
        </Tooltip>
      </Flex>
    </Card>
  )
}
