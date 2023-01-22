import {createContext} from 'react'
import {globalScope} from '../../lib/globalScope'

export interface MenuContextValue {
  version: 0.0
  activeElement: HTMLElement | null
  activeIndex: number
  mount: (element: HTMLElement | null, selected?: boolean) => () => void
  onClickOutside?: (event: MouseEvent) => void
  onEscape?: () => void
  onItemClick?: () => void
  onItemMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void
  onItemMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void
  registerElement?: (el: HTMLElement) => () => void

  /**
   * @deprecated Use `onItemMouseEnter` instead
   */
  onMouseEnter: (event: React.MouseEvent<HTMLElement>) => void

  /**
   * @deprecated Use `onItemMouseLeave` instead
   */
  onMouseLeave: (event: React.MouseEvent<HTMLElement>) => void
}

const key = Symbol.for('@sanity/ui/context/menu')

globalScope[key] = globalScope[key] || createContext<MenuContextValue | null>(null)

export const MenuContext: React.Context<MenuContextValue | null> = globalScope[key]
