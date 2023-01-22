import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'primitives/text',
  title: 'Text',
  stories: [
    {
      name: 'default',
      title: 'Text',
      component: lazy(() => import('./example')),
    },
    {
      name: 'colored',
      title: 'Colored text',
      component: lazy(() => import('./colored')),
    },
    {
      name: 'optical-alignment',
      title: 'Optical alignment',
      component: lazy(() => import('./opticalAlignment')),
    },
  ],
})
