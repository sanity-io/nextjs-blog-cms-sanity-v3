import { useEffect } from 'react';
import { VisualElementDragControls } from './VisualElementDragControls.mjs';
import { useConstant } from '../../utils/use-constant.mjs';

/**
 * A hook that allows an element to be dragged.
 *
 * @internal
 */
function useDrag(props) {
    const { dragControls: groupDragControls, visualElement } = props;
    const dragControls = useConstant(() => new VisualElementDragControls(visualElement));
    // If we've been provided a DragControls for manual control over the drag gesture,
    // subscribe this component to it on mount.
    useEffect(() => groupDragControls && groupDragControls.subscribe(dragControls), [dragControls, groupDragControls]);
    // Apply the event listeners to the element
    useEffect(() => dragControls.addListeners(), [dragControls]);
}

export { useDrag };
