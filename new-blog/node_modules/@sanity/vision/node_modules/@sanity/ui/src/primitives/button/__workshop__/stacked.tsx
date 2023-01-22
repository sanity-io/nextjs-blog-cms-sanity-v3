import {icons} from '@sanity/icons'
import {Box, Button, Card, Container, Flex, Stack} from '@sanity/ui'
import {useAction, useBoolean, useSelect} from '@sanity/ui-workshop'
import {
  WORKSHOP_BUTTON_MODE_OPTIONS,
  WORKSHOP_BUTTON_TONE_OPTIONS,
  WORKSHOP_FLEX_JUSTIFY_OPTIONS,
  WORKSHOP_ICON_SYMBOL_OPTIONS,
  WORKSHOP_SPACE_OPTIONS,
  WORKSHOP_TEXT_SIZE_OPTIONS,
} from '../../../__workshop__/constants'

export default function StackedStory() {
  const tones = Object.entries(WORKSHOP_BUTTON_TONE_OPTIONS)
  const disabled = useBoolean('Disabled', false, 'Props')
  const fontSize = useSelect('Font size', WORKSHOP_TEXT_SIZE_OPTIONS, 2, 'Props')
  const icon = useSelect('Icon', WORKSHOP_ICON_SYMBOL_OPTIONS, 'add-circle', 'Props')
  const iconRight = useSelect('Icon (right)', WORKSHOP_ICON_SYMBOL_OPTIONS, '', 'Props')
  const justify = useSelect('Justify', WORKSHOP_FLEX_JUSTIFY_OPTIONS, 'center', 'Props')
  const mode = useSelect('Mode', WORKSHOP_BUTTON_MODE_OPTIONS, 'default', 'Props')
  const onClick = useAction('onClick')
  const paddingX = useSelect('Padding X', WORKSHOP_SPACE_OPTIONS, 3, 'Props')
  const paddingY = useSelect('Padding Y', WORKSHOP_SPACE_OPTIONS, 3, 'Props')
  const selected = useBoolean('Selected', false, 'Props')
  const space = useSelect('Space', WORKSHOP_SPACE_OPTIONS, 3, 'Props')

  return (
    <Card height="fill" tone="transparent">
      <Flex align="center" height="fill" justify="center">
        <Container width={0} style={{textAlign: 'center'}}>
          <Box padding={4}>
            <Stack space={1}>
              {tones.map(([title, tone]) => (
                <Button
                  disabled={disabled}
                  fontSize={fontSize}
                  icon={icon && icons[icon]}
                  iconRight={iconRight && icons[iconRight]}
                  justify={justify}
                  key={tone}
                  mode={mode}
                  onClick={onClick}
                  paddingX={paddingX}
                  paddingY={paddingY}
                  selected={selected}
                  space={space}
                  text={title}
                  tone={tone}
                />
              ))}
            </Stack>
          </Box>
        </Container>
      </Flex>
    </Card>
  )
}
