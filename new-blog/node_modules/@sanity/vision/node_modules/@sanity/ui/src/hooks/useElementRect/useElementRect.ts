import {useElementSize} from '../useElementSize'

/**
 * Subscribe to the rect of a DOM element.
 * @beta
 *
 * @deprecated Use `useElementSize` instead
 */
export function useElementRect(element: HTMLElement | null): DOMRectReadOnly | null {
  const elementSize = useElementSize(element)

  return elementSize?._contentRect || null
}
