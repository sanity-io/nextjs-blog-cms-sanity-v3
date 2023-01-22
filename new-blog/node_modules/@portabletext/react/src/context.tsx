import React, {createContext, ReactNode, useMemo} from 'react'
import type {PortableTextReactComponents} from './types'
import {defaultComponents} from './components/defaults'
import {mergeComponents} from './components/merge'

export const PortableTextComponentsContext: React.Context<PortableTextReactComponents> =
  createContext(defaultComponents)

export const PortableTextComponentsProvider = ({
  components,
  children,
}: {
  components: Partial<PortableTextReactComponents>
  children: ReactNode
}) => {
  const value = useMemo(() => mergeComponents(defaultComponents, components), [components])
  return (
    <PortableTextComponentsContext.Provider value={value}>
      {children}
    </PortableTextComponentsContext.Provider>
  )
}
