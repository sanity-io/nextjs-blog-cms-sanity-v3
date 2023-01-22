import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('primitives/switch', 'Switch', [
  {name: 'props', title: 'Props', component: lazy(() => import('./props'))},
  {name: 'example', title: 'Example', component: lazy(() => import('./example'))},
])
