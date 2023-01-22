import {
  Middleware,
  RootBoundary,
  arrow,
  autoUpdate,
  flip,
  hide,
  offset,
  shift,
  useFloating,
  UseFloatingProps,
} from '@floating-ui/react-dom'
import {cloneElement, forwardRef, memo, useCallback, useEffect, useMemo, useRef} from 'react'
import {useForwardedRef, useArrayProp, useElementSize} from '../../hooks'
import {ThemeColorSchemeKey, useTheme} from '../../theme'
import {BoxOverflow, CardTone, Placement, PopoverMargins} from '../../types'
import {LayerProps, LayerProvider, Portal, useBoundaryElement} from '../../utils'
import {ResponsiveRadiusProps, ResponsiveShadowProps, ResponsiveWidthProps} from '../types'
import {
  DEFAULT_POPOVER_DISTANCE,
  DEFAULT_POPOVER_MARGINS,
  DEFAULT_POPOVER_PADDING,
} from './constants'
import {size} from './floating-ui/size'
import {PopoverCard} from './popoverCard'

/**
 * @public
 */
export interface PopoverProps
  extends Omit<LayerProps, 'as'>,
    ResponsiveRadiusProps,
    ResponsiveShadowProps,
    ResponsiveWidthProps {
  /**
   * @beta
   */
  __unstable_margins?: PopoverMargins
  arrow?: boolean
  boundaryElement?: HTMLElement | null
  children?: React.ReactElement
  constrainSize?: boolean
  content?: React.ReactNode
  disabled?: boolean
  fallbackPlacements?: Placement[]
  open?: boolean
  overflow?: BoxOverflow
  padding?: number | number[]
  placement?: Placement
  portal?: boolean | string
  preventOverflow?: boolean
  referenceElement?: HTMLElement | null
  matchReferenceWidth?: boolean
  scheme?: ThemeColorSchemeKey
  tone?: CardTone
}

/** @public */
export const Popover = memo(
  forwardRef(function Popover(
    props: PopoverProps &
      Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'children' | 'content' | 'width'>,
    ref: React.ForwardedRef<HTMLDivElement>
  ): React.ReactElement {
    const theme = useTheme()
    const boundaryElementContext = useBoundaryElement()

    const {
      __unstable_margins: margins = DEFAULT_POPOVER_MARGINS,
      arrow: arrowProp = true,
      boundaryElement = boundaryElementContext.element,
      children: childProp,
      constrainSize = false,
      content,
      disabled,
      fallbackPlacements,
      matchReferenceWidth: matchReferenceWidthProp,
      open,
      overflow = 'hidden',
      padding: paddingProp,
      placement: placementProp = 'bottom',
      portal,
      preventOverflow = true,
      radius: radiusProp = 3,
      referenceElement,
      scheme,
      shadow: shadowProp = 3,
      tone = 'inherit',
      width: widthProp = 'auto',
      zOffset: zOffsetProp = theme.sanity.layer?.popover.zOffset,
      ...restProps
    } = props
    const boundarySize = useElementSize(boundaryElement)?.border
    const padding = useArrayProp(paddingProp)
    const radius = useArrayProp(radiusProp)
    const shadow = useArrayProp(shadowProp)
    const width = useArrayProp(widthProp)
    const zOffset = useArrayProp(zOffsetProp)
    const forwardedRef = useForwardedRef(ref)
    const arrowRef = useRef<HTMLDivElement | null>(null)
    const rootBoundary: RootBoundary = 'viewport'

    const middleware = useMemo(() => {
      const ret: Middleware[] = []

      // Flip the floating element when leaving the boundary box
      if (constrainSize || preventOverflow) {
        ret.push(
          flip({
            boundary: boundaryElement || undefined,
            fallbackPlacements,
            padding: DEFAULT_POPOVER_PADDING,
            rootBoundary,
          })
        )
      }

      // Define distance between reference and floating element
      ret.push(
        offset({
          mainAxis: arrowProp ? DEFAULT_POPOVER_DISTANCE : 0,
        })
      )

      // Track sizes
      if (constrainSize || matchReferenceWidthProp) {
        ret.push(
          size({
            apply({availableWidth, availableHeight, elements, referenceWidth}) {
              if (matchReferenceWidthProp) {
                elements.floating.style.width = `${referenceWidth}px`
              }

              if (constrainSize) {
                elements.floating.style.maxWidth = `${availableWidth}px`
                elements.floating.style.maxHeight = `${availableHeight}px`
              }
            },
            boundaryElement,
            constrainSize,
            margins,
            matchReferenceWidth: matchReferenceWidthProp,
            padding: DEFAULT_POPOVER_PADDING,
          })
        )
      }

      // Shift the popover so its sits within the boundary eleement
      if (preventOverflow) {
        ret.push(
          shift({
            boundary: boundaryElement || undefined,
            rootBoundary,
            padding: DEFAULT_POPOVER_PADDING,
          })
        )
      }

      // Place arrow
      if (arrowProp) {
        ret.push(
          arrow({
            element: arrowRef,
            padding: DEFAULT_POPOVER_PADDING,
          })
        )
      }

      ret.push(
        hide({
          boundary: boundaryElement || undefined,
          padding: DEFAULT_POPOVER_PADDING,
          strategy: 'referenceHidden',
        })
      )

      return ret
    }, [
      arrowProp,
      boundaryElement,
      constrainSize,
      fallbackPlacements,
      margins,
      matchReferenceWidthProp,
      preventOverflow,
    ])

    const floatingProps: UseFloatingProps = useMemo(
      () => ({
        middleware,
        placement: placementProp,
        whileElementsMounted: autoUpdate,
      }),
      [middleware, placementProp]
    )

    const {
      x,
      y,
      placement,
      reference: referenceRef,
      floating: floatingRef,
      middlewareData,
      strategy,
    } = useFloating(floatingProps)

    const referenceHidden = middlewareData.hide?.referenceHidden

    const arrowX = middlewareData.arrow?.x
    const arrowY = middlewareData.arrow?.y

    const setArrow = useCallback((arrowEl: HTMLDivElement | null) => {
      arrowRef.current = arrowEl
    }, [])

    const setFloating = useCallback(
      (node: HTMLDivElement | null) => {
        forwardedRef.current = node
        floatingRef(node)
      },
      [floatingRef, forwardedRef]
    )

    const setReference = useCallback(
      (node: HTMLElement | null) => {
        referenceRef(node)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const childRef = (childProp as any)?.ref

        if (typeof childRef === 'function') {
          childRef(node)
        } else if (childRef) {
          childRef.current = node
        }
      },
      [childProp, referenceRef]
    )

    const child = useMemo(() => {
      if (!childProp || referenceElement) return null

      return cloneElement(childProp, {ref: setReference})
    }, [childProp, referenceElement, setReference])

    useEffect(() => {
      referenceRef(referenceElement || null)
    }, [referenceRef, referenceElement])

    if (disabled) {
      return childProp || <></>
    }

    const popover = (
      <LayerProvider zOffset={zOffset}>
        <PopoverCard
          {...restProps}
          __unstable_margins={margins}
          arrow={arrowProp}
          arrowRef={setArrow}
          arrowX={arrowX}
          arrowY={arrowY}
          boundaryWidth={preventOverflow ? boundarySize?.width : undefined}
          hidden={referenceHidden}
          overflow={overflow}
          padding={padding}
          placement={placement}
          radius={radius}
          ref={setFloating}
          scheme={scheme}
          shadow={shadow}
          strategy={strategy}
          tone={tone}
          x={x}
          y={y}
          width={width}
        >
          {content}
        </PopoverCard>
      </LayerProvider>
    )

    return (
      <>
        {/* the popover */}
        {open && (
          <>
            {portal ? (
              <Portal __unstable_name={typeof portal === 'string' ? portal : undefined}>
                {popover}
              </Portal>
            ) : (
              popover
            )}
          </>
        )}

        {/* the referred element */}
        {child}
      </>
    )
  })
)

Popover.displayName = 'Popover'
