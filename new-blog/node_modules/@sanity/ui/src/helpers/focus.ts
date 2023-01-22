import {
  isHTMLElement,
  isHTMLAnchorElement,
  isHTMLInputElement,
  isHTMLButtonElement,
  isHTMLSelectElement,
  isHTMLTextAreaElement,
} from './element'

// export const globalFocusState = {
//   IgnoreUtilFocusChanges: false,
// }

/**
 * @internal
 */
export function _hasFocus(element: HTMLElement): boolean {
  return Boolean(document.activeElement) && element.contains(document.activeElement)
}

/**
 * @internal
 */
export function isFocusable(element: HTMLElement): boolean {
  if (
    element.tabIndex > 0 ||
    (element.tabIndex === 0 && element.getAttribute('tabIndex') !== null)
  ) {
    return true
  }

  if (isHTMLAnchorElement(element)) {
    return Boolean(element.href) && element.rel !== 'ignore'
  }

  if (isHTMLInputElement(element)) {
    return element.type !== 'hidden' && element.type !== 'file' && !element.disabled
  }

  if (
    isHTMLButtonElement(element) ||
    isHTMLSelectElement(element) ||
    isHTMLTextAreaElement(element)
  ) {
    return !element.disabled
  }

  return false
}

/**
 * @internal
 */
export function attemptFocus(element: HTMLElement): boolean {
  if (!isFocusable(element)) {
    return false
  }

  // globalFocusState.IgnoreUtilFocusChanges = true

  try {
    element.focus()
  } catch (_) {
    // ignore
  }

  // globalFocusState.IgnoreUtilFocusChanges = false

  return document.activeElement === element
}

/**
 * @internal
 */
export function focusFirstDescendant(element: HTMLElement): boolean {
  for (let i = 0; i < element.childNodes.length; i++) {
    const child = element.childNodes[i]

    if (isHTMLElement(child) && (attemptFocus(child) || focusFirstDescendant(child))) {
      return true
    }
  }

  return false
}

/**
 * @internal
 */
export function focusLastDescendant(element: HTMLElement): boolean {
  for (let i = element.childNodes.length - 1; i >= 0; i--) {
    const child = element.childNodes[i]

    if (isHTMLElement(child) && (attemptFocus(child) || focusLastDescendant(child))) {
      return true
    }
  }

  return false
}
