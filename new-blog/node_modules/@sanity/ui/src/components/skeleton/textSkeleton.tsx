import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {useResponsiveProp} from '../../hooks'
import {responsive} from '../../styles'
import {Theme, ThemeFontKey} from '../../theme'
import {Skeleton, SkeletonProps} from './skeleton'

const Root = styled(Skeleton)<{$size: number[]; $style: ThemeFontKey}>(
  ({$size, $style, theme}: {$size: number[]; $style: ThemeFontKey; theme: Theme}) => {
    const {media} = theme.sanity
    const font = theme.sanity.fonts[$style]

    const styles = responsive(media, $size, (sizeIndex) => {
      const fontSize = font.sizes[sizeIndex]
      const capHeight = fontSize.lineHeight - fontSize.ascenderHeight - fontSize.descenderHeight

      return {height: capHeight}
    })

    return styles
  }
)

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export interface TextSkeletonProps extends SkeletonProps {
  size?: number | number[]
}

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export interface LabelSkeletonProps extends SkeletonProps {
  size?: number | number[]
}

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export interface HeadingSkeletonProps extends SkeletonProps {
  size?: number | number[]
}

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export interface CodeSkeletonProps extends SkeletonProps {
  size?: number | number[]
}

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export const TextSkeleton = forwardRef(function TextSkeleton(
  props: TextSkeletonProps &
    Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'children' | 'height' | 'size'>,
  ref: React.Ref<HTMLDivElement>
) {
  const {size = 2, ...restProps} = props
  const $size = useResponsiveProp(size)

  return <Root {...restProps} $size={$size} ref={ref} $style="text" />
})

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export const LabelSkeleton = forwardRef(function TextSkeleton(
  props: LabelSkeletonProps &
    Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'children' | 'height' | 'size'>,
  ref: React.Ref<HTMLDivElement>
) {
  const {size = 2, ...restProps} = props
  const $size = useResponsiveProp(size)

  return <Root {...restProps} $size={$size} ref={ref} $style="label" />
})

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export const HeadingSkeleton = forwardRef(function TextSkeleton(
  props: HeadingSkeletonProps &
    Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'children' | 'height' | 'size'>,
  ref: React.Ref<HTMLDivElement>
) {
  const {size = 2, ...restProps} = props
  const $size = useResponsiveProp(size)

  return <Root {...restProps} $size={$size} ref={ref} $style="heading" />
})

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export const CodeSkeleton = forwardRef(function TextSkeleton(
  props: CodeSkeletonProps &
    Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'children' | 'height' | 'size'>,
  ref: React.Ref<HTMLDivElement>
) {
  const {size = 2, ...restProps} = props
  const $size = useResponsiveProp(size)

  return <Root {...restProps} $size={$size} ref={ref} $style="code" />
})
