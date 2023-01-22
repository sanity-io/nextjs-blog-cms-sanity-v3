import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('primitives/card', 'Card', [
  {name: 'props', title: 'Props', component: lazy(() => import('./props'))},
  {name: 'styled', title: 'Styled', component: lazy(() => import('./styled'))},
  {name: 'interactive', title: 'Interactive', component: lazy(() => import('./interactive'))},
  {name: 'tones', title: 'Tones', component: lazy(() => import('./allTones'))},
  {name: 'as-button', title: 'As button', component: lazy(() => import('./asButton'))},
  {name: 'list-nav', title: 'List navigation', component: lazy(() => import('./listNavigation'))},
  {name: 'checkered', title: 'Checkered', component: lazy(() => import('./checkered'))},
  {name: 'as-component', title: 'As component', component: lazy(() => import('./asComponent'))},
  {name: 'selected', title: 'Selected', component: lazy(() => import('./selected'))},
])
