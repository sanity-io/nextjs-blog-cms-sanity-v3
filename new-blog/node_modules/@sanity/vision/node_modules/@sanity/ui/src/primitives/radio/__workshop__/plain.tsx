import {Flex, Radio} from '@sanity/ui'
import {useAction, useBoolean} from '@sanity/ui-workshop'

export default function PlainStory() {
  const checked = useBoolean('Checked?', false, 'Props')
  const disabled = useBoolean('Disabled?', false, 'Props')
  const id = 'radioStory'
  const name = 'radioStory'
  const onBlur = useAction('onBlur')
  const onChange = useAction('onChange')
  const onFocus = useAction('onFocus')
  const readOnly = useBoolean('Read only', false, 'Props')

  return (
    <Flex align="center" height="fill" justify="center" padding={[3, 4, 5]} sizing="border">
      <Radio
        checked={checked}
        disabled={disabled}
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        readOnly={readOnly}
      />
    </Flex>
  )
}
