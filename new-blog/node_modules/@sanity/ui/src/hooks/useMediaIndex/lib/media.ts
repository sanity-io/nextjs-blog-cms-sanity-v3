/**
 * @internal
 */
export interface _MediaManager {
  getCurrentIndex: () => number
  subscribe: (subscriber: (index: number) => void) => () => void
}

const MEDIA_MANAGER_CACHE = new WeakMap<number[], _MediaManager>()

function _getMediaQuery(media: number[], index: number) {
  if (index === 0) {
    return `screen and (max-width: ${media[index] - 1}px)`
  }

  if (index === media.length) {
    return `screen and (min-width: ${media[index - 1]}px)`
  }

  return `screen and (min-width: ${media[index - 1]}px) and (max-width: ${media[index] - 1}px)`
}

function _createMediaManager(media: number[]): _MediaManager {
  const mediaLen = media.length
  const sizes: {mq: MediaQueryList; index: number}[] = []

  if (typeof window !== 'undefined') {
    for (let index = mediaLen; index > -1; index -= 1) {
      const mediaQuery = _getMediaQuery(media, index)

      sizes.push({index, mq: window.matchMedia(mediaQuery)})
    }
  }

  const getCurrentIndex = () => {
    for (const {index, mq} of sizes) {
      if (mq.matches) return index
    }

    return 0
  }

  const subscribe = (subscriber: (index: number) => void) => {
    const disposeFns: (() => void)[] = []

    for (const {index, mq} of sizes) {
      const handleChange = () => {
        if (mq.matches) subscriber(index)
      }

      if (mq.addEventListener) {
        mq.addEventListener('change', handleChange)
      } else {
        mq.addListener(handleChange)
      }

      disposeFns.push(() => {
        if (mq.removeEventListener) {
          mq.removeEventListener('change', handleChange)
        } else {
          mq.removeListener(handleChange)
        }
      })
    }

    return () => {
      for (const disposeFn of disposeFns) {
        disposeFn()
      }
    }
  }

  return {getCurrentIndex, subscribe}
}

/**
 * @internal
 */
export function _getMediaManager(media: number[]): _MediaManager {
  let manager = MEDIA_MANAGER_CACHE.get(media)

  if (!manager) {
    manager = _createMediaManager(media)
    MEDIA_MANAGER_CACHE.set(media, manager)
  }

  return manager
}
