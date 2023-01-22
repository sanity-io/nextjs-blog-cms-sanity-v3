import {forwardRef, useCallback, useEffect, useMemo} from 'react'
import styled from 'styled-components'
import {useClickOutside, useForwardedRef, useGlobalKeyDown} from '../../hooks'
import {Box, Stack} from '../../primitives'
import {ResponsivePaddingProps} from '../../primitives/types'
import {useLayer} from '../../utils'
import {MenuContext, MenuContextValue} from './menuContext'
import {useMenuController} from './useMenuController'

/**
 * @public
 */
export interface MenuProps extends ResponsivePaddingProps {
  /**
   * @deprecated Use `shouldFocus="first"` instead.
   */
  focusFirst?: boolean
  /**
   * @deprecated Use `shouldFocus="last"` instead.
   */
  focusLast?: boolean
  onClickOutside?: (event: MouseEvent) => void
  onEscape?: () => void
  onItemClick?: () => void
  onItemSelect?: (index: number) => void
  originElement?: HTMLElement | null
  registerElement?: (el: HTMLElement) => () => void
  shouldFocus?: 'first' | 'last' | null
  space?: number | number[]
}

const Root = styled(Box)`
  outline: none;
  overflow: auto;
`

/**
 * @public
 */
export const Menu = forwardRef(function Menu(
  props: MenuProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height' | 'role' | 'tabIndex'>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const {
    children,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    focusFirst,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    focusLast,
    onClickOutside,
    onEscape,
    onItemClick,
    onItemSelect,
    onKeyDown,
    originElement,
    padding = 1,
    registerElement,
    shouldFocus = (props.focusFirst && 'first') || (props.focusLast && 'last') || null,
    space = 1,
    ...restProps
  } = props

  const forwardedRef = useForwardedRef(ref)

  const {isTopLayer} = useLayer()

  const {
    activeElement,
    activeIndex,
    handleItemMouseEnter,
    handleItemMouseLeave,
    handleKeyDown,
    mount,
    rootElement,
    setRootElement,
  } = useMenuController({onKeyDown, originElement, shouldFocus})

  const handleRefChange = useCallback(
    (el: HTMLDivElement | null) => {
      setRootElement(el)
      forwardedRef.current = el
    },
    [forwardedRef, setRootElement]
  )

  // Trigger `onItemSelect` when active index changes
  useEffect(() => {
    if (onItemSelect) onItemSelect(activeIndex)
  }, [activeIndex, onItemSelect])

  // Close menu when clicking outside
  useClickOutside(
    useCallback(
      (event) => isTopLayer && onClickOutside && onClickOutside(event),
      [isTopLayer, onClickOutside]
    ),
    [rootElement]
  )

  // Close menu when pressing Escape
  useGlobalKeyDown(
    useCallback(
      (event) => {
        if (!isTopLayer) return

        if (event.key === 'Escape') {
          event.stopPropagation()
          if (onEscape) onEscape()
        }
      },
      [isTopLayer, onEscape]
    )
  )

  // Register root element (for nested menus)
  useEffect(() => {
    if (!rootElement || !registerElement) return

    return registerElement(rootElement)
  }, [registerElement, rootElement])

  const value: MenuContextValue = useMemo(
    () => ({
      version: 0.0,
      activeElement,
      activeIndex,
      mount,
      onClickOutside,
      onEscape,
      onItemClick,
      onItemMouseEnter: handleItemMouseEnter,
      onItemMouseLeave: handleItemMouseLeave,
      registerElement,

      // deprecated
      onMouseEnter: handleItemMouseEnter,
      onMouseLeave: handleItemMouseLeave,
    }),
    [
      activeElement,
      activeIndex,
      mount,
      handleItemMouseEnter,
      handleItemMouseLeave,
      onClickOutside,
      onEscape,
      onItemClick,
      registerElement,
    ]
  )

  return (
    <MenuContext.Provider value={value}>
      <Root
        data-ui="Menu"
        {...restProps}
        onKeyDown={handleKeyDown}
        padding={padding}
        ref={handleRefChange}
        role="menu"
        tabIndex={-1}
      >
        <Stack space={space}>{children}</Stack>
      </Root>
    </MenuContext.Provider>
  )
})
