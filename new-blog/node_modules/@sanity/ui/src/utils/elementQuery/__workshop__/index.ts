import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('utils/elementQuery', 'ElementQuery', [
  {
    name: 'custom-media',
    title: 'Custom media',
    component: lazy(() => import('./customMedia')),
  },
])
