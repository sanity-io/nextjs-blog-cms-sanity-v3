import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'hooks/use-media-index',
  title: 'useMediaIndex',
  stories: [
    {
      name: 'test',
      title: 'Test',
      component: lazy(() => import('./test')),
    },
  ],
})
