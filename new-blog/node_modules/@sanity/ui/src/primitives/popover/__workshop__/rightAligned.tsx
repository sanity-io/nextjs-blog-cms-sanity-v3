import {EllipsisVerticalIcon} from '@sanity/icons'
import {Box, Button, Card, Flex, Popover, Text, useClickOutside} from '@sanity/ui'
import React, {useCallback, useState} from 'react'

export default function RightAlignedStory() {
  const [open, setOpen] = useState(false)
  const [boundaryElement, setBoundaryElement] = useState<HTMLDivElement | null>(null)
  const [buttonElement, setButtonElement] = useState<HTMLButtonElement | null>(null)
  const [popoverElement, setPopoverElement] = useState<HTMLDivElement | null>(null)
  const content = (
    <Box overflow="auto" padding={3}>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at nisl at sem tempor
        hendrerit scelerisque ut libero. Maecenas iaculis efficitur lorem, ac faucibus mi imperdiet
        quis. Cras a consectetur erat. Fusce imperdiet, dolor et pellentesque iaculis, ex quam
        luctus felis, non ultrices enim sem vitae quam. Duis lorem velit, lacinia at rhoncus a,
        tempus vel neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
        cubilia curae; Sed id mauris quam. Nam finibus sapien non lacinia ultricies. Integer
        fermentum tortor at pellentesque faucibus. In venenatis commodo placerat. Curabitur commodo
        tortor libero, vel pellentesque elit luctus sodales. Donec mattis tristique nunc ac lacinia.
        Vestibulum non pulvinar turpis, posuere consequat arcu. Fusce ut urna blandit, finibus nisi
        a, molestie elit. Nulla sed eleifend mi.
      </Text>
    </Box>
  )

  const handleToggleOpen = useCallback(() => setOpen((v) => !v), [])
  const handleClose = useCallback(() => setOpen(false), [])

  useClickOutside(handleClose, [buttonElement, popoverElement])

  return (
    <Box height="fill" padding={[4, 5, 6]} sizing="border">
      <Card height="fill" padding={2} ref={setBoundaryElement} shadow={1}>
        <Flex justify="flex-end" padding={0}>
          <Popover
            boundaryElement={boundaryElement}
            constrainSize
            content={content}
            open={open}
            portal
            preventOverflow
            ref={setPopoverElement}
          >
            <Button
              icon={EllipsisVerticalIcon}
              mode="bleed"
              onClick={handleToggleOpen}
              ref={setButtonElement}
              selected={open}
            />
          </Popover>
        </Flex>
      </Card>
    </Box>
  )
}
