import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'primitives/container',
  title: 'Container',
  stories: [{name: 'plain', title: 'Plain', component: lazy(() => import('./example'))}],
})
