import {Box, Container, Flex, Radio, Stack, Text} from '@sanity/ui'
import {useBoolean} from '@sanity/ui-workshop'
import React, {useCallback, useState} from 'react'

export default function ExampleStory() {
  const [value, setValue] = useState('first-option')
  const disabled = useBoolean('Disabled', false, 'Props')
  const readOnly = useBoolean('Read only', false, 'Props')

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }, [])

  return (
    <Flex align="center" height="fill" justify="center" padding={[3, 4, 5]} sizing="border">
      <Container width={0}>
        <Stack space={3}>
          <Flex align="center" as="label">
            <Radio
              checked={value === 'first-option'}
              disabled={disabled}
              name="name"
              onChange={handleChange}
              readOnly={readOnly}
              value="first-option"
            />
            <Box marginLeft={2}>
              <Text>First option</Text>
            </Box>
          </Flex>

          <Flex align="center" as="label">
            <Radio
              checked={value === 'second-option'}
              disabled={disabled}
              name="name"
              onChange={handleChange}
              readOnly={readOnly}
              value="second-option"
            />
            <Box marginLeft={2}>
              <Text>Second option</Text>
            </Box>
          </Flex>

          <Flex align="center" as="label">
            <Radio
              checked={value === 'third-option'}
              disabled={disabled}
              name="name"
              onChange={handleChange}
              readOnly={readOnly}
              value="third-option"
            />
            <Box marginLeft={2}>
              <Text>Third option</Text>
            </Box>
          </Flex>
        </Stack>
      </Container>
    </Flex>
  )
}
