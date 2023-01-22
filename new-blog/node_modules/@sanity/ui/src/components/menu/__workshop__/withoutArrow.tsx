import {Box, Button, Menu, MenuButton, MenuItem, Stack} from '@sanity/ui'
import React from 'react'

export default function WithoutArrowStory() {
  return (
    <Box padding={[4, 5, 6]}>
      <Stack>
        <MenuButton
          button={<Button mode="ghost" text="Open menu" />}
          id="without-arrow-example"
          menu={
            <Menu>
              <MenuItem text="Item 1" />
              <MenuItem text="Item 2" />
              <MenuItem text="Item 3" />
            </Menu>
          }
          popover={{
            __unstable_margins: [1, 1, 1, 1],
            arrow: false,
            constrainSize: true,
            fallbackPlacements: ['top-start'],
            matchReferenceWidth: true,
            radius: 0,
            placement: 'bottom-start',
          }}
        />
      </Stack>
    </Box>
  )
}
