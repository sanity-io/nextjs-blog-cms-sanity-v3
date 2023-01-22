import {Flex, Heading} from '@sanity/ui'
import {useBoolean, useSelect, useText} from '@sanity/ui-workshop'
import React from 'react'
import {
  WORKSHOP_HEADING_FONT_SIZE_OPTIONS,
  WORKSHOP_FONT_WEIGHT_OPTIONS,
  WORKSHOP_TEXT_OVERFLOW_OPTIONS,
} from '../../../__workshop__/constants'

export default function PlainStory() {
  const accent = useBoolean('Accent', false, 'Props')
  const muted = useBoolean('Muted', false, 'Props')
  const size = useSelect('Size', WORKSHOP_HEADING_FONT_SIZE_OPTIONS, 2, 'Props')
  const textChild = useText('Text', 'Hello, world', 'Props')
  const textOverflow =
    useSelect('Text overflow', WORKSHOP_TEXT_OVERFLOW_OPTIONS, '', 'Props') || undefined
  const weight = useSelect('Weight', WORKSHOP_FONT_WEIGHT_OPTIONS, '', 'Props') || undefined

  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Heading
        accent={accent}
        muted={muted}
        size={size}
        textOverflow={textOverflow}
        weight={weight}
      >
        {textChild}
      </Heading>
    </Flex>
  )
}
