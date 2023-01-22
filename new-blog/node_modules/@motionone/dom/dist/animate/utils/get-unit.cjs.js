'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('@motionone/utils');

function getUnitConverter(keyframes, definition) {
    var _a;
    let toUnit = (definition === null || definition === void 0 ? void 0 : definition.toDefaultUnit) || utils.noopReturn;
    const finalKeyframe = keyframes[keyframes.length - 1];
    if (utils.isString(finalKeyframe)) {
        const unit = ((_a = finalKeyframe.match(/(-?[\d.]+)([a-z%]*)/)) === null || _a === void 0 ? void 0 : _a[2]) || "";
        if (unit)
            toUnit = (value) => value + unit;
    }
    return toUnit;
}

exports.getUnitConverter = getUnitConverter;
