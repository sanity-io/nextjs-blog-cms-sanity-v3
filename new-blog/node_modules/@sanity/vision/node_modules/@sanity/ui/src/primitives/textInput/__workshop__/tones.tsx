import {Box, Card, Container, Flex, Stack, Text, TextInput} from '@sanity/ui'
import {useBoolean} from '@sanity/ui-workshop'

export default function TonesStory() {
  const transparentTone = useBoolean('Transparent', true)
  const primaryTone = useBoolean('Primary', true)
  const positiveTone = useBoolean('Positive', true)
  const cautionTone = useBoolean('Caution', true)
  const criticalTone = useBoolean('Critical', true)

  return (
    <Card height="fill" tone="transparent">
      <Flex align="center" height="fill" justify="center">
        <Container width={1}>
          <Flex>
            <Card flex={1} scheme="light">
              <Stack padding={[3, 4, 5]} space={4}>
                <Card padding={3}>
                  <TextInput
                    placeholder="default"
                    prefix={
                      <Box padding={3}>
                        <Text>prefix</Text>
                      </Box>
                    }
                    suffix={
                      <Box padding={3}>
                        <Text>suffix</Text>
                      </Box>
                    }
                  />
                </Card>

                {transparentTone && (
                  <Card padding={3} tone="transparent">
                    <TextInput
                      placeholder="transparent"
                      prefix={
                        <Box padding={3}>
                          <Text>prefix</Text>
                        </Box>
                      }
                      suffix={
                        <Box padding={3}>
                          <Text>suffix</Text>
                        </Box>
                      }
                    />
                  </Card>
                )}

                {primaryTone && (
                  <Card padding={3} tone="primary">
                    <TextInput
                      placeholder="primary"
                      prefix={
                        <Box padding={3}>
                          <Text>prefix</Text>
                        </Box>
                      }
                      suffix={
                        <Box padding={3}>
                          <Text>suffix</Text>
                        </Box>
                      }
                    />
                  </Card>
                )}

                {positiveTone && (
                  <Card padding={3} tone="positive">
                    <TextInput
                      placeholder="positive"
                      prefix={
                        <Box padding={3}>
                          <Text>prefix</Text>
                        </Box>
                      }
                      suffix={
                        <Box padding={3}>
                          <Text>suffix</Text>
                        </Box>
                      }
                    />
                  </Card>
                )}

                {cautionTone && (
                  <Card padding={3} tone="caution">
                    <TextInput
                      placeholder="caution"
                      prefix={
                        <Box padding={3}>
                          <Text>prefix</Text>
                        </Box>
                      }
                      suffix={
                        <Box padding={3}>
                          <Text>suffix</Text>
                        </Box>
                      }
                    />
                  </Card>
                )}

                {criticalTone && (
                  <Card padding={3} tone="critical">
                    <TextInput
                      placeholder="critical"
                      prefix={
                        <Box padding={3}>
                          <Text>prefix</Text>
                        </Box>
                      }
                      suffix={
                        <Box padding={3}>
                          <Text>suffix</Text>
                        </Box>
                      }
                    />
                  </Card>
                )}
              </Stack>
            </Card>
            <Card flex={1} scheme="dark">
              <Stack padding={[3, 4, 5]} space={4}>
                <Card padding={3}>
                  <TextInput
                    placeholder="default"
                    prefix={
                      <Box padding={3}>
                        <Text>prefix</Text>
                      </Box>
                    }
                    suffix={
                      <Box padding={3}>
                        <Text>suffix</Text>
                      </Box>
                    }
                  />
                </Card>

                {transparentTone && (
                  <Card padding={3} tone="transparent">
                    <TextInput
                      placeholder="transparent"
                      prefix={
                        <Box padding={3}>
                          <Text>prefix</Text>
                        </Box>
                      }
                      suffix={
                        <Box padding={3}>
                          <Text>suffix</Text>
                        </Box>
                      }
                    />
                  </Card>
                )}

                {primaryTone && (
                  <Card padding={3} tone="primary">
                    <TextInput
                      placeholder="primary"
                      prefix={
                        <Box padding={3}>
                          <Text>prefix</Text>
                        </Box>
                      }
                      suffix={
                        <Box padding={3}>
                          <Text>suffix</Text>
                        </Box>
                      }
                    />
                  </Card>
                )}

                {positiveTone && (
                  <Card padding={3} tone="positive">
                    <TextInput
                      placeholder="positive"
                      prefix={
                        <Box padding={3}>
                          <Text>prefix</Text>
                        </Box>
                      }
                      suffix={
                        <Box padding={3}>
                          <Text>suffix</Text>
                        </Box>
                      }
                    />
                  </Card>
                )}

                {cautionTone && (
                  <Card padding={3} tone="caution">
                    <TextInput
                      placeholder="caution"
                      prefix={
                        <Box padding={3}>
                          <Text>prefix</Text>
                        </Box>
                      }
                      suffix={
                        <Box padding={3}>
                          <Text>suffix</Text>
                        </Box>
                      }
                    />
                  </Card>
                )}

                {criticalTone && (
                  <Card padding={3} tone="critical">
                    <TextInput
                      placeholder="critical"
                      prefix={
                        <Box padding={3}>
                          <Text>prefix</Text>
                        </Box>
                      }
                      suffix={
                        <Box padding={3}>
                          <Text>suffix</Text>
                        </Box>
                      }
                    />
                  </Card>
                )}
              </Stack>
            </Card>
          </Flex>
        </Container>
      </Flex>
    </Card>
  )
}
