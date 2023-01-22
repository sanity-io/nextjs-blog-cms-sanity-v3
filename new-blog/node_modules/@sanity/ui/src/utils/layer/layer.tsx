import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {EMPTY_RECORD} from '../../constants'
import {LayerProvider} from './layerProvider'
import {useLayer} from './useLayer'

/**
 * @public
 */
export interface LayerProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  zOffset?: number | number[]
}

interface LayerChildrenProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
}

const Root = styled.div`
  position: relative;
`

const LayerChildren = forwardRef(function LayerChildren(
  props: LayerChildrenProps & Omit<React.HTMLProps<HTMLDivElement>, 'as'>,
  ref: React.Ref<HTMLDivElement>
) {
  const {children, style = EMPTY_RECORD, ...restProps} = props
  const {zIndex} = useLayer()

  return (
    <Root {...restProps} data-ui="Layer" ref={ref} style={{...style, zIndex}}>
      {children}
    </Root>
  )
})

/**
 * @public
 */
export const Layer = forwardRef(function Layer(
  props: LayerProps & Omit<React.HTMLProps<HTMLDivElement>, 'as'>,
  ref: React.Ref<HTMLDivElement>
) {
  const {children, zOffset = 1, ...restProps} = props

  return (
    <LayerProvider zOffset={zOffset}>
      <LayerChildren {...restProps} ref={ref}>
        {children}
      </LayerChildren>
    </LayerProvider>
  )
})
