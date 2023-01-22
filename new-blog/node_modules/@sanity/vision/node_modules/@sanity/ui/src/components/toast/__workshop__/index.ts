import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'components/toast',
  title: 'Toast',
  stories: [
    {
      name: 'toast',
      title: 'Toast',
      component: lazy(() => import('./toast')),
    },
    {
      name: 'hook',
      title: 'Hook',
      component: lazy(() => import('./hook')),
    },
  ],
})
