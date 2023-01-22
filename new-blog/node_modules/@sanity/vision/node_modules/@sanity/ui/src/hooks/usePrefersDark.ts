import {useSyncExternalStore} from 'react'

let MEDIA_QUERY_CACHE: MediaQueryList | undefined

/**
 * Lazy init the matchMedia instance
 */
function getMatchMedia(): MediaQueryList {
  if (!MEDIA_QUERY_CACHE) {
    // As this function is only called during `subscribe` and `getSnapshot`, we can assume that the
    // the `window` global is available and we're in a browser environment
    MEDIA_QUERY_CACHE = window.matchMedia('(prefers-color-scheme: dark)')
  }

  return MEDIA_QUERY_CACHE
}

/**
 * As the query is the same for all instances of this hook, we can cache the matchMedia instance
 * and have cheap `change` event listeners, while getSnapshot always reads from the same
 * matchMedia instance and we don't get any tearing.
 * Tearing in this context means the bad edge case in React concurrent render mdoe
 * where you sometimes would end up with some components doing render while seeing `usePrefersDark() === true` while others would see `usePrefersDark() === false`
 * during the same render.
 * By using `useSyncExternalStore` every component only sees the same value during the same render, and always re-render when it changes no matter
 * what React.memo boundaries there might be between the layers..
 */
function subscribe(onStoreChange: () => void): () => void {
  const matchMedia = getMatchMedia()

  matchMedia.addEventListener('change', onStoreChange)

  return () => matchMedia.removeEventListener('change', onStoreChange)
}

/**
 * Only called client-side, when using createRoot, or after hydration is complete when using hydrateRoot.
 * It's important that this function does not create new objects or arrays when called:
 * https://beta.reactjs.org/apis/react/useSyncExternalStore#im-getting-an-error-the-result-of-getsnapshot-should-be-cached
 */
function getSnapshot() {
  return getMatchMedia().matches
}

/**
 * Only called during server-side rendering, and hydration if using hydrateRoot
 * Since the server environment doesn't have access to the DOM, we can't determine the current value of the media query
 * and we assume `(prefers-color-scheme: light)` since it's the most common scheme
 *
 * @link https://beta.reactjs.org/apis/react/useSyncExternalStore#adding-support-for-server-rendering
 */
function getServerSnapshot() {
  return false
}

/**
 * @public
 */
export function usePrefersDark(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
