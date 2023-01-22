import {useMemo} from 'react'
import {BoundaryElementContext} from './boundaryElementContext'
import {BoundaryElementContextValue} from './types'

/**
 * @public
 */
export interface BoundaryElementProviderProps {
  children: React.ReactNode
  element: HTMLElement | null
}

/**
 * @public
 */
export function BoundaryElementProvider(props: BoundaryElementProviderProps): React.ReactElement {
  const {children, element} = props
  const value: BoundaryElementContextValue = useMemo(() => ({version: 0.0, element}), [element])

  return <BoundaryElementContext.Provider value={value}>{children}</BoundaryElementContext.Provider>
}
