import type {PortableTextSpan, TypedObject} from '@portabletext/types'
import {isPortableTextSpan} from './asserters'

const knownDecorators = ['strong', 'em', 'code', 'underline', 'strike-through']

/**
 * Figures out the optimal order of marks, in order to minimize the amount of
 * nesting/repeated elements in environments such as HTML. For instance, a naive
 * implementation might render something like:
 *
 * ```html
 * <strong>This block contains </strong>
 * <strong><a href="https://some.url/">a link</a></strong>
 * <strong> and some bolded text</strong>
 * ```
 *
 * ...whereas an optimal order would be:
 *
 * ```html
 * <strong>
 *   This block contains <a href="https://some.url/">a link</a> and some bolded text
 * </strong>
 * ```
 *
 * This is particularly necessary for cases like links, where you don't want multiple
 * individual links for different segments of the link text, even if parts of it are
 * bolded/italicized.
 *
 * This function is meant to be used like: `block.children.map(sortMarksByOccurences)`,
 * and is used internally in {@link buildMarksTree | `buildMarksTree()`}.
 *
 * The marks are sorted in the following order:
 *
 *  1. Marks that are shared amongst the most adjacent siblings
 *  2. Non-default marks (links, custom metadata)
 *  3. Decorators (bold, emphasis, code etc), in a predefined, preferred order
 *
 * @param span - The current span to sort
 * @param index - The index of the current span within the block
 * @param blockChildren - All children of the block being sorted
 * @returns Array of decorators and annotations, sorted by "most adjacent siblings"
 */
export function sortMarksByOccurences(
  span: PortableTextSpan | TypedObject,
  index: number,
  blockChildren: (PortableTextSpan | TypedObject)[]
): string[] {
  if (!isPortableTextSpan(span) || !span.marks) {
    return []
  }

  if (!span.marks.length) {
    return []
  }

  // Slicing because we'll be sorting with `sort()`, which mutates
  const marks = span.marks.slice()
  const occurences: Record<string, number> = {}
  marks.forEach((mark) => {
    occurences[mark] = 1

    for (let siblingIndex = index + 1; siblingIndex < blockChildren.length; siblingIndex++) {
      const sibling = blockChildren[siblingIndex]

      if (
        sibling &&
        isPortableTextSpan(sibling) &&
        Array.isArray(sibling.marks) &&
        sibling.marks.indexOf(mark) !== -1
      ) {
        occurences[mark]++
      } else {
        break
      }
    }
  })

  return marks.sort((markA, markB) => sortMarks(occurences, markA, markB))
}

function sortMarks<U extends string, T extends Record<U, number>>(
  occurences: T,
  markA: U,
  markB: U
): number {
  const aOccurences = occurences[markA]
  const bOccurences = occurences[markB]

  if (aOccurences !== bOccurences) {
    return bOccurences - aOccurences
  }

  const aKnownPos = knownDecorators.indexOf(markA)
  const bKnownPos = knownDecorators.indexOf(markB)

  // Sort known decorators last
  if (aKnownPos !== bKnownPos) {
    return aKnownPos - bKnownPos
  }

  // Sort other marks simply by key
  return markA.localeCompare(markB)
}
