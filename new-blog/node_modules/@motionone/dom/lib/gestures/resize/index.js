import { resizeElement } from "./handle-element";
import { resizeWindow } from "./handle-window";
import { isFunction } from "@motionone/utils";
export function resize(a, b) {
    return isFunction(a) ? resizeWindow(a) : resizeElement(a, b);
}
//# sourceMappingURL=index.js.map