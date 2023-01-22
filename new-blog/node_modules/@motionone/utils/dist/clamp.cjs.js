'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const clamp = (min, max, v) => Math.min(Math.max(v, min), max);

exports.clamp = clamp;
