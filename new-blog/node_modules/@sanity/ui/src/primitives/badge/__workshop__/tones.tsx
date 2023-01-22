import {Badge, Flex, Inline} from '@sanity/ui'
import {useSelect} from '@sanity/ui-workshop'
import React from 'react'
import {WORKSHOP_BADGE_MODE_OPTIONS} from '../../../__workshop__/constants'

export default function Tones() {
  const mode = useSelect('Mode', WORKSHOP_BADGE_MODE_OPTIONS, 'default', 'Props')

  return (
    <Flex align="center" height="fill" justify="center">
      <Inline space={2}>
        <Badge mode={mode}>Default</Badge>
        <Badge mode={mode} tone="primary">
          Primary
        </Badge>
        <Badge mode={mode} tone="positive">
          Positive
        </Badge>
        <Badge mode={mode} tone="caution">
          Caution
        </Badge>
        <Badge mode={mode} tone="critical">
          Critical
        </Badge>
      </Inline>
    </Flex>
  )
}
