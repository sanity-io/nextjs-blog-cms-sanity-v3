import {useContext} from 'react'
import {isRecord} from '../../lib/isRecord'
import {PortalContext} from './portalContext'
import {PortalContextValue} from './types'

/**
 * @public
 */
export function usePortal(): PortalContextValue {
  const value = useContext(PortalContext)

  if (!value) {
    throw new Error('usePortal(): missing context value')
  }

  // NOTE: This check is for future-compatiblity
  // - If the value is not an object, it’s not compatible with the current version
  // - If the value is an object, but doesn’t have `version: 0.0`, it’s not compatible with the current version
  if (!isRecord(value) || value.version !== 0.0) {
    throw new Error('usePortal(): the context value is not compatible')
  }

  return value
}
