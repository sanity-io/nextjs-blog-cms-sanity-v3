import { addDomEvent, useDomEvent } from './use-dom-event.mjs';
import { addPointerInfo } from './event-info.mjs';

function addPointerEvent(target, eventName, handler, options) {
    return addDomEvent(target, eventName, addPointerInfo(handler), options);
}
function usePointerEvent(ref, eventName, handler, options) {
    return useDomEvent(ref, eventName, handler && addPointerInfo(handler), options);
}

export { addPointerEvent, usePointerEvent };
