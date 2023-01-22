import React, {cloneElement, forwardRef, useCallback, useMemo, useState} from 'react'
import {Inline, InlineProps} from '../../primitives'

/**
 * @public
 */
export interface TabListProps extends Omit<InlineProps, 'as' | 'height'> {
  children: Array<React.ReactElement | null | undefined | false>
}

function _isReactElement(node: unknown): node is React.ReactElement {
  return Boolean(node)
}

/**
 * @public
 */
export const TabList = forwardRef(function TabList(
  props: TabListProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height'>,
  ref
) {
  const {children: childrenProp, ...restProps} = props
  const [focusedIndex, setFocusedIndex] = useState(-1)

  const children = useMemo(() => childrenProp.filter(_isReactElement), [childrenProp])

  const tabs = children.map((child, childIndex) =>
    cloneElement(child, {
      focused: focusedIndex === childIndex,
      key: childIndex,
      onFocus: () => handleTabFocus(childIndex),
    })
  )

  const numTabs = tabs.length

  const handleTabFocus = useCallback((tabIdx: number) => {
    setFocusedIndex(tabIdx)
  }, [])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        setFocusedIndex((prevIndex) => (prevIndex + numTabs - 1) % numTabs)
      }

      if (event.key === 'ArrowRight') {
        setFocusedIndex((prevIndex) => (prevIndex + 1) % numTabs)
      }
    },
    [numTabs]
  )

  return (
    <Inline data-ui="TabList" {...restProps} onKeyDown={handleKeyDown} ref={ref} role="tablist">
      {tabs}
    </Inline>
  )
})
