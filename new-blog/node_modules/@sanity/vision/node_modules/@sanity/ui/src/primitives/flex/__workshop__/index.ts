import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'primitives/flex',
  title: 'Flex',
  stories: [
    {name: 'plain', title: 'Plain', component: lazy(() => import('./example'))},
    {name: 'gap', title: 'Gap', component: lazy(() => import('./gap'))},
  ],
})
