import {ErrorOutlineIcon} from '@sanity/icons'
import {
  BoundaryElementProvider,
  Box,
  Button,
  Card,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  PopoverProps,
  SelectableTone,
  Text,
} from '@sanity/ui'
import React, {useMemo, useState} from 'react'

const items: {tone: SelectableTone; message: string}[] = [
  {
    tone: 'critical',
    message: 'Critical message',
  },
  {
    tone: 'critical',
    message: 'Critical message',
  },
  {
    tone: 'critical',
    message: 'Critical message',
  },
  {
    tone: 'critical',
    message: 'Critical message',
  },
  {
    tone: 'critical',
    message: 'Critical message',
  },
  {
    tone: 'critical',
    message: 'Critical message',
  },
  {
    tone: 'critical',
    message: 'Critical message',
  },
  {
    tone: 'critical',
    message: 'Critical message',
  },
  {
    tone: 'critical',
    message: 'Critical message',
  },
  {
    tone: 'critical',
    message: 'Critical message',
  },
  {
    tone: 'critical',
    message: 'Critical message',
  },
  {
    tone: 'critical',
    message: 'Critical message',
  },
  {
    tone: 'critical',
    message: 'Critical message',
  },
  {
    tone: 'critical',
    message: 'Critical message',
  },
  {
    tone: 'critical',
    message: 'Critical message',
  },
  {
    tone: 'critical',
    message: 'Critical message',
  },
  {
    tone: 'critical',
    message: 'Critical message',
  },
]

export default function ConstrainedInBoundaryStory() {
  const [boundaryElement, setBoundaryElement] = useState<HTMLDivElement | null>(null)

  const popoverProps: PopoverProps = useMemo(
    () => ({
      constrainSize: true,
      placement: 'bottom',
      portal: true,
      preventOverflow: true,
      width: 1,
    }),
    []
  )

  return (
    <Box height="fill" padding={[4, 5, 6]} sizing="border">
      <Card height="fill" shadow={1}>
        <Flex height="fill">
          <Card flex={1} padding={4}>
            <Text>Pane</Text>
          </Card>
          <Card borderLeft flex={1} padding={2} ref={setBoundaryElement}>
            <Flex>
              <Box flex={1} padding={3}>
                <Text>Pane</Text>
              </Box>
              <Box>
                <BoundaryElementProvider element={boundaryElement}>
                  <MenuButton
                    button={<Button icon={ErrorOutlineIcon} mode="bleed" tone="critical" />}
                    id="validation-menu"
                    menu={
                      <Menu>
                        {items.map((item, itemIndex) => {
                          return (
                            <MenuItem key={itemIndex} tone={item.tone}>
                              <Box padding={3}>
                                <Text>{item.message}</Text>
                              </Box>
                            </MenuItem>
                          )
                        })}
                      </Menu>
                    }
                    popover={popoverProps}
                  />
                </BoundaryElementProvider>
              </Box>
            </Flex>
          </Card>
        </Flex>
      </Card>
    </Box>
  )
}
