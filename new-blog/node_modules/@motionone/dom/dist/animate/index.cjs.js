'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var animation = require('@motionone/animation');
var createAnimate = require('./create-animate.cjs.js');

const animate = createAnimate.createAnimate(animation.Animation);

exports.animate = animate;
