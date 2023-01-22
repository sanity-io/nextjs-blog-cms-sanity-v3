import type {
  ArbitraryTypedObject,
  PortableTextBlock,
  PortableTextMarkDefinition,
} from '@portabletext/types'
import type {ToolkitNestedPortableTextSpan, ToolkitTextNode} from './types'
import {isPortableTextSpan} from './asserters'
import {sortMarksByOccurences} from './sortMarksByOccurences'

/**
 * Takes a Portable Text block and returns a nested tree of nodes optimized for rendering
 * in HTML-like environments where you want marks/annotations to be nested inside of eachother.
 * For instance, a naive span-by-span rendering might yield:
 *
 * ```html
 * <strong>This block contains </strong>
 * <strong><a href="https://some.url/">a link</a></strong>
 * <strong> and some bolded and </strong>
 * <em><strong>italicized text</strong></em>
 * ```
 *
 * ...whereas an optimal order would be:
 *
 * ```html
 * <strong>
 *   This block contains <a href="https://some.url/">a link</a>
 *   and some bolded and <em>italicized text</em>
 * </strong>
 * ```
 *
 * Note that since "native" Portable Text spans cannot be nested,
 * this function returns an array of "toolkit specific" types:
 * {@link ToolkitTextNode | `@text`} and {@link ToolkitNestedPortableTextSpan | `@span` }.
 *
 * The toolkit-specific type can hold both types, as well as any arbitrary inline objects,
 * creating an actual tree.
 *
 * @param block - The Portable Text block to create a tree of nodes from
 * @returns Array of (potentially) nested spans, text nodes and/or arbitrary inline objects
 */
export function buildMarksTree<M extends PortableTextMarkDefinition = PortableTextMarkDefinition>(
  block: PortableTextBlock<M>
): (ToolkitNestedPortableTextSpan<M> | ToolkitTextNode | ArbitraryTypedObject)[] {
  const {children, markDefs = []} = block
  if (!children || !children.length) {
    return []
  }

  const sortedMarks = children.map(sortMarksByOccurences)

  const rootNode: ToolkitNestedPortableTextSpan<M> = {
    _type: '@span',
    children: [],
    markType: '<unknown>',
  }

  let nodeStack: ToolkitNestedPortableTextSpan<M>[] = [rootNode]

  for (let i = 0; i < children.length; i++) {
    const span = children[i]
    if (!span) {
      continue
    }

    const marksNeeded = sortedMarks[i] || []
    let pos = 1

    // Start at position one. Root is always plain and should never be removed
    if (nodeStack.length > 1) {
      for (pos; pos < nodeStack.length; pos++) {
        const mark = nodeStack[pos]?.markKey || ''
        const index = marksNeeded.indexOf(mark)

        if (index === -1) {
          break
        }

        marksNeeded.splice(index, 1)
      }
    }

    // Keep from beginning to first miss
    nodeStack = nodeStack.slice(0, pos)

    // Add needed nodes
    let currentNode = nodeStack[nodeStack.length - 1]
    if (!currentNode) {
      continue
    }

    for (const markKey of marksNeeded) {
      const markDef = markDefs.find((def) => def._key === markKey)
      const markType = markDef ? markDef._type : markKey
      const node: ToolkitNestedPortableTextSpan<M> = {
        _type: '@span',
        _key: span._key,
        children: [],
        markDef,
        markType,
        markKey,
      }

      currentNode.children.push(node)
      nodeStack.push(node)
      currentNode = node
    }

    // Split at newlines to make individual line chunks, but keep newline
    // characters as individual elements in the array. We use these characters
    // in the span serializer to trigger hard-break rendering
    if (isPortableTextSpan(span)) {
      const lines = span.text.split('\n')
      for (let line = lines.length; line-- > 1; ) {
        lines.splice(line, 0, '\n')
      }

      currentNode.children = currentNode.children.concat(
        lines.map((text) => ({_type: '@text', text}))
      )
    } else {
      // This is some other inline object, not a text span
      currentNode.children = currentNode.children.concat(span)
    }
  }

  return rootNode.children
}
