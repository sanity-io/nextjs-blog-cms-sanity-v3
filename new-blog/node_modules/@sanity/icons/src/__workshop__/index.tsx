import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'icons',
  title: 'Icons',
  stories: [
    {
      name: 'overview',
      title: 'Overview',
      component: lazy(() => import('./overview')),
    },
  ],
})
