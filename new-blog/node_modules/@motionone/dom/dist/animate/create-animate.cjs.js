'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var heyListen = require('hey-listen');
var animateStyle = require('./animate-style.cjs.js');
var options = require('./utils/options.cjs.js');
var resolveElements = require('../utils/resolve-elements.cjs.js');
var controls = require('./utils/controls.cjs.js');
var stagger = require('../utils/stagger.cjs.js');

function createAnimate(AnimatePolyfill) {
    return function animate(elements, keyframes, options$1 = {}) {
        elements = resolveElements.resolveElements(elements);
        const numElements = elements.length;
        heyListen.invariant(Boolean(numElements), "No valid element provided.");
        heyListen.invariant(Boolean(keyframes), "No keyframes defined.");
        /**
         * Create and start new animations
         */
        const animationFactories = [];
        for (let i = 0; i < numElements; i++) {
            const element = elements[i];
            for (const key in keyframes) {
                const valueOptions = options.getOptions(options$1, key);
                valueOptions.delay = stagger.resolveOption(valueOptions.delay, i, numElements);
                const animation = animateStyle.animateStyle(element, key, keyframes[key], valueOptions, AnimatePolyfill);
                animationFactories.push(animation);
            }
        }
        return controls.withControls(animationFactories, options$1, 
        /**
         * TODO:
         * If easing is set to spring or glide, duration will be dynamically
         * generated. Ideally we would dynamically generate this from
         * animation.effect.getComputedTiming().duration but this isn't
         * supported in iOS13 or our number polyfill. Perhaps it's possible
         * to Proxy animations returned from animateStyle that has duration
         * as a getter.
         */
        options$1.duration);
    };
}

exports.createAnimate = createAnimate;
