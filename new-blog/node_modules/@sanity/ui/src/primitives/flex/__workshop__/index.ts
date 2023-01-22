import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('primitives/flex', 'Flex', [
  {name: 'plain', title: 'Plain', component: lazy(() => import('./example'))},
  {name: 'gap', title: 'Gap', component: lazy(() => import('./gap'))},
])
