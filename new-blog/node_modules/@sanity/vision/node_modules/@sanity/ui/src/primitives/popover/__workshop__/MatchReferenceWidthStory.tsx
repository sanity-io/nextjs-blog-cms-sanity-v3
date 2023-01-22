import {Box, Button, Container, Flex, Popover, Stack, Text} from '@sanity/ui'
import {useBoolean, useSelect} from '@sanity/ui-workshop'
import {WORKSHOP_PLACEMENT_OPTIONS} from '../../../__workshop__/constants'

export default function MatchReferenceWidthStory() {
  const arrow = useBoolean('Arrow', true, 'Props')
  const placement = useSelect('Placement', WORKSHOP_PLACEMENT_OPTIONS, 'bottom', 'Props')

  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Popover
        arrow={arrow}
        content={
          <Box padding={2}>
            <Text>Content</Text>
          </Box>
        }
        matchReferenceWidth
        open
        placement={placement}
        radius={2}
      >
        <Container width={0}>
          <Stack>
            <Button fontSize={3} text="Button" />
          </Stack>
        </Container>
      </Popover>
    </Flex>
  )
}
