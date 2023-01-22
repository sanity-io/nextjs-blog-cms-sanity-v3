import {useEffect, useLayoutEffect} from 'react'

/**
 * @beta
 */
export const useIsomorphicEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
