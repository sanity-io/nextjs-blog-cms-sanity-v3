import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('primitives/badge', 'Badge', [
  {
    name: 'props',
    title: 'Props',
    component: lazy(() => import('./props')),
  },
  {
    name: 'tones',
    title: 'Tones',
    component: lazy(() => import('./tones')),
  },
])
