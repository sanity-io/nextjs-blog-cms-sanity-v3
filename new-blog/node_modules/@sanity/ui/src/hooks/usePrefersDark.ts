import {useEffect, useMemo, useState} from 'react'

/**
 * @public
 */
export function usePrefersDark(): boolean {
  const mq = useMemo(() => {
    if (typeof window === 'undefined') return undefined

    return window.matchMedia('(prefers-color-scheme: dark)')
  }, [])

  const [dark, setDark] = useState(mq?.matches || false)

  useEffect(() => {
    if (!mq) return undefined

    setDark(mq.matches)

    const handleChange = () => setDark(mq.matches)

    mq.addEventListener('change', handleChange)

    return () => mq.removeEventListener('change', handleChange)
  }, [mq])

  return dark
}
