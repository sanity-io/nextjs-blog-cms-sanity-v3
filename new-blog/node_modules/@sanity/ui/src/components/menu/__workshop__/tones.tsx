import {SearchIcon} from '@sanity/icons'
import {Box, Card, LayerProvider, Menu, MenuItem} from '@sanity/ui'
import {useBoolean, useSelect} from '@sanity/ui-workshop'
import React from 'react'
import {WORKSHOP_CARD_TONE_OPTIONS} from '../../../__workshop__/constants'

export default function TonesStory() {
  const disabled = useBoolean('Disabled', false, 'Props')
  const parentTone = useSelect('Parent tone', WORKSHOP_CARD_TONE_OPTIONS, 'default', 'Props')

  return (
    <LayerProvider>
      <Box padding={[4, 5, 6]}>
        <Card radius={3} shadow={3} tone={parentTone}>
          <Menu>
            <MenuItem disabled={disabled} icon={SearchIcon} text="Default" tone="default" />
            <MenuItem disabled={disabled} icon={SearchIcon} text="Primary" tone="primary" />
            <MenuItem disabled={disabled} icon={SearchIcon} text="Positive" tone="positive" />
            <MenuItem disabled={disabled} icon={SearchIcon} text="Caution" tone="caution" />
            <MenuItem disabled={disabled} icon={SearchIcon} text="Critical" tone="critical" />
          </Menu>
        </Card>
      </Box>
    </LayerProvider>
  )
}
