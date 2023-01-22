import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'primitives/select',
  title: 'Select',
  stories: [
    {name: 'plain', title: 'Plain', component: lazy(() => import('./plain'))},
    {name: 'read-only', title: 'Read-only', component: lazy(() => import('./readOnly'))},
  ],
})
