import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('utils/virtual-list', 'VirtualList', [
  {
    name: 'window-scroll',
    title: 'Window scroll',
    component: lazy(() => import('./windowScrolll')),
  },
  {
    name: 'element-scroll',
    title: 'Element scroll',
    component: lazy(() => import('./elementScroll')),
  },
  {
    name: 'infinite-list',
    title: 'Infinite list',
    component: lazy(() => import('./infiniteList')),
  },
  {
    name: 'changing-props',
    title: 'Changing props',
    component: lazy(() => import('./changingProps')),
  },
])
