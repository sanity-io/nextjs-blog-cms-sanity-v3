import {useContext} from 'react'
import {isRecord} from '../../lib/isRecord'
import {LayerContext} from './layerContext'
import {LayerContextValue} from './types'

/**
 * @public
 */
export function useLayer(): LayerContextValue {
  const value = useContext(LayerContext)

  if (!value) {
    throw new Error('useLayer(): missing context value')
  }

  // NOTE: This check is for future-compatiblity
  // - If the value is not an object, it’s not compatible with the current version
  // - If the value is an object, but doesn’t have `version: 0.0`, it’s not compatible with the current version
  if (!isRecord(value) || value.version !== 0.0) {
    throw new Error('useLayer(): the context value is not compatible')
  }

  return value
}
