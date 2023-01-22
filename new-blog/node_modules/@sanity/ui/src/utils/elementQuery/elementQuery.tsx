import React, {forwardRef, useCallback, useEffect, useMemo, useState} from 'react'
import {useForwardedRef} from '../../hooks'
import {useTheme} from '../../theme'
import {ResizeObserver} from '../resizeObserver'
import {findMaxBreakpoints, findMinBreakpoints} from './helpers'

/**
 * DO NOT USE IN PRODUCTION.
 * @beta
 */
export interface MediaQueryProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  media?: number[]
}

/**
 * DO NOT USE IN PRODUCTION.
 * @beta
 */
export const ElementQuery = forwardRef(function ElementQuery(
  props: MediaQueryProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'media'>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const theme = useTheme()
  const {children, media = theme.sanity.media, ...restProps} = props
  const [width, setWidth] = useState(() => window.innerWidth)
  const forwardedRef = useForwardedRef(ref)
  const [element, setElement] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!element) return

    const handleResizeEntries: ResizeObserverCallback = (entries) => {
      setWidth(entries[0].contentRect.width)
    }

    const ro = new ResizeObserver(handleResizeEntries)

    ro.observe(element)

    return () => ro.disconnect()
  }, [element])

  const max = useMemo(() => findMaxBreakpoints(media, width), [media, width])
  const min = useMemo(() => findMinBreakpoints(media, width), [media, width])

  const setRef = useCallback(
    (el: HTMLDivElement | null) => {
      forwardedRef.current = el
      setElement(el)
    },
    [forwardedRef]
  )

  return (
    <div
      data-ui="ElementQuery"
      {...restProps}
      data-eq-max={max.length ? max.join(' ') : undefined}
      data-eq-min={min.length ? min.join(' ') : undefined}
      ref={setRef}
    >
      {children}
    </div>
  )
})
