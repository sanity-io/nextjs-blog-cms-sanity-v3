import React, {ReactNode, useContext, useMemo} from 'react'
import {
  LIST_NEST_MODE_HTML,
  ToolkitNestedPortableTextSpan,
  ToolkitTextNode,
} from '@portabletext/toolkit'
import type {
  MissingComponentHandler,
  NodeRenderer,
  PortableTextProps,
  PortableTextReactComponents,
  ReactPortableTextList,
  Serializable,
  SerializedBlock,
} from './types'
import {
  isPortableTextBlock,
  isPortableTextListItemBlock,
  isPortableTextToolkitList,
  isPortableTextToolkitSpan,
  isPortableTextToolkitTextNode,
  nestLists,
  spanToPlainText,
  buildMarksTree,
} from '@portabletext/toolkit'
import type {
  PortableTextBlock,
  PortableTextListItemBlock,
  PortableTextMarkDefinition,
  PortableTextSpan,
  TypedObject,
} from '@portabletext/types'
import {mergeComponents} from './components/merge'
import {PortableTextComponentsContext} from './context'
import {
  printWarning,
  unknownBlockStyleWarning,
  unknownListItemStyleWarning,
  unknownListStyleWarning,
  unknownMarkWarning,
  unknownTypeWarning,
} from './warnings'

export function PortableText<B extends TypedObject = PortableTextBlock>({
  value: input,
  components: componentOverrides,
  listNestingMode,
  onMissingComponent: missingComponentHandler = printWarning,
}: PortableTextProps<B>) {
  const handleMissingComponent = missingComponentHandler || noop
  const blocks = Array.isArray(input) ? input : [input]
  const nested = nestLists(blocks, listNestingMode || LIST_NEST_MODE_HTML)

  const parentComponents = useContext(PortableTextComponentsContext)
  const components = useMemo(() => {
    return componentOverrides
      ? mergeComponents(parentComponents, componentOverrides)
      : parentComponents
  }, [parentComponents, componentOverrides])

  const renderNode = useMemo(
    () => getNodeRenderer(components, handleMissingComponent),
    [components, handleMissingComponent]
  )
  const rendered = nested.map((node, index) =>
    renderNode({node: node, index, isInline: false, renderNode})
  )

  return componentOverrides ? (
    <PortableTextComponentsContext.Provider value={components}>
      {rendered}
    </PortableTextComponentsContext.Provider>
  ) : (
    <>{rendered}</>
  )
}

const getNodeRenderer = (
  components: PortableTextReactComponents,
  handleMissingComponent: MissingComponentHandler
): NodeRenderer => {
  function renderNode<N extends TypedObject>(options: Serializable<N>): ReactNode {
    const {node, index, isInline} = options
    const key = node._key || `node-${index}`

    if (isPortableTextToolkitList(node)) {
      return renderList(node, index, key)
    }

    if (isPortableTextListItemBlock(node)) {
      return renderListItem(node, index, key)
    }

    if (isPortableTextToolkitSpan(node)) {
      return renderSpan(node, index, key)
    }

    if (isPortableTextBlock(node)) {
      return renderBlock(node, index, key, isInline)
    }

    if (isPortableTextToolkitTextNode(node)) {
      return renderText(node, key)
    }

    return renderCustomBlock(node, index, key, isInline)
  }

  /* eslint-disable react/jsx-no-bind */
  function renderListItem(
    node: PortableTextListItemBlock<PortableTextMarkDefinition, PortableTextSpan>,
    index: number,
    key: string
  ) {
    const tree = serializeBlock({node, index, isInline: false, renderNode})
    const renderer = components.listItem
    const handler = typeof renderer === 'function' ? renderer : renderer[node.listItem]
    const Li = handler || components.unknownListItem

    if (Li === components.unknownListItem) {
      const style = node.listItem || 'bullet'
      handleMissingComponent(unknownListItemStyleWarning(style), {
        type: style,
        nodeType: 'listItemStyle',
      })
    }

    let children = tree.children
    if (node.style && node.style !== 'normal') {
      // Wrap any other style in whatever the block serializer says to use
      const {listItem, ...blockNode} = node
      children = renderNode({node: blockNode, index, isInline: false, renderNode})
    }

    return (
      <Li key={key} value={node} index={index} isInline={false} renderNode={renderNode}>
        {children}
      </Li>
    )
  }

  function renderList(node: ReactPortableTextList, index: number, key: string) {
    const children = node.children.map((child, childIndex) =>
      renderNode({
        node: child._key ? child : {...child, _key: `li-${index}-${childIndex}`},
        index: index,
        isInline: false,
        renderNode,
      })
    )

    const component = components.list
    const handler = typeof component === 'function' ? component : component[node.listItem]
    const List = handler || components.unknownList

    if (List === components.unknownList) {
      const style = node.listItem || 'bullet'
      handleMissingComponent(unknownListStyleWarning(style), {nodeType: 'listStyle', type: style})
    }

    return (
      <List key={key} value={node} index={index} isInline={false} renderNode={renderNode}>
        {children}
      </List>
    )
  }

  function renderSpan(node: ToolkitNestedPortableTextSpan, _index: number, key: string) {
    const {markDef, markType, markKey} = node
    const Span = components.marks[markType] || components.unknownMark
    const children = node.children.map((child, childIndex) =>
      renderNode({node: child, index: childIndex, isInline: true, renderNode})
    )

    if (Span === components.unknownMark) {
      handleMissingComponent(unknownMarkWarning(markType), {nodeType: 'mark', type: markType})
    }

    return (
      <Span
        key={key}
        text={spanToPlainText(node)}
        value={markDef}
        markType={markType}
        markKey={markKey}
        renderNode={renderNode}
      >
        {children}
      </Span>
    )
  }

  function renderBlock(node: PortableTextBlock, index: number, key: string, isInline: boolean) {
    const {_key, ...props} = serializeBlock({node, index, isInline, renderNode})
    const style = props.node.style || 'normal'
    const handler =
      typeof components.block === 'function' ? components.block : components.block[style]
    const Block = handler || components.unknownBlockStyle

    if (Block === components.unknownBlockStyle) {
      handleMissingComponent(unknownBlockStyleWarning(style), {
        nodeType: 'blockStyle',
        type: style,
      })
    }

    return <Block key={key} {...props} value={props.node} renderNode={renderNode} />
  }

  function renderText(node: ToolkitTextNode, key: string) {
    if (node.text === '\n') {
      const HardBreak = components.hardBreak
      return HardBreak ? <HardBreak key={key} /> : '\n'
    }

    return node.text
  }

  function renderCustomBlock(node: TypedObject, index: number, key: string, isInline: boolean) {
    const Node = components.types[node._type]

    const nodeOptions = {
      value: node,
      isInline,
      index,
      renderNode,
    }

    if (Node) {
      return <Node key={key} {...nodeOptions} />
    }

    handleMissingComponent(unknownTypeWarning(node._type), {nodeType: 'block', type: node._type})

    const UnknownType = components.unknownType
    return <UnknownType key={key} {...nodeOptions} />
  }
  /* eslint-enable react/jsx-no-bind */

  return renderNode
}

function serializeBlock(options: Serializable<PortableTextBlock>): SerializedBlock {
  const {node, index, isInline, renderNode} = options
  const tree = buildMarksTree(node)
  const children = tree.map((child, i) =>
    renderNode({node: child, isInline: true, index: i, renderNode})
  )

  return {
    _key: node._key || `block-${index}`,
    children,
    index,
    isInline,
    node,
  }
}

function noop() {
  // Intentional noop
}
