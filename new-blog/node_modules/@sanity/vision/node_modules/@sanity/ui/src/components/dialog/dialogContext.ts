import {createContext} from 'react'
import {globalScope} from '../../lib/globalScope'
import {DialogPosition} from '../../types'

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export interface DialogContextValue {
  version: 0.0
  position?: DialogPosition | DialogPosition[]
  zOffset?: number | number[]
}

const key = Symbol.for('@sanity/ui/context/dialog')

globalScope[key] = globalScope[key] || createContext<DialogContextValue>({version: 0.0})

/**
 * @internal
 */
export const DialogContext: React.Context<DialogContextValue> = globalScope[key]
