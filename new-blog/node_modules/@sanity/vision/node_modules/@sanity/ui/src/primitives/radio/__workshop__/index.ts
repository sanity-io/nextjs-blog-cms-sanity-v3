import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'primitives/radio',
  title: 'Radio',
  stories: [
    {name: 'plain', title: 'Plain', component: lazy(() => import('./plain'))},
    {name: 'example', title: 'Example', component: lazy(() => import('./example'))},
  ],
})
