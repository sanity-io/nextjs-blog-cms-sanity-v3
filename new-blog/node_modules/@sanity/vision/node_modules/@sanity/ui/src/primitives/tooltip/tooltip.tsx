import {
  arrow,
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
  Middleware,
  RootBoundary,
} from '@floating-ui/react-dom'
import {
  cloneElement,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  CSSProperties,
  ForwardedRef,
} from 'react'
import styled from 'styled-components'
import {FLOATING_STATIC_SIDES} from '../../constants'
import {useArrayProp, useForwardedRef} from '../../hooks'
import {ThemeColorSchemeKey, useTheme} from '../../theme'
import {Placement} from '../../types'
import {Layer, LayerProps, Portal, useBoundaryElement} from '../../utils'
import {Card} from '../card'
import {TooltipArrow} from './tooltipArrow'

/**
 * @public
 */
export interface TooltipProps extends Omit<LayerProps, 'as'> {
  /** @deprecated Use `fallbackPlacements` instead. */
  allowedAutoPlacements?: Placement[]
  boundaryElement?: HTMLElement | null
  children?: React.ReactElement
  content?: React.ReactNode
  disabled?: boolean
  fallbackPlacements?: Placement[]
  padding?: number | number[]
  placement?: Placement
  portal?: boolean | string
  scheme?: ThemeColorSchemeKey
  shadow?: number | number[]
}

const Root = styled(Layer)`
  pointer-events: none;
`

/**
 * @public
 */
export const Tooltip = forwardRef(function Tooltip(
  props: TooltipProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'children' | 'content'>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const boundaryElementContext = useBoundaryElement()
  const theme = useTheme()
  const {
    boundaryElement = boundaryElementContext?.element,
    children: childProp,
    content,
    disabled,
    fallbackPlacements: fallbackPlacementsProp,
    padding,
    placement: placementProp = 'bottom',
    portal,
    scheme,
    shadow = 2,
    zOffset = theme.sanity.layer?.tooltip.zOffset,
    ...restProps
  } = props
  const fallbackPlacements = useArrayProp(fallbackPlacementsProp)
  const forwardedRef = useForwardedRef(ref)
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null)
  const arrowRef = useRef<HTMLDivElement | null>(null)
  const rootBoundary: RootBoundary = 'viewport'

  const middleware = useMemo(() => {
    const ret: Middleware[] = []

    // Flip the floating element when leaving the boundary box
    ret.push(
      flip({
        boundary: boundaryElement || undefined,
        fallbackPlacements,
        padding: 4,
        rootBoundary,
      })
    )

    // Define distance between reference and floating element
    ret.push(offset({mainAxis: 3}))

    // Shift the tooltip so its sits with the boundary eleement
    ret.push(
      shift({
        boundary: boundaryElement || undefined,
        rootBoundary,
        padding: 4,
      })
    )

    // Place arrow
    ret.push(arrow({element: arrowRef, padding: 2}))

    return ret
  }, [boundaryElement, fallbackPlacements])

  const {x, y, placement, reference, floating, middlewareData, update, strategy} = useFloating({
    middleware,
    placement: placementProp,
    whileElementsMounted: autoUpdate,
  })

  const rootStyle: CSSProperties = useMemo(
    () => ({
      position: strategy,
      top: y ?? 0,
      left: x ?? 0,
    }),
    [strategy, x, y]
  )

  const staticSide = placement && FLOATING_STATIC_SIDES[placement.split('-')[0]]

  const arrowX = middlewareData.arrow?.x
  const arrowY = middlewareData.arrow?.y

  const arrowStyle: CSSProperties = useMemo(() => {
    const style: CSSProperties = {
      left: arrowX !== null ? arrowX : undefined,
      top: arrowY !== null ? arrowY : undefined,
      right: undefined,
      bottom: undefined,
    }

    if (staticSide) style[staticSide] = -15

    return style
  }, [arrowX, arrowY, staticSide])

  const [isOpen, setIsOpen] = useState(false)
  const handleBlur = useCallback(() => setIsOpen(false), [])
  const handleFocus = useCallback(() => setIsOpen(true), [])
  const handleMouseEnter = useCallback(() => setIsOpen(true), [])
  const handleMouseLeave = useCallback(() => setIsOpen(false), [])

  // Detect whether the mouse is moving outside of the reference element. This is sometimes
  // necessary, because the tooltip might not always close as it should (e.g. when clicking
  // the reference element triggers a CPU-heavy operation.)
  useEffect(() => {
    if (!isOpen) return

    function handleWindowMouseMove(event: MouseEvent) {
      if (!referenceElement) return

      const isHoveringReference =
        referenceElement === event.target ||
        (event.target instanceof Node && referenceElement.contains(event.target))

      if (!isHoveringReference) {
        setIsOpen(false)
        window.removeEventListener('mousemove', handleWindowMouseMove)
      }
    }

    window.addEventListener('mousemove', handleWindowMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove)
    }
  }, [isOpen, referenceElement])

  // Close when `disabled` changes to `true`
  useEffect(() => {
    if (disabled) setIsOpen(false)
  }, [disabled])

  // Close when `content` changes to falsy
  useEffect(() => {
    if (!content) setIsOpen(false)
  }, [content])

  // Update reference
  useEffect(() => reference(referenceElement), [reference, referenceElement])

  const setArrow = useCallback(
    (arrowEl: HTMLDivElement | null) => {
      arrowRef.current = arrowEl
      update()
    },
    [update]
  )

  const setFloating = useCallback(
    (node: HTMLDivElement | null) => {
      forwardedRef.current = node
      floating(node)
    },
    [floating, forwardedRef]
  )

  const childRef: ForwardedRef<HTMLElement | null> = (childProp as any)?.ref

  const setReference = useCallback(
    (node: HTMLElement | null) => {
      if (typeof childRef === 'function') {
        childRef(node)
      } else if (childRef) {
        childRef.current = node
      }

      // childRef.current = node
      setReferenceElement(node)
    },
    [childRef]
  )

  const child = useMemo(() => {
    if (!childProp) return null

    return cloneElement(childProp, {
      onBlur: handleBlur,
      onFocus: handleFocus,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      ref: setReference,
    })
  }, [childProp, handleBlur, handleFocus, handleMouseEnter, handleMouseLeave, setReference])

  if (!child) return <></>

  if (disabled) return child

  const root = (
    <Root data-ui="Tooltip" {...restProps} ref={setFloating} style={rootStyle} zOffset={zOffset}>
      <Card
        data-ui="Tooltip__card"
        data-placement={placement}
        padding={padding}
        radius={2}
        scheme={scheme}
        shadow={shadow}
      >
        {content}
        <TooltipArrow ref={setArrow} style={arrowStyle} />
      </Card>
    </Root>
  )

  return (
    <>
      {child}

      {isOpen && (
        <>
          {portal ? (
            <Portal __unstable_name={typeof portal === 'string' ? portal : undefined}>
              {root}
            </Portal>
          ) : (
            root
          )}
        </>
      )}
    </>
  )
})
