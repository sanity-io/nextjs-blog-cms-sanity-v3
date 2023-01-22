import {useSyncExternalStore} from 'react'
import {useTheme} from '../../theme'

/**
 * @internal
 */
export interface _MediaStore {
  subscribe: (onStoreChange: () => void) => () => void
  getSnapshot: () => number
}

const MEDIA_STORE_CACHE = new WeakMap<number[], _MediaStore>()

type MediaQueryMinWidth = `(min-width: ${number}px)`
type MediaQueryMaxWidth = `(max-width: ${number}px)`
type MediaQueryMinMaxWidth = `${MediaQueryMinWidth} and ${MediaQueryMaxWidth}`
type MediaQuery = `screen and ${MediaQueryMinWidth | MediaQueryMaxWidth | MediaQueryMinMaxWidth}`

function _getMediaQuery(media: number[], index: number): MediaQuery {
  if (index === 0) {
    return `screen and (max-width: ${media[index] - 1}px)`
  }

  if (index === media.length) {
    return `screen and (min-width: ${media[index - 1]}px)`
  }

  return `screen and (min-width: ${media[index - 1]}px) and (max-width: ${media[index] - 1}px)`
}

function _createMediaStore(media: number[]): _MediaStore {
  const mediaLen = media.length
  let sizes: {mq: MediaQueryList; index: number}[]

  // The _createMediaStore function is called in both server and client environments.
  // However since subscribe and getSnapshot are only called on the client we lazy init what we need for them
  // so that we don't need to run checks for wether it's safe to call `window.matchMedia`
  const getSizes = () => {
    if (!sizes) {
      sizes = []

      for (let index = mediaLen; index > -1; index -= 1) {
        const mediaQuery = _getMediaQuery(media, index)

        sizes.push({index, mq: window.matchMedia(mediaQuery)})
      }
    }

    return sizes
  }

  const getSnapshot = () => {
    for (const {index, mq} of getSizes()) {
      if (mq.matches) return index
    }

    return 0
  }

  const subscribe = (onStoreChange: () => void) => {
    const disposeFns: (() => void)[] = []

    for (const {mq} of getSizes()) {
      const handleChange = () => {
        if (mq.matches) onStoreChange()
      }

      mq.addEventListener('change', handleChange)

      disposeFns.push(() => mq.removeEventListener('change', handleChange))
    }

    return () => {
      for (const disposeFn of disposeFns) {
        disposeFn()
      }
    }
  }

  return {getSnapshot, subscribe}
}

/**
 * Only called during server-side rendering, and hydration if using hydrateRoot
 * Since the server environment doesn't have access to the DOM, we can't determine the current value of the media query
 * and we assume `(prefers-color-scheme: light)` since it's the most common scheme
 *
 * @link https://beta.reactjs.org/apis/react/useSyncExternalStore#adding-support-for-server-rendering
 */
function getServerSnapshot() {
  return 0
}

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export function useMediaIndex(): number {
  const theme = useTheme()
  const {media} = theme.sanity

  let store = MEDIA_STORE_CACHE.get(media)

  if (!store) {
    store = _createMediaStore(media)
    MEDIA_STORE_CACHE.set(media, store)
  }

  return useSyncExternalStore(store.subscribe, store.getSnapshot, getServerSnapshot)
}
