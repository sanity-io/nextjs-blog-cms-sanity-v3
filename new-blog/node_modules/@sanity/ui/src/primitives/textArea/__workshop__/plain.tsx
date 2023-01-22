import {Container, Flex, Stack, Text, TextArea} from '@sanity/ui'
import {useBoolean, useSelect, useText} from '@sanity/ui-workshop'
import React from 'react'
import {
  WORKSHOP_FONT_WEIGHT_OPTIONS,
  WORKSHOP_RADIUS_OPTIONS,
  WORKSHOP_SPACE_OPTIONS,
  WORKSHOP_TEXT_FONT_SIZE_OPTIONS,
} from '../../../__workshop__/constants'

export default function PlainStory() {
  const border = useBoolean('Border', true, 'Props')
  const customValidity = useText('Custom validity', '', 'Props') || undefined
  const disabled = useBoolean('Disabled', false, 'Props')
  const fontSize = useSelect('Font size', WORKSHOP_TEXT_FONT_SIZE_OPTIONS, 2, 'Props')
  const padding = useSelect('Padding', WORKSHOP_SPACE_OPTIONS, 3, 'Props')
  const placeholder = useText('Placeholder', '', 'Props') || undefined
  const radius = useSelect('Radius', WORKSHOP_RADIUS_OPTIONS, 0, 'Props')
  const readOnly = useBoolean('Read only', false, 'Props')
  const weight = useSelect('Weight', WORKSHOP_FONT_WEIGHT_OPTIONS, undefined, 'Props')

  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Container width={0}>
        <Stack space={3}>
          <Text as="label" htmlFor="text-area-example" size={1} weight="semibold">
            TextArea
          </Text>
          <TextArea
            border={border}
            customValidity={customValidity}
            disabled={disabled}
            fontSize={fontSize}
            id="text-area-example"
            padding={padding}
            placeholder={placeholder}
            radius={radius}
            readOnly={readOnly}
            weight={weight}
          />
        </Stack>
      </Container>
    </Flex>
  )
}
