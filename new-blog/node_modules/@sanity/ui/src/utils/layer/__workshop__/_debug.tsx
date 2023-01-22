import {Code, useLayer} from '@sanity/ui'
import React from 'react'

export function LayerDebugInfo() {
  const layer = useLayer()

  return (
    <Code>
      zIndex={layer.zIndex}, size={layer.size}
    </Code>
  )
}
