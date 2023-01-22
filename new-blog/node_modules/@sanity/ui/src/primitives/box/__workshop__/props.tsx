import {Box, Card, Text} from '@sanity/ui'
import {useAction, useSelect} from '@sanity/ui-workshop'
import React from 'react'
import {WORKSHOP_SPACE_OPTIONS} from '../../../__workshop__/constants'

export default function PropsStory() {
  const padding = useSelect('Padding', WORKSHOP_SPACE_OPTIONS, 0, 'Props')

  return (
    <Box padding={[4, 5, 6]}>
      <Card border tone="inherit">
        <Box onClick={useAction('onClick')} padding={padding}>
          <Text>
            Box with <code>padding={padding}</code>
          </Text>
        </Box>
      </Card>
    </Box>
  )
}
