import React, {
  createElement,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {isValidElementType} from 'react-is'
import {useForwardedRef} from '../../hooks'
import {Box, Flex, Text} from '../../primitives'
import {Selectable} from '../../primitives/_selectable'
import {ResponsivePaddingProps, ResponsiveRadiusProps} from '../../primitives/types'
import {SelectableTone} from '../../types/selectable'
import {Hotkeys} from '../hotkeys'
import {useMenu} from './useMenu'

/**
 * @public
 */
export interface MenuItemProps extends ResponsivePaddingProps, ResponsiveRadiusProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  fontSize?: number | number[]
  hotkeys?: string[]
  icon?: React.ComponentType | React.ReactNode
  iconRight?: React.ComponentType | React.ReactNode
  pressed?: boolean
  selected?: boolean
  space?: number | number[]
  text?: React.ReactNode
  tone?: SelectableTone
}

/**
 * @public
 */
export const MenuItem = forwardRef(function MenuItem(
  props: MenuItemProps &
    Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height' | 'ref' | 'selected' | 'tabIndex'>,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  const {
    as = 'button',
    children,
    disabled,
    fontSize = 2,
    hotkeys,
    icon,
    iconRight,
    onClick,
    padding = 3,
    paddingX,
    paddingY,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    pressed,
    radius = 2,
    selected: selectedProp,
    space = 3,
    text,
    tone = 'default',
    ...restProps
  } = props
  const menu = useMenu()
  const {
    activeElement,
    mount,
    onItemClick,
    onItemMouseEnter = menu.onMouseEnter,
    onItemMouseLeave = menu.onMouseLeave,
  } = menu
  const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null)
  const active = Boolean(activeElement) && activeElement === rootElement

  useEffect(() => mount(rootElement, selectedProp), [mount, rootElement, selectedProp])

  const ref = useForwardedRef(forwardedRef)

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return
      if (onClick) onClick(event)
      if (onItemClick) onItemClick()
    },
    [disabled, onClick, onItemClick]
  )

  const paddingProps = useMemo(
    () => ({
      padding,
      paddingX,
      paddingY,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
    }),
    [padding, paddingX, paddingY, paddingTop, paddingRight, paddingBottom, paddingLeft]
  )

  const setRef = useCallback(
    (el: HTMLDivElement | null) => {
      ref.current = el
      setRootElement(el)
    },
    [ref]
  )

  return (
    <Selectable
      data-ui="MenuItem"
      {...restProps}
      aria-pressed={as === 'button' && pressed}
      data-pressed={as !== 'button' && pressed ? '' : undefined}
      data-selected={active ? '' : undefined}
      data-disabled={disabled ? '' : undefined}
      forwardedAs={as}
      $radius={radius}
      $tone={tone}
      disabled={disabled}
      onClick={handleClick}
      onMouseEnter={onItemMouseEnter}
      onMouseLeave={onItemMouseLeave}
      padding={0}
      ref={setRef}
      role="menuitem"
      tabIndex={-1}
      type={as === 'button' ? 'button' : undefined}
    >
      {(icon || text || iconRight) && (
        <Box as="span" {...paddingProps}>
          <Flex as="span">
            {icon && (
              <Text size={fontSize}>
                {isValidElement(icon) && icon}
                {isValidElementType(icon) && createElement(icon)}
              </Text>
            )}

            {text && (
              <Box
                flex={1}
                marginLeft={icon ? space : undefined}
                marginRight={iconRight ? space : undefined}
              >
                <Text size={fontSize} textOverflow="ellipsis">
                  {text}
                </Text>
              </Box>
            )}

            {hotkeys && (
              <Box marginLeft={space} style={{marginTop: -4, marginBottom: -4}}>
                <Hotkeys fontSize={fontSize} keys={hotkeys} />
              </Box>
            )}

            {iconRight && (
              <Text size={fontSize}>
                {isValidElement(iconRight) && iconRight}
                {isValidElementType(iconRight) && createElement(iconRight)}
              </Text>
            )}
          </Flex>
        </Box>
      )}

      {children && (
        <Box as="span" {...paddingProps}>
          {children}
        </Box>
      )}
    </Selectable>
  )
})
