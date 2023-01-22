import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  stories: [
    {
      name: 'all',
      title: 'All icons',
      component: lazy(() => import('./overview')),
    },
  ],
})
