import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('primitives/code', 'Code', [
  {
    name: 'props',
    title: 'Props',
    component: lazy(() => import('./props')),
  },
  {
    name: 'optical-alignment',
    title: 'Optical alignment',
    component: lazy(() => import('./opticalAlignment')),
  },
])
