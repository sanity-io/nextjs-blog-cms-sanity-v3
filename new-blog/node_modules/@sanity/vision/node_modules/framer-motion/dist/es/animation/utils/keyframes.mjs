import { getAnimatableNone } from '../../render/dom/value-types/animatable-none.mjs';
import { isAnimatable } from './is-animatable.mjs';
import { isZero, getZeroUnit } from './transitions.mjs';

function getKeyframes(value, valueName, target, transition) {
    const isTargetAnimatable = isAnimatable(valueName, target);
    let origin = transition.from !== undefined ? transition.from : value.get();
    if (origin === "none" && isTargetAnimatable && typeof target === "string") {
        /**
         * If we're trying to animate from "none", try and get an animatable version
         * of the target. This could be improved to work both ways.
         */
        origin = getAnimatableNone(valueName, target);
    }
    else if (isZero(origin) && typeof target === "string") {
        origin = getZeroUnit(target);
    }
    else if (!Array.isArray(target) &&
        isZero(target) &&
        typeof origin === "string") {
        target = getZeroUnit(origin);
    }
    /**
     * If the target has been defined as a series of keyframes
     */
    if (Array.isArray(target)) {
        /**
         * Ensure an initial wildcard keyframe is hydrated by the origin.
         * TODO: Support extra wildcard keyframes i.e [1, null, 0]
         */
        if (target[0] === null) {
            target[0] = origin;
        }
        return target;
    }
    else {
        return [origin, target];
    }
}

export { getKeyframes };
