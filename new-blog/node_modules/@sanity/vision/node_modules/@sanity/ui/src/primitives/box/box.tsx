import {forwardRef} from 'react'
import styled from 'styled-components'
import {useArrayProp} from '../../hooks'
import {
  boxStyle,
  flexItemStyle,
  FlexItemStyleProps,
  responsiveBoxStyle,
  ResponsiveBoxStyleProps,
  responsiveGridItemStyle,
  ResponsiveGridItemStyleProps,
  responsivePaddingStyle,
  ResponsivePaddingStyleProps,
  responsiveMarginStyle,
  ResponsiveMarginStyleProps,
} from '../../styles/internal'
import {
  ResponsiveBoxProps,
  ResponsiveFlexItemProps,
  ResponsiveGridItemProps,
  ResponsiveMarginProps,
  ResponsivePaddingProps,
} from '../types'

/**
 * @public
 */
export interface BoxProps
  extends ResponsiveFlexItemProps,
    ResponsiveBoxProps,
    ResponsiveGridItemProps,
    ResponsiveMarginProps,
    ResponsivePaddingProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
}

const Root = styled.div<
  FlexItemStyleProps &
    ResponsiveBoxStyleProps &
    ResponsiveGridItemStyleProps &
    ResponsiveMarginStyleProps &
    ResponsivePaddingStyleProps
>(
  boxStyle,
  flexItemStyle,
  responsiveBoxStyle,
  responsiveGridItemStyle,
  responsiveMarginStyle,
  responsivePaddingStyle
)

/**
 * @public
 */
export const Box = forwardRef(function Box(
  props: BoxProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height'>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const {
    as: asProp = 'div',
    column,
    columnStart,
    columnEnd,
    display = 'block',
    flex,
    height,
    margin = 0,
    marginX,
    marginY,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    overflow,
    padding = 0,
    paddingX,
    paddingY,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    row,
    rowStart,
    rowEnd,
    sizing,
    ...restProps
  } = props

  return (
    <Root
      data-as={typeof asProp === 'string' ? asProp : undefined}
      data-ui="Box"
      {...restProps}
      $column={useArrayProp(column)}
      $columnStart={useArrayProp(columnStart)}
      $columnEnd={useArrayProp(columnEnd)}
      $display={useArrayProp(display)}
      $flex={useArrayProp(flex)}
      $height={useArrayProp(height)}
      $margin={useArrayProp(margin)}
      $marginX={useArrayProp(marginX)}
      $marginY={useArrayProp(marginY)}
      $marginTop={useArrayProp(marginTop)}
      $marginRight={useArrayProp(marginRight)}
      $marginBottom={useArrayProp(marginBottom)}
      $marginLeft={useArrayProp(marginLeft)}
      $overflow={useArrayProp(overflow)}
      $padding={useArrayProp(padding)}
      $paddingX={useArrayProp(paddingX)}
      $paddingY={useArrayProp(paddingY)}
      $paddingTop={useArrayProp(paddingTop)}
      $paddingRight={useArrayProp(paddingRight)}
      $paddingBottom={useArrayProp(paddingBottom)}
      $paddingLeft={useArrayProp(paddingLeft)}
      $row={useArrayProp(row)}
      $rowStart={useArrayProp(rowStart)}
      $rowEnd={useArrayProp(rowEnd)}
      $sizing={useArrayProp(sizing)}
      as={asProp}
      ref={ref}
    >
      {props.children}
    </Root>
  )
})
