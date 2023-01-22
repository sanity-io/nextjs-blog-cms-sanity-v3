import type {ArbitraryTypedObject, PortableTextBlock} from '@portabletext/types'
import {isPortableTextBlock, isPortableTextSpan} from './asserters'

const leadingSpace = /^\s/
const trailingSpace = /^\s/

/**
 * Takes a Portable Text block (or an array of them) and returns the text value
 * of all the Portable Text span nodes. Adds whitespace when encountering inline,
 * non-span nodes to ensure text flow is optimal.
 *
 * Note that this only accounts for regular Portable Text blocks - any text inside
 * custom content types are not included in the output.
 *
 * @param block - Single block or an array of blocks to extract text from
 * @returns The plain-text content of the blocks
 */
export function toPlainText(
  block: PortableTextBlock | ArbitraryTypedObject[] | PortableTextBlock[]
): string {
  const blocks = Array.isArray(block) ? block : [block]
  let text = ''

  blocks.forEach((current, index) => {
    if (!isPortableTextBlock(current)) {
      return
    }

    let pad = false
    current.children.forEach((span) => {
      if (isPortableTextSpan(span)) {
        // If the previous element was a non-span, and we have no natural whitespace
        // between the previous and the next span, insert it to give the spans some
        // room to breathe. However, don't do so if this is the first span.
        text += pad && text && !trailingSpace.test(text) && !leadingSpace.test(span.text) ? ' ' : ''
        text += span.text
        pad = false
      } else {
        pad = true
      }
    })

    if (index !== blocks.length - 1) {
      text += '\n\n'
    }
  })

  return text
}
