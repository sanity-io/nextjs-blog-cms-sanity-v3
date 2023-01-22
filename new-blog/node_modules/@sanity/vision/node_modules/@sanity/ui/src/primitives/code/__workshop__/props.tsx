import {Box, Code} from '@sanity/ui'
import {useSelect, useText} from '@sanity/ui-workshop'
import {
  WORKSHOP_CODE_LANGUAGE_OPTIONS,
  WORKSHOP_TEXT_FONT_SIZE_OPTIONS,
} from '../../../__workshop__/constants'

export default function PropsStory() {
  const code = useText('Code', `console.log('Hello, world')`, 'Props')
  const language = useSelect('Language', WORKSHOP_CODE_LANGUAGE_OPTIONS, 'typescript', 'Props')
  const size = useSelect('Size', WORKSHOP_TEXT_FONT_SIZE_OPTIONS, 2, 'Props')

  return (
    <Box padding={[4, 5, 6]}>
      <Code language={language} size={size}>
        {code}
      </Code>
    </Box>
  )
}
