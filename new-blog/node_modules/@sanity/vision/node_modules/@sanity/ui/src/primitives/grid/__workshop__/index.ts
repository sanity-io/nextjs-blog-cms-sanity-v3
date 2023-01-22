import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'primitives/grid',
  title: 'Grid',
  stories: [
    {name: 'responsive', title: 'Responsive', component: lazy(() => import('./responsive'))},
  ],
})
