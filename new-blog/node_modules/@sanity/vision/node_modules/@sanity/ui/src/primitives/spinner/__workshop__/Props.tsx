import {Flex, Spinner} from '@sanity/ui'
import {useBoolean, useSelect} from '@sanity/ui-workshop'
import {WORKSHOP_TEXT_SIZE_OPTIONS} from '../../../__workshop__/constants'

export default function Props() {
  const muted = useBoolean('Muted', false, 'Props')
  const size = useSelect('Size', WORKSHOP_TEXT_SIZE_OPTIONS, 2, 'Props')

  return (
    <Flex align="center" height="fill" justify="center">
      <Spinner muted={muted} size={size} />
    </Flex>
  )
}
