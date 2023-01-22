import {Box, Container, TextInput} from '@sanity/ui'
import {useSelect} from '@sanity/ui-workshop'
import {useCallback, useState} from 'react'
import {WORKSHOP_TEXT_INPUT_TYPE_OPTIONS} from '../../../__workshop__/constants'

export default function TypedStory() {
  const type = useSelect('Type', WORKSHOP_TEXT_INPUT_TYPE_OPTIONS, 'text', 'Props')

  const [value, setValue] = useState('')

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }, [])

  return (
    <Box padding={4}>
      <Container width={1}>
        <TextInput onChange={handleChange} type={type} value={value} />
      </Container>
    </Box>
  )
}
