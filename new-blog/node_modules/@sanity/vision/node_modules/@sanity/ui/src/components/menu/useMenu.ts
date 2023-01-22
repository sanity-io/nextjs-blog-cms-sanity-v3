import {useContext} from 'react'
import {isRecord} from '../../lib/isRecord'
import {MenuContext, MenuContextValue} from './menuContext'

export function useMenu(): MenuContextValue {
  const value = useContext(MenuContext)

  if (!value) {
    throw new Error('useMenu(): missing context value')
  }

  // NOTE: This check is for future-compatiblity
  // - If the value is not an object, it’s not compatible with the current version
  // - If the value is an object, but doesn’t have `version: 0.0`, it’s not compatible with the current version
  if (!isRecord(value) || value.version !== 0.0) {
    throw new Error('useMenu(): the context value is not compatible')
  }

  return value
}
