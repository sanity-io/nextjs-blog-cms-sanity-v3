import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('primitives/kbd', 'KBD', [
  {name: 'plain', title: 'Plain', component: lazy(() => import('./plain'))},
])
