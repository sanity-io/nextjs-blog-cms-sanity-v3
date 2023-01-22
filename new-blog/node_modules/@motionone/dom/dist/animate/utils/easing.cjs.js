'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('@motionone/utils');
var featureDetection = require('./feature-detection.cjs.js');

// Create a linear easing point for every x second
const resolution = 0.015;
const generateLinearEasingPoints = (easing, duration) => {
    let points = "";
    const numPoints = Math.round(duration / resolution);
    for (let i = 0; i < numPoints; i++) {
        points += easing(utils.progress(0, numPoints - 1, i)) + ", ";
    }
    return points.substring(0, points.length - 2);
};
const convertEasing = (easing, duration) => {
    if (utils.isFunction(easing)) {
        return featureDetection.supports.linearEasing()
            ? `linear(${generateLinearEasingPoints(easing, duration)})`
            : utils.defaults.easing;
    }
    else {
        return utils.isCubicBezier(easing) ? cubicBezierAsString(easing) : easing;
    }
};
const cubicBezierAsString = ([a, b, c, d]) => `cubic-bezier(${a}, ${b}, ${c}, ${d})`;

exports.convertEasing = convertEasing;
exports.cubicBezierAsString = cubicBezierAsString;
exports.generateLinearEasingPoints = generateLinearEasingPoints;
