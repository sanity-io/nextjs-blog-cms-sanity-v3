import {forwardRef} from 'react'
import styled from 'styled-components'
import {useArrayProp} from '../../hooks'
import {responsiveGridStyle, ResponsiveGridStyleProps} from '../../styles/internal'
import {Box, BoxProps} from '../box'
import {ResponsiveGridProps} from '../types'

/**
 * @public
 */
export interface GridProps extends Omit<BoxProps, 'display'>, ResponsiveGridProps {}

const Root = styled(Box)<ResponsiveGridStyleProps>(responsiveGridStyle)

/**
 * @public
 */
export const Grid = forwardRef(function Grid(
  props: GridProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height' | 'rows'>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const {as, autoRows, autoCols, autoFlow, columns, gap, gapX, gapY, rows, children, ...restProps} =
    props

  return (
    <Root
      data-as={typeof as === 'string' ? as : undefined}
      data-ui="Grid"
      {...restProps}
      $autoRows={useArrayProp(autoRows)}
      $autoCols={useArrayProp(autoCols)}
      $autoFlow={useArrayProp(autoFlow)}
      $columns={useArrayProp(columns)}
      $gap={useArrayProp(gap)}
      $gapX={useArrayProp(gapX)}
      $gapY={useArrayProp(gapY)}
      $rows={useArrayProp(rows)}
      forwardedAs={as}
      ref={ref}
    >
      {children}
    </Root>
  )
})
