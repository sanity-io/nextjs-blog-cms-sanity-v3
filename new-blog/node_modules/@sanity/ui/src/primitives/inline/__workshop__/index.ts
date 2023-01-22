import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('primitives/inline', 'Inline', [
  {name: 'plain', title: 'Plain', component: lazy(() => import('./plain'))},
])
