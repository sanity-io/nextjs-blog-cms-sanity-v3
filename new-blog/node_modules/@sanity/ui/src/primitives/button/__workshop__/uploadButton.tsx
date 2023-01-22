import {Button, Flex} from '@sanity/ui'
import React, {useCallback, useRef} from 'react'

export default function UploadButtonStory() {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      inputRef.current?.click()
    }
  }, [])

  return (
    <Flex align="center" height="fill" htmlFor="file" justify="center">
      <Button
        as="label"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        text={
          <>
            Upload
            <input id="file" ref={inputRef} type="file" style={{display: 'none'}} />
          </>
        }
      />
    </Flex>
  )
}
