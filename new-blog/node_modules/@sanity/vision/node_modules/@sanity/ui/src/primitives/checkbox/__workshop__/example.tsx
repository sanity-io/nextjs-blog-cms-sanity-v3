import {Box, Checkbox, Flex, Text} from '@sanity/ui'
import {useCallback, useState} from 'react'

export default function ExampleStory() {
  const [checked, setChecked] = useState<boolean | undefined>(undefined)
  const [indeterminate] = useState(checked === undefined)
  const handleChange = useCallback(() => setChecked((val) => !val), [])

  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Flex align="center" as="label">
        <Checkbox
          checked={checked || false}
          indeterminate={indeterminate}
          onChange={handleChange}
        />
        <Box marginLeft={2}>
          <Text size={1} weight="semibold">
            Toggle
          </Text>
        </Box>
      </Flex>
    </Flex>
  )
}
