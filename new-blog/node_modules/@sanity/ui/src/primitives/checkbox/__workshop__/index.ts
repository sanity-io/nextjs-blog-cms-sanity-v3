import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('primitives/checkbox', 'Checkbox', [
  {name: 'props', title: 'Props', component: lazy(() => import('./props'))},
  {name: 'example', title: 'Example', component: lazy(() => import('./example'))},
  {name: 'read-only', title: 'Read-only', component: lazy(() => import('./readOnly'))},
  {name: 'multiple-tones', title: 'Multiple tones', component: lazy(() => import('./tones'))},
])
