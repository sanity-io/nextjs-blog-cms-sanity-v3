import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('utils/layer', 'Layer', [
  {
    name: 'plain',
    title: 'Plain',
    component: lazy(() => import('./plain')),
  },
  {
    name: 'multiple-roots',
    title: 'Multiple roots',
    component: lazy(() => import('./multipleRoots')),
  },
  {
    name: 'responsive-z-offset',
    title: 'Responsive z-offset',
    component: lazy(() => import('./responsiveZOffset')),
  },
])
