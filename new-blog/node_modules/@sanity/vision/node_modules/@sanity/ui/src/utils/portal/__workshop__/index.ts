import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'utils/portal',
  title: 'Portal',
  stories: [
    {
      name: 'named',
      title: 'Named portals',
      component: lazy(() => import('./named')),
    },
  ],
})
