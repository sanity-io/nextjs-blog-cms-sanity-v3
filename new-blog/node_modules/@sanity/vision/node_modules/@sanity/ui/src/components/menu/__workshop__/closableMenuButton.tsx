import {AddIcon} from '@sanity/icons'
import {Box, Button, Menu, MenuButton, MenuButtonProps, MenuItem, Stack} from '@sanity/ui'
import {useRef} from 'react'

const POPOVER_PROPS: MenuButtonProps['popover'] = {
  constrainSize: true,
}

export default function ClosableMenuButtonStory() {
  const ref = useRef<HTMLButtonElement | null>(null)

  return (
    <Box padding={[4, 5, 6]}>
      <Stack>
        <MenuButton
          button={<Button text="Open" />}
          id="closable-example"
          menu={
            <Menu padding={0} space={0}>
              <Stack padding={1} space={1}>
                <MenuItem text="Item 1" />
                <MenuItem text="Item 2" />
                <MenuItem text="Item 3" />
                <MenuItem text="Item 4" />
              </Stack>
              <Stack padding={1} style={{borderTop: '1px solid var(--card-border-color)'}}>
                <Button
                  icon={AddIcon}
                  onClick={() => {
                    ref.current?.click()
                    ref.current?.focus()
                  }}
                  mode="bleed"
                  text="Add item"
                  tone="primary"
                />
              </Stack>
            </Menu>
          }
          popover={POPOVER_PROPS}
          ref={ref}
        />
      </Stack>
    </Box>
  )
}
