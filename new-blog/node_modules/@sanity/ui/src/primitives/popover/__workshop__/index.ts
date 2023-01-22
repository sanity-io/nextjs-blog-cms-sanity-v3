import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('primitives/popover', 'Popover', [
  {
    name: 'plain',
    title: 'Plain',
    component: lazy(() => import('./plain')),
  },
  {
    name: 'recursive',
    title: 'Recursive',
    component: lazy(() => import('./recursive')),
  },
  {
    name: 'match-ref-width',
    title: 'Match reference width',
    component: lazy(() => import('./matchReferenceWidth')),
  },
  {
    name: 'margins',
    title: 'Margins',
    component: lazy(() => import('./margins')),
  },
  {
    name: 'right-aligned',
    title: 'Right-aligned',
    component: lazy(() => import('./rightAligned')),
  },
])
