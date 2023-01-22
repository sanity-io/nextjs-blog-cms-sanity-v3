import {Box, Checkbox, Flex, Text} from '@sanity/ui'
import {useAction, useBoolean} from '@sanity/ui-workshop'
import React from 'react'

export default function PropsStory() {
  const checked = useBoolean('Checked', false, 'Props')
  const disabled = useBoolean('Disabled', false, 'Props')
  const indeterminate = useBoolean('Indeterminate', false, 'Props')
  const onChange = useAction('onChange')
  const onFocus = useAction('onFocus')
  const onBlur = useAction('onBlur')
  const readOnly = useBoolean('Read only', false, 'Props')

  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Flex align="center" as="label">
        <Checkbox
          checked={checked}
          disabled={disabled}
          indeterminate={indeterminate}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          readOnly={readOnly}
        />
        <Box marginLeft={3}>
          <Text>Label</Text>
        </Box>
      </Flex>
    </Flex>
  )
}
