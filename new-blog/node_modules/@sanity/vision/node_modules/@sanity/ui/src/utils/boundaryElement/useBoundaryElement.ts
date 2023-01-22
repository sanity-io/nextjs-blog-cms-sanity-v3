import {useContext} from 'react'
import {isRecord} from '../../lib/isRecord'
import {BoundaryElementContext} from './boundaryElementContext'
import {BoundaryElementContextValue} from './types'

const DEFAULT_VALUE: BoundaryElementContextValue = {
  version: 0.0,
  element: null,
}

/**
 * @public
 */
export function useBoundaryElement(): BoundaryElementContextValue {
  const value = useContext(BoundaryElementContext)

  // NOTE: This check is for future-compatiblity
  // - If the value is not an object, it’s not compatible with the current version
  // - If the value is an object, but doesn’t have `version: 0.0`, it’s not compatible with the current version
  if (value && (!isRecord(value) || value.version !== 0.0)) {
    throw new Error('useBoundaryElement(): the context value is not compatible')
  }

  return value || DEFAULT_VALUE
}
