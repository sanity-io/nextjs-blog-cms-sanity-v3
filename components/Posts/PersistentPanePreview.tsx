import React, { useCallback, useEffect } from 'react'
import { useRouter, useRouterState } from 'sanity/router'

export function PersistentPanePreview(props: any) {
  const { navigateUrl } = useRouter()
  const [opened, setOpened] = React.useState(false)
  const routerState = useRouterState(useCallback((state) => state.panes[1], []))

  useEffect(() => {
    if (routerState.length < 2 && !opened) {
      navigateUrl({
        path: `${location.pathname}%7C%2Cview%3Dpreview`,
      })
      setOpened(true)
    }
  }, [navigateUrl, opened, routerState])

  return props.renderDefault(props)
}
