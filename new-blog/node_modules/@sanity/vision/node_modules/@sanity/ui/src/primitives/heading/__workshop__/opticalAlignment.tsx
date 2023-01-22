import {AddCircleIcon} from '@sanity/icons'
import {Box, Card, Flex, Heading, Stack} from '@sanity/ui'

export default function OpticalAlignment() {
  return (
    <Box padding={[4, 5, 6]}>
      <Stack space={1}>
        <Flex>
          <Card padding={0} scheme="dark">
            <Heading accent size={5}>
              Hamburgefonstiv M
            </Heading>
          </Card>
        </Flex>

        <Flex>
          <Card padding={0} scheme="dark">
            <Heading accent size={4}>
              Hamburgefonstiv M
            </Heading>
          </Card>
        </Flex>

        <Flex>
          <Card padding={0} scheme="dark">
            <Heading accent size={3}>
              Hamburgefonstiv M
            </Heading>
          </Card>
        </Flex>

        <Flex>
          <Card padding={0} scheme="dark">
            <Heading accent size={2}>
              Hamburgefonstiv M
            </Heading>
          </Card>
        </Flex>

        <Flex>
          <Card padding={0} scheme="dark">
            <Heading accent size={1}>
              Hamburgefonstiv M
            </Heading>
          </Card>
        </Flex>

        <Flex>
          <Card padding={0} scheme="dark">
            <Heading accent size={0}>
              Hamburgefonstiv M
            </Heading>
          </Card>
        </Flex>

        <Flex>
          <Card padding={2} scheme="dark">
            <Heading accent>
              <AddCircleIcon />
            </Heading>
          </Card>
        </Flex>
      </Stack>
    </Box>
  )
}
