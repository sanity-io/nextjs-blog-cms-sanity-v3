import {CloseIcon} from '@sanity/icons'
import {Box, Button, Card, Flex, Layer, LayerProvider, Stack, Text} from '@sanity/ui'
import React, {useCallback, useState} from 'react'
import {LayerDebugInfo} from './_debug'

export default function PlainStory() {
  const [open, setOpen] = useState(false)
  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  return (
    <LayerProvider>
      <Card radius={2}>
        <Box padding={3}>
          <Text>
            <strong>Root layer</strong>
          </Text>
        </Box>
        <Box padding={3}>
          <Stack space={3}>
            <LayerDebugInfo />
            <Button mode="ghost" onClick={handleOpen} text="Open layer 1" />
            {open && (
              <Layer style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Layer1 onClose={handleClose} />
              </Layer>
            )}
          </Stack>
        </Box>
      </Card>
    </LayerProvider>
  )
}

function Layer1({onClose}: {onClose: () => void}) {
  const [open, setOpen] = useState(false)
  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  return (
    <Card radius={2} shadow={3}>
      <Flex>
        <Box flex={1} padding={3}>
          <Text>
            <strong>Layer 1</strong>
          </Text>
        </Box>
        <Box padding={1}>
          <Button icon={CloseIcon} mode="bleed" onClick={onClose} padding={2} />
        </Box>
      </Flex>
      <Box padding={3}>
        <Stack space={3}>
          <LayerDebugInfo />
          <Button mode="ghost" onClick={handleOpen} text="Open layer 2" />
          {open && (
            <Layer style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Layer2 onClose={handleClose} />
            </Layer>
          )}
        </Stack>
      </Box>
    </Card>
  )
}

function Layer2({onClose}: {onClose: () => void}) {
  return (
    <Card radius={2} shadow={3}>
      <Flex>
        <Box flex={1} padding={3}>
          <Text>
            <strong>Layer 2</strong>
          </Text>
        </Box>
        <Box padding={1}>
          <Button icon={CloseIcon} mode="bleed" onClick={onClose} padding={2} />
        </Box>
      </Flex>
      <Box padding={3}>
        <Stack space={3}>
          <LayerDebugInfo />
        </Stack>
      </Box>
    </Card>
  )
}
