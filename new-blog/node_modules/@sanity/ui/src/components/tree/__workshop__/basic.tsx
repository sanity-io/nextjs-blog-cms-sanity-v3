import {LinkIcon} from '@sanity/icons'
import {Box, Tree, TreeItem} from '@sanity/ui'
import {usePerfTest} from '@sanity/ui-workshop'
import React, {useCallback, useState} from 'react'
import {perfTests} from './basic.perf'

export default function BasicStory() {
  const {ref, Wrapper} = usePerfTest(perfTests[0])

  const [id, setId] = useState('')

  const handleClick = useCallback((event: React.MouseEvent) => {
    event.preventDefault()

    const testid = event.currentTarget.getAttribute('data-testid')

    if (testid) setId(testid)
  }, [])

  return (
    <Box padding={[4, 5, 6]}>
      <Wrapper>
        <Tree ref={ref} space={1}>
          <TreeItem onClick={handleClick} expanded text="Fruit">
            <TreeItem
              data-testid="oranges"
              onClick={handleClick}
              selected={id === 'oranges'}
              text="Oranges"
            />
            <TreeItem
              data-testid="pineapples"
              onClick={handleClick}
              text="Pineapples"
              selected={id === 'pineapples'}
            />
            <TreeItem data-testid="apples" onClick={handleClick} text="Apples">
              <TreeItem
                data-testid="apples/macintosh"
                onClick={handleClick}
                href="/apples/macintosh"
                icon={LinkIcon}
                text="Macintosh"
              />
              <TreeItem
                data-testid="apples/granny-smith"
                onClick={handleClick}
                text="Granny Smith"
              />
              <TreeItem data-testid="apples/fuji" onClick={handleClick} text="Fuji" />
            </TreeItem>
            <TreeItem onClick={handleClick} text="Bananas" />
            <TreeItem onClick={handleClick} text="Pears">
              <TreeItem onClick={handleClick} text="Anjou" />
              <TreeItem onClick={handleClick} text="Bartlett" />
              <TreeItem onClick={handleClick} text="Bosc" />
              <TreeItem onClick={handleClick} text="Concorde" />
              <TreeItem onClick={handleClick} text="Seckel" />
              <TreeItem onClick={handleClick} text="Starkrimson" />
            </TreeItem>
          </TreeItem>
          <TreeItem onClick={handleClick} text="Vegetables">
            <TreeItem onClick={handleClick} text="Podded vegetables">
              <TreeItem onClick={handleClick} text="Lentil" />
              <TreeItem onClick={handleClick} text="Pea" />
              <TreeItem onClick={handleClick} text="Peanut" />
            </TreeItem>
            <TreeItem onClick={handleClick} text="Bulb and stem vegetables">
              <TreeItem onClick={handleClick} text="Asparagus" />
              <TreeItem onClick={handleClick} text="Celery" />
              <TreeItem onClick={handleClick} text="Leek" />
              <TreeItem onClick={handleClick} text="Onion" />
            </TreeItem>
            <TreeItem onClick={handleClick} text="Root and tuberous vegetables">
              <TreeItem onClick={handleClick} text="Carrot" />
              <TreeItem onClick={handleClick} text="Ginger" />
              <TreeItem onClick={handleClick} text="Parsnip" />
              <TreeItem onClick={handleClick} text="Potato" />
            </TreeItem>
          </TreeItem>
          <TreeItem onClick={handleClick} text="Grains">
            <TreeItem onClick={handleClick} text="Cereal grains">
              <TreeItem onClick={handleClick} text="Barley" />
              <TreeItem onClick={handleClick} text="Oats" />
              <TreeItem onClick={handleClick} text="Rice" />
            </TreeItem>
            <TreeItem onClick={handleClick} text="Pseudocereal grains">
              <TreeItem onClick={handleClick} text="Amaranth" />
              <TreeItem onClick={handleClick} text="Buckwheat" />
              <TreeItem onClick={handleClick} text="Chia" />
              <TreeItem onClick={handleClick} text="Quinoa" />
            </TreeItem>
            <TreeItem onClick={handleClick} text="Oilseeds">
              <TreeItem onClick={handleClick} text="India mustard" />
              <TreeItem onClick={handleClick} text="Safflower" />
              <TreeItem onClick={handleClick} text="Flax seed" />
              <TreeItem onClick={handleClick} text="Poppy seed" />
            </TreeItem>
          </TreeItem>
        </Tree>
      </Wrapper>
    </Box>
  )
}
