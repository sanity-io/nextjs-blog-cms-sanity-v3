import maxSizeModifier from 'popper-max-size-modifier'
import {Modifier} from 'react-popper'
import {PopoverModifiersProps} from './types'

/*

The order of popper phases:

- beforeRead
- read
- afterRead
- beforeMain
- main
- afterMain
- beforeWrite
- write
- afterWrite

*/

export function getPopoverModifiers(props: PopoverModifiersProps): Modifier<any, any>[] {
  const {
    allowedAutoPlacements,
    arrow,
    arrowElement,
    boundaryElement,
    constrainSize,
    distance,
    fallbackPlacements,
    margins,
    matchReferenceWidth,
    open,
    preventOverflow,
    skidding,
    tether,
    tetherOffset,
  } = props

  // NOTE: For later viewers:
  // Prior to adding this change, the popover would get `maxWidth: 0` the 2nd time it
  // was opened, when used with `constrainSize`. I was looking for a way to "reset"
  // the size of the popover as measured by Popper.js, and this seems to be a workaround.
  if (!open) {
    return []
  }

  const detectOverflowOptions = {
    altAxis: !constrainSize,
    boundary: boundaryElement || undefined,
    padding: 8,
    tether,
    tetherOffset,
  }

  return [
    constrainSize && {
      ...maxSizeModifier,
      options: detectOverflowOptions,
    },
    constrainSize && {
      name: 'applyMaxSize',
      enabled: true,
      phase: 'beforeWrite',
      requires: ['maxSize'],
      fn({state}: any) {
        const {width, height} = state.modifiersData.maxSize

        state.styles.popper = {
          ...state.styles.popper,
          maxWidth: `${width}px`,
          maxHeight: `${height}px`,
        }
      },
    },
    arrow && {
      name: 'arrow',
      options: {
        element: arrowElement,
        padding: 4,
      },
    },
    (constrainSize || preventOverflow) && {
      name: 'preventOverflow',
      options: detectOverflowOptions,
    },
    {
      name: 'offset',
      options: {
        offset: [skidding, distance],
      },
    },
    margins && {
      name: 'margins',
      enabled: true,
      phase: 'beforeRead',
      fn: ({state}: any) => {
        const {rects} = state

        if (rects.reference) {
          rects.reference.x += margins[3]
          rects.reference.y += margins[1]
          rects.reference.width -= margins[1] + margins[3]
          rects.reference.height -= margins[0] + margins[2]
        }
      },
    },
    {
      name: 'flip',
      options: {
        allowedAutoPlacements,
        boundary: boundaryElement || undefined,
        fallbackPlacements,
        padding: 8,
      },
    },
    matchReferenceWidth && {
      name: 'matchWidth',
      enabled: true,
      phase: 'beforeWrite',
      requires: ['computeStyles'],
      fn({state}: any) {
        const {width} = state.rects.reference

        state.styles.popper.width = `${width}px`
      },
      effect: ({state}: any) => {
        const refElement = state.elements.reference

        if (refElement instanceof HTMLElement) {
          state.elements.popper.style.width = `${
            refElement.offsetWidth - (margins ? margins[1] + margins[3] : 0)
          }px`
        }
      },
    },
  ].filter(Boolean) as Modifier<any, any>[]
}
