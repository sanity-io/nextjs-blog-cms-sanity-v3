import {isHTMLAnchorElement, isHTMLButtonElement} from '../../helpers'

/**
 * @internal
 */
function _isFocusable(element: HTMLElement) {
  return (
    (isHTMLAnchorElement(element) && element.getAttribute('data-disabled') !== 'true') ||
    (isHTMLButtonElement(element) && !element.disabled)
  )
}

/**
 * @internal
 */
export function _getFocusableElements(elements: HTMLElement[]): HTMLElement[] {
  return elements.filter(_isFocusable)
}

/**
 * @internal
 */
export function _getDOMPath(rootElement: HTMLElement, el: HTMLElement): number[] {
  const path: number[] = []

  let e = el

  while (e !== rootElement) {
    const parentElement = e.parentElement

    if (!parentElement) return path

    const children = Array.from(parentElement.childNodes)
    const index = children.indexOf(e)

    path.unshift(index)

    if (parentElement === rootElement) {
      return path
    }

    e = parentElement
  }

  return path
}

const EMPTY_PATH: number[] = []

/**
 * @internal
 */
export function _sortElements(rootElement: HTMLElement | null, elements: HTMLElement[]): void {
  if (!rootElement) return

  const map = new WeakMap<HTMLElement, number[]>()

  for (const el of elements) {
    map.set(el, _getDOMPath(rootElement, el))
  }

  const _sort = (a: HTMLElement, b: HTMLElement) => {
    const _a = map.get(a) || EMPTY_PATH
    const _b = map.get(b) || EMPTY_PATH

    const len = Math.max(_a.length, _b.length)

    // Loop until there are different indexes
    for (let i = 0; i < len; i += 1) {
      const aIndex = _a[i] || -1
      const bIndex = _b[i] || -1

      if (aIndex !== bIndex) {
        return aIndex - bIndex
      }
    }

    return 0
  }

  elements.sort(_sort)
}
