import {useBoolean, useSelect, useText} from '@sanity/ui-workshop'
import {ReactElement, useState} from 'react'
import {
  WORKSHOP_CONTAINER_WIDTH_OPTIONS,
  WORKSHOP_PLACEMENT_OPTIONS,
  WORKSHOP_RADIUS_OPTIONS,
} from '../../../__workshop__/constants'
import {BoundaryElementProvider, PortalProvider} from '../../../utils'
import {Button} from '../../button'
import {Card} from '../../card'
import {Text} from '../../text'
import {Popover} from '../popover'

export default function TestStory(): ReactElement {
  const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null)
  const [boundaryElement, setBoundaryElement] = useState<HTMLDivElement | null>(null)
  const arrow = useBoolean('Arrow', true)
  const constrainSize = useBoolean('Constrain size', true)
  const matchReferenceWidth = useBoolean('Match reference width', false)
  const open = useBoolean('Open', true)
  const placement = useSelect('Placement', WORKSHOP_PLACEMENT_OPTIONS, 'bottom')
  const preventOverflow = useBoolean('Prevent overflow', true)
  const radius = useSelect('Radius', WORKSHOP_RADIUS_OPTIONS, 2)
  const referenceWide = useBoolean('Reference wide?', false)
  const width = useSelect('Width', WORKSHOP_CONTAINER_WIDTH_OPTIONS, 'auto')

  const text = useText('Text', 'Test')

  return (
    <Card
      ref={setBoundaryElement}
      shadow={2}
      style={{
        position: 'absolute',
        top: 50,
        right: 50,
        bottom: 50,
        left: 50,
      }}
    >
      <div
        data-portal=""
        ref={setPortalElement}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      />

      <div style={{width: '100%', height: '100%', overflow: 'auto'}}>
        <div style={{padding: '150vh'}}>
          <PortalProvider element={portalElement}>
            <BoundaryElementProvider element={boundaryElement}>
              <Popover
                arrow={arrow}
                content={<Text size={1}>{text}</Text>}
                constrainSize={constrainSize}
                fallbackPlacements={['left', 'bottom', 'right', 'top']}
                matchReferenceWidth={matchReferenceWidth}
                open={open}
                padding={3}
                placement={placement}
                portal
                preventOverflow={preventOverflow}
                radius={radius}
                width={width}
              >
                <Button text="reference" style={{width: referenceWide ? 300 : undefined}} />
              </Popover>
            </BoundaryElementProvider>
          </PortalProvider>
        </div>
      </div>
    </Card>
  )
}
