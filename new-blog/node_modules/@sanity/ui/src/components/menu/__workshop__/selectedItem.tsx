import {CheckmarkIcon, ClockIcon, ExpandIcon, SearchIcon} from '@sanity/icons'
import {Box, Button, Code, Menu, MenuButton, MenuDivider, MenuItem, Stack} from '@sanity/ui'
import React, {useState} from 'react'

export default function SelectedItemStory() {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <Box padding={[4, 5, 6]}>
      <Stack space={4}>
        <Code>selectedIndex={selectedIndex}</Code>

        <MenuButton
          button={<Button text="Open menu" />}
          id="selected-item-example"
          menu={
            <Menu>
              <MenuItem
                icon={SearchIcon}
                iconRight={selectedIndex === 0 ? CheckmarkIcon : undefined}
                onClick={() => setSelectedIndex(0)}
                pressed={selectedIndex === 0}
                selected={selectedIndex === 0}
                text="Show search"
              />
              <MenuItem
                icon={ClockIcon}
                iconRight={selectedIndex === 1 ? CheckmarkIcon : undefined}
                onClick={() => setSelectedIndex(1)}
                pressed={selectedIndex === 1}
                selected={selectedIndex === 1}
                text="Show clock"
              />
              <MenuDivider />
              <MenuItem
                icon={ExpandIcon}
                iconRight={selectedIndex === 2 ? CheckmarkIcon : undefined}
                onClick={() => setSelectedIndex(2)}
                pressed={selectedIndex === 2}
                selected={selectedIndex === 2}
                text="Expanded"
              />
            </Menu>
          }
          popover={{matchReferenceWidth: true}}
        />
      </Stack>
    </Box>
  )
}
