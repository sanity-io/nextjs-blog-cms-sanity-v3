import {useCallback, useEffect, useRef, useState} from 'react'
import {_getFocusableElements, _sortElements} from './helpers'

/**
 * @internal
 */
export interface MenuController {
  activeElement: HTMLElement | null
  activeIndex: number
  handleItemMouseEnter: (event: React.MouseEvent<HTMLElement>) => void
  handleItemMouseLeave: () => void
  handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void
  mount: (element: HTMLElement | null, selected?: boolean) => () => void
  rootElement: HTMLDivElement | null
  setRootElement: (el: HTMLDivElement | null) => void
}

/**
 * This controller is responsible for controlling UI menu state.
 *
 * @internal
 */
export function useMenuController(props: {
  onKeyDown?: React.KeyboardEventHandler
  originElement?: HTMLElement | null
  shouldFocus: 'first' | 'last' | null
}): MenuController {
  const {onKeyDown, originElement, shouldFocus} = props
  const elementsRef = useRef<HTMLElement[]>([])
  const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null)
  const [activeIndex, _setActiveIndex] = useState(-1)
  const activeIndexRef = useRef(activeIndex)
  const activeElement = elementsRef.current[activeIndex] || null
  const mounted = Boolean(rootElement)

  const setActiveIndex = useCallback((nextActiveIndex: number) => {
    _setActiveIndex(nextActiveIndex)
    activeIndexRef.current = nextActiveIndex
  }, [])

  const mount = useCallback(
    (element: HTMLElement | null, selected?: boolean): (() => void) => {
      if (!element) return () => undefined

      if (elementsRef.current.indexOf(element) === -1) {
        elementsRef.current.push(element)
        _sortElements(rootElement, elementsRef.current)
      }

      if (selected) {
        const selectedIndex = elementsRef.current.indexOf(element)

        setActiveIndex(selectedIndex)
      }

      return () => {
        const idx = elementsRef.current.indexOf(element)

        if (idx > -1) {
          elementsRef.current.splice(idx, 1)
        }
      }
    },
    [rootElement, setActiveIndex]
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      // Move focus to the element that opened the menu before handling the `Tab` press
      if (event.key === 'Tab') {
        if (originElement) {
          originElement.focus()
        }

        return
      }

      // Move focus to the first focusable menuitem
      if (event.key === 'Home') {
        event.preventDefault()
        event.stopPropagation()

        const focusableElements = _getFocusableElements(elementsRef.current)
        const el = focusableElements[0]

        if (!el) return

        const currentIndex = elementsRef.current.indexOf(el)

        setActiveIndex(currentIndex)

        return
      }

      // Move focus to the last focusable menuitem
      if (event.key === 'End') {
        event.preventDefault()
        event.stopPropagation()

        const focusableElements = _getFocusableElements(elementsRef.current)
        const el = focusableElements[focusableElements.length - 1]

        if (!el) return

        const currentIndex = elementsRef.current.indexOf(el)

        setActiveIndex(currentIndex)

        return
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        event.stopPropagation()

        const focusableElements = _getFocusableElements(elementsRef.current)
        const focusableLen = focusableElements.length

        if (focusableLen === 0) return

        const focusedElement = elementsRef.current[activeIndexRef.current]

        let focusedIndex = focusableElements.indexOf(focusedElement)

        focusedIndex = (focusedIndex - 1 + focusableLen) % focusableLen

        const el = focusableElements[focusedIndex]
        const currentIndex = elementsRef.current.indexOf(el)

        setActiveIndex(currentIndex)

        return
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        event.stopPropagation()

        const focusableElements = _getFocusableElements(elementsRef.current)
        const focusableLen = focusableElements.length

        if (focusableLen === 0) return

        const focusedElement = elementsRef.current[activeIndexRef.current]

        let focusedIndex = focusableElements.indexOf(focusedElement)

        focusedIndex = (focusedIndex + 1) % focusableLen

        const el = focusableElements[focusedIndex]
        const currentIndex = elementsRef.current.indexOf(el)

        setActiveIndex(currentIndex)

        return
      }

      if (onKeyDown) {
        onKeyDown(event)
      }
    },
    [onKeyDown, originElement, setActiveIndex]
  )

  const handleItemMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const element = event.currentTarget
      const currentIndex = elementsRef.current.indexOf(element)

      setActiveIndex(currentIndex)
    },
    [setActiveIndex]
  )

  const handleItemMouseLeave = useCallback(() => {
    rootElement?.focus()
    setActiveIndex(-1)
  }, [rootElement, setActiveIndex])

  // Set focus on the currently active element
  useEffect(() => {
    if (!mounted) return

    const rafId = window.requestAnimationFrame(() => {
      const _activeIndex = activeIndexRef.current

      if (_activeIndex === -1) {
        if (shouldFocus === 'first') {
          const focusableElements = _getFocusableElements(elementsRef.current)
          const el = focusableElements[0]

          if (el) {
            const currentIndex = elementsRef.current.indexOf(el)

            setActiveIndex(currentIndex)
            activeIndexRef.current = currentIndex
          }
        }

        if (shouldFocus === 'last') {
          const focusableElements = _getFocusableElements(elementsRef.current)
          const el = focusableElements[focusableElements.length - 1]

          if (el) {
            const currentIndex = elementsRef.current.indexOf(el)

            setActiveIndex(currentIndex)
            activeIndexRef.current = currentIndex
          }
        }

        return
      }

      const element = elementsRef.current[_activeIndex] || null

      element?.focus()
    })

    return () => {
      window.cancelAnimationFrame(rafId)
    }
  }, [activeIndex, mounted, setActiveIndex, shouldFocus])

  return {
    activeElement,
    activeIndex,
    handleItemMouseEnter,
    handleItemMouseLeave,
    handleKeyDown,
    mount,
    rootElement,
    setRootElement,
  }
}
