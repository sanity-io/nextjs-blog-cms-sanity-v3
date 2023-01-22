import {
  Box,
  Card,
  CodeSkeleton,
  Container,
  Flex,
  HeadingSkeleton,
  LabelSkeleton,
  Skeleton,
  Stack,
  Text,
  TextSkeleton,
} from '@sanity/ui'
import {useBoolean, useSelect} from '@sanity/ui-workshop'
import {WORKSHOP_CARD_TONE_OPTIONS} from '../../../__workshop__/constants'

export default function SkeletonDelayStory() {
  const tone = useSelect('Tone', WORKSHOP_CARD_TONE_OPTIONS, '', 'Props') || 'default'
  const animated = useBoolean('Animated', true)

  return (
    <Box padding={[4, 5, 6]}>
      <Container width={1}>
        <Text muted>Delayed by 2000ms</Text>
        <Card tone={tone} marginTop={4} padding={2} radius={2} border>
          <Flex align="center">
            <Skeleton
              style={{width: 90, height: 90}}
              radius={2}
              animated={animated}
              marginRight={3}
              delay={1000}
            />
            <Stack space={2} flex={1}>
              <HeadingSkeleton
                size={4}
                style={{width: '100%'}}
                radius={1}
                animated={animated}
                delay={1000}
              />
              <TextSkeleton
                size={1}
                style={{width: '100%'}}
                radius={1}
                animated={animated}
                delay={1000}
              />
              <LabelSkeleton
                size={1}
                style={{width: '100%'}}
                radius={1}
                animated={animated}
                delay={1000}
              />
              <CodeSkeleton
                size={1}
                style={{width: '100%'}}
                radius={1}
                animated={animated}
                delay={1000}
              />
            </Stack>
          </Flex>
        </Card>
      </Container>
    </Box>
  )
}
