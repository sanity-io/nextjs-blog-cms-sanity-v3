import {Box, Card, Container, Text, VirtualList} from '@sanity/ui'
import {useCallback} from 'react'

const data = Array.from(new Array(1000)).map((_, key) => ({key}))

export default function Example() {
  const renderItem = useCallback((item: {key: number}) => {
    return (
      <Card padding={3} radius={2} shadow={1}>
        <Text>Item #{item.key}</Text>
      </Card>
    )
  }, [])

  return (
    <Box padding={4}>
      <Container width={1}>
        <VirtualList gap={2} items={data} renderItem={renderItem} />
      </Container>
    </Box>
  )
}
