import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'theme',
  title: 'Theme',
  stories: [
    {
      name: 'canvas',
      title: 'Canvas',
      component: lazy(() => import('./canvas')),
    },
    {
      name: 'nested-provider',
      title: 'Nested provider',
      component: lazy(() => import('./nestedProvider')),
    },
    {
      name: 'layer',
      title: 'Layer',
      component: lazy(() => import('./layer')),
    },
    {
      name: 'color',
      title: 'Color',
      component: lazy(() => import('./color')),
    },
  ],
})
