import { resizeElement } from './handle-element.es.js';
import { resizeWindow } from './handle-window.es.js';
import { isFunction } from '@motionone/utils';

function resize(a, b) {
    return isFunction(a) ? resizeWindow(a) : resizeElement(a, b);
}

export { resize };
