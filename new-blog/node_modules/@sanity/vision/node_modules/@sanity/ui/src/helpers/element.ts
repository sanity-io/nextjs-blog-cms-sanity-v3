/**
 * @internal
 */
export function _isEnterToClickElement(element: HTMLElement): boolean {
  return isHTMLAnchorElement(element) || isHTMLButtonElement(element)
}

/**
 * @internal
 */
export function isHTMLElement(node: unknown): node is HTMLElement {
  return node instanceof Node && node.nodeType === Node.ELEMENT_NODE
}

/**
 * @internal
 */
export function isHTMLAnchorElement(element: unknown): element is HTMLAnchorElement {
  return isHTMLElement(element) && element.nodeName === 'A'
}

/**
 * @internal
 */
export function isHTMLInputElement(element: unknown): element is HTMLInputElement {
  return isHTMLElement(element) && element.nodeName === 'INPUT'
}

/**
 * @internal
 */
export function isHTMLButtonElement(element: unknown): element is HTMLButtonElement {
  return isHTMLElement(element) && element.nodeName === 'BUTTON'
}

/**
 * @internal
 */
export function isHTMLSelectElement(element: unknown): element is HTMLSelectElement {
  return isHTMLElement(element) && element.nodeName === 'SELECT'
}

/**
 * @internal
 */
export function isHTMLTextAreaElement(element: unknown): element is HTMLTextAreaElement {
  return isHTMLElement(element) && element.nodeName === 'TEXTAREA'
}
