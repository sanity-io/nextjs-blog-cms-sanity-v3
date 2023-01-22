import {useId} from '@reach/auto-id'
import React, {forwardRef, useCallback, useEffect, useState} from 'react'
import ReactIs from 'react-is'
import styled from 'styled-components'
import {useResponsiveProp} from '../../hooks'
import {ThemeColorSpotKey, useTheme} from '../../theme'
import {AvatarPosition, AvatarSize, AvatarStatus} from '../../types'
import {Text} from '../text'
import {avatarStyle, responsiveAvatarSizeStyle} from './styles'

/**
 * @public
 */
export interface AvatarProps {
  animateArrowFrom?: AvatarPosition
  arrowPosition?: AvatarPosition
  as?: React.ElementType | keyof JSX.IntrinsicElements
  color?: ThemeColorSpotKey
  initials?: string
  onImageLoadError?: (event: Error) => void
  size?: AvatarSize | AvatarSize[]
  src?: string
  /**
   * The status of the entity this Avatar represents.
   * @alpha
   */
  status?: AvatarStatus
  title?: string
}

const Root = styled.div<{$color: string; $size: AvatarSize[]}>(
  responsiveAvatarSizeStyle,
  avatarStyle.root
)

const Arrow = styled.div(avatarStyle.arrow)

const BgStroke = styled.ellipse(avatarStyle.bgStroke)

const Stroke = styled.ellipse(avatarStyle.stroke)

const Initials = styled.div(avatarStyle.initials)

/**
 * @public
 */
export const Avatar = forwardRef(function Avatar(
  props: AvatarProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'ref'>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const {
    as: asProp,
    color: colorKey = 'gray',
    src,
    title,
    initials,
    onImageLoadError,
    arrowPosition: arrowPositionProp,
    animateArrowFrom,
    status = 'online',
    size: sizeProp,
    ...restProps
  } = props
  const as = ReactIs.isValidElementType(asProp) ? asProp : 'div'
  const size: AvatarSize[] = useResponsiveProp(sizeProp, [0])
  const theme = useTheme()
  const color = theme.sanity.color.spot[colorKey] || theme.sanity.color.spot.gray

  // @todo: remove this
  const avatarSize = theme.sanity.avatar.sizes[size[0]] || theme.sanity.avatar.sizes[0]
  const _sizeRem = avatarSize.size
  const _radius = _sizeRem / 2

  const elementId = useId() || ''
  const [arrowPosition, setArrowPosition] = useState<AvatarPosition | undefined>(
    animateArrowFrom || arrowPositionProp || 'inside'
  )

  const [imageFailed, setImageFailed] = useState<boolean>(false)

  const imageId = `avatar-image-${elementId}`

  useEffect(() => {
    if (arrowPosition === arrowPositionProp) return undefined

    // Start animation in the next frame
    const raf = requestAnimationFrame(() => setArrowPosition(arrowPositionProp))

    return () => cancelAnimationFrame(raf)
  }, [arrowPosition, arrowPositionProp])

  useEffect(() => {
    if (src) setImageFailed(false)
  }, [src])

  const handleImageError = useCallback(() => {
    setImageFailed(true)

    if (onImageLoadError) {
      onImageLoadError(new Error('Avatar: the image failed to load'))
    }
  }, [onImageLoadError])

  return (
    <Root
      as={as}
      data-as={typeof as === 'string' ? as : undefined}
      data-ui="Avatar"
      {...restProps}
      $size={size}
      $color={color}
      aria-label={title}
      data-arrow-position={arrowPosition}
      data-status={status}
      ref={ref}
      title={title}
    >
      <Arrow>
        <svg width="11" height="7" viewBox="0 0 11 7" fill="none">
          <path
            d="M6.67948 1.50115L11 7L0 7L4.32052 1.50115C4.92109 0.736796 6.07891 0.736795 6.67948 1.50115Z"
            fill={color}
          />
        </svg>
      </Arrow>

      {!imageFailed && src && (
        <svg viewBox={`0 0 ${_sizeRem} ${_sizeRem}`} fill="none">
          <defs>
            <pattern id={imageId} patternContentUnits="objectBoundingBox" width="1" height="1">
              <image href={src} width="1" height="1" onError={handleImageError} />
            </pattern>
          </defs>

          <circle cx={_radius} cy={_radius} r={_radius} fill={`url(#${imageId})`} />
          <BgStroke
            cx={_radius}
            cy={_radius}
            rx={_radius}
            ry={_radius}
            vectorEffect="non-scaling-stroke"
          />
          <Stroke
            cx={_radius}
            cy={_radius}
            rx={_radius}
            ry={_radius}
            stroke={color}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}

      {(imageFailed || !src) && initials && (
        <>
          <Initials>
            <Text as="span" size={size.map((s) => (s === 0 ? 0 : s + 1))}>
              <strong>{initials}</strong>
            </Text>
          </Initials>
        </>
      )}
    </Root>
  )
})
