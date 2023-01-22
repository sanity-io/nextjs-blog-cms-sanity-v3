import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('primitives/spinner', 'Spinner', [
  {
    name: 'props',
    title: 'Props',
    component: lazy(() => import('./Props')),
  },
])
