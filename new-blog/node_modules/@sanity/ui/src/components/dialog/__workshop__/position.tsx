import {ArrowDownIcon, ArrowUpIcon} from '@sanity/icons'
import {Box, Dialog, LayerProvider, Stack, Text} from '@sanity/ui'
import {useBoolean, useSelect} from '@sanity/ui-workshop'
import React from 'react'
import {WORKSHOP_DIALOG_POSITION_OPTIONS} from '../../../__workshop__/constants'

export default function PositionStory() {
  const open = useBoolean('Open', true, 'Props')
  const position = useSelect('Position', WORKSHOP_DIALOG_POSITION_OPTIONS, 'fixed', 'Props')

  return (
    <Box padding={4}>
      <Box style={{padding: 'calc(100vh - 100px) 0'}}>
        <Stack space={3}>
          <Text align="center">
            <ArrowUpIcon />
          </Text>
          <Text align="center">Scrollable</Text>
          <Text align="center">
            <ArrowDownIcon />
          </Text>
        </Stack>

        <LayerProvider>
          {open && <Dialog header="Position example" id="position-example" position={position} />}
        </LayerProvider>
      </Box>
    </Box>
  )
}
