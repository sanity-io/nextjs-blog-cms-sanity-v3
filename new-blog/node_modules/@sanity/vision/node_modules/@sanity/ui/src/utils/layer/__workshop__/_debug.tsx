import {Code, useLayer} from '@sanity/ui'

export function LayerDebugInfo() {
  const layer = useLayer()

  return (
    <Code>
      zIndex={layer.zIndex}, size={layer.size}
    </Code>
  )
}
