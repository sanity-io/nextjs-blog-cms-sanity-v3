import {Autocomplete, Box, Button, Card, Code, Stack} from '@sanity/ui'
import {useCallback, useState} from 'react'

export default function FocusAndBlurStory() {
  const [value, setValue] = useState('')
  const [log, setLog] = useState<string[]>([])
  const handleBlur = useCallback(() => setLog((v) => v.concat(['blur'])), [])
  const handleFocus = useCallback(() => setLog((v) => v.concat(['focus'])), [])
  const handleClear = useCallback(() => setLog([]), [])

  return (
    <Box padding={[4, 5, 6]}>
      <Stack space={3}>
        <Autocomplete
          id="focus-and-blur"
          onBlur={handleBlur}
          onChange={setValue}
          onFocus={handleFocus}
          openButton
          options={[{value: 'foo'}, {value: 'bar'}]}
          placeholder="Search"
          value={value}
        />
        <Stack space={1}>
          <Card overflow="auto" padding={3} radius={2} tone="transparent">
            <Code id="focus-and-blur-log">{JSON.stringify(log)}</Code>
          </Card>

          <Button id="focus-and-blur-clear-btn" onClick={handleClear} text="Clear" />
        </Stack>
      </Stack>
    </Box>
  )
}
