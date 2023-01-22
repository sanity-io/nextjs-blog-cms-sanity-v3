import {icons} from '@sanity/icons'
import {Button, Flex} from '@sanity/ui'
import {useAction, useBoolean, useSelect, useText} from '@sanity/ui-workshop'
import React from 'react'
import {
  WORKSHOP_BUTTON_MODE_OPTIONS,
  WORKSHOP_BUTTON_TEXT_ALIGN_OPTIONS,
  WORKSHOP_BUTTON_TONE_OPTIONS,
  WORKSHOP_FLEX_JUSTIFY_OPTIONS,
  WORKSHOP_ICON_SYMBOL_OPTIONS,
  WORKSHOP_TEXT_SIZE_OPTIONS,
  WORKSHOP_SPACE_OPTIONS,
} from '../../../__workshop__/constants'

export default function ButtonStory() {
  const disabled = useBoolean('Disabled', false, 'Props')
  const fontSize = useSelect('Font size', WORKSHOP_TEXT_SIZE_OPTIONS, 2, 'Props')
  const icon = useSelect('Icon', WORKSHOP_ICON_SYMBOL_OPTIONS, 'add-circle', 'Props')
  const iconRight = useSelect('Icon (right)', WORKSHOP_ICON_SYMBOL_OPTIONS, '', 'Props')
  const justify = useSelect('Justify', WORKSHOP_FLEX_JUSTIFY_OPTIONS, 'center', 'Props')
  const loading = useBoolean('Loading')
  const mode = useSelect('Mode', WORKSHOP_BUTTON_MODE_OPTIONS, 'default', 'Props')
  const paddingX = useSelect('Padding X', WORKSHOP_SPACE_OPTIONS, 3, 'Props')
  const paddingY = useSelect('Padding Y', WORKSHOP_SPACE_OPTIONS, 3, 'Props')
  const selected = useBoolean('Selected', false, 'Props')
  const space = useSelect('Space', WORKSHOP_SPACE_OPTIONS, 3, 'Props')
  const tone = useSelect('Tone', WORKSHOP_BUTTON_TONE_OPTIONS, 'default', 'Props')
  const textAlign =
    useSelect('Text align', WORKSHOP_BUTTON_TEXT_ALIGN_OPTIONS, undefined, 'Props') || undefined
  const textProp = useText('Text', 'Label', 'Props')

  return (
    <Flex align="center" height="fill" justify="center">
      <Button
        disabled={disabled}
        fontSize={fontSize}
        icon={icon && icons[icon]}
        iconRight={iconRight && icons[iconRight]}
        justify={justify}
        loading={loading}
        mode={mode}
        onClick={useAction('onClick')}
        paddingX={paddingX}
        paddingY={paddingY}
        selected={selected}
        space={space}
        textAlign={textAlign}
        text={textProp}
        tone={tone}
      />
    </Flex>
  )
}
