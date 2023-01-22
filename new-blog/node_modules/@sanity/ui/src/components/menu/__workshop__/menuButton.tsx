import {ClockIcon, CommentIcon, ExpandIcon, SearchIcon} from '@sanity/icons'
import {
  Box,
  Button,
  Card,
  Grid,
  LayerProvider,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
} from '@sanity/ui'
import {useAction, useBoolean, useSelect} from '@sanity/ui-workshop'
import React from 'react'
import {WORKSHOP_CARD_TONE_OPTIONS} from '../../../__workshop__/constants'

export default function MenuButtonStory() {
  const layoutTone = useSelect('Layout tone', WORKSHOP_CARD_TONE_OPTIONS, 'default', 'Props')
  const portal = useBoolean('Portal', false, 'Props')

  return (
    <Card height="fill" tone={layoutTone}>
      <Box padding={[4, 5, 6]}>
        <Grid columns={3} gap={2}>
          <Button id="prev-button" mode="ghost" text="Prev" />
          <LayerProvider>
            <MenuButton
              button={<Button tone="primary" text="Open" />}
              id="menu-button"
              menu={
                <Menu>
                  <MenuItem
                    icon={SearchIcon}
                    id="menu-item-1"
                    onClick={useAction('Search')}
                    text="Search"
                  />
                  <MenuItem
                    icon={ClockIcon}
                    id="menu-item-2"
                    onClick={useAction('Clock')}
                    text="Clock"
                  />
                  <MenuItem
                    disabled
                    icon={CommentIcon}
                    id="menu-item-3"
                    onClick={useAction('Comment')}
                    text="Comment"
                  />
                  <MenuDivider />
                  <MenuItem
                    icon={ExpandIcon}
                    id="menu-item-4"
                    onClick={useAction('Expand')}
                    text="Expand"
                  />
                </Menu>
              }
              popover={{constrainSize: true, portal}}
            />
          </LayerProvider>
          <Button mode="ghost" id="next-button" text="Next" />
        </Grid>
      </Box>
    </Card>
  )
}
