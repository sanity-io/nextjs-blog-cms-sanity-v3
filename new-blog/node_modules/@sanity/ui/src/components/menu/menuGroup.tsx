import {ChevronRightIcon} from '@sanity/icons'
import React, {createElement, isValidElement, useCallback, useEffect, useRef, useState} from 'react'
import {isValidElementType} from 'react-is'
import {Box, Flex, Popover, PopoverProps, Text} from '../../primitives'
import {Selectable} from '../../primitives/_selectable'
import {SelectableTone} from '../../types/selectable'
import {Menu} from './menu'
import {useMenu} from './useMenu'

/**
 * @public
 */
export interface MenuGroupProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  fontSize?: number | number[]
  icon?: React.ComponentType | React.ReactNode
  padding?: number | number[]
  popover?: Omit<PopoverProps, 'content' | 'open'>
  radius?: number | number[]
  space?: number | number[]
  text: React.ReactNode
  tone?: SelectableTone
}

/**
 * @public
 */
export function MenuGroup(
  props: MenuGroupProps &
    Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height' | 'ref' | 'tabIndex'>
): React.ReactElement {
  const {
    as = 'button',
    children,
    fontSize,
    icon,
    onClick,
    padding = 3,
    popover = {},
    radius = 2,
    space = 3,
    text,
    tone = 'default',
    ...restProps
  } = props
  const menu = useMenu()
  const {
    activeElement,
    mount,
    onClickOutside,
    onEscape,
    onItemClick,
    onItemMouseEnter = menu.onMouseEnter,
    registerElement,
  } = menu
  const [rootElement, setRootElement] = useState<HTMLButtonElement | null>(null)
  const [open, setOpen] = useState(false)
  const shouldFocusRef = useRef<'first' | 'last' | null>(null)
  const active = Boolean(activeElement) && activeElement === rootElement
  const [withinMenu, setWithinMenu] = useState(false)

  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setWithinMenu(false)
      onItemMouseEnter(event)
      setOpen(true)
    },
    [onItemMouseEnter]
  )

  const handleMenuKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.stopPropagation()

        setOpen(false)

        requestAnimationFrame(() => {
          rootElement?.focus()
        })
      }
    },
    [rootElement]
  )

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (onClick) onClick(event)

      shouldFocusRef.current = 'first'

      setOpen(true)

      requestAnimationFrame(() => {
        shouldFocusRef.current = null
      })
    },
    [onClick]
  )

  const handleChildItemClick = useCallback(() => {
    setOpen(false)
    if (onItemClick) onItemClick()
  }, [onItemClick])

  const handleMenuMouseEnter = useCallback(() => setWithinMenu(true), [])

  // Register the menu item element
  useEffect(() => mount(rootElement), [mount, rootElement])

  // Close child menu when a sibling item becomes active
  useEffect(() => {
    if (!active) setOpen(false)
  }, [active])

  // Update state when child menu is no longer open
  useEffect(() => {
    if (!open) setWithinMenu(false)
  }, [open])

  const childMenu = (
    <Menu
      onClickOutside={onClickOutside}
      onEscape={onEscape}
      onItemClick={handleChildItemClick}
      onKeyDown={handleMenuKeyDown}
      onMouseEnter={handleMenuMouseEnter}
      registerElement={registerElement}
      shouldFocus={shouldFocusRef.current}
    >
      {children}
    </Menu>
  )

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    const target = event.currentTarget

    if (document.activeElement !== target) {
      return
    }

    if (event.key === 'ArrowRight') {
      shouldFocusRef.current = 'first'

      setOpen(true)
      setWithinMenu(true)

      requestAnimationFrame(() => {
        shouldFocusRef.current = null
      })

      return
    }
  }, [])

  return (
    <Popover {...popover} content={childMenu} data-ui="MenuGroup__popover" open={open}>
      <Selectable
        data-as={as}
        data-ui="MenuGroup"
        forwardedAs={as}
        {...restProps}
        aria-pressed={as === 'button' ? withinMenu : undefined}
        data-pressed={as !== 'button' ? withinMenu : undefined}
        data-selected={!withinMenu && active ? '' : undefined}
        $radius={radius}
        $tone={tone}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        ref={setRootElement}
        tabIndex={-1}
        type={as === 'button' ? 'button' : undefined}
      >
        <Box padding={padding}>
          <Flex>
            {icon && (
              <Text size={fontSize}>
                {isValidElement(icon) && icon}
                {isValidElementType(icon) && createElement(icon)}
              </Text>
            )}

            <Box flex={1} marginLeft={icon ? space : undefined}>
              <Text size={fontSize} textOverflow="ellipsis">
                {text}
              </Text>
            </Box>

            <Box marginLeft={space}>
              <Text size={fontSize}>
                <ChevronRightIcon />
              </Text>
            </Box>
          </Flex>
        </Box>
      </Selectable>
    </Popover>
  )
}
