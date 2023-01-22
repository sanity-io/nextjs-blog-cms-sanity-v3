import {forwardRef, useEffect} from 'react'
import styled from 'styled-components'
import {useForwardedRef} from '../../hooks'
import {
  switchBaseStyles,
  switchRepresentationStyles,
  switchThumbStyles,
  switchTrackStyles,
  switchInputStyles,
} from './styles'

/**
 * @public
 */
export interface SwitchProps {
  indeterminate?: boolean
}

const Root = styled.span(switchBaseStyles)
const Input = styled.input(switchInputStyles)
const Representation = styled.span(switchRepresentationStyles)
const Track = styled.span(switchTrackStyles)
const Thumb = styled.span<{$checked?: boolean; $indeterminate?: boolean}>(switchThumbStyles)

/**
 * @public
 */
export const Switch = forwardRef(function Switch(
  props: Omit<React.HTMLProps<HTMLInputElement>, 'as' | 'type'> & SwitchProps,
  forwardedRef: React.ForwardedRef<HTMLInputElement>
) {
  const {checked, className, disabled, indeterminate, readOnly, style, ...restProps} = props
  const ref = useForwardedRef(forwardedRef)

  useEffect(() => {
    if (ref.current) {
      // Set the indeterminate state
      ref.current.indeterminate = indeterminate || false
    }
  }, [indeterminate, ref])

  return (
    <Root className={className} data-ui="Switch" style={style}>
      <Input
        data-read-only={!disabled && readOnly ? '' : undefined}
        {...restProps}
        checked={indeterminate !== true && checked}
        disabled={disabled || readOnly}
        type="checkbox"
        ref={ref}
      />
      <Representation aria-hidden data-name="representation">
        <Track />
        <Thumb $checked={checked} $indeterminate={indeterminate} />
      </Representation>
    </Root>
  )
})
