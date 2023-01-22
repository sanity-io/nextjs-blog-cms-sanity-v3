'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function hasReachedTarget(origin, target, current) {
    return ((origin < target && current >= target) ||
        (origin > target && current <= target));
}

exports.hasReachedTarget = hasReachedTarget;
