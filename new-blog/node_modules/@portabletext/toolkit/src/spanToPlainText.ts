import type {ToolkitNestedPortableTextSpan} from './types'
import {isPortableTextToolkitSpan, isPortableTextToolkitTextNode} from './asserters'

/**
 * Returns the plain-text representation of a
 * {@link ToolkitNestedPortableTextSpan | toolkit-specific Portable Text span}.
 *
 * Useful if you have a subset of nested nodes and want the text from just those,
 * instead of for the entire Portable Text block.
 *
 * @param span - Span node to get text from (Portable Text toolkit specific type)
 * @returns The plain-text version of the span
 */
export function spanToPlainText(span: ToolkitNestedPortableTextSpan): string {
  let text = ''
  span.children.forEach((current) => {
    if (isPortableTextToolkitTextNode(current)) {
      text += current.text
    } else if (isPortableTextToolkitSpan(current)) {
      text += spanToPlainText(current)
    }
  })
  return text
}
