import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('primitives/text', 'Text', [
  {
    name: 'default',
    title: 'Text',
    component: lazy(() => import('./example')),
  },
  {
    name: 'colored',
    title: 'Colored text',
    component: lazy(() => import('./colored')),
  },
  {
    name: 'optical-alignment',
    title: 'Optical alignment',
    component: lazy(() => import('./opticalAlignment')),
  },
])
