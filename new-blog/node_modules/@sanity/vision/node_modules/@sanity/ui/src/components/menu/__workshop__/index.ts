import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'components/menu',
  title: 'Menu',
  stories: [
    {
      name: 'menu-button',
      title: 'MenuButton',
      component: lazy(() => import('./menuButton')),
    },
    {
      name: 'nested-menu-items',
      title: 'Nested MenuItems',
      component: lazy(() => import('./nestedMenu')),
    },
    {
      name: 'custom-menu-item',
      title: 'Custom MenuItem',
      component: lazy(() => import('./customMenuItem')),
    },
    {
      name: 'groups',
      title: 'Groups',
      component: lazy(() => import('./groups')),
    },
    {
      name: 'menu-group-right',
      title: 'Menu group (right)',
      component: lazy(() => import('./menuGroupRight')),
    },
    {
      name: 'tones',
      title: 'Tones',
      component: lazy(() => import('./tones')),
    },
    {
      name: 'selected-item',
      title: 'Selected item',
      component: lazy(() => import('./selectedItem')),
    },
    {
      name: 'closable',
      title: 'Closeable',
      component: lazy(() => import('./closableMenuButton')),
    },
    {
      name: 'without-arrow',
      title: 'Without arrow',
      component: lazy(() => import('./withoutArrow')),
    },
    {
      name: 'constrained-in-boundary',
      title: 'Constrained in boundary',
      component: lazy(() => import('./constrainedInBoundary')),
    },
    {
      name: 'as-component',
      title: 'As component',
      component: lazy(() => import('./asComponent')),
    },
    {
      name: 'disable-focus-on-close',
      title: 'Disable focus on close',
      component: lazy(() => import('./disableFocusOnClose')),
    },
    {
      name: 'menu-button-with-on-close',
      title: 'MenuButton with on close',
      component: lazy(() => import('./onCloseMenuButton')),
    },
  ],
})
