import {icons, IconSymbol} from '@sanity/icons'
import {Container, Flex, Stack, Text, TextInput} from '@sanity/ui'
import {PerfTestProps, useBoolean, usePerfTest, useSelect, useText} from '@sanity/ui-workshop'
import {fireEvent} from '@testing-library/dom'
import React, {useCallback, useState} from 'react'
import {
  WORKSHOP_TEXT_FONT_SIZE_OPTIONS,
  WORKSHOP_FONT_WEIGHT_OPTIONS,
  WORKSHOP_ICON_SYMBOL_OPTIONS,
  WORKSHOP_RADIUS_OPTIONS,
  WORKSHOP_SPACE_OPTIONS,
} from '../../../__workshop__/constants'

const typingPerfTest: PerfTestProps<HTMLInputElement> = {
  name: 'typing',
  title: 'Typing',
  description: 'This test types one character at a time',
  run({target}) {
    const text = 'Hello, world & Hello, world & Hello, world'
    const len = text.length

    for (let i = 0; i < len; i += 1) {
      const value = text.slice(0, i + 1)

      fireEvent.change(target, {target: {value}})
    }
  },
}

export default function PlainStory() {
  const {ref, Wrapper} = usePerfTest(typingPerfTest)

  const border = useBoolean('Border', true, 'Props')
  const customValidity = useText('Custom validity', '', 'Props') || undefined
  const disabled = useBoolean('Disabled', false, 'Props')
  const fontSize = useSelect('Font size', WORKSHOP_TEXT_FONT_SIZE_OPTIONS, 2, 'Props')
  const icon = useSelect('Icon', WORKSHOP_ICON_SYMBOL_OPTIONS, 'add-circle', 'Props') as IconSymbol
  const iconRight = useSelect(
    'Icon (right)',
    WORKSHOP_ICON_SYMBOL_OPTIONS,
    'add-circle',
    'Props'
  ) as IconSymbol
  const padding = useSelect('Padding', WORKSHOP_SPACE_OPTIONS, 3, 'Props')
  const placeholder = useText('Placeholder', '', 'Props') || undefined
  const radius = useSelect('Radius', WORKSHOP_RADIUS_OPTIONS, 0, 'Props')
  const readOnly = useBoolean('Read only', false, 'Props')
  const space = useSelect('Space', WORKSHOP_SPACE_OPTIONS, 3, 'Props')
  const weight = useSelect('Weight', WORKSHOP_FONT_WEIGHT_OPTIONS, '', 'Props') || undefined

  const [value, setValue] = useState('')

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value),
    []
  )

  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Container width={0}>
        <Stack space={3}>
          <Text as="label" htmlFor="text-input-example" size={1} weight="semibold">
            TextInput
          </Text>
          <Wrapper>
            <TextInput
              border={border}
              customValidity={customValidity}
              disabled={disabled}
              fontSize={fontSize}
              icon={icon && icons[icon]}
              iconRight={iconRight && icons[iconRight]}
              id="text-input-example"
              name="email"
              onChange={handleChange}
              padding={padding}
              placeholder={placeholder}
              radius={radius}
              readOnly={readOnly}
              ref={ref}
              space={space}
              value={value}
              weight={weight}
            />
          </Wrapper>
        </Stack>
      </Container>
    </Flex>
  )
}
