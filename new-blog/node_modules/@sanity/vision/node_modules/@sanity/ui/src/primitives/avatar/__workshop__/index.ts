import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'primitives/avatar',
  title: 'Avatar',
  stories: [
    {
      name: 'as-button',
      title: 'As button',
      component: lazy(() => import('./asButton')),
    },
    {
      name: 'avatar-stack',
      title: 'Avatar stack',
      component: lazy(() => import('./stack')),
    },
  ],
})
