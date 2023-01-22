import {createContext} from 'react'
import {globalScope} from '../../lib/globalScope'
import {BoundaryElementContextValue} from './types'

const key = Symbol.for('@sanity/ui/context/boundaryElement')

globalScope[key] = globalScope[key] || createContext<BoundaryElementContextValue | null>(null)

export const BoundaryElementContext: React.Context<BoundaryElementContextValue | null> =
  globalScope[key]
