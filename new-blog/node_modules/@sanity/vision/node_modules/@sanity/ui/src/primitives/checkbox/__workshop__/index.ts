import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'primitives/checkbox',
  title: 'Checkbox',
  stories: [
    {name: 'props', title: 'Props', component: lazy(() => import('./props'))},
    {name: 'example', title: 'Example', component: lazy(() => import('./example'))},
    {name: 'read-only', title: 'Read-only', component: lazy(() => import('./readOnly'))},
    {name: 'multiple-tones', title: 'Multiple tones', component: lazy(() => import('./tones'))},
  ],
})
