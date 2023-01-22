import { invariant } from 'hey-listen';
import { cubicBezier } from '../../easing/cubic-bezier.mjs';
import { noop } from '../../utils/noop.mjs';
import { easeIn, easeInOut, easeOut } from '../../easing/ease.mjs';
import { circIn, circInOut, circOut } from '../../easing/circ.mjs';
import { backIn, backInOut, backOut } from '../../easing/back.mjs';
import { anticipate } from '../../easing/anticipate.mjs';

const easingLookup = {
    linear: noop,
    easeIn,
    easeInOut,
    easeOut,
    circIn,
    circInOut,
    circOut,
    backIn,
    backInOut,
    backOut,
    anticipate,
};
const easingDefinitionToFunction = (definition) => {
    if (Array.isArray(definition)) {
        // If cubic bezier definition, create bezier curve
        invariant(definition.length === 4, `Cubic bezier arrays must contain four numerical values.`);
        const [x1, y1, x2, y2] = definition;
        return cubicBezier(x1, y1, x2, y2);
    }
    else if (typeof definition === "string") {
        // Else lookup from table
        invariant(easingLookup[definition] !== undefined, `Invalid easing type '${definition}'`);
        return easingLookup[definition];
    }
    return definition;
};
const isEasingArray = (ease) => {
    return Array.isArray(ease) && typeof ease[0] !== "number";
};

export { easingDefinitionToFunction, isEasingArray };
