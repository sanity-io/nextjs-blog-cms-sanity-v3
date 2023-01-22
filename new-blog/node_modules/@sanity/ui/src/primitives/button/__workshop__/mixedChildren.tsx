import {AddIcon} from '@sanity/icons'
import {Button, Flex} from '@sanity/ui'
import React from 'react'

export default function MixedChildrenStory() {
  return (
    <Flex align="center" height="fill" justify="center">
      <Button fontSize={[2, 2, 3]} icon={AddIcon} mode="ghost" padding={[3, 3, 4]} text="Create">
        <span style={{display: 'none'}}>test</span>
      </Button>
    </Flex>
  )
}
