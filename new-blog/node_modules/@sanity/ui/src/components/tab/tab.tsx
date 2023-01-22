import React, {forwardRef, useCallback, useEffect, useRef} from 'react'
import {useForwardedRef} from '../../hooks'
import {Button} from '../../primitives'
import {ButtonTone} from '../../types'

/**
 * @public
 */
export interface TabProps {
  /**
   * The `id` of the correlating `TabPanel` component.
   */
  'aria-controls': string
  id: string
  icon?: React.ComponentType | React.ReactNode
  focused?: boolean
  fontSize?: number | number[]
  label?: React.ReactNode
  padding?: number | number[]
  selected?: boolean
  tone?: ButtonTone
}

/**
 * @public
 */
export const Tab = forwardRef(function Tab(
  props: TabProps &
    Omit<React.HTMLProps<HTMLButtonElement>, 'aria-controls' | 'as' | 'id' | 'label' | 'type'>,
  forwardedRef: React.ForwardedRef<HTMLButtonElement>
) {
  const {
    icon,
    id,
    focused,
    fontSize,
    label,
    onClick,
    onFocus,
    padding = 2,
    selected,
    ...restProps
  } = props
  const elementRef = useRef<HTMLButtonElement | null>(null)
  const focusedRef = useRef(false)

  const handleBlur = useCallback(() => {
    focusedRef.current = false
  }, [])

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLButtonElement>) => {
      focusedRef.current = true
      if (onFocus) onFocus(event)
    },
    [onFocus]
  )

  const ref = useForwardedRef(forwardedRef)

  useEffect(() => {
    if (focused && !focusedRef.current) {
      if (elementRef.current) elementRef.current.focus()
      focusedRef.current = true
    }
  }, [focused])

  const setRef = (el: HTMLButtonElement | null) => {
    elementRef.current = el
    ref.current = el
  }

  return (
    <Button
      data-ui="Tab"
      {...restProps}
      aria-selected={selected ? 'true' : 'false'}
      fontSize={fontSize}
      icon={icon}
      id={id}
      mode="bleed"
      onClick={onClick}
      onBlur={handleBlur}
      onFocus={handleFocus}
      padding={padding}
      ref={setRef}
      role="tab"
      selected={selected}
      tabIndex={selected ? 0 : -1}
      text={label}
      type="button"
    />
  )
})
