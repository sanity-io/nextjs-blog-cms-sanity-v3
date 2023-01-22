import {useEffect} from 'react'

/**
 * @beta
 */
export function useGlobalKeyDown(onKeyDown: (event: KeyboardEvent) => void): void {
  return useEffect(() => {
    addEventListener('keydown', onKeyDown)

    return () => removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])
}
