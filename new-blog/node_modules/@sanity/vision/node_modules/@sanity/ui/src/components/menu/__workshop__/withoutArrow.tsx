import {Box, Button, Menu, MenuButton, MenuButtonProps, MenuItem, Stack} from '@sanity/ui'

const POPOVER_PROPS: MenuButtonProps['popover'] = {
  __unstable_margins: [1, 1, 1, 1],
  arrow: false,
  constrainSize: true,
  fallbackPlacements: ['top-start'],
  matchReferenceWidth: true,
  radius: 0,
  placement: 'bottom-start',
}

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
          popover={POPOVER_PROPS}
        />
      </Stack>
    </Box>
  )
}
