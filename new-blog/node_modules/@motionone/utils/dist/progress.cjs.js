'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const progress = (min, max, value) => max - min === 0 ? 1 : (value - min) / (max - min);

exports.progress = progress;
