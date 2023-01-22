import {Avatar, AvatarCounter, AvatarStack, Flex} from '@sanity/ui'
import {useSelect} from '@sanity/ui-workshop'
import React from 'react'
import {WORKSHOP_AVATAR_SIZE_OPTIONS} from '../../../__workshop__/constants'

export default function StackStory() {
  const size = useSelect('Size', WORKSHOP_AVATAR_SIZE_OPTIONS, 0, 'Props')

  return (
    <Flex align="center" height="fill" justify="center">
      <AvatarStack size={size}>
        <AvatarCounter count={2} />
        <Avatar color="magenta" initials="uq" />
        <Avatar
          color="purple"
          src="https://avatars3.githubusercontent.com/u/406933?s=400&u=af898b0a50ef2ef1248be32dfa1410ccb55f6f65&v=4"
        />
        <Avatar
          color="blue"
          src="https://avatars3.githubusercontent.com/u/406933?s=400&u=af898b0a50ef2ef1248be32dfa1410ccb55f6f65&v=4"
        />
      </AvatarStack>
    </Flex>
  )
}
