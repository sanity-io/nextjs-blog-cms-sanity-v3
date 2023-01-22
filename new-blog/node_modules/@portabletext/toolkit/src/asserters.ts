import type {
  ArbitraryTypedObject,
  PortableTextBlock,
  PortableTextListItemBlock,
  PortableTextSpan,
  TypedObject,
} from '@portabletext/types'
import type {ToolkitNestedPortableTextSpan, ToolkitPortableTextList, ToolkitTextNode} from './types'

/**
 * Strict check to determine if node is a correctly formatted Portable Text span.
 *
 * @param node - Node to check
 * @returns True if valid Portable Text span, otherwise false
 */
export function isPortableTextSpan(
  node: ArbitraryTypedObject | PortableTextSpan
): node is PortableTextSpan {
  return (
    node._type === 'span' &&
    'text' in node &&
    typeof node.text === 'string' &&
    (typeof node.marks === 'undefined' ||
      (Array.isArray(node.marks) && node.marks.every((mark) => typeof mark === 'string')))
  )
}

/**
 * Strict check to determine if node is a correctly formatted Portable Text block.
 *
 * @param node - Node to check
 * @returns True if valid Portable Text block, otherwise false
 */
export function isPortableTextBlock(
  node: PortableTextBlock | TypedObject
): node is PortableTextBlock {
  return (
    // A block doesn't _have_ to be named 'block' - to differentiate between
    // allowed child types and marks, one might name them differently
    typeof node._type === 'string' &&
    // Toolkit-types like nested spans are @-prefixed
    node._type[0] !== '@' &&
    // `markDefs` isn't _required_ per say, but if it's there, it needs to be an array
    (!('markDefs' in node) ||
      (Array.isArray(node.markDefs) &&
        // Every mark definition needs to have an `_key` to be mappable in child spans
        node.markDefs.every((def) => typeof def._key === 'string'))) &&
    // `children` is required and needs to be an array
    'children' in node &&
    Array.isArray(node.children) &&
    // All children are objects with `_type` (usually spans, but can contain other stuff)
    node.children.every((child) => typeof child === 'object' && '_type' in child)
  )
}

/**
 * Strict check to determine if node is a correctly formatted portable list item block.
 *
 * @param block - Block to check
 * @returns True if valid Portable Text list item block, otherwise false
 */
export function isPortableTextListItemBlock(
  block: PortableTextBlock | TypedObject
): block is PortableTextListItemBlock {
  return (
    isPortableTextBlock(block) &&
    'listItem' in block &&
    typeof block.listItem === 'string' &&
    (typeof block.level === 'undefined' || typeof block.level === 'number')
  )
}

/**
 * Loose check to determine if block is a toolkit list node.
 * Only checks `_type`, assumes correct structure.
 *
 * @param block - Block to check
 * @returns True if toolkit list, otherwise false
 */
export function isPortableTextToolkitList(
  block: TypedObject | ToolkitPortableTextList
): block is ToolkitPortableTextList {
  return block._type === '@list'
}

/**
 * Loose check to determine if span is a toolkit span node.
 * Only checks `_type`, assumes correct structure.
 *
 * @param span - Span to check
 * @returns True if toolkit span, otherwise false
 */
export function isPortableTextToolkitSpan(
  span: TypedObject | ToolkitNestedPortableTextSpan
): span is ToolkitNestedPortableTextSpan {
  return span._type === '@span'
}

/**
 * Loose check to determine if node is a toolkit text node.
 * Only checks `_type`, assumes correct structure.
 *
 * @param node - Node to check
 * @returns True if toolkit text node, otherwise false
 */
export function isPortableTextToolkitTextNode(
  node: TypedObject | ToolkitTextNode
): node is ToolkitTextNode {
  return node._type === '@text'
}
