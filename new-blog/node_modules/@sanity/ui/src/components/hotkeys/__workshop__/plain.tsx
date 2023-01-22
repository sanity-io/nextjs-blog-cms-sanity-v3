import {Flex, Hotkeys} from '@sanity/ui'
import React from 'react'

export default function PlainStory() {
  return (
    <Flex align="center" height="fill" justify="center">
      <Hotkeys keys={['Ctrl', 'Shift', 'P']} />
    </Flex>
  )
}
