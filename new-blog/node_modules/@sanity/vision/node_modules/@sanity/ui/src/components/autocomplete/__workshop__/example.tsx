import {Autocomplete, Box, Card, Container, Stack, Text} from '@sanity/ui'
import {useBoolean, useSelect, useText} from '@sanity/ui-workshop'
import {PerfTestProps, usePerfTest} from '@sanity/ui-workshop/plugin-perf'
import {fireEvent} from '@testing-library/dom'
import {useCallback, useMemo, useState} from 'react'
import {
  WORKSHOP_CARD_TONE_OPTIONS,
  WORKSHOP_RADIUS_OPTIONS,
  WORKSHOP_SPACE_OPTIONS,
  WORKSHOP_TEXT_SIZE_OPTIONS,
} from '../../../__workshop__/constants'
import countries from '../__fixtures__/countries'

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

export default function ExampleStory() {
  const {ref, Wrapper} = usePerfTest(typingPerfTest)

  const layoutTone = useSelect('Layout tone', WORKSHOP_CARD_TONE_OPTIONS, 'default', 'Layout')
  const options = useMemo(() => countries.map((country) => ({value: country.code})), [])
  const border = useBoolean('Border', true, 'Props')
  const customValidity = useText('Custom validity', '', 'Props') || undefined
  const disabled = useBoolean('Disabled', false, 'Props')
  const fontSize = Number(useSelect('Font size', WORKSHOP_TEXT_SIZE_OPTIONS, 2, 'Props'))
  const openButton = useBoolean('Open button', false, 'Props')
  const padding = useSelect('Padding', WORKSHOP_SPACE_OPTIONS, 3, 'Props')
  const radius = Number(useSelect('Radius', WORKSHOP_RADIUS_OPTIONS, 2, 'Props'))
  const readOnly = useBoolean('Read only', false, 'Props')
  const [value, setValue] = useState('')

  const handleChange = useCallback((value: string) => setValue(value), [])

  return (
    <Card height="fill" tone={layoutTone}>
      <Container width={1}>
        <Box padding={[3, 4, 5]}>
          <Stack space={3}>
            <Text as="label" htmlFor="default" size={1} weight="semibold">
              Country code
            </Text>
            <Wrapper>
              <Autocomplete
                border={border}
                customValidity={customValidity}
                disabled={disabled}
                fontSize={fontSize}
                onChange={handleChange}
                id="default"
                openButton={openButton}
                options={options}
                padding={padding}
                placeholder="Search"
                radius={radius}
                readOnly={readOnly}
                ref={ref}
                value={value}
              />
            </Wrapper>
          </Stack>
        </Box>
      </Container>
    </Card>
  )
}
