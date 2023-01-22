import {Badge, Flex} from '@sanity/ui'
import {useAction, useSelect, useText} from '@sanity/ui-workshop'
import React from 'react'
import {
  WORKSHOP_BADGE_MODE_OPTIONS,
  WORKSHOP_BADGE_TONE_OPTIONS,
  WORKSHOP_SPACE_OPTIONS,
} from '../../../__workshop__/constants'

export default function PropsStory() {
  const mode = useSelect('Mode', WORKSHOP_BADGE_MODE_OPTIONS, 'default', 'Props')
  const paddingX = useSelect('Padding X', WORKSHOP_SPACE_OPTIONS, 1, 'Props')
  const paddingY = useSelect('Padding Y', WORKSHOP_SPACE_OPTIONS, 1, 'Props')
  const tone = useSelect('Tone', WORKSHOP_BADGE_TONE_OPTIONS, 'default', 'Props')
  const textProp = useText('Text', 'Label', 'Props')

  return (
    <Flex align="center" height="fill" justify="center">
      <Badge
        mode={mode}
        onClick={useAction('onClick')}
        paddingX={paddingX}
        paddingY={paddingY}
        tone={tone}
      >
        {textProp}
      </Badge>
    </Flex>
  )
}
