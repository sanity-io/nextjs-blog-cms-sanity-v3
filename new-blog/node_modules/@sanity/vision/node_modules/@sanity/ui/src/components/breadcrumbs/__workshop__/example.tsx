import {Breadcrumbs, Flex, Text} from '@sanity/ui'
import {useSelect} from '@sanity/ui-workshop'

const BREADCRUMBS_MAX_LENGTH_OPTIONS = {
  '(none)': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
}

export default function Example() {
  const maxLength =
    useSelect('Max. length', BREADCRUMBS_MAX_LENGTH_OPTIONS, 0, 'Props') || undefined

  return (
    <Flex align="center" height="fill" justify="center">
      <Breadcrumbs
        maxLength={maxLength}
        separator={
          <Text muted size={1}>
            /
          </Text>
        }
        space={2}
      >
        <Text size={1}>
          <a href="#">Root</a>
        </Text>
        <Text size={1}>
          <a href="#">Category A</a>
        </Text>
        <Text size={1}>
          <a href="#">Category B</a>
        </Text>
        <Text size={1}>
          <a href="#">Category C</a>
        </Text>
        <Text size={1}>
          <a href="#">Category D</a>
        </Text>
        <Text size={1}>
          <a href="#">Category E</a>
        </Text>
        <Text size={1}>
          <a href="#">Category F</a>
        </Text>
        <Text size={1}>Item</Text>
      </Breadcrumbs>
    </Flex>
  )
}
