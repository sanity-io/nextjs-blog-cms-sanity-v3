import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'color',
  title: 'Color',
  stories: [
    {
      name: 'overview',
      title: 'Overview',
      component: lazy(() => import('./overview')),
    },
  ],
})
