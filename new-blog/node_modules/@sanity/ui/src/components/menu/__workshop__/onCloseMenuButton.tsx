import {Box, Button, Menu, MenuButton, MenuItem, Stack, useToast} from '@sanity/ui'
import React, {useCallback} from 'react'

export default function OnCloseMenuButton() {
  const {push} = useToast()

  const handleClose = useCallback(() => {
    push({
      title: 'Menu closed',
      status: 'success',
    })
  }, [push])

  return (
    <Box padding={[4, 5, 6]}>
      <Stack space={2}>
        <MenuButton
          button={<Button text="With onClose callback" />}
          id="closable-example"
          onClose={handleClose}
          menu={
            <Menu padding={0} space={0}>
              <Stack padding={1} space={1}>
                <MenuItem text="Item 1" />
                <MenuItem text="Item 2" />
                <MenuItem text="Item 3" />
                <MenuItem text="Item 4" />
              </Stack>
            </Menu>
          }
          popover={{constrainSize: true}}
        />
        <Button text="Blur test button" mode="ghost" />
      </Stack>
    </Box>
  )
}
