'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var handleElement = require('./handle-element.cjs.js');
var handleWindow = require('./handle-window.cjs.js');
var utils = require('@motionone/utils');

function resize(a, b) {
    return utils.isFunction(a) ? handleWindow.resizeWindow(a) : handleElement.resizeElement(a, b);
}

exports.resize = resize;
