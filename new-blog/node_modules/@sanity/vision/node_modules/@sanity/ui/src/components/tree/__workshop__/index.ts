import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'components/tree',
  title: 'Tree',
  stories: [
    {
      name: 'basic',
      title: 'Basic',
      component: lazy(() => import('./basic')),
      // options: {perfTests: () => import('./basic.perf')},
    },
  ],
})
