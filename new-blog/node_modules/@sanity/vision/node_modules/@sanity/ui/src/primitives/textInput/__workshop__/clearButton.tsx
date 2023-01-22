import {Box, TextInput} from '@sanity/ui'
import {useText} from '@sanity/ui-workshop'
import {useCallback, useState} from 'react'

export default function ClearButtonStory() {
  const customValidity = useText('Custom validitiy')

  const [value, setValue] = useState('')

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }, [])

  const handleClear = useCallback(() => {
    setValue('')
  }, [])

  return (
    <Box padding={4}>
      <TextInput
        clearButton
        customValidity={customValidity}
        onChange={handleChange}
        onClear={handleClear}
        placeholder="Enter text"
        value={value}
      />
    </Box>
  )
}
