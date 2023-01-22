import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('primitives/box', 'Box', [
  {name: 'props', title: 'Props', component: lazy(() => import('./props'))},
  {name: 'responsive', title: 'Responsive', component: lazy(() => import('./responsive'))},
])
