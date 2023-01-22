import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'components/autocomplete',
  title: 'Autocomplete',
  stories: [
    {
      name: 'example',
      title: 'Example',
      component: lazy(() => import('./example')),
    },
    {
      name: 'custom',
      title: 'Custom',
      component: lazy(() => import('./custom')),
    },
    {
      name: 'async',
      title: 'Async',
      component: lazy(() => import('./async')),
    },
    {
      name: 'constrained-height',
      title: 'Constrained height',
      component: lazy(() => import('./constrainedHeight')),
    },
    {
      name: 'focus-and-blur',
      title: 'Focus and blur',
      component: lazy(() => import('./focusAndBlur')),
    },
    {
      name: 'fullscreen',
      title: 'Fullscreen',
      component: lazy(() => import('./fullscreen')),
    },
  ],
})
