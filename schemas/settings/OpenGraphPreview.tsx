import { Card } from '@sanity/ui'
import { height, OpenGraphImage, width } from 'components/OpenGraphImage'
import { createIntlSegmenterPolyfill } from 'intl-segmenter-polyfill'
import type { Settings } from 'lib/sanity.queries'
import React, { useMemo } from 'react'
import satori, { type SatoriOptions } from 'satori'
import styled from 'styled-components'
import useSWR from 'swr'

// we wrap the segmenter setup in SWR to enable caching
const useSegmenter = () => {
  const { data, error, isLoading } = useSWR(undefined, setupSegmenter)
  return { data, isError: error, isLoading }
}

const setupSegmenter = (_: undefined) => {
  if (!globalThis?.Intl?.Segmenter) {
    console.debug('Polyfilling Intl.Segmenter')
    //@ts-expect-error
    globalThis.Intl = globalThis.Intl || {}
    return fetch(new URL('public/break_iterator.wasm', import.meta.url)).then(
      //@ts-expect-error
      (res) => (globalThis.Intl.Segmenter = createIntlSegmenterPolyfill(res))
    )
  }
}

// this fetcher function is highly specific, but otherwise NextJS does not "notice" we are importing a file from the public dir
const interFetcher = () =>
  fetch('/Inter-Bold.woff')
    .then((res) => res.arrayBuffer())
    .then((arrayBuffer) => [
      { name: 'Inter', data: arrayBuffer, style: 'normal', weight: 700 },
    ]) satisfies Promise<SatoriOptions['fonts']>

const useInter = () => {
  const { data: fonts, isLoading } = useSWR('Inter', interFetcher)
  return {
    fonts,
    isLoading,
  }
}

const satoriFetcher = (element, options) => {
  return satori(element, options)
}

const OpenGraphSvg = styled(Card).attrs({
  radius: 3,
  shadow: 1,
  overflow: 'hidden',
})`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    display: block;
    object-fit: cover;
    aspect-ratio: ${width} / ${height};
    object-position: center;
    height: 100%;
    width: 100%;
  }
`

export default function OpenGraphPreview(props: Settings['ogImage']) {
  const { fonts, isLoading: isFontLoading } = useInter()
  const { isLoading: isSegmenterLoading } = useSegmenter()

  const satoriElement = useMemo(
    () => <OpenGraphImage title={props.title || ''} />,
    [props.title]
  )
  const satoriOptions = { width, height, fonts: fonts }

  const {
    data: __html,
    isLoading: isSatoriLoading,
    error,
  } = useSWR([satoriElement, satoriOptions], ([element, options]) => {
    return satoriFetcher(element, options)
  })

  if (error || isSegmenterLoading) return null

  return <OpenGraphSvg dangerouslySetInnerHTML={{ __html }} />
}
