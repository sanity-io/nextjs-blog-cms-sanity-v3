import {Box, Text} from '@sanity/ui'

export default function ResponsiveStory() {
  return (
    <Box padding={[4, 5, 6]}>
      <Box
        id="responsive-box"
        display={['none', 'block', 'none', 'block', 'none', 'block', 'none']}
        flex={[1, 2, 3, 4, 5, 6, 7]}
        padding={3}
        sizing={['content', 'border', 'content', 'border', 'content', 'border', 'content']}
        style={{outline: '1px solid var(--card-border-color)'}}
      >
        <Text align="center" muted>
          This is a box with responsive props
        </Text>
      </Box>
    </Box>
  )
}
