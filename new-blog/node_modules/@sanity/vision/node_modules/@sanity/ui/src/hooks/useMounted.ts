import {useEffect, useReducer} from 'react'

/**
 * Some components should only render after mounting to the DOM, and not be rendered at all during SSR renderToString or equivalent.
 * @public
 */
export function useMounted(): boolean {
  // Use useReducer instead of useState as it's more low-level and creates the least amount of functions for the garbage collector to clean up
  const [mounted, mount] = useReducer(() => true, false)

  useEffect(mount, [mount])

  return mounted
}
