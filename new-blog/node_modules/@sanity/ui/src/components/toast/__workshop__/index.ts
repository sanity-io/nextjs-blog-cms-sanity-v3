import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('components/toast', 'Toast', [
  {name: 'toast', title: 'Toast', component: lazy(() => import('./toast'))},
  {name: 'hook', title: 'Hook', component: lazy(() => import('./hook'))},
])
