import {Card, Container, Flex, Stack, Text} from '@sanity/ui'
import {useSelect} from '@sanity/ui-workshop'
import {WORKSHOP_SPACE_OPTIONS} from '../../../__workshop__/constants'

export default function PlainStory() {
  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Container width={0}>
        <Stack space={useSelect('Space', WORKSHOP_SPACE_OPTIONS, 0, 'Props')}>
          <Card padding={[2, 3, 4]} shadow={1}>
            <Text align="center" muted>
              Stack item
            </Text>
          </Card>

          <Card padding={[2, 3, 4]} shadow={1}>
            <Text align="center" muted>
              Stack item
            </Text>
          </Card>

          <Card padding={[2, 3, 4]} shadow={1}>
            <Text align="center" muted>
              Stack item
            </Text>
          </Card>
        </Stack>
      </Container>
    </Flex>
  )
}
