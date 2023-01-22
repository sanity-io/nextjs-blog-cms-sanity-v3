import {createContext} from 'react'
import {globalScope} from '../../lib/globalScope'
import {TreeContextValue} from './types'

const key = Symbol.for('@sanity/ui/context/tree')

globalScope[key] = globalScope[key] || createContext<TreeContextValue | null>(null)

/**
 * @internal
 */
export const TreeContext: React.Context<TreeContextValue | null> = globalScope[key]
