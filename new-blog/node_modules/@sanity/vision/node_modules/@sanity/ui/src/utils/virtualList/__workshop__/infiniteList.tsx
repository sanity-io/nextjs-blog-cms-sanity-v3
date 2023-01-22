import {Box, Card, Text, VirtualList, VirtualListChangeOpts} from '@sanity/ui'
import {useCallback, useRef, useState} from 'react'

interface Item {
  key: string
}

function getData(len: number, offsetIndex = 0): Item[] {
  return Array.from(new Array(len)).map((_, index) => ({key: String(offsetIndex + index)}))
}

const ITEMS_PER_PAGE = 1000

export default function InfiniteList() {
  const [data, setData] = useState<Item[]>(() => getData(ITEMS_PER_PAGE))
  const offsetRef = useRef(0)

  const getItemKey = useCallback((item: Item) => `item-${item.key}`, [])

  const handleChange = useCallback((opts: VirtualListChangeOpts) => {
    const maxIndex = (offsetRef.current + 1) * ITEMS_PER_PAGE

    if (opts.toIndex >= maxIndex - 50) {
      offsetRef.current += 1
      setData((d) => d.concat(getData(ITEMS_PER_PAGE, offsetRef.current * ITEMS_PER_PAGE)))
    }
  }, [])

  const renderItem = useCallback((item: Item) => {
    return (
      <Card padding={3} shadow={1}>
        <Text align="center">Item #{item.key}</Text>
      </Card>
    )
  }, [])

  return (
    <Box padding={4}>
      <VirtualList
        gap={3}
        getItemKey={getItemKey}
        items={data}
        onChange={handleChange}
        renderItem={renderItem}
      />
    </Box>
  )
}
