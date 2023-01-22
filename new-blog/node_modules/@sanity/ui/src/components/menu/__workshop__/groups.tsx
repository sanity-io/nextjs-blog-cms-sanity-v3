import {
  Box,
  Button,
  Card,
  Inline,
  LayerProvider,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
} from '@sanity/ui'
import {useAction} from '@sanity/ui-workshop'
import React from 'react'

export default function GroupsStory() {
  return (
    <Box padding={[4, 5, 6]}>
      <Card padding={1} radius={3} shadow={1}>
        <Inline space={1}>
          <LayerProvider>
            <MenuButton
              button={<Button fontSize={1} mode="bleed" padding={2} text="File" />}
              id="example"
              menu={
                <Menu>
                  <MenuItem
                    fontSize={1}
                    hotkeys={['⌘', 'T']}
                    onClick={useAction('New tab')}
                    padding={2}
                    text="New tab"
                  />
                  <MenuItem
                    fontSize={1}
                    hotkeys={['⌘', 'N']}
                    onClick={useAction('New window')}
                    padding={2}
                    text="New window"
                  />
                  <MenuItem
                    fontSize={1}
                    hotkeys={['⇧', '⌘', 'T']}
                    onClick={useAction('Reopen closed tab')}
                    padding={2}
                    text="Reopen closed tab"
                  />
                  <MenuItem
                    fontSize={1}
                    hotkeys={['⌘', 'O']}
                    onClick={useAction('Open file…')}
                    padding={2}
                    text="Open file…"
                  />
                  <MenuItem
                    fontSize={1}
                    hotkeys={['⌘', 'L']}
                    onClick={useAction('Open location…')}
                    padding={2}
                    text="Open location…"
                  />
                  <MenuDivider />
                  <MenuGroup
                    fontSize={1}
                    onClick={useAction('Share')}
                    padding={2}
                    popover={{placement: 'right-start', portal: true}}
                    text="Share"
                  >
                    <MenuItem
                      fontSize={1}
                      onClick={useAction('Share / Email link')}
                      padding={2}
                      text="Email link"
                    />
                    <MenuItem
                      fontSize={1}
                      onClick={useAction('Share / Messages')}
                      padding={2}
                      text="Messages"
                    />
                    <MenuItem
                      fontSize={1}
                      onClick={useAction('Share / Airdrop')}
                      padding={2}
                      text="Airdrop"
                    />
                    <MenuItem fontSize={1} onClick={useAction('Notes')} padding={2} text="Notes" />
                    <MenuGroup
                      fontSize={1}
                      onClick={useAction('Share / More')}
                      padding={2}
                      popover={{placement: 'right-start', portal: true}}
                      text="More"
                    >
                      <MenuItem
                        fontSize={1}
                        onClick={useAction('Share / More / Email link')}
                        padding={2}
                        text="Email link"
                      />
                      <MenuItem
                        fontSize={1}
                        onClick={useAction('Share / More / Messages')}
                        padding={2}
                        text="Messages"
                      />
                      <MenuItem
                        fontSize={1}
                        onClick={useAction('Share / More / Airdrop')}
                        padding={2}
                        text="Airdrop"
                      />
                      <MenuItem
                        fontSize={1}
                        onClick={useAction('Share / More / Notes')}
                        padding={2}
                        text="Notes"
                      />
                    </MenuGroup>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuItem
                    fontSize={1}
                    hotkeys={['⌘', 'P']}
                    onClick={useAction('Print…')}
                    padding={2}
                    text="Print…"
                  />
                </Menu>
              }
              popover={{constrainSize: true, portal: true, preventOverflow: true}}
            />
          </LayerProvider>

          <Button disabled fontSize={1} mode="bleed" padding={2} text="Edit" />
          <Button disabled fontSize={1} mode="bleed" padding={2} text="View" />
          <Button disabled fontSize={1} mode="bleed" padding={2} text="Window" />
          <Button disabled fontSize={1} mode="bleed" padding={2} text="Help" />
        </Inline>
      </Card>
    </Box>
  )
}
