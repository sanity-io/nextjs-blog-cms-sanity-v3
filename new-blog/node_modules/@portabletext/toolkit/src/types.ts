import type {
  ArbitraryTypedObject,
  PortableTextListItemBlock,
  PortableTextMarkDefinition,
  PortableTextSpan,
} from '@portabletext/types'

/**
 * List nesting mode for HTML, see the {@link nestLists | `nestLists()` function}
 */
export const LIST_NEST_MODE_HTML = 'html'

/**
 * List nesting mode for direct, nested lists, see the {@link nestLists | `nestLists()` function}
 */
export const LIST_NEST_MODE_DIRECT = 'direct'

/**
 * List nesting mode, see the {@link nestLists | `nestLists()` function}
 */
export type ToolkitListNestMode = 'html' | 'direct'

/**
 * Toolkit-specific type representing a nested list
 *
 * See the {@link nestLists | `nestLists()`` function} for more info
 */
export type ToolkitPortableTextList = ToolkitPortableTextHtmlList | ToolkitPortableTextDirectList

/**
 * Toolkit-specific type representing a nested list in HTML mode, where deeper lists are nested
 * inside of the _list items_, eg `<ul><li>Some text<ul><li>Deeper</li></ul></li></ul>`
 */
export interface ToolkitPortableTextHtmlList {
  /**
   * Type name, prefixed with `@` to signal that this is a toolkit-specific node.
   */
  _type: '@list'

  /**
   * Unique key for this list (within its parent)
   */
  _key: string

  /**
   * List mode, signaling that list nodes will appear as children of the _list items_
   */
  mode: 'html'

  /**
   * Level/depth of this list node (starts at `1`)
   */
  level: number

  /**
   * Style of this list item (`bullet`, `number` are common values, but can be customized)
   */
  listItem: string

  /**
   * Child nodes of this list - toolkit-specific list items which can themselves hold deeper lists
   */
  children: ToolkitPortableTextListItem[]
}

/**
 * Toolkit-specific type representing a nested list in "direct" mode, where deeper lists are nested
 * inside of the lists children, alongside other blocks.
 */
export interface ToolkitPortableTextDirectList {
  /**
   * Type name, prefixed with `@` to signal that this is a toolkit-specific node.
   */
  _type: '@list'

  /**
   * Unique key for this list (within its parent)
   */
  _key: string

  /**
   * List mode, signaling that list nodes can appear as direct children
   */
  mode: 'direct'

  /**
   * Level/depth of this list node (starts at `1`)
   */
  level: number

  /**
   * Style of this list item (`bullet`, `number` are common values, but can be customized)
   */
  listItem: string

  /**
   * Child nodes of this list - either portable text list items, or another, deeper list
   */
  children: (PortableTextListItemBlock | ToolkitPortableTextDirectList)[]
}

/**
 * Toolkit-specific type representing a list item block, but where the children can be another list
 */
export interface ToolkitPortableTextListItem
  extends PortableTextListItemBlock<
    PortableTextMarkDefinition,
    PortableTextSpan | ToolkitPortableTextList
  > {}

/**
 * Toolkit-specific type representing a text node, used when nesting spans.
 *
 * See the {@link buildMarksTree | `buildMarksTree()` function}
 */
export interface ToolkitTextNode {
  /**
   * Type name, prefixed with `@` to signal that this is a toolkit-specific node.
   */
  _type: '@text'

  /**
   * The actual string value of the text node
   */
  text: string
}

/**
 * Toolkit-specific type representing a portable text span that can hold other spans.
 * In this type, each span only has a single mark, instead of an array of them.
 */
export interface ToolkitNestedPortableTextSpan<
  M extends PortableTextMarkDefinition = PortableTextMarkDefinition
> {
  /**
   * Type name, prefixed with `@` to signal that this is a toolkit-specific node.
   */
  _type: '@span'

  /**
   * Unique key for this span
   */
  _key?: string

  /**
   * Holds the value (definition) of the mark in the case of annotations.
   * `undefined` if the mark is a decorator (strong, em or similar).
   */
  markDef?: M

  /**
   * The key of the mark definition (in the case of annotations).
   * `undefined` if the mark is a decorator (strong, em or similar).
   */
  markKey?: string

  /**
   * Type of the mark. For annotations, this is the `_type` property of the value.
   * For decorators, it will hold the name of the decorator (strong, em or similar).
   */
  markType: string

  /**
   * Child nodes of this span. Can be toolkit-specific text nodes, nested spans
   * or any inline object type.
   */
  children: (
    | ToolkitTextNode
    | ToolkitNestedPortableTextSpan<PortableTextMarkDefinition>
    | ArbitraryTypedObject
  )[]
}
