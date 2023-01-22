import {Elements, Middleware, detectOverflow} from '@floating-ui/react-dom'
import {PopoverMargins} from '../../../types'

export interface SizeMiddlewareApplyOptions {
  availableWidth: number
  availableHeight: number
  elements: Elements
  referenceWidth: number
}

export function size(options: {
  apply: (args: SizeMiddlewareApplyOptions) => void
  boundaryElement?: HTMLElement | null
  constrainSize: boolean
  margins: PopoverMargins
  matchReferenceWidth?: boolean
  padding?: number
}): Middleware {
  const {apply, margins, padding = 0} = options

  return {
    name: '@sanity/ui/size',
    async fn(args) {
      const {elements, placement, platform, rects} = args
      const {floating, reference} = rects

      const overflow = await detectOverflow(args, {
        altBoundary: true,
        boundary: options.boundaryElement || undefined,
        elementContext: 'floating',
        padding,
        rootBoundary: 'viewport',
      })

      let maxWidth = Infinity
      let maxHeight = Infinity

      const floatingW = floating.width
      const floatingH = floating.height

      if (placement.includes('top')) {
        maxWidth = floatingW - (overflow.left + overflow.right)
        maxHeight = floatingH - overflow.top
      }

      if (placement.includes('right')) {
        maxWidth = floatingW - overflow.right
        maxHeight = floatingH - (overflow.top + overflow.bottom)
      }

      if (placement.includes('bottom')) {
        maxWidth = floatingW - (overflow.left + overflow.right)
        maxHeight = floatingH - overflow.bottom
      }

      if (placement.includes('left')) {
        maxWidth = floatingW - overflow.left
        maxHeight = floatingH - (overflow.top + overflow.bottom)
      }

      // IMPORTANT – APPLY ELEMENT STYLES HERE
      // Elements need to be resized BEFORE the `platform.getDimensions` call below
      apply({
        availableWidth: maxWidth - margins[1] - margins[3],
        availableHeight: maxHeight - margins[0] - margins[2],
        elements,
        referenceWidth: reference.width - margins[1] - margins[3],
      })

      const nextDimensions = await platform.getDimensions(elements.floating)

      const targetH = nextDimensions.height
      const targetW = nextDimensions.width

      if (floatingW !== targetW || floatingH !== targetH) {
        return {reset: {rects: true}}
      }

      return {}
    },
  }
}
