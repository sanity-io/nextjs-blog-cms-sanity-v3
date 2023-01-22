import {Card, Flex, Inline, Text} from '@sanity/ui'
import {useAction, useSelect} from '@sanity/ui-workshop'
import React from 'react'
import {WORKSHOP_SPACE_OPTIONS} from '../../../__workshop__/constants'

export default function PlainStory() {
  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Inline
        onClick={useAction('onClick')}
        space={useSelect('Space', WORKSHOP_SPACE_OPTIONS, 0, 'Props')}
      >
        <Card padding={1} shadow={1}>
          <Text>Inline item</Text>
        </Card>

        <Card padding={2} shadow={1}>
          <Text>Inline item</Text>
        </Card>

        <Card padding={3} shadow={1}>
          <Text>Inline item</Text>
        </Card>
      </Inline>
    </Flex>
  )
}
