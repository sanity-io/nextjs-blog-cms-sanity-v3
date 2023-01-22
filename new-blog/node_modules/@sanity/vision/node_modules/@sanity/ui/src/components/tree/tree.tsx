import {forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {useForwardedRef} from '../../hooks'
import {Stack} from '../../primitives'
import {_findNextItemElement, _findPrevItemElement, _focusItemElement} from './helpers'
import {TreeContext} from './treeContext'
import {TreeContextValue, TreeState} from './types'

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export interface TreeProps {
  space?: number | number[]
}

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export const Tree = memo(
  forwardRef(function Tree(
    props: TreeProps &
      Omit<React.HTMLProps<HTMLDivElement>, 'align' | 'as' | 'height' | 'ref' | 'role' | 'wrap'>,
    ref: React.ForwardedRef<HTMLDivElement>
  ): React.ReactElement {
    const {children, space = 1, ...restProps} = props
    const forwardedRef = useForwardedRef(ref)
    const [focusedElement, setFocusedElement] = useState<HTMLElement | null>(null)
    const focusedElementRef = useRef(focusedElement)
    const path: string[] = useMemo(() => [], [])
    const [itemElements, setItemElements] = useState<HTMLElement[]>([])
    const [state, setState] = useState<TreeState>({})
    const stateRef = useRef(state)

    useEffect(() => {
      focusedElementRef.current = focusedElement
    }, [focusedElement])

    useEffect(() => {
      stateRef.current = state
    }, [state])

    const registerItem = useCallback(
      (element: HTMLElement, path: string, expanded: boolean, selected: boolean) => {
        setState((s) => ({...s, [path]: {element, expanded}}))

        if (selected) {
          setFocusedElement(element)
        }

        return () => {
          setState((s) => {
            const newState = {...s}

            delete newState[path]

            return newState
          })
        }
      },
      []
    )

    const setExpanded = useCallback((path: string, expanded: boolean) => {
      setState((s) => {
        const itemState = s[path]

        if (!itemState) return s

        return {...s, [path]: {...itemState, expanded}}
      })
    }, [])

    const contextValue: TreeContextValue = useMemo(
      () => ({
        version: 0.0,
        focusedElement: focusedElement || itemElements[0] || null,
        level: 0,
        path,
        registerItem,
        setExpanded,
        setFocusedElement,
        space,
        state,
      }),
      [focusedElement, itemElements, path, registerItem, setExpanded, space, state]
    )

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (!focusedElementRef.current) return

        if (event.key === 'ArrowDown') {
          event.preventDefault()

          const nextEl = _findNextItemElement(
            stateRef.current,
            itemElements,
            focusedElementRef.current
          )

          if (nextEl) {
            _focusItemElement(nextEl)
            setFocusedElement(nextEl)
          }

          return
        }

        if (event.key === 'ArrowUp') {
          event.preventDefault()

          const prevEl = _findPrevItemElement(
            stateRef.current,
            itemElements,
            focusedElementRef.current
          )

          if (prevEl) {
            _focusItemElement(prevEl)
            setFocusedElement(prevEl)
          }

          return
        }

        if (event.key === 'ArrowLeft') {
          event.preventDefault()

          const itemKey = focusedElementRef.current.getAttribute('data-tree-key')

          if (!itemKey) return

          const itemState = stateRef.current[itemKey]

          if (!itemState) return

          if (itemState.expanded) {
            setState((s) => {
              const itemState = s[itemKey]

              if (!itemState) return s

              return {...s, [itemKey]: {...itemState, expanded: false}}
            })
          } else {
            const itemPath = itemKey.split('/')

            itemPath.pop()

            const parentKey = itemPath.join('/')
            const parentState = parentKey && stateRef.current[parentKey]

            if (parentState) {
              parentState.element.focus()
              setFocusedElement(parentState.element)
            }
          }

          return
        }

        if (event.key === 'ArrowRight') {
          event.preventDefault()

          const focusedKey = focusedElementRef.current.getAttribute('data-tree-key')

          if (!focusedKey) return

          if (!stateRef.current[focusedKey]?.expanded) {
            setState((s) => {
              const itemState = s[focusedKey]

              if (!itemState) return s

              return {...s, [focusedKey]: {...itemState, expanded: true}}
            })
          }

          return
        }
      },
      [itemElements]
    )

    useEffect(() => {
      if (!forwardedRef.current) return
      const _itemElements = Array.from(
        forwardedRef.current.querySelectorAll('[data-ui="TreeItem"]')
      ) as HTMLElement[]

      setItemElements(_itemElements)
    }, [children, forwardedRef])

    return (
      <TreeContext.Provider value={contextValue}>
        <Stack
          as="ul"
          data-ui="Tree"
          {...restProps}
          onKeyDown={handleKeyDown}
          ref={forwardedRef}
          role="tree"
          space={space}
        >
          {children}
        </Stack>
      </TreeContext.Provider>
    )
  })
)

Tree.displayName = 'Tree'
