import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'primitives/kbd',
  title: 'KBD',
  stories: [{name: 'plain', title: 'Plain', component: lazy(() => import('./plain'))}],
})
