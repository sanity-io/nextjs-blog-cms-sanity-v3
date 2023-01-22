import { useRef, useContext, useEffect } from 'react';
import { MotionConfigContext } from '../context/MotionConfigContext.mjs';
import { useUnmountEffect } from '../utils/use-unmount-effect.mjs';
import { usePointerEvent } from '../events/use-pointer-event.mjs';
import { PanSession } from './PanSession.mjs';

/**
 *
 * @param handlers -
 * @param ref -
 *
 * @privateRemarks
 * Currently this sets new pan gesture functions every render. The memo route has been explored
 * in the past but ultimately we're still creating new functions every render. An optimisation
 * to explore is creating the pan gestures and loading them into a `ref`.
 *
 * @internal
 */
function usePanGesture({ onPan, onPanStart, onPanEnd, onPanSessionStart, visualElement, }) {
    const hasPanEvents = onPan || onPanStart || onPanEnd || onPanSessionStart;
    const panSession = useRef(null);
    const { transformPagePoint } = useContext(MotionConfigContext);
    const handlers = {
        onSessionStart: onPanSessionStart,
        onStart: onPanStart,
        onMove: onPan,
        onEnd: (event, info) => {
            panSession.current = null;
            onPanEnd && onPanEnd(event, info);
        },
    };
    useEffect(() => {
        if (panSession.current !== null) {
            panSession.current.updateHandlers(handlers);
        }
    });
    function onPointerDown(event) {
        panSession.current = new PanSession(event, handlers, {
            transformPagePoint,
        });
    }
    usePointerEvent(visualElement, "pointerdown", hasPanEvents && onPointerDown);
    useUnmountEffect(() => panSession.current && panSession.current.end());
}

export { usePanGesture };
