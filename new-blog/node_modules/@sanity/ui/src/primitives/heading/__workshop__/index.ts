import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('primitives/heading', 'Heading', [
  {
    name: 'plain',
    title: 'Plain',
    component: lazy(() => import('./plain')),
  },
  {
    name: 'optical-alignment',
    title: 'Optical alignment',
    component: lazy(() => import('./opticalAlignment')),
  },
])
