import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('components/hotkeys', 'Hotkeys', [
  {name: 'plain', title: 'Plain', component: lazy(() => import('./plain'))},
])
