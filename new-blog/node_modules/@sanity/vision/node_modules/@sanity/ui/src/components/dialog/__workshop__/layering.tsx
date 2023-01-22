import {Box, Card, Code, Dialog, Layer, LayerProvider, useLayer} from '@sanity/ui'
import {useAction} from '@sanity/ui-workshop'

export default function LayeringStory() {
  return (
    <Box padding={[4, 5, 6]}>
      <LayerProvider>
        <Layer zOffset={10} id="a">
          <Card padding={2} shadow={2}>
            <DebugLayer />
          </Card>
        </Layer>
        <Layer zOffset={10} id="b">
          <Card padding={2} shadow={2}>
            <DebugLayer />
          </Card>
        </Layer>
        <Dialog
          header="Layering example"
          id="layering-example"
          onClose={useAction('onEscape')}
          zOffset={100}
        >
          <Box padding={4}>
            <DebugLayer />
          </Box>
        </Dialog>
      </LayerProvider>
    </Box>
  )
}

function DebugLayer() {
  const layer = useLayer()

  return <Code language="json">{JSON.stringify(layer, null, 2)}</Code>
}
