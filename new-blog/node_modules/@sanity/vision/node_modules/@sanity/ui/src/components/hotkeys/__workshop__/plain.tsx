import {Flex, Hotkeys} from '@sanity/ui'

export default function PlainStory() {
  return (
    <Flex align="center" height="fill" justify="center">
      <Hotkeys keys={['Ctrl', 'Shift', 'P']} />
    </Flex>
  )
}
