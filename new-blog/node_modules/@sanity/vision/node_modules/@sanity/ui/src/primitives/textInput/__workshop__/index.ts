import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'primitives/text-input',
  title: 'TextInput',
  stories: [
    {
      name: 'plain',
      title: 'Plain',
      component: lazy(() => import('./plain')),
    },
    {
      name: 'custom-validity',
      title: 'Custom validity',
      component: lazy(() => import('./customValidity')),
    },
    {
      name: 'typed',
      title: 'Typed',
      component: lazy(() => import('./typed')),
    },
    {
      name: 'tones',
      title: 'Tones',
      component: lazy(() => import('./tones')),
    },
    {
      name: 'clear-button',
      title: 'Clear button',
      component: lazy(() => import('./clearButton')),
    },
    {
      name: 'read-only',
      title: 'Read only',
      component: lazy(() => import('./readOnly')),
    },
    {
      name: 'multiple-tones',
      title: 'Multiple tones',
      component: lazy(() => import('./multipleTones')),
    },
    {
      name: 'states',
      title: 'States',
      component: lazy(() => import('./states')),
    },
  ],
})
