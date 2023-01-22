import {CheckmarkIcon, RemoveIcon} from '@sanity/icons'
import React, {forwardRef, useEffect} from 'react'
import styled from 'styled-components'
import {useForwardedRef, useCustomValidity} from '../../hooks'
import {checkboxBaseStyles, inputElementStyles} from './styles'

/**
 * @public
 */
export interface CheckboxProps {
  indeterminate?: boolean
  customValidity?: string
}

const Root = styled.div(checkboxBaseStyles)
const Input = styled.input(inputElementStyles)

/**
 * @public
 */
export const Checkbox = forwardRef(function Checkbox(
  props: Omit<React.HTMLProps<HTMLInputElement>, 'as' | 'type'> & CheckboxProps,
  forwardedRef: React.ForwardedRef<HTMLInputElement>
) {
  const {
    checked,
    className,
    disabled,
    indeterminate,
    customValidity,
    readOnly,
    style,
    ...restProps
  } = props
  const ref = useForwardedRef(forwardedRef)

  useCustomValidity(ref, customValidity)

  useEffect(() => {
    if (ref.current) {
      // Set the indeterminate state
      ref.current.indeterminate = indeterminate || false
    }
  }, [indeterminate, ref])

  return (
    <Root className={className} data-ui="Checkbox" style={style}>
      <Input
        data-read-only={!disabled && readOnly ? '' : undefined}
        {...restProps}
        checked={checked}
        disabled={disabled || readOnly}
        type="checkbox"
        readOnly={readOnly}
        ref={ref}
      />
      <span>
        <CheckmarkIcon />
        <RemoveIcon />
      </span>
    </Root>
  )
})
