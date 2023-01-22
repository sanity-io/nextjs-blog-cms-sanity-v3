import {useContext} from 'react'
import {isRecord} from '../lib/isRecord'
import {ThemeContext} from './themeContext'
import {ThemeContextValue} from './types'

/**
 * @public
 */
export function useRootTheme(): ThemeContextValue {
  const value: unknown = useContext(ThemeContext)

  if (!value) {
    throw new Error('useRootTheme(): missing context value')
  }

  // NOTE: This check is for future-compatiblity
  // - If the value is not an object, it’s not compatible with the current version
  // - If the value is an object, but doesn’t have `version: 0.0`, it’s not compatible with the current version
  if (!isRecord(value) || value.version !== 0.0) {
    throw new Error('useRootTheme(): the context value is not compatible')
  }

  return value as any as ThemeContextValue
}
