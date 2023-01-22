import {Box, Card, Container, Flex, Grid, Stack, Text} from '@sanity/ui'
import React from 'react'
import {WORKSHOP_CARD_TONE_OPTIONS} from '../../../__workshop__/constants'

export default function AsButtonStory() {
  const tones = Object.entries(WORKSHOP_CARD_TONE_OPTIONS)

  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Container>
        <Grid columns={3} gap={2}>
          <Box>
            <Text align="center" size={1} weight="semibold">
              Enabled
            </Text>
            <Stack marginTop={3} space={2}>
              {tones.map(([title, tone]) => (
                <Card
                  __unstable_focusRing
                  as="button"
                  key={tone}
                  padding={4}
                  style={{textAlign: 'center'}}
                  tone={tone}
                >
                  <Stack space={2}>
                    <Text weight="semibold">{title}</Text>
                    <Text muted>Muted</Text>
                    <Text accent>Accent</Text>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </Box>

          <Box>
            <Text align="center" size={1} weight="semibold">
              Disabled
            </Text>
            <Stack marginTop={3} space={2}>
              {tones.map(([title, tone]) => (
                <Card
                  __unstable_focusRing
                  as="button"
                  disabled
                  key={tone}
                  padding={4}
                  style={{textAlign: 'center'}}
                  tone={tone}
                >
                  <Stack space={2}>
                    <Text weight="semibold">{title}</Text>
                    <Text muted>Muted</Text>
                    <Text accent>Accent</Text>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </Box>

          <Box>
            <Text align="center" size={1} weight="semibold">
              Selected
            </Text>
            <Stack marginTop={3} space={2}>
              {tones.map(([title, tone]) => (
                <div aria-selected key={tone}>
                  <Card
                    __unstable_focusRing
                    as="button"
                    padding={4}
                    style={{textAlign: 'center'}}
                    tone={tone}
                  >
                    <Stack space={2}>
                      <Text weight="semibold">{title}</Text>
                      <Text muted>Muted</Text>
                      <Text accent>Accent</Text>
                    </Stack>
                  </Card>
                </div>
              ))}
            </Stack>
          </Box>
        </Grid>
      </Container>
    </Flex>
  )
}
