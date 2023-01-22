import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'primitives/badge',
  title: 'Badge',
  stories: [
    {
      name: 'props',
      title: 'Props',
      component: lazy(() => import('./props')),
    },
    {
      name: 'tones',
      title: 'Tones',
      component: lazy(() => import('./tones')),
    },
  ],
})
