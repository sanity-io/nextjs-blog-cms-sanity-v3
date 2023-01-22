import React, {forwardRef, useEffect, useState} from 'react'
import styled from 'styled-components'
import {Box} from '../../primitives'
import {BoxProps, ResponsiveRadiusProps} from '../../primitives'
import {responsiveRadiusStyle, ResponsiveRadiusStyleProps} from '../../styles/internal'
import {skeletonStyle} from './styles'

const Root = styled(Box)<{$animated: boolean; $visible: boolean} & ResponsiveRadiusStyleProps>(
  responsiveRadiusStyle,
  skeletonStyle
)

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export interface SkeletonProps extends ResponsiveRadiusProps, Omit<BoxProps, 'children'> {
  animated?: boolean
  delay?: number
}

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export const Skeleton = forwardRef(function Skeleton(
  props: SkeletonProps & React.HTMLProps<HTMLDivElement>,
  ref: React.Ref<HTMLDivElement>
) {
  const {animated = false, delay, radius, ...restProps} = props
  const [visible, setVisible] = useState<boolean>(delay ? false : true)

  useEffect(() => {
    if (!delay) {
      return setVisible(true)
    }

    const timeout = setTimeout(() => {
      setVisible(true)
    }, delay)

    return () => {
      clearTimeout(timeout)
    }
  }, [delay])

  return <Root {...restProps} $animated={animated} $radius={radius} $visible={visible} ref={ref} />
})
