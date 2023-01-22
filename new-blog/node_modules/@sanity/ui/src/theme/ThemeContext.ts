import {createContext} from 'react'
import {globalScope} from '../lib/globalScope'
import {ThemeContextValue} from './types'

const key = Symbol.for('@sanity/ui/context/theme')

globalScope[key] = globalScope[key] || createContext<ThemeContextValue | null>(null)

/**
 * @internal
 */
export const ThemeContext: React.Context<ThemeContextValue | null> = globalScope[key]
