import type { GroqStore } from '@sanity/groq-store'
import { cache, use, useMemo, useSyncExternalStore } from 'react'

export type Params = Record<string, unknown>
export interface CreatePreviewHookProps {
  projectId: string
  dataset: string
  documentLimit?: number
  subscriptionThrottleMs?: number
}
export interface UsePreviewHookProps {
  query: string
  params?: Params
  token: string
}

export function createPreviewHook({
  projectId,
  dataset,
  documentLimit,
  subscriptionThrottleMs,
}: CreatePreviewHookProps) {
  if (!projectId) {
    console.warn(`No projectId set for createPreviewHook, returning dummy hook`)
    // No projectId set, just return a dummy hook and warn
    return function useDummyPreviewHook<R = any>(
      token: string,
      query: string,
      params?: Params
    ): R | null {
      console.warn(
        `The hook returned by createPreviewHook is a dummy as there is no projectId set, returning null`
      )
      return null
    }
  }

  let store: ReturnType<typeof import('@sanity/groq-store').groqStore>
  return function usePreviewHook<R = any>(
    token: string,
    query: string,
    params?: Params
  ): R | null {
    if (!token) {
      throw new Error(
        `No token set for usePreviewHook, try updating your dotenv with a read token for SANITY_API_READ_TOKEN`
      )
    }

    // @TODO do a getCurrentUser auth check here with the provided token

    if (!store) {
      /*
      const EventSourcePolyfill = suspend(
        () => lazyEventSourcePolyfill(),
        ['next-sanity/preview', 'import', 'event-source-polyfill']
      )
      const groqStore = suspend(
        () => lazyGroqStore(),
        ['next-sanity/preview', 'import', '@sanity/groq-store']
      )
      // */
      // Lazy load huge libraries
      const EventSourcePolyfill = use(lazyEventSourcePolyfill())
      const groqStore = use(lazyGroqStore())

      store = groqStore({
        projectId,
        dataset,
        documentLimit,
        token,
        subscriptionThrottleMs,
        EventSource: EventSourcePolyfill,
        listen: true,
        overlayDrafts: true,
      })
    }

    const initial: R = use(preload(store, query, params))
    const syncStore = useMemo(() => {
      // Make sure that React suspends the component until the groq store is finished loading the dataset and able to execute the query
      let snapshot: R = initial

      return {
        getSnapshot: () => snapshot,
        subscribe: (onStoreChange: () => void) => {
          const subscription = store.subscribe(query, params, (err, result) => {
            if (err) {
              console.error(
                'Error thrown in the usePreviewHook subscription',
                err
              )
              throw err
            } else {
              snapshot = result
              onStoreChange()
            }
          })

          return () => subscription.unsubscribe()
        },
      }
    }, [initial, params, query])

    return useSyncExternalStore(syncStore.subscribe, syncStore.getSnapshot)
  }
}

// Suspends the component that wants to preview, until the dataset export is done and groq-store is ready to run queries
const preload = cache(
  async (store: GroqStore, query: string, params?: Params) => {
    if (store) {
      return await store.query(query, params)
    }
    return null
  }
)

const lazyGroqStore = cache(async () => {
  const { groqStore } = await import('@sanity/groq-store')
  return groqStore
})

const lazyEventSourcePolyfill = cache(async () => {
  const { EventSourcePolyfill } = await import('event-source-polyfill')
  return EventSourcePolyfill
})
