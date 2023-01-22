import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'utils/elementQuery',
  title: 'ElementQuery',
  stories: [
    {
      name: 'custom-media',
      title: 'Custom media',
      component: lazy(() => import('./customMedia')),
    },
  ],
})
