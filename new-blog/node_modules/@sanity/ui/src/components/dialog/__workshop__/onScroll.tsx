import {Box, Dialog, LayerProvider, Text} from '@sanity/ui'
import {useAction} from '@sanity/ui-workshop'
import React, {useEffect, useRef} from 'react'

export default function OnScrollStory() {
  const ref = useRef<HTMLDivElement | null>(null)
  const handleScroll = useAction('scroll')

  useEffect(() => {
    const el = ref.current

    if (!el) return

    el.addEventListener('scroll', handleScroll, {passive: true})

    return () => el.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <LayerProvider>
      <Dialog contentRef={ref} header="On scroll example" id="on-scroll-example">
        <Box padding={4}>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at nisl at sem tempor
            hendrerit scelerisque ut libero. Maecenas iaculis efficitur lorem, ac faucibus mi
            imperdiet quis. Cras a consectetur erat. Fusce imperdiet, dolor et pellentesque iaculis,
            ex quam luctus felis, non ultrices enim sem vitae quam. Duis lorem velit, lacinia at
            rhoncus a, tempus vel neque. Vestibulum ante ipsum primis in faucibus orci luctus et
            ultrices posuere cubilia curae; Sed id mauris quam. Nam finibus sapien non lacinia
            ultricies. Integer fermentum tortor at pellentesque faucibus. In venenatis commodo
            placerat. Curabitur commodo tortor libero, vel pellentesque elit luctus sodales. Donec
            mattis tristique nunc ac lacinia. Vestibulum non pulvinar turpis, posuere consequat
            arcu. Fusce ut urna blandit, finibus nisi a, molestie elit. Nulla sed eleifend mi.
          </Text>
        </Box>
      </Dialog>
    </LayerProvider>
  )
}
