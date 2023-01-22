import {cloneElement, forwardRef, useCallback, useMemo, useState, useEffect, useRef} from 'react'
import {isElement} from 'react-is'
import {Popover, PopoverProps} from '../../primitives'
import {ThemeColorSchemeKey} from '../../theme'
import {Placement} from '../../types'
import {MenuProps} from './menu'

/**
 * @public
 */
export interface MenuButtonProps {
  /**
   * @beta Do not use in production.
   */
  __unstable_disableRestoreFocusOnClose?: boolean
  /**
   * @deprecated Use `popover={{boundaryElement: element}}` instead.
   */
  boundaryElement?: HTMLElement
  button: React.ReactElement
  id: string
  menu?: React.ReactElement
  onClose?: () => void
  /**
   * @deprecated Use `popover={{placement: 'top'}}` instead.
   */
  placement?: Placement
  popover?: Omit<PopoverProps, 'content' | 'open'>
  /**
   * @deprecated Use `popover={{scheme: 'dark'}}` instead.
   */
  popoverScheme?: ThemeColorSchemeKey
  /**
   * @deprecated Use `popover={{radius: 2}}` instead.
   */
  popoverRadius?: number | number[]
  /**
   * @beta Do not use in production.
   * @deprecated Use `popover={{portal: true}}` instead.
   */
  portal?: boolean
  /**
   * @deprecated Use `popover={{preventOverflow: true}}` instead.
   */
  preventOverflow?: boolean
}

/**
 * @public
 */
export const MenuButton = forwardRef(function MenuButton(
  props: MenuButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement | null>
) {
  const {
    __unstable_disableRestoreFocusOnClose: disableRestoreFocusOnClose = false,
    boundaryElement: deprecated_boundaryElement,
    button: buttonProp,
    id,
    menu: menuProp,
    onClose,
    placement: deprecated_placement,
    popoverScheme: deprecated_popoverScheme,
    portal: deprecated_portal = true,
    popover,
    popoverRadius: deprecated_popoverRadius,
    preventOverflow: deprecated_preventOverflow,
  } = props
  const [open, setOpen] = useState(false)
  const [shouldFocus, setShouldFocus] = useState<'first' | 'last' | null>(null)
  const [buttonElement, setButtonElement] = useState<HTMLButtonElement | null>(null)
  const [menuElements, setChildMenuElements] = useState<HTMLElement[]>([])
  const openRef = useRef<boolean>(open)

  useEffect(() => {
    if (onClose && !open && openRef.current) {
      onClose()
    }
  }, [onClose, open])

  useEffect(() => {
    openRef.current = open
  }, [open])

  const handleButtonClick = useCallback(() => {
    setOpen((v) => !v)
    setShouldFocus(null)
  }, [])

  const handleButtonKeyDown = useCallback((event: React.KeyboardEvent<HTMLButtonElement>) => {
    // On `ArrowDown`, `Enter` and `Space`
    // - Opens menu and moves focus to first menuitem
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setOpen(true)
      setShouldFocus('first')

      return
    }

    // On `ArrowUp`
    // - 	Opens menu and moves focus to last menuitem
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setOpen(true)
      setShouldFocus('last')

      return
    }
  }, [])

  const handleMenuClickOutside = useCallback(
    (event: MouseEvent) => {
      const target = event.target

      if (!(target instanceof Node)) {
        return
      }

      if (buttonElement && (target === buttonElement || buttonElement.contains(target))) {
        return
      }

      for (const el of menuElements) {
        if (target === el || el.contains(target)) {
          return
        }
      }

      setOpen(false)
    },
    [buttonElement, menuElements]
  )

  const handleMenuEscape = useCallback(() => {
    setOpen(false)
    if (disableRestoreFocusOnClose) return
    if (buttonElement) buttonElement.focus()
  }, [buttonElement, disableRestoreFocusOnClose])

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLButtonElement>) => {
      const target = event.relatedTarget

      if (!(target instanceof Node)) {
        return
      }

      for (const el of menuElements) {
        if (el === target || el.contains(target)) {
          return
        }
      }

      setOpen(false)
    },
    [menuElements]
  )

  const handleItemClick = useCallback(() => {
    setOpen(false)
    if (disableRestoreFocusOnClose) return
    if (buttonElement) buttonElement.focus()
  }, [buttonElement, disableRestoreFocusOnClose])

  const registerElement = useCallback((el: HTMLElement) => {
    setChildMenuElements((els) => els.concat([el]))

    return () => {
      setChildMenuElements((els) => {
        return els.filter((_el) => _el !== el)
      })
    }
  }, [])

  const menuProps: MenuProps = useMemo(
    () => ({
      'aria-labelledby': id,
      onBlurCapture: handleBlur,
      onClickOutside: handleMenuClickOutside,
      onEscape: handleMenuEscape,
      onItemClick: handleItemClick,
      originElement: buttonElement,
      registerElement,
      shouldFocus,
    }),
    [
      buttonElement,
      handleMenuClickOutside,
      handleMenuEscape,
      handleItemClick,
      id,
      handleBlur,
      registerElement,
      shouldFocus,
    ]
  )

  const menu = isElement(menuProp) ? cloneElement(menuProp, menuProps) : null

  const setButtonRef = useCallback(
    (el: HTMLButtonElement | null) => {
      if (typeof ref === 'function') {
        ref(el)
      } else if (ref) {
        ref.current = el
      }

      setButtonElement(el)
    },
    [ref]
  )

  const button = useMemo(
    () =>
      isElement(buttonProp)
        ? cloneElement(buttonProp, {
            'data-ui': 'MenuButton',
            id,
            onClick: handleButtonClick,
            onKeyDown: handleButtonKeyDown,
            'aria-haspopup': true,
            'aria-expanded': open,
            ref: setButtonRef,
            selected: open,
          })
        : null,
    [buttonProp, handleButtonClick, handleButtonKeyDown, id, open, setButtonRef]
  )

  const popoverProps: MenuButtonProps['popover'] = useMemo(
    () => ({
      boundaryElement: deprecated_boundaryElement,
      overflow: 'auto',
      placement: deprecated_placement,
      portal: deprecated_portal,
      preventOverflow: deprecated_preventOverflow,
      radius: deprecated_popoverRadius,
      scheme: deprecated_popoverScheme,
      ...(popover || {}),
    }),
    [
      deprecated_boundaryElement,
      deprecated_placement,
      deprecated_popoverRadius,
      deprecated_popoverScheme,
      deprecated_portal,
      deprecated_preventOverflow,
      popover,
    ]
  )

  return (
    <Popover data-ui="MenuButton__popover" {...popoverProps} content={menu} open={open}>
      {button || <></>}
    </Popover>
  )
})
