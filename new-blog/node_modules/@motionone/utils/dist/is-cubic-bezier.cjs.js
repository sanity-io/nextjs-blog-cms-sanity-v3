'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isNumber = require('./is-number.cjs.js');

const isCubicBezier = (easing) => Array.isArray(easing) && isNumber.isNumber(easing[0]);

exports.isCubicBezier = isCubicBezier;
