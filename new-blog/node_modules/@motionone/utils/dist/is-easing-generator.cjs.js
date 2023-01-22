'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const isEasingGenerator = (easing) => typeof easing === "object" &&
    Boolean(easing.createAnimation);

exports.isEasingGenerator = isEasingGenerator;
