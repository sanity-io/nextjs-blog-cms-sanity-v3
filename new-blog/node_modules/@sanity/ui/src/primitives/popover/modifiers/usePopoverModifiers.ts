import {useMemo} from 'react'
import {Modifier} from 'react-popper'

import {getPopoverModifiers} from './getPopoverModifiers'
import {PopoverModifiersProps} from './types'

export function usePopoverModifiers(props: PopoverModifiersProps): Modifier<any, any>[] {
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

  return useMemo(() => {
    return getPopoverModifiers({
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
    })
  }, [
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
  ])
}
