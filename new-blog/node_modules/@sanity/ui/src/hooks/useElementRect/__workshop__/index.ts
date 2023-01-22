import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('hooks/useElementRect', 'useElementRect', [
  {name: 'example', title: 'Example', component: lazy(() => import('./example'))},
])
