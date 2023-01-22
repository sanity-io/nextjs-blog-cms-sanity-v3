import {Box, Flex, Switch, Text} from '@sanity/ui'
import {useCallback, useState} from 'react'

export default function ExampleStory() {
  const [checked, setChecked] = useState<boolean | undefined>(undefined)
  const indeterminate = checked === undefined
  const handleChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    setChecked(event.currentTarget.checked)
  }, [])

  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Flex align="center" as="label">
        <Switch checked={checked || false} indeterminate={indeterminate} onChange={handleChange} />
        <Box marginLeft={3}>
          <Text size={1} weight="semibold">
            Label
          </Text>
        </Box>
      </Flex>
    </Flex>
  )
}
