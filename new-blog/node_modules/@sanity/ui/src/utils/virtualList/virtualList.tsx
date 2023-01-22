import React, {forwardRef, useEffect, useMemo, useRef, useState} from 'react'
import styled from 'styled-components'
import {_isScrollable} from '../../helpers'
import {useForwardedRef} from '../../hooks'
import {StackProps} from '../../primitives'
import {useTheme} from '../../theme'

/**
 * @beta
 */
export interface VirtualListChangeOpts {
  fromIndex: number
  gap: number
  itemHeight: number
  scrollHeight: number
  scrollTop: number
  toIndex: number
}

/**
 * @beta
 */
export interface VirtualListProps<Item = any> {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  gap?: number
  getItemKey?: (item: Item, itemIndex: number) => string
  items?: Item[]
  onChange?: (opts: VirtualListChangeOpts) => void
  renderItem?: (item: Item) => React.ReactNode
}

const Root = styled.div`
  position: relative;
`

const ItemWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
`

/**
 * @beta
 */
export const VirtualList = forwardRef(function VirtualList(
  props: VirtualListProps &
    StackProps &
    Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'children' | 'onChange' | 'ref'>,
  ref: React.ForwardedRef<HTMLDivElement>
): React.ReactElement {
  const {as = 'div', gap = 0, getItemKey, items = [], onChange, renderItem, ...restProps} = props
  const {space} = useTheme().sanity
  const forwardedRef = useForwardedRef(ref)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [scrollTop, setScrollTop] = useState(0)
  const [scrollHeight, setScrollHeight] = useState(0)
  const [itemHeight, setItemHeight] = useState(-1)

  useEffect(() => {
    if (!wrapperRef.current) return

    const firstElement = wrapperRef.current.firstChild

    if (firstElement instanceof HTMLElement) {
      setItemHeight(firstElement.offsetHeight)
    }
  }, [renderItem])

  useEffect(() => {
    if (!forwardedRef.current) return

    let _scrollEl = forwardedRef.current.parentNode

    while (_scrollEl && !_isScrollable(_scrollEl)) {
      _scrollEl = _scrollEl.parentNode
    }

    if (_scrollEl) {
      const scrollEl = _scrollEl

      if (!(scrollEl instanceof HTMLElement)) return

      const handleScroll = () => {
        setScrollTop(scrollEl.scrollTop)
      }

      scrollEl.addEventListener('scroll', handleScroll, {passive: true})

      const ro = new ResizeObserver((entries) => {
        setScrollHeight(entries[0].contentRect.height)
      })

      ro.observe(scrollEl)

      handleScroll()

      return () => {
        scrollEl.removeEventListener('scroll', handleScroll)
        ro.unobserve(scrollEl)
        ro.disconnect()
      }
    }

    const handleScroll = () => {
      setScrollTop(window.scrollY)
    }

    const handleResize = () => {
      setScrollHeight(window.innerHeight)
    }

    window.addEventListener('scroll', handleScroll, {passive: true})
    window.addEventListener('resize', handleResize)

    setScrollHeight(window.innerHeight)

    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [forwardedRef])

  const len = items.length
  const height = itemHeight ? len * (itemHeight + space[gap]) - space[gap] : 0
  const fromIndex = height ? Math.max(Math.floor((scrollTop / height) * len) - 2, 0) : 0
  const toIndex = height ? Math.ceil(((scrollTop + scrollHeight) / height) * len) + 1 : 0

  useEffect(() => {
    if (!onChange) return
    onChange({fromIndex, gap: space[gap], itemHeight, scrollHeight, scrollTop, toIndex})
  }, [fromIndex, gap, itemHeight, onChange, scrollHeight, scrollTop, space, toIndex])

  const children = useMemo(() => {
    if (!renderItem || items.length === 0) return null

    if (itemHeight === -1) {
      return [<ItemWrapper key={0}>{renderItem(items[0])}</ItemWrapper>]
    }

    return items.slice(fromIndex, toIndex).map((item, _itemIndex) => {
      const itemIndex = fromIndex + _itemIndex
      const node = renderItem(item)
      const key = getItemKey ? getItemKey(item, itemIndex) : itemIndex

      return (
        <ItemWrapper key={key} style={{top: itemIndex * (itemHeight + space[gap])}}>
          {node}
        </ItemWrapper>
      )
    })
  }, [fromIndex, gap, getItemKey, itemHeight, items, renderItem, space, toIndex])

  const wrapperStyle = useMemo(() => ({height}), [height])

  return (
    <Root as={as} data-ui="VirtualList" {...restProps} ref={forwardedRef}>
      <div ref={wrapperRef} style={wrapperStyle}>
        {children}
      </div>
    </Root>
  )
})
