import type {PortableTextReactComponents, PortableTextComponents} from '../types'

export function mergeComponents(
  parent: PortableTextReactComponents,
  overrides: PortableTextComponents
): PortableTextReactComponents {
  const {block, list, listItem, marks, types, ...rest} = overrides
  // @todo figure out how to not `as ...` these
  return {
    ...parent,
    block: mergeDeeply(parent, overrides, 'block') as PortableTextReactComponents['block'],
    list: mergeDeeply(parent, overrides, 'list') as PortableTextReactComponents['list'],
    listItem: mergeDeeply(parent, overrides, 'listItem') as PortableTextReactComponents['listItem'],
    marks: mergeDeeply(parent, overrides, 'marks') as PortableTextReactComponents['marks'],
    types: mergeDeeply(parent, overrides, 'types') as PortableTextReactComponents['types'],
    ...rest,
  }
}

function mergeDeeply(
  parent: PortableTextReactComponents,
  overrides: PortableTextComponents,
  key: 'block' | 'list' | 'listItem' | 'marks' | 'types'
): PortableTextReactComponents[typeof key] {
  const override = overrides[key]
  const parentVal = parent[key]

  if (typeof override === 'function') {
    return override
  }

  if (override && typeof parentVal === 'function') {
    return override
  }

  if (override) {
    return {...parentVal, ...override} as PortableTextReactComponents[typeof key]
  }

  return parentVal
}
