import {Box, Card, Text, VirtualList} from '@sanity/ui'
import React, {useCallback, useState} from 'react'

const data = Array.from(new Array(1000)).map((_, key) => ({key}))

export default function ChangingProps() {
  const [expanded, setExpanded] = useState(false)

  const toggleExpand = useCallback(() => setExpanded((v) => !v), [])

  const renderItem = useCallback(
    (item: {key: number}) => (
      <Card
        as="button"
        onClick={toggleExpand}
        paddingX={4}
        paddingY={expanded ? 5 : 4}
        radius={2}
        tone="primary"
      >
        <Text>Item #{item.key}</Text>
      </Card>
    ),
    [expanded, toggleExpand]
  )

  return (
    <Box padding={4}>
      <Box marginBottom={5}>
        <Text size={1}>Click any item to toggle expanded view</Text>
      </Box>

      <VirtualList gap={expanded ? 4 : 2} items={data} renderItem={renderItem} />
    </Box>
  )
}
