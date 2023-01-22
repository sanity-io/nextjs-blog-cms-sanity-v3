import React, {
  Children,
  forwardRef,
  Fragment,
  isValidElement,
  useCallback,
  useMemo,
  useState,
} from 'react'
import {useClickOutside} from '../../hooks'
import {Box, Popover, Stack, Text} from '../../primitives'
import {ExpandButton, Root} from './breadcrumbs.styles'

/**
 * @beta
 */
export interface BreadcrumbsProps {
  maxLength?: number
  separator?: React.ReactNode
  space?: number | number[]
}

/**
 * @beta
 */
export const Breadcrumbs = forwardRef(function Breadcrumbs(
  props: BreadcrumbsProps & Omit<React.HTMLProps<HTMLOListElement>, 'as' | 'ref' | 'type'>,
  ref: React.ForwardedRef<HTMLOListElement>
) {
  const {children, maxLength, separator, space = 2, ...restProps} = props
  const [open, setOpen] = useState(false)
  const [expandElement, setExpandElement] = useState<HTMLButtonElement | null>(null)
  const [popoverElement, setPopoverElement] = useState<HTMLDivElement | null>(null)

  const collapse = useCallback(() => setOpen(false), [])
  const expand = useCallback(() => setOpen(true), [])

  useClickOutside(collapse, [expandElement, popoverElement])

  const rawItems = useMemo(
    () =>
      Children.toArray(children).filter((child) => {
        return isValidElement(child)
      }),
    [children]
  )

  const items = useMemo(() => {
    const len = rawItems.length

    if (maxLength && len > maxLength) {
      const beforeLength = Math.ceil(maxLength / 2)
      const afterLength = Math.floor(maxLength / 2)

      return [
        ...rawItems.slice(0, beforeLength - 1),
        <Popover
          constrainSize
          content={
            <Stack as="ol" overflow="auto" padding={space} space={space}>
              {rawItems.slice(beforeLength - 1, len - afterLength)}
            </Stack>
          }
          key="button"
          open={open}
          placement="top"
          portal
          ref={setPopoverElement}
        >
          <ExpandButton
            fontSize={1}
            mode="bleed"
            onClick={open ? collapse : expand}
            padding={1}
            ref={setExpandElement}
            selected={open}
            text="…"
          />
        </Popover>,
        ...rawItems.slice(len - afterLength),
      ]
    }

    return rawItems
  }, [collapse, expand, maxLength, open, rawItems, space])

  return (
    <Root data-ui="Breadcrumbs" {...restProps} ref={ref}>
      {items.map((item, itemIndex) => (
        <Fragment key={itemIndex}>
          {itemIndex > 0 && (
            <Box aria-hidden as="li" paddingX={space}>
              {separator || <Text muted>/</Text>}
            </Box>
          )}
          <Box as="li">{item}</Box>
        </Fragment>
      ))}
    </Root>
  )
})
