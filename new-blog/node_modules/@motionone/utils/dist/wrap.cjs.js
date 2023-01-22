'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const wrap = (min, max, v) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

exports.wrap = wrap;
