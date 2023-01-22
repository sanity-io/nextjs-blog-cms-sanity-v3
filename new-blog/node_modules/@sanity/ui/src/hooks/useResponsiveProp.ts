import {useMemo} from 'react'
import {getResponsiveProp} from '../styles'

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export function useResponsiveProp<T = number>(val: T | T[] | undefined, defaultVal?: T[]): T[] {
  return useMemo(() => getResponsiveProp(val, defaultVal), [defaultVal, val])
}
