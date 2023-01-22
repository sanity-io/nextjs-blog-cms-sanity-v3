import React, {useMemo} from 'react'
import {useUnique} from '../../hooks/_internal'
import {PortalContext} from './portalContext'
import {PortalContextValue} from './types'

/**
 * @public
 */
export interface PortalProviderProps {
  /**
   * @deprecated Use `<BoundaryElementProvider element={...} />` instead
   */
  boundaryElement?: HTMLElement | null
  children: React.ReactNode
  element?: HTMLElement | null
  /**
   * @beta
   */
  __unstable_elements?: Record<string, HTMLElement | null | undefined>
}

const __BROWSER__ = typeof window !== 'undefined'

/**
 * @public
 */
export function PortalProvider(props: PortalProviderProps): React.ReactElement {
  const {boundaryElement, children, element, __unstable_elements: elementsProp} = props
  const elements = useUnique(elementsProp)

  const value: PortalContextValue = useMemo(() => {
    return {
      version: 0.0,
      boundaryElement: boundaryElement || null,
      element: element || (__BROWSER__ && document.body) || null,
      elements,
    }
  }, [boundaryElement, element, elements])

  return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>
}
