import { AnimationType } from '../render/utils/types.mjs';
import { usePointerEvent } from '../events/use-pointer-event.mjs';
import { isDragActive } from './drag/utils/lock.mjs';
import { useMemo } from 'react';

function createHoverEvent(visualElement, isActive, applyVariants, callback) {
    return (event, info) => {
        if (event.type === "touch" || isDragActive())
            return;
        /**
         * Ensure we trigger animations before firing event callback
         */
        if (applyVariants && visualElement.animationState) {
            visualElement.animationState.setActive(AnimationType.Hover, isActive);
        }
        callback && callback(event, info);
    };
}
function useHoverGesture({ onHoverStart, onHoverEnd, whileHover, visualElement, }) {
    usePointerEvent(visualElement, "pointerenter", useMemo(() => {
        return onHoverStart || whileHover
            ? createHoverEvent(visualElement, true, Boolean(whileHover), onHoverStart)
            : undefined;
    }, [onHoverStart, Boolean(whileHover), visualElement]), { passive: !onHoverStart });
    usePointerEvent(visualElement, "pointerleave", useMemo(() => {
        return onHoverEnd || whileHover
            ? createHoverEvent(visualElement, false, Boolean(whileHover), onHoverEnd)
            : undefined;
    }, [onHoverStart, Boolean(whileHover), visualElement]), { passive: !onHoverEnd });
}

export { useHoverGesture };
