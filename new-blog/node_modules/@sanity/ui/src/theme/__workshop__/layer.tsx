import {Box, Button, Container, Dialog, Flex, Popover, Stack, Text, Tooltip} from '@sanity/ui'
import React, {useCallback, useState} from 'react'

export default function LayerStory() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const openDialog = useCallback(() => setDialogOpen(true), [])
  const closeDialog = useCallback(() => setDialogOpen(false), [])

  return (
    <Flex padding={[4, 5, 6]}>
      <Container>
        {dialogOpen && (
          <Dialog header="Dialog" id="dialog" onClickOutside={closeDialog} onClose={closeDialog}>
            <Box padding={4}>
              <Stack space={[4, 5, 6]}>
                <Popover
                  content={
                    <Box padding={2}>
                      <Text>Popover content</Text>
                    </Box>
                  }
                  open
                  portal
                >
                  <Text>Popover</Text>
                </Popover>

                <Flex>
                  <Tooltip
                    content={
                      <Box padding={2}>
                        <Text>Tooltip content</Text>
                      </Box>
                    }
                    placement="top"
                    portal
                  >
                    <Text size={1}>Tooltip</Text>
                  </Tooltip>
                </Flex>
              </Stack>
            </Box>
          </Dialog>
        )}

        <Stack space={[4, 5, 6]}>
          <Popover
            content={
              <Box padding={2}>
                <Text>Popover content</Text>
              </Box>
            }
            open
            portal
          >
            <Text>Popover</Text>
          </Popover>

          <Flex>
            <Tooltip
              content={
                <Box padding={2}>
                  <Text size={1}>Tooltip content</Text>
                </Box>
              }
              placement="top"
              portal
            >
              <Text>Tooltip</Text>
            </Tooltip>
          </Flex>

          <Button onClick={openDialog} text="Open dialog" />
        </Stack>
      </Container>
    </Flex>
  )
}
