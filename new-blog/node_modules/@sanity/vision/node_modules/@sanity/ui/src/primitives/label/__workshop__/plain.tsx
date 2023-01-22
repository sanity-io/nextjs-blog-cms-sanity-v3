import {Flex, Label} from '@sanity/ui'
import {useSelect, useText} from '@sanity/ui-workshop'
import {
  WORKSHOP_LABEL_FONT_SIZE_OPTIONS,
  WORKSHOP_FONT_WEIGHT_OPTIONS,
  WORKSHOP_TEXT_OVERFLOW_OPTIONS,
} from '../../../__workshop__/constants'

export default function PlainStory() {
  const size = useSelect('Size', WORKSHOP_LABEL_FONT_SIZE_OPTIONS, undefined, 'Props')
  const textChild = useText('Text', 'Label text', 'Props')
  const textOverflow =
    useSelect('Text overflow', WORKSHOP_TEXT_OVERFLOW_OPTIONS, '', 'Props') || undefined
  const weight = useSelect('Weight', WORKSHOP_FONT_WEIGHT_OPTIONS, undefined, 'Props')

  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Label size={size} textOverflow={textOverflow} weight={weight}>
        {textChild}
      </Label>
    </Flex>
  )
}
