import React from 'react'
import type {PortableTextListComponent, PortableTextListItemComponent} from '../types'

export const defaultLists: Record<'number' | 'bullet', PortableTextListComponent> = {
  number: ({children}) => <ol>{children}</ol>,
  bullet: ({children}) => <ul>{children}</ul>,
}

export const DefaultListItem: PortableTextListItemComponent = ({children}) => <li>{children}</li>
