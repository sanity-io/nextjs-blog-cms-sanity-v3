import {useMemo} from 'react'
import {_getArrayProp} from '../styles'

/** @beta */
export type ArrayPropPrimitive = string | number | boolean | undefined | null

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export function useArrayProp<T extends ArrayPropPrimitive = ArrayPropPrimitive>(
  val: T | T[] | undefined,
  defaultVal?: T[]
): T[] {
  // JSON.stringify is fast, but it's not faster than useMemo's referencial equality check
  const __perf_hash__ = useMemo(() => JSON.stringify(val ?? defaultVal), [defaultVal, val])

  return useMemo(
    () => _getArrayProp(val, defaultVal),

    // Improve performance: Keep object identify for a given hash of the value
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [__perf_hash__]
  )
}
