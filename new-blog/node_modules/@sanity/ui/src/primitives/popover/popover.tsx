import React, {cloneElement, forwardRef, useCallback, useEffect, useMemo, useState} from 'react'
import {usePopper} from 'react-popper'
import styled, {css} from 'styled-components'
import {EMPTY_RECORD} from '../../constants'
import {useForwardedRef} from '../../hooks'
import {ThemeColorSchemeKey, useTheme} from '../../theme'
import {CardTone, Placement, PopoverMargins} from '../../types'
import {Layer, LayerProps, Portal, useBoundaryElement, usePortal} from '../../utils'
import {Card} from '../card'
import {ResponsiveWidthStyleProps} from '../container'
import {responsiveContainerWidthStyle} from '../container/styles'
import {ResponsiveRadiusProps, ResponsiveShadowProps, ResponsiveWidthProps} from '../types'
import {PopoverArrow} from './arrow'
import {usePopoverModifiers} from './modifiers'

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
  allowedAutoPlacements?: Placement[]
  arrow?: boolean
  boundaryElement?: HTMLElement | null
  children?: React.ReactElement
  constrainSize?: boolean
  content?: React.ReactNode
  disabled?: boolean
  fallbackPlacements?: Placement[]
  open?: boolean
  padding?: number | number[]
  placement?: Placement
  portal?: boolean | string
  preventOverflow?: boolean
  referenceElement?: HTMLElement | null
  matchReferenceWidth?: boolean
  scheme?: ThemeColorSchemeKey
  tether?: boolean
  tetherOffset?: number | ((...args: any[]) => number)
  tone?: CardTone
}

const Root = styled(Layer)<{$preventOverflow?: boolean}>(
  ({$preventOverflow}) => css`
    pointer-events: none;
    display: flex;
    flex-direction: column;
    max-width: calc(100% - 16px);

    & > * {
      min-height: 0;
    }

    /* Hide the popover when the reference element is out of bounds */
    ${$preventOverflow &&
    css`
      &[data-popper-reference-hidden='true'] {
        display: none;
      }
    `}
  `
)

const PopoverCard = styled(Card)<
  ResponsiveWidthStyleProps & {
    $constrainSize?: boolean
    $preventOverflow?: boolean
  }
>(
  ({$constrainSize}) => css`
    flex: 1;
    max-height: ${$constrainSize && '100%'};
    pointer-events: all;

    && {
      display: flex;
    }

    flex-direction: column;

    & > * {
      min-height: 0;
    }

    ${responsiveContainerWidthStyle}
  `
)

/**
 * @public
 */
export const Popover = forwardRef(function Popover(
  props: PopoverProps &
    Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'children' | 'content' | 'width'>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const boundaryElementContext = useBoundaryElement()
  const theme = useTheme()
  const {
    __unstable_margins: margins,
    allowedAutoPlacements,
    arrow = true,
    boundaryElement: boundaryElementProp = boundaryElementContext.element,
    children: child,
    content,
    constrainSize,
    disabled,
    fallbackPlacements,
    open = false,
    padding,
    placement = 'bottom',
    portal: portalProp = false,
    preventOverflow,
    radius = 3,
    referenceElement: referenceElementProp,
    matchReferenceWidth,
    shadow = 3,
    scheme,
    style = EMPTY_RECORD,
    tether,
    tetherOffset,
    tone = 'inherit',
    width = 0,
    zOffset = theme.sanity.layer?.popover.zOffset,
    ...restProps
  } = props
  const forwardedRef = useForwardedRef(ref)
  const portal = usePortal()
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null)
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null)
  const popperReferenceElement = referenceElementProp || referenceElement

  const modifiers = usePopoverModifiers({
    allowedAutoPlacements,
    arrow,
    arrowElement,
    boundaryElement: boundaryElementProp || portal.boundaryElement,
    constrainSize,
    distance: arrow ? 4 : 0,
    fallbackPlacements,
    margins,
    matchReferenceWidth,
    open,
    preventOverflow,
    skidding: 0,
    tether,
    tetherOffset,
  })

  const popper = usePopper(popperReferenceElement, popperElement, {
    placement,
    modifiers,
  })

  const {attributes, forceUpdate, styles} = popper

  const setRef = useCallback(
    (el: HTMLElement | null) => {
      const childRef = (child as any).ref

      setReferenceElement(el)

      if (typeof childRef === 'function') {
        childRef(el)
      } else if (childRef) {
        childRef.current = el
      }
    },
    [child]
  )

  const setRootRef = useCallback(
    (el: HTMLDivElement | null) => {
      setPopperElement(el)
      forwardedRef.current = el
    },
    [forwardedRef]
  )

  const popoverStyle = useMemo(() => ({...style, ...styles.popper}), [style, styles])

  useEffect(() => {
    if (forceUpdate) {
      try {
        forceUpdate()
      } catch (_) {
        // ignore caught error
      }
    }
  }, [content, forceUpdate, open, popperReferenceElement])

  if (disabled) {
    return child || <></>
  }

  const node = (
    <Root
      data-ui="Popover"
      {...restProps}
      $preventOverflow={preventOverflow}
      ref={setRootRef}
      style={popoverStyle}
      zOffset={zOffset}
      {...attributes.popper}
    >
      <PopoverCard
        $constrainSize={constrainSize}
        data-ui="PopoverCard"
        padding={padding}
        radius={radius}
        scheme={scheme}
        shadow={shadow}
        tone={tone}
        width={width as any}
      >
        {arrow && <PopoverArrow ref={setArrowElement} style={styles.arrow} />}
        {content}
      </PopoverCard>
    </Root>
  )

  return (
    <>
      {child && !referenceElementProp ? cloneElement(child, {ref: setRef}) : child || <></>}

      {open && (
        <>
          {portalProp && (
            <Portal __unstable_name={typeof portalProp === 'string' ? portalProp : undefined}>
              {node}
            </Portal>
          )}

          {!portalProp && node}
        </>
      )}
    </>
  )
})
