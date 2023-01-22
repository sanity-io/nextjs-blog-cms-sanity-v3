import {Button, Card, Popover, PortalProvider, Text} from '@sanity/ui'
import {useBoolean, useSelect} from '@sanity/ui-workshop'
import {useState} from 'react'
import {
  WORKSHOP_CONTAINER_WIDTH_OPTIONS,
  WORKSHOP_PLACEMENT_OPTIONS,
  WORKSHOP_RADIUS_OPTIONS,
  WORKSHOP_SPACE_OPTIONS,
} from '../../../__workshop__/constants'

export default function PlainStory() {
  const arrow = useBoolean('Arrow', true)
  const boundaryElementFlag = useBoolean('Boundary element', true)
  const constrainSize = useBoolean('Constrain size', true)
  const matchReferenceWidth = useBoolean('Match reference width', false)
  const open = useBoolean('Open', true)
  const padding = useSelect('Padding', WORKSHOP_SPACE_OPTIONS, 3)
  const placement = useSelect('Placement', WORKSHOP_PLACEMENT_OPTIONS, 'bottom')
  const portal = useBoolean('Portal', true)
  const preventOverflow = useBoolean('Prevent overflow', true)
  const radius = useSelect('Radius', WORKSHOP_RADIUS_OPTIONS, 2)
  const width = useSelect('Width', WORKSHOP_CONTAINER_WIDTH_OPTIONS, 'auto')
  const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null)
  const [boundaryElement, setBoundaryElement] = useState<HTMLDivElement | null>(null)

  return (
    <Card height="fill" padding={3} sizing="border">
      <PortalProvider element={portalElement}>
        <Text align="center" muted size={1}>
          Scroll this box to reveal the popover
        </Text>
        <div
          ref={setBoundaryElement}
          style={{
            height: 'calc(100vh - 120px)',
            position: 'absolute',
            top: 0,
            left: 0,
            margin: 60,
            overflow: 'auto',
            outline: '1px solid red',
            width: 'calc(100vw - 120px)',
          }}
        >
          <div style={{padding: '150vh 0', textAlign: 'center'}}>
            <Popover
              __unstable_margins={[1, 1, 1, 1]}
              arrow={arrow}
              boundaryElement={boundaryElementFlag ? boundaryElement : undefined}
              constrainSize={constrainSize}
              content={<Text>popover content</Text>}
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
        </div>
        <div ref={setPortalElement} />
      </PortalProvider>
    </Card>
  )
}
