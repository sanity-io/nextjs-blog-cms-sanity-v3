import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('primitives/container', 'Container', [
  {name: 'plain', title: 'Plain', component: lazy(() => import('./example'))},
])
