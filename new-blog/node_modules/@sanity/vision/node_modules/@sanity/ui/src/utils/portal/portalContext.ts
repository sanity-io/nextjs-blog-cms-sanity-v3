import {createContext} from 'react'
import {globalScope} from '../../lib/globalScope'
import {PortalContextValue} from './types'

const key = Symbol.for('@sanity/ui/context/portal')
const elementKey = Symbol.for('@sanity/ui/context/portal/element')

globalScope[elementKey] = null

export const defaultContextValue: PortalContextValue = {
  version: 0.0,
  boundaryElement: null,
  get element() {
    if (typeof document === 'undefined') {
      return null
    }

    if (globalScope[elementKey]) {
      return globalScope[elementKey]
    }

    globalScope[elementKey] = document.createElement('div')
    globalScope[elementKey].setAttribute('data-portal', '')

    document.body.appendChild(globalScope[elementKey])

    return globalScope[elementKey]
  },
}

globalScope[key] = globalScope[key] || createContext<PortalContextValue>(defaultContextValue)

export const PortalContext: React.Context<PortalContextValue> = globalScope[key]
