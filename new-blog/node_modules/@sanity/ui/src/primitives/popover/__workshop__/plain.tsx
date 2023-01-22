import {Button, Card, Popover, PortalProvider, Text} from '@sanity/ui'
import {useBoolean, useSelect, useText} from '@sanity/ui-workshop'
import React, {useState} from 'react'
import {
  WORKSHOP_CONTAINER_WIDTH_OPTIONS,
  WORKSHOP_PLACEMENT_OPTIONS,
  WORKSHOP_RADIUS_OPTIONS,
  WORKSHOP_SPACE_OPTIONS,
} from '../../../__workshop__/constants'

export default function PlainStory() {
  const arrow = useBoolean('Arrow', true, 'Props')
  const boundaryElementFlag = useBoolean('Boundary element', true, 'Props')
  const content = useText('Content', 'Hello, world', 'Props')
  const constrainSize = useBoolean('Constrain size', true, 'Props')
  const matchReferenceWidth = useBoolean('Match reference width', false, 'Props')
  const open = useBoolean('Open', true, 'Props')
  const padding = useSelect('Padding', WORKSHOP_SPACE_OPTIONS, 3, 'Props')
  const placement = useSelect('Placement', WORKSHOP_PLACEMENT_OPTIONS, 'bottom', 'Props')
  const portal = useBoolean('Portal', true, 'Props')
  const preventOverflow = useBoolean('Prevent overflow', true, 'Props')
  const radius = useSelect('Radius', WORKSHOP_RADIUS_OPTIONS, 2, 'Props')
  const width = useSelect('Width', WORKSHOP_CONTAINER_WIDTH_OPTIONS, 'auto', 'Props')
  const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null)
  const [boundaryElement, setBoundaryElement] = useState<HTMLDivElement | null>(null)

  return (
    <PortalProvider element={portalElement}>
      <Text muted size={1} style={{position: 'absolute', top: 40, left: 60}}>
        Scroll this box to reveal the popover
      </Text>
      <div
        ref={setBoundaryElement}
        style={{
          height: 'calc(100vh - 120px)',
          position: 'relative',
          margin: 60,
          overflow: 'auto',
          outline: '1px solid red',
          width: 'calc(100vw - 120px)',
        }}
      >
        <Card padding={4} style={{textAlign: 'center'}}>
          <div style={{padding: '150vh 0'}}>
            <Popover
              __unstable_margins={[1, 1, 1, 1]}
              arrow={arrow}
              boundaryElement={boundaryElementFlag ? boundaryElement : undefined}
              content={<Text>{content}</Text>}
              constrainSize={constrainSize}
              fallbackPlacements={['top', 'bottom']}
              matchReferenceWidth={matchReferenceWidth}
              open={open}
              padding={padding}
              placement={placement}
              portal={portal}
              preventOverflow={preventOverflow}
              radius={radius}
              width={width}
            >
              <Button text="This button is the popover reference" />
            </Popover>
          </div>
        </Card>
      </div>
      <div ref={setPortalElement} />
    </PortalProvider>
  )
}
