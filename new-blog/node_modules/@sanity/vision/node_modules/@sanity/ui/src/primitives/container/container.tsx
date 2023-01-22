import {forwardRef} from 'react'
import styled from 'styled-components'
import {useArrayProp} from '../../hooks'
import {Box, BoxProps} from '../box'
import {ResponsiveWidthProps} from '../types'
import {containerBaseStyle, responsiveContainerWidthStyle} from './styles'
import {ResponsiveWidthStyleProps} from './types'

/**
 * @public
 */
export interface ContainerProps extends BoxProps, ResponsiveWidthProps {}

const Root = styled(Box)<ResponsiveWidthStyleProps>(
  containerBaseStyle,
  responsiveContainerWidthStyle
)

/**
 * @public
 */
export const Container = forwardRef(function Container(
  props: ContainerProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height' | 'width'>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const {as, width = 2, ...restProps} = props

  return (
    <Root
      data-ui="Container"
      {...restProps}
      $width={useArrayProp(width)}
      forwardedAs={as}
      ref={ref}
    />
  )
})
