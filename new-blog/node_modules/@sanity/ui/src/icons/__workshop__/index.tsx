import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('icons', 'Icons', [
  {name: 'overview', title: 'Overview', component: lazy(() => import('./overview'))},
])
