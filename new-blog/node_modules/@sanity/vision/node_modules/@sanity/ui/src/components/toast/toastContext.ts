import {createContext} from 'react'
import {globalScope} from '../../lib/globalScope'
import {ToastContextValue} from './types'

const key = Symbol.for('@sanity/ui/context/toast')

globalScope[key] = globalScope[key] || createContext<ToastContextValue | null>(null)

export const ToastContext: React.Context<ToastContextValue | null> = globalScope[key]
