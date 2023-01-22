import {Box, Checkbox, Flex, Text} from '@sanity/ui'

export default function ReadOnlyStory() {
  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Flex align="center" as="label">
        <Checkbox id="checkbox-example" readOnly />
        <Box marginLeft={2}>
          <Text size={1} weight="semibold">
            Toggle
          </Text>
        </Box>
      </Flex>
    </Flex>
  )
}
