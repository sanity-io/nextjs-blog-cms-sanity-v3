import {Box, Button, Menu, MenuButton, MenuDivider, MenuItem, Stack} from '@sanity/ui'

export default function NestedMenuItems() {
  return (
    <Box padding={[4, 5, 6]}>
      <MenuButton
        button={<Button text="Open" />}
        id="nested-example"
        menu={
          <Menu>
            <Stack space={1}>
              <MenuItem text="Item 1" />
              <MenuItem text="Item 2" />
            </Stack>
            <MenuDivider />
            <MenuItem text="Item 3" />
          </Menu>
        }
      />
    </Box>
  )
}
