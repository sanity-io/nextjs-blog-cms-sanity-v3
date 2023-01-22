import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('primitives/radio', 'Radio', [
  {name: 'plain', title: 'Plain', component: lazy(() => import('./plain'))},
  {name: 'example', title: 'Example', component: lazy(() => import('./example'))},
])
