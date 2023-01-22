import {Box, BoundaryElementProvider, Button, Card, Text, Tooltip} from '@sanity/ui'
import {useState} from 'react'

export default function PlainStory() {
  const [boundaryElement, setBoundaryElement] = useState<HTMLDivElement | null>(null)

  return (
    <Card padding={7} ref={setBoundaryElement}>
      <BoundaryElementProvider element={boundaryElement}>
        <Tooltip
          content={
            <Box padding={2}>
              <Text>Test aldsakm alkdmal dmalskdm alkdmlakds</Text>
            </Box>
          }
          placement="top"
        >
          <Button text={<>Hover me</>} />
        </Tooltip>
      </BoundaryElementProvider>
    </Card>
  )
}
