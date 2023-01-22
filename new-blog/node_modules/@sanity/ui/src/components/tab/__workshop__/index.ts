import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('components/tab', 'Tab', [
  {name: 'example', title: 'Example', component: lazy(() => import('./example'))},
])
