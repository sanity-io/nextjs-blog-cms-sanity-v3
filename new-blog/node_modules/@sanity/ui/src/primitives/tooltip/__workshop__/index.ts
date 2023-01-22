import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('primitives/tooltip', 'Tooltip', [
  {
    name: 'props',
    title: 'Props',
    component: lazy(() => import('./props')),
  },
])
