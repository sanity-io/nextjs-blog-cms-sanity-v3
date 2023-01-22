import {TextInput} from '@sanity/ui'
import React, {useCallback, useState} from 'react'

export default function ClearButtonStory() {
  const [value, setValue] = useState('')

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }, [])

  const handleClear = useCallback(() => {
    setValue('')
  }, [])

  return (
    <TextInput
      clearButton
      onChange={handleChange}
      onClear={handleClear}
      placeholder="Enter text"
      value={value}
    />
  )
}
