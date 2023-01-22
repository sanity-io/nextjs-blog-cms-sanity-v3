import {Box, Container, Toast} from '@sanity/ui'
import {useAction, useBoolean, useSelect, useString, useText} from '@sanity/ui-workshop'
import React from 'react'
import {WORKSHOP_TOAST_STATUS_OPTIONS} from '../../../__workshop__/constants'

export default function ToastStory() {
  const closable = useBoolean('Closable', false, 'Props')
  const title = useString('Title', 'Toast title', 'Props')
  const status = useSelect('Status', WORKSHOP_TOAST_STATUS_OPTIONS, '', 'Props') || undefined
  const description = useText('Description', '', 'Props')
  const handleClose = useAction('onClose')

  return (
    <Box padding={[4, 5, 6]}>
      <Container width={0}>
        <Toast
          closable={closable}
          description={description}
          onClose={handleClose}
          status={status}
          title={title}
        />
      </Container>
    </Box>
  )
}
