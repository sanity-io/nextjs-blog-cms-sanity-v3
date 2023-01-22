import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('hooks/use-media-index', 'useMediaIndex', [
  {name: 'test', title: 'Test', component: lazy(() => import('./test'))},
])
