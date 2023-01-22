import {Box, Button, Dialog, Text} from '@sanity/ui'
import {useAction, useBoolean} from '@sanity/ui-workshop'
import React from 'react'

export default function AutoFocusStory() {
  const autoFocus = useBoolean('Auto-focus', true, 'Props')
  const open = useBoolean('Open', false, 'Props')
  const handleClose = useAction('onClose')

  if (!open) {
    return (
      <Box padding={4}>
        <Text muted>Use knobs to open the dialog</Text>
      </Box>
    )
  }

  return (
    <Dialog
      __unstable_autoFocus={autoFocus}
      header="Auto-focus example"
      id="auto-focus-example"
      onClose={handleClose}
    >
      <Box padding={4}>
        <Button text="Focusable button" />
      </Box>
    </Dialog>
  )
}
