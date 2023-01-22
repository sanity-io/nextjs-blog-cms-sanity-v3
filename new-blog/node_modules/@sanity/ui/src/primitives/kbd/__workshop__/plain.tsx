import {Flex, KBD} from '@sanity/ui'
import React from 'react'

export default function PlainStory() {
  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <KBD style={{verticalAlign: 'top'}}>Ctrl</KBD>
    </Flex>
  )
}
