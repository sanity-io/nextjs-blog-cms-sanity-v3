import {forwardRef, useMemo} from 'react'
import styled from 'styled-components'
import {useArrayProp} from '../../hooks'
import {Box, BoxProps} from '../box'
import {childrenToElementArray} from '../helpers'
import {inlineBaseStyle, inlineSpaceStyle} from './styles'
import {ResponsiveInlineSpaceStyleProps} from './types'

/**
 * @public
 */
export interface InlineProps extends Omit<BoxProps, 'display'> {
  space?: number | number[]
}

const Root = styled(Box)<ResponsiveInlineSpaceStyleProps>(inlineBaseStyle, inlineSpaceStyle)

/**
 * @public
 */
export const Inline = forwardRef(function Inline(
  props: InlineProps & React.HTMLProps<HTMLDivElement>,
  ref
) {
  const {as, children: childrenProp, space, ...restProps} = props

  const children = useMemo(
    () =>
      childrenToElementArray(childrenProp)
        .filter(Boolean)
        .map((child, idx) => <div key={idx}>{child}</div>),
    [childrenProp]
  )

  return (
    <Root data-ui="Inline" {...restProps} $space={useArrayProp(space)} forwardedAs={as} ref={ref}>
      {children}
    </Root>
  )
})
