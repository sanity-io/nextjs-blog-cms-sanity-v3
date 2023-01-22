(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Motion = {}));
})(this, (function (exports) { 'use strict';

    function addUniqueItem(array, item) {
        array.indexOf(item) === -1 && array.push(item);
    }
    function removeItem(arr, item) {
        const index = arr.indexOf(item);
        index > -1 && arr.splice(index, 1);
    }

    const clamp = (min, max, v) => Math.min(Math.max(v, min), max);

    const defaults$1 = {
        duration: 0.3,
        delay: 0,
        endDelay: 0,
        repeat: 0,
        easing: "ease",
    };

    const isNumber = (value) => typeof value === "number";

    const isEasingList = (easing) => Array.isArray(easing) && !isNumber(easing[0]);

    const wrap = (min, max, v) => {
        const rangeSize = max - min;
        return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
    };

    function getEasingForSegment(easing, i) {
        return isEasingList(easing)
            ? easing[wrap(0, easing.length, i)]
            : easing;
    }

    const mix = (min, max, progress) => -progress * min + progress * max + min;

    const noop = () => { };
    const noopReturn = (v) => v;

    const progress = (min, max, value) => max - min === 0 ? 1 : (value - min) / (max - min);

    function fillOffset(offset, remaining) {
        const min = offset[offset.length - 1];
        for (let i = 1; i <= remaining; i++) {
            const offsetProgress = progress(0, remaining, i);
            offset.push(mix(min, 1, offsetProgress));
        }
    }
    function defaultOffset$1(length) {
        const offset = [0];
        fillOffset(offset, length - 1);
        return offset;
    }

    function interpolate(output, input = defaultOffset$1(output.length), easing = noopReturn) {
        const length = output.length;
        /**
         * If the input length is lower than the output we
         * fill the input to match. This currently assumes the input
         * is an animation progress value so is a good candidate for
         * moving outside the function.
         */
        const remainder = length - input.length;
        remainder > 0 && fillOffset(input, remainder);
        return (t) => {
            let i = 0;
            for (; i < length - 2; i++) {
                if (t < input[i + 1])
                    break;
            }
            let progressInRange = clamp(0, 1, progress(input[i], input[i + 1], t));
            const segmentEasing = getEasingForSegment(easing, i);
            progressInRange = segmentEasing(progressInRange);
            return mix(output[i], output[i + 1], progressInRange);
        };
    }

    const isCubicBezier = (easing) => Array.isArray(easing) && isNumber(easing[0]);

    const isEasingGenerator = (easing) => typeof easing === "object" &&
        Boolean(easing.createAnimation);

    const isFunction = (value) => typeof value === "function";

    const isString = (value) => typeof value === "string";

    const time = {
        ms: (seconds) => seconds * 1000,
        s: (milliseconds) => milliseconds / 1000,
    };

    /*
      Convert velocity into velocity per second

      @param [number]: Unit per frame
      @param [number]: Frame duration in ms
    */
    function velocityPerSecond(velocity, frameDuration) {
        return frameDuration ? velocity * (1000 / frameDuration) : 0;
    }

    /*
      Bezier function generator

      This has been modified from Gaëtan Renaudeau's BezierEasing
      https://github.com/gre/bezier-easing/blob/master/src/index.js
      https://github.com/gre/bezier-easing/blob/master/LICENSE
      
      I've removed the newtonRaphsonIterate algo because in benchmarking it
      wasn't noticiably faster than binarySubdivision, indeed removing it
      usually improved times, depending on the curve.

      I also removed the lookup table, as for the added bundle size and loop we're
      only cutting ~4 or so subdivision iterations. I bumped the max iterations up
      to 12 to compensate and this still tended to be faster for no perceivable
      loss in accuracy.

      Usage
        const easeOut = cubicBezier(.17,.67,.83,.67);
        const x = easeOut(0.5); // returns 0.627...
    */
    // Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
    const calcBezier = (t, a1, a2) => (((1.0 - 3.0 * a2 + 3.0 * a1) * t + (3.0 * a2 - 6.0 * a1)) * t + 3.0 * a1) * t;
    const subdivisionPrecision = 0.0000001;
    const subdivisionMaxIterations = 12;
    function binarySubdivide(x, lowerBound, upperBound, mX1, mX2) {
        let currentX;
        let currentT;
        let i = 0;
        do {
            currentT = lowerBound + (upperBound - lowerBound) / 2.0;
            currentX = calcBezier(currentT, mX1, mX2) - x;
            if (currentX > 0.0) {
                upperBound = currentT;
            }
            else {
                lowerBound = currentT;
            }
        } while (Math.abs(currentX) > subdivisionPrecision &&
            ++i < subdivisionMaxIterations);
        return currentT;
    }
    function cubicBezier(mX1, mY1, mX2, mY2) {
        // If this is a linear gradient, return linear easing
        if (mX1 === mY1 && mX2 === mY2)
            return noopReturn;
        const getTForX = (aX) => binarySubdivide(aX, 0, 1, mX1, mX2);
        // If animation is at start/end, return t without easing
        return (t) => t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
    }

    const steps = (steps, direction = "end") => (progress) => {
        progress =
            direction === "end"
                ? Math.min(progress, 0.999)
                : Math.max(progress, 0.001);
        const expanded = progress * steps;
        const rounded = direction === "end" ? Math.floor(expanded) : Math.ceil(expanded);
        return clamp(0, 1, rounded / steps);
    };

    const namedEasings = {
        ease: cubicBezier(0.25, 0.1, 0.25, 1.0),
        "ease-in": cubicBezier(0.42, 0.0, 1.0, 1.0),
        "ease-in-out": cubicBezier(0.42, 0.0, 0.58, 1.0),
        "ease-out": cubicBezier(0.0, 0.0, 0.58, 1.0),
    };
    const functionArgsRegex = /\((.*?)\)/;
    function getEasingFunction(definition) {
        // If already an easing function, return
        if (isFunction(definition))
            return definition;
        // If an easing curve definition, return bezier function
        if (isCubicBezier(definition))
            return cubicBezier(...definition);
        // If we have a predefined easing function, return
        if (namedEasings[definition])
            return namedEasings[definition];
        // If this is a steps function, attempt to create easing curve
        if (definition.startsWith("steps")) {
            const args = functionArgsRegex.exec(definition);
            if (args) {
                const argsArray = args[1].split(",");
                return steps(parseFloat(argsArray[0]), argsArray[1].trim());
            }
        }
        return noopReturn;
    }

    class Animation {
        constructor(output, keyframes = [0, 1], { easing, duration: initialDuration = defaults$1.duration, delay = defaults$1.delay, endDelay = defaults$1.endDelay, repeat = defaults$1.repeat, offset, direction = "normal", } = {}) {
            this.startTime = null;
            this.rate = 1;
            this.t = 0;
            this.cancelTimestamp = null;
            this.easing = noopReturn;
            this.duration = 0;
            this.totalDuration = 0;
            this.repeat = 0;
            this.playState = "idle";
            this.finished = new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            });
            easing = easing || defaults$1.easing;
            if (isEasingGenerator(easing)) {
                const custom = easing.createAnimation(keyframes);
                easing = custom.easing;
                keyframes = custom.keyframes || keyframes;
                initialDuration = custom.duration || initialDuration;
            }
            this.repeat = repeat;
            this.easing = isEasingList(easing) ? noopReturn : getEasingFunction(easing);
            this.updateDuration(initialDuration);
            const interpolate$1 = interpolate(keyframes, offset, isEasingList(easing) ? easing.map(getEasingFunction) : noopReturn);
            this.tick = (timestamp) => {
                var _a;
                // TODO: Temporary fix for OptionsResolver typing
                delay = delay;
                let t = 0;
                if (this.pauseTime !== undefined) {
                    t = this.pauseTime;
                }
                else {
                    t = (timestamp - this.startTime) * this.rate;
                }
                this.t = t;
                // Convert to seconds
                t /= 1000;
                // Rebase on delay
                t = Math.max(t - delay, 0);
                /**
                 * If this animation has finished, set the current time
                 * to the total duration.
                 */
                if (this.playState === "finished" && this.pauseTime === undefined) {
                    t = this.totalDuration;
                }
                /**
                 * Get the current progress (0-1) of the animation. If t is >
                 * than duration we'll get values like 2.5 (midway through the
                 * third iteration)
                 */
                const progress = t / this.duration;
                // TODO progress += iterationStart
                /**
                 * Get the current iteration (0 indexed). For instance the floor of
                 * 2.5 is 2.
                 */
                let currentIteration = Math.floor(progress);
                /**
                 * Get the current progress of the iteration by taking the remainder
                 * so 2.5 is 0.5 through iteration 2
                 */
                let iterationProgress = progress % 1.0;
                if (!iterationProgress && progress >= 1) {
                    iterationProgress = 1;
                }
                /**
                 * If iteration progress is 1 we count that as the end
                 * of the previous iteration.
                 */
                iterationProgress === 1 && currentIteration--;
                /**
                 * Reverse progress if we're not running in "normal" direction
                 */
                const iterationIsOdd = currentIteration % 2;
                if (direction === "reverse" ||
                    (direction === "alternate" && iterationIsOdd) ||
                    (direction === "alternate-reverse" && !iterationIsOdd)) {
                    iterationProgress = 1 - iterationProgress;
                }
                const p = t >= this.totalDuration ? 1 : Math.min(iterationProgress, 1);
                const latest = interpolate$1(this.easing(p));
                output(latest);
                const isAnimationFinished = this.pauseTime === undefined &&
                    (this.playState === "finished" || t >= this.totalDuration + endDelay);
                if (isAnimationFinished) {
                    this.playState = "finished";
                    (_a = this.resolve) === null || _a === void 0 ? void 0 : _a.call(this, latest);
                }
                else if (this.playState !== "idle") {
                    this.frameRequestId = requestAnimationFrame(this.tick);
                }
            };
            this.play();
        }
        play() {
            const now = performance.now();
            this.playState = "running";
            if (this.pauseTime !== undefined) {
                this.startTime = now - this.pauseTime;
            }
            else if (!this.startTime) {
                this.startTime = now;
            }
            this.cancelTimestamp = this.startTime;
            this.pauseTime = undefined;
            this.frameRequestId = requestAnimationFrame(this.tick);
        }
        pause() {
            this.playState = "paused";
            this.pauseTime = this.t;
        }
        finish() {
            this.playState = "finished";
            this.tick(0);
        }
        stop() {
            var _a;
            this.playState = "idle";
            if (this.frameRequestId !== undefined) {
                cancelAnimationFrame(this.frameRequestId);
            }
            (_a = this.reject) === null || _a === void 0 ? void 0 : _a.call(this, false);
        }
        cancel() {
            this.stop();
            this.tick(this.cancelTimestamp);
        }
        reverse() {
            this.rate *= -1;
        }
        commitStyles() { }
        updateDuration(duration) {
            this.duration = duration;
            this.totalDuration = duration * (this.repeat + 1);
        }
        get currentTime() {
            return this.t;
        }
        set currentTime(t) {
            if (this.pauseTime !== undefined || this.rate === 0) {
                this.pauseTime = t;
            }
            else {
                this.startTime = performance.now() - t / this.rate;
            }
        }
        get playbackRate() {
            return this.rate;
        }
        set playbackRate(rate) {
            this.rate = rate;
        }
    }

    var invariant = function () { };
    {
        invariant = function (check, message) {
            if (!check) {
                throw new Error(message);
            }
        };
    }

    /**
     * The MotionValue tracks the state of a single animatable
     * value. Currently, updatedAt and current are unused. The
     * long term idea is to use this to minimise the number
     * of DOM reads, and to abstract the DOM interactions here.
     */
    class MotionValue {
        setAnimation(animation) {
            this.animation = animation;
            animation === null || animation === void 0 ? void 0 : animation.finished.then(() => this.clearAnimation()).catch(() => { });
        }
        clearAnimation() {
            this.animation = this.generator = undefined;
        }
    }

    const data = new WeakMap();
    function getAnimationData(element) {
        if (!data.has(element)) {
            data.set(element, {
                transforms: [],
                values: new Map(),
            });
        }
        return data.get(element);
    }
    function getMotionValue(motionValues, name) {
        if (!motionValues.has(name)) {
            motionValues.set(name, new MotionValue());
        }
        return motionValues.get(name);
    }

    /**
     * A list of all transformable axes. We'll use this list to generated a version
     * of each axes for each transform.
     */
    const axes = ["", "X", "Y", "Z"];
    /**
     * An ordered array of each transformable value. By default, transform values
     * will be sorted to this order.
     */
    const order = ["translate", "scale", "rotate", "skew"];
    const transformAlias = {
        x: "translateX",
        y: "translateY",
        z: "translateZ",
    };
    const rotation = {
        syntax: "<angle>",
        initialValue: "0deg",
        toDefaultUnit: (v) => v + "deg",
    };
    const baseTransformProperties = {
        translate: {
            syntax: "<length-percentage>",
            initialValue: "0px",
            toDefaultUnit: (v) => v + "px",
        },
        rotate: rotation,
        scale: {
            syntax: "<number>",
            initialValue: 1,
            toDefaultUnit: noopReturn,
        },
        skew: rotation,
    };
    const transformDefinitions = new Map();
    const asTransformCssVar = (name) => `--motion-${name}`;
    /**
     * Generate a list of every possible transform key
     */
    const transforms = ["x", "y", "z"];
    order.forEach((name) => {
        axes.forEach((axis) => {
            transforms.push(name + axis);
            transformDefinitions.set(asTransformCssVar(name + axis), baseTransformProperties[name]);
        });
    });
    /**
     * A function to use with Array.sort to sort transform keys by their default order.
     */
    const compareTransformOrder = (a, b) => transforms.indexOf(a) - transforms.indexOf(b);
    /**
     * Provide a quick way to check if a string is the name of a transform
     */
    const transformLookup = new Set(transforms);
    const isTransform = (name) => transformLookup.has(name);
    const addTransformToElement = (element, name) => {
        // Map x to translateX etc
        if (transformAlias[name])
            name = transformAlias[name];
        const { transforms } = getAnimationData(element);
        addUniqueItem(transforms, name);
        /**
         * TODO: An optimisation here could be to cache the transform in element data
         * and only update if this has changed.
         */
        element.style.transform = buildTransformTemplate(transforms);
    };
    const buildTransformTemplate = (transforms) => transforms
        .sort(compareTransformOrder)
        .reduce(transformListToString, "")
        .trim();
    const transformListToString = (template, name) => `${template} ${name}(var(${asTransformCssVar(name)}))`;

    const isCssVar = (name) => name.startsWith("--");
    const registeredProperties = new Set();
    function registerCssVariable(name) {
        if (registeredProperties.has(name))
            return;
        registeredProperties.add(name);
        try {
            const { syntax, initialValue } = transformDefinitions.has(name)
                ? transformDefinitions.get(name)
                : {};
            CSS.registerProperty({
                name,
                inherits: false,
                syntax,
                initialValue,
            });
        }
        catch (e) { }
    }

    const testAnimation = (keyframes, options) => document.createElement("div").animate(keyframes, options);
    const featureTests = {
        cssRegisterProperty: () => typeof CSS !== "undefined" &&
            Object.hasOwnProperty.call(CSS, "registerProperty"),
        waapi: () => Object.hasOwnProperty.call(Element.prototype, "animate"),
        partialKeyframes: () => {
            try {
                testAnimation({ opacity: [1] });
            }
            catch (e) {
                return false;
            }
            return true;
        },
        finished: () => Boolean(testAnimation({ opacity: [0, 1] }, { duration: 0.001 }).finished),
        linearEasing: () => {
            try {
                testAnimation({ opacity: 0 }, { easing: "linear(0, 1)" });
            }
            catch (e) {
                return false;
            }
            return true;
        },
    };
    const results = {};
    const supports = {};
    for (const key in featureTests) {
        supports[key] = () => {
            if (results[key] === undefined)
                results[key] = featureTests[key]();
            return results[key];
        };
    }

    // Create a linear easing point for every x second
    const resolution = 0.015;
    const generateLinearEasingPoints = (easing, duration) => {
        let points = "";
        const numPoints = Math.round(duration / resolution);
        for (let i = 0; i < numPoints; i++) {
            points += easing(progress(0, numPoints - 1, i)) + ", ";
        }
        return points.substring(0, points.length - 2);
    };
    const convertEasing = (easing, duration) => {
        if (isFunction(easing)) {
            return supports.linearEasing()
                ? `linear(${generateLinearEasingPoints(easing, duration)})`
                : defaults$1.easing;
        }
        else {
            return isCubicBezier(easing) ? cubicBezierAsString(easing) : easing;
        }
    };
    const cubicBezierAsString = ([a, b, c, d]) => `cubic-bezier(${a}, ${b}, ${c}, ${d})`;

    function hydrateKeyframes(keyframes, readInitialValue) {
        for (let i = 0; i < keyframes.length; i++) {
            if (keyframes[i] === null) {
                keyframes[i] = i ? keyframes[i - 1] : readInitialValue();
            }
        }
        return keyframes;
    }
    const keyframesList = (keyframes) => Array.isArray(keyframes) ? keyframes : [keyframes];

    function getStyleName(key) {
        if (transformAlias[key])
            key = transformAlias[key];
        return isTransform(key) ? asTransformCssVar(key) : key;
    }

    const style = {
        get: (element, name) => {
            name = getStyleName(name);
            let value = isCssVar(name)
                ? element.style.getPropertyValue(name)
                : getComputedStyle(element)[name];
            if (!value && value !== 0) {
                const definition = transformDefinitions.get(name);
                if (definition)
                    value = definition.initialValue;
            }
            return value;
        },
        set: (element, name, value) => {
            name = getStyleName(name);
            if (isCssVar(name)) {
                element.style.setProperty(name, value);
            }
            else {
                element.style[name] = value;
            }
        },
    };

    function stopAnimation(animation, needsCommit = true) {
        if (!animation || animation.playState === "finished")
            return;
        // Suppress error thrown by WAAPI
        try {
            if (animation.stop) {
                animation.stop();
            }
            else {
                needsCommit && animation.commitStyles();
                animation.cancel();
            }
        }
        catch (e) { }
    }

    function getUnitConverter(keyframes, definition) {
        var _a;
        let toUnit = (definition === null || definition === void 0 ? void 0 : definition.toDefaultUnit) || noopReturn;
        const finalKeyframe = keyframes[keyframes.length - 1];
        if (isString(finalKeyframe)) {
            const unit = ((_a = finalKeyframe.match(/(-?[\d.]+)([a-z%]*)/)) === null || _a === void 0 ? void 0 : _a[2]) || "";
            if (unit)
                toUnit = (value) => value + unit;
        }
        return toUnit;
    }

    function getDevToolsRecord() {
        return window.__MOTION_DEV_TOOLS_RECORD;
    }
    function animateStyle(element, key, keyframesDefinition, options = {}, AnimationPolyfill) {
        const record = getDevToolsRecord();
        const isRecording = options.record !== false && record;
        let animation;
        let { duration = defaults$1.duration, delay = defaults$1.delay, endDelay = defaults$1.endDelay, repeat = defaults$1.repeat, easing = defaults$1.easing, persist = false, direction, offset, allowWebkitAcceleration = false, } = options;
        const data = getAnimationData(element);
        const valueIsTransform = isTransform(key);
        let canAnimateNatively = supports.waapi();
        /**
         * If this is an individual transform, we need to map its
         * key to a CSS variable and update the element's transform style
         */
        valueIsTransform && addTransformToElement(element, key);
        const name = getStyleName(key);
        const motionValue = getMotionValue(data.values, name);
        /**
         * Get definition of value, this will be used to convert numerical
         * keyframes into the default value type.
         */
        const definition = transformDefinitions.get(name);
        /**
         * Stop the current animation, if any. Because this will trigger
         * commitStyles (DOM writes) and we might later trigger DOM reads,
         * this is fired now and we return a factory function to create
         * the actual animation that can get called in batch,
         */
        stopAnimation(motionValue.animation, !(isEasingGenerator(easing) && motionValue.generator) &&
            options.record !== false);
        /**
         * Batchable factory function containing all DOM reads.
         */
        return () => {
            const readInitialValue = () => { var _a, _b; return (_b = (_a = style.get(element, name)) !== null && _a !== void 0 ? _a : definition === null || definition === void 0 ? void 0 : definition.initialValue) !== null && _b !== void 0 ? _b : 0; };
            /**
             * Replace null values with the previous keyframe value, or read
             * it from the DOM if it's the first keyframe.
             */
            let keyframes = hydrateKeyframes(keyframesList(keyframesDefinition), readInitialValue);
            /**
             * Detect unit type of keyframes.
             */
            const toUnit = getUnitConverter(keyframes, definition);
            if (isEasingGenerator(easing)) {
                const custom = easing.createAnimation(keyframes, key !== "opacity", readInitialValue, name, motionValue);
                easing = custom.easing;
                keyframes = custom.keyframes || keyframes;
                duration = custom.duration || duration;
            }
            /**
             * If this is a CSS variable we need to register it with the browser
             * before it can be animated natively. We also set it with setProperty
             * rather than directly onto the element.style object.
             */
            if (isCssVar(name)) {
                if (supports.cssRegisterProperty()) {
                    registerCssVariable(name);
                }
                else {
                    canAnimateNatively = false;
                }
            }
            /**
             * If we've been passed a custom easing function, and this browser
             * does **not** support linear() easing, and the value is a transform
             * (and thus a pure number) we can still support the custom easing
             * by falling back to the animation polyfill.
             */
            if (valueIsTransform &&
                !supports.linearEasing() &&
                (isFunction(easing) || (isEasingList(easing) && easing.some(isFunction)))) {
                canAnimateNatively = false;
            }
            /**
             * If we can animate this value with WAAPI, do so.
             */
            if (canAnimateNatively) {
                /**
                 * Convert numbers to default value types. Currently this only supports
                 * transforms but it could also support other value types.
                 */
                if (definition) {
                    keyframes = keyframes.map((value) => isNumber(value) ? definition.toDefaultUnit(value) : value);
                }
                /**
                 * If this browser doesn't support partial/implicit keyframes we need to
                 * explicitly provide one.
                 */
                if (keyframes.length === 1 &&
                    (!supports.partialKeyframes() || isRecording)) {
                    keyframes.unshift(readInitialValue());
                }
                const animationOptions = {
                    delay: time.ms(delay),
                    duration: time.ms(duration),
                    endDelay: time.ms(endDelay),
                    easing: !isEasingList(easing)
                        ? convertEasing(easing, duration)
                        : undefined,
                    direction,
                    iterations: repeat + 1,
                    fill: "both",
                };
                animation = element.animate({
                    [name]: keyframes,
                    offset,
                    easing: isEasingList(easing)
                        ? easing.map((thisEasing) => convertEasing(thisEasing, duration))
                        : undefined,
                }, animationOptions);
                /**
                 * Polyfill finished Promise in browsers that don't support it
                 */
                if (!animation.finished) {
                    animation.finished = new Promise((resolve, reject) => {
                        animation.onfinish = resolve;
                        animation.oncancel = reject;
                    });
                }
                const target = keyframes[keyframes.length - 1];
                animation.finished
                    .then(() => {
                    if (persist)
                        return;
                    // Apply styles to target
                    style.set(element, name, target);
                    // Ensure fill modes don't persist
                    animation.cancel();
                })
                    .catch(noop);
                /**
                 * This forces Webkit to run animations on the main thread by exploiting
                 * this condition:
                 * https://trac.webkit.org/browser/webkit/trunk/Source/WebCore/platform/graphics/ca/GraphicsLayerCA.cpp?rev=281238#L1099
                 *
                 * This fixes Webkit's timing bugs, like accelerated animations falling
                 * out of sync with main thread animations and massive delays in starting
                 * accelerated animations in WKWebView.
                 */
                if (!allowWebkitAcceleration)
                    animation.playbackRate = 1.000001;
                /**
                 * If we can't animate the value natively then we can fallback to the numbers-only
                 * polyfill for transforms.
                 */
            }
            else if (AnimationPolyfill && valueIsTransform) {
                /**
                 * If any keyframe is a string (because we measured it from the DOM), we need to convert
                 * it into a number before passing to the Animation polyfill.
                 */
                keyframes = keyframes.map((value) => typeof value === "string" ? parseFloat(value) : value);
                /**
                 * If we only have a single keyframe, we need to create an initial keyframe by reading
                 * the current value from the DOM.
                 */
                if (keyframes.length === 1) {
                    keyframes.unshift(parseFloat(readInitialValue()));
                }
                animation = new AnimationPolyfill((latest) => {
                    style.set(element, name, toUnit ? toUnit(latest) : latest);
                }, keyframes, Object.assign(Object.assign({}, options), { duration,
                    easing }));
            }
            else {
                const target = keyframes[keyframes.length - 1];
                style.set(element, name, definition && isNumber(target)
                    ? definition.toDefaultUnit(target)
                    : target);
            }
            if (isRecording) {
                record(element, key, keyframes, {
                    duration,
                    delay: delay,
                    easing,
                    repeat,
                    offset,
                }, "motion-one");
            }
            motionValue.setAnimation(animation);
            return animation;
        };
    }

    const getOptions = (options, key) => 
    /**
     * TODO: Make test for this
     * Always return a new object otherwise delay is overwritten by results of stagger
     * and this results in no stagger
     */
    options[key] ? Object.assign(Object.assign({}, options), options[key]) : Object.assign({}, options);

    function resolveElements(elements, selectorCache) {
        var _a;
        if (typeof elements === "string") {
            if (selectorCache) {
                (_a = selectorCache[elements]) !== null && _a !== void 0 ? _a : (selectorCache[elements] = document.querySelectorAll(elements));
                elements = selectorCache[elements];
            }
            else {
                elements = document.querySelectorAll(elements);
            }
        }
        else if (elements instanceof Element) {
            elements = [elements];
        }
        /**
         * Return an empty array
         */
        return Array.from(elements || []);
    }

    const createAnimation = (factory) => factory();
    const withControls = (animationFactory, options, duration = defaults$1.duration) => {
        return new Proxy({
            animations: animationFactory.map(createAnimation).filter(Boolean),
            duration,
            options,
        }, controls);
    };
    /**
     * TODO:
     * Currently this returns the first animation, ideally it would return
     * the first active animation.
     */
    const getActiveAnimation = (state) => state.animations[0];
    const controls = {
        get: (target, key) => {
            const activeAnimation = getActiveAnimation(target);
            switch (key) {
                case "duration":
                    return target.duration;
                case "currentTime":
                    return time.s((activeAnimation === null || activeAnimation === void 0 ? void 0 : activeAnimation[key]) || 0);
                case "playbackRate":
                case "playState":
                    return activeAnimation === null || activeAnimation === void 0 ? void 0 : activeAnimation[key];
                case "finished":
                    if (!target.finished) {
                        target.finished = Promise.all(target.animations.map(selectFinished)).catch(noop);
                    }
                    return target.finished;
                case "stop":
                    return () => {
                        target.animations.forEach((animation) => stopAnimation(animation));
                    };
                case "forEachNative":
                    /**
                     * This is for internal use only, fire a callback for each
                     * underlying animation.
                     */
                    return (callback) => {
                        target.animations.forEach((animation) => callback(animation, target));
                    };
                default:
                    return typeof (activeAnimation === null || activeAnimation === void 0 ? void 0 : activeAnimation[key]) === "undefined"
                        ? undefined
                        : () => target.animations.forEach((animation) => animation[key]());
            }
        },
        set: (target, key, value) => {
            switch (key) {
                case "currentTime":
                    value = time.ms(value);
                case "currentTime":
                case "playbackRate":
                    for (let i = 0; i < target.animations.length; i++) {
                        target.animations[i][key] = value;
                    }
                    return true;
            }
            return false;
        },
    };
    const selectFinished = (animation) => animation.finished;

    function stagger(duration = 0.1, { start = 0, from = 0, easing } = {}) {
        return (i, total) => {
            const fromIndex = isNumber(from) ? from : getFromIndex(from, total);
            const distance = Math.abs(fromIndex - i);
            let delay = duration * distance;
            if (easing) {
                const maxDelay = total * duration;
                const easingFunction = getEasingFunction(easing);
                delay = easingFunction(delay / maxDelay) * maxDelay;
            }
            return start + delay;
        };
    }
    function getFromIndex(from, total) {
        if (from === "first") {
            return 0;
        }
        else {
            const lastIndex = total - 1;
            return from === "last" ? lastIndex : lastIndex / 2;
        }
    }
    function resolveOption(option, i, total) {
        return isFunction(option) ? option(i, total) : option;
    }

    function createAnimate(AnimatePolyfill) {
        return function animate(elements, keyframes, options = {}) {
            elements = resolveElements(elements);
            const numElements = elements.length;
            invariant(Boolean(numElements), "No valid element provided.");
            invariant(Boolean(keyframes), "No keyframes defined.");
            /**
             * Create and start new animations
             */
            const animationFactories = [];
            for (let i = 0; i < numElements; i++) {
                const element = elements[i];
                for (const key in keyframes) {
                    const valueOptions = getOptions(options, key);
                    valueOptions.delay = resolveOption(valueOptions.delay, i, numElements);
                    const animation = animateStyle(element, key, keyframes[key], valueOptions, AnimatePolyfill);
                    animationFactories.push(animation);
                }
            }
            return withControls(animationFactories, options, 
            /**
             * TODO:
             * If easing is set to spring or glide, duration will be dynamically
             * generated. Ideally we would dynamically generate this from
             * animation.effect.getComputedTiming().duration but this isn't
             * supported in iOS13 or our number polyfill. Perhaps it's possible
             * to Proxy animations returned from animateStyle that has duration
             * as a getter.
             */
            options.duration);
        };
    }

    const animate = createAnimate(Animation);

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function calcNextTime(current, next, prev, labels) {
        var _a;
        if (isNumber(next)) {
            return next;
        }
        else if (next.startsWith("-") || next.startsWith("+")) {
            return Math.max(0, current + parseFloat(next));
        }
        else if (next === "<") {
            return prev;
        }
        else {
            return (_a = labels.get(next)) !== null && _a !== void 0 ? _a : current;
        }
    }

    function eraseKeyframes(sequence, startTime, endTime) {
        for (let i = 0; i < sequence.length; i++) {
            const keyframe = sequence[i];
            if (keyframe.at > startTime && keyframe.at < endTime) {
                removeItem(sequence, keyframe);
                // If we remove this item we have to push the pointer back one
                i--;
            }
        }
    }
    function addKeyframes(sequence, keyframes, easing, offset, startTime, endTime) {
        /**
         * Erase every existing value between currentTime and targetTime,
         * this will essentially splice this timeline into any currently
         * defined ones.
         */
        eraseKeyframes(sequence, startTime, endTime);
        for (let i = 0; i < keyframes.length; i++) {
            sequence.push({
                value: keyframes[i],
                at: mix(startTime, endTime, offset[i]),
                easing: getEasingForSegment(easing, i),
            });
        }
    }

    function compareByTime(a, b) {
        if (a.at === b.at) {
            return a.value === null ? 1 : -1;
        }
        else {
            return a.at - b.at;
        }
    }

    function timeline(definition, options = {}) {
        var _a;
        const animationDefinitions = createAnimationsFromTimeline(definition, options);
        /**
         * Create and start animations
         */
        const animationFactories = animationDefinitions
            .map((definition) => animateStyle(...definition, Animation))
            .filter(Boolean);
        return withControls(animationFactories, options, 
        // Get the duration from the first animation definition
        (_a = animationDefinitions[0]) === null || _a === void 0 ? void 0 : _a[3].duration);
    }
    function createAnimationsFromTimeline(definition, _a = {}) {
        var { defaultOptions = {} } = _a, timelineOptions = __rest(_a, ["defaultOptions"]);
        const animationDefinitions = [];
        const elementSequences = new Map();
        const elementCache = {};
        const timeLabels = new Map();
        let prevTime = 0;
        let currentTime = 0;
        let totalDuration = 0;
        /**
         * Build the timeline by mapping over the definition array and converting
         * the definitions into keyframes and offsets with absolute time values.
         * These will later get converted into relative offsets in a second pass.
         */
        for (let i = 0; i < definition.length; i++) {
            const segment = definition[i];
            /**
             * If this is a timeline label, mark it and skip the rest of this iteration.
             */
            if (isString(segment)) {
                timeLabels.set(segment, currentTime);
                continue;
            }
            else if (!Array.isArray(segment)) {
                timeLabels.set(segment.name, calcNextTime(currentTime, segment.at, prevTime, timeLabels));
                continue;
            }
            const [elementDefinition, keyframes, options = {}] = segment;
            /**
             * If a relative or absolute time value has been specified we need to resolve
             * it in relation to the currentTime.
             */
            if (options.at !== undefined) {
                currentTime = calcNextTime(currentTime, options.at, prevTime, timeLabels);
            }
            /**
             * Keep track of the maximum duration in this definition. This will be
             * applied to currentTime once the definition has been parsed.
             */
            let maxDuration = 0;
            /**
             * Find all the elements specified in the definition and parse value
             * keyframes from their timeline definitions.
             */
            const elements = resolveElements(elementDefinition, elementCache);
            const numElements = elements.length;
            for (let elementIndex = 0; elementIndex < numElements; elementIndex++) {
                const element = elements[elementIndex];
                const elementSequence = getElementSequence(element, elementSequences);
                for (const key in keyframes) {
                    const valueSequence = getValueSequence(key, elementSequence);
                    let valueKeyframes = keyframesList(keyframes[key]);
                    const valueOptions = getOptions(options, key);
                    let { duration = defaultOptions.duration || defaults$1.duration, easing = defaultOptions.easing || defaults$1.easing, } = valueOptions;
                    if (isEasingGenerator(easing)) {
                        invariant(key === "opacity" || valueKeyframes.length > 1, "spring must be provided 2 keyframes within timeline()");
                        const custom = easing.createAnimation(valueKeyframes, key !== "opacity", () => 0, key);
                        easing = custom.easing;
                        valueKeyframes = custom.keyframes || valueKeyframes;
                        duration = custom.duration || duration;
                    }
                    const delay = resolveOption(options.delay, elementIndex, numElements) || 0;
                    const startTime = currentTime + delay;
                    const targetTime = startTime + duration;
                    /**
                     *
                     */
                    let { offset = defaultOffset$1(valueKeyframes.length) } = valueOptions;
                    /**
                     * If there's only one offset of 0, fill in a second with length 1
                     *
                     * TODO: Ensure there's a test that covers this removal
                     */
                    if (offset.length === 1 && offset[0] === 0) {
                        offset[1] = 1;
                    }
                    /**
                     * Fill out if offset if fewer offsets than keyframes
                     */
                    const remainder = offset.length - valueKeyframes.length;
                    remainder > 0 && fillOffset(offset, remainder);
                    /**
                     * If only one value has been set, ie [1], push a null to the start of
                     * the keyframe array. This will let us mark a keyframe at this point
                     * that will later be hydrated with the previous value.
                     */
                    valueKeyframes.length === 1 && valueKeyframes.unshift(null);
                    /**
                     * Add keyframes, mapping offsets to absolute time.
                     */
                    addKeyframes(valueSequence, valueKeyframes, easing, offset, startTime, targetTime);
                    maxDuration = Math.max(delay + duration, maxDuration);
                    totalDuration = Math.max(targetTime, totalDuration);
                }
            }
            prevTime = currentTime;
            currentTime += maxDuration;
        }
        /**
         * For every element and value combination create a new animation.
         */
        elementSequences.forEach((valueSequences, element) => {
            for (const key in valueSequences) {
                const valueSequence = valueSequences[key];
                /**
                 * Arrange all the keyframes in ascending time order.
                 */
                valueSequence.sort(compareByTime);
                const keyframes = [];
                const valueOffset = [];
                const valueEasing = [];
                /**
                 * For each keyframe, translate absolute times into
                 * relative offsets based on the total duration of the timeline.
                 */
                for (let i = 0; i < valueSequence.length; i++) {
                    const { at, value, easing } = valueSequence[i];
                    keyframes.push(value);
                    valueOffset.push(progress(0, totalDuration, at));
                    valueEasing.push(easing || defaults$1.easing);
                }
                /**
                 * If the first keyframe doesn't land on offset: 0
                 * provide one by duplicating the initial keyframe. This ensures
                 * it snaps to the first keyframe when the animation starts.
                 */
                if (valueOffset[0] !== 0) {
                    valueOffset.unshift(0);
                    keyframes.unshift(keyframes[0]);
                    valueEasing.unshift("linear");
                }
                /**
                 * If the last keyframe doesn't land on offset: 1
                 * provide one with a null wildcard value. This will ensure it
                 * stays static until the end of the animation.
                 */
                if (valueOffset[valueOffset.length - 1] !== 1) {
                    valueOffset.push(1);
                    keyframes.push(null);
                }
                animationDefinitions.push([
                    element,
                    key,
                    keyframes,
                    Object.assign(Object.assign(Object.assign({}, defaultOptions), { duration: totalDuration, easing: valueEasing, offset: valueOffset }), timelineOptions),
                ]);
            }
        });
        return animationDefinitions;
    }
    function getElementSequence(element, sequences) {
        !sequences.has(element) && sequences.set(element, {});
        return sequences.get(element);
    }
    function getValueSequence(name, sequences) {
        if (!sequences[name])
            sequences[name] = [];
        return sequences[name];
    }

    const sampleT = 5; // ms
    function calcGeneratorVelocity(resolveValue, t, current) {
        const prevT = Math.max(t - sampleT, 0);
        return velocityPerSecond(current - resolveValue(prevT), t - prevT);
    }

    const defaults = {
        stiffness: 100.0,
        damping: 10.0,
        mass: 1.0,
    };

    const calcDampingRatio = (stiffness = defaults.stiffness, damping = defaults.damping, mass = defaults.mass) => damping / (2 * Math.sqrt(stiffness * mass));

    function hasReachedTarget(origin, target, current) {
        return ((origin < target && current >= target) ||
            (origin > target && current <= target));
    }

    const spring$1 = ({ stiffness = defaults.stiffness, damping = defaults.damping, mass = defaults.mass, from = 0, to = 1, velocity = 0.0, restSpeed = 2, restDistance = 0.5, } = {}) => {
        velocity = velocity ? time.s(velocity) : 0.0;
        const state = {
            done: false,
            hasReachedTarget: false,
            current: from,
            target: to,
        };
        const initialDelta = to - from;
        const undampedAngularFreq = Math.sqrt(stiffness / mass) / 1000;
        const dampingRatio = calcDampingRatio(stiffness, damping, mass);
        let resolveSpring;
        if (dampingRatio < 1) {
            const angularFreq = undampedAngularFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
            // Underdamped spring (bouncy)
            resolveSpring = (t) => to -
                Math.exp(-dampingRatio * undampedAngularFreq * t) *
                    (((-velocity + dampingRatio * undampedAngularFreq * initialDelta) /
                        angularFreq) *
                        Math.sin(angularFreq * t) +
                        initialDelta * Math.cos(angularFreq * t));
        }
        else {
            // Critically damped spring
            resolveSpring = (t) => {
                return (to -
                    Math.exp(-undampedAngularFreq * t) *
                        (initialDelta + (-velocity + undampedAngularFreq * initialDelta) * t));
            };
        }
        return (t) => {
            state.current = resolveSpring(t);
            const currentVelocity = t === 0
                ? velocity
                : calcGeneratorVelocity(resolveSpring, t, state.current);
            const isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
            const isBelowDisplacementThreshold = Math.abs(to - state.current) <= restDistance;
            state.done = isBelowVelocityThreshold && isBelowDisplacementThreshold;
            state.hasReachedTarget = hasReachedTarget(from, to, state.current);
            return state;
        };
    };

    const glide$1 = ({ from = 0, velocity = 0.0, power = 0.8, decay = 0.325, bounceDamping, bounceStiffness, changeTarget, min, max, restDistance = 0.5, restSpeed, }) => {
        decay = time.ms(decay);
        const state = {
            hasReachedTarget: false,
            done: false,
            current: from,
            target: from,
        };
        const isOutOfBounds = (v) => (min !== undefined && v < min) || (max !== undefined && v > max);
        const nearestBoundary = (v) => {
            if (min === undefined)
                return max;
            if (max === undefined)
                return min;
            return Math.abs(min - v) < Math.abs(max - v) ? min : max;
        };
        let amplitude = power * velocity;
        const ideal = from + amplitude;
        const target = changeTarget === undefined ? ideal : changeTarget(ideal);
        state.target = target;
        /**
         * If the target has changed we need to re-calculate the amplitude, otherwise
         * the animation will start from the wrong position.
         */
        if (target !== ideal)
            amplitude = target - from;
        const calcDelta = (t) => -amplitude * Math.exp(-t / decay);
        const calcLatest = (t) => target + calcDelta(t);
        const applyFriction = (t) => {
            const delta = calcDelta(t);
            const latest = calcLatest(t);
            state.done = Math.abs(delta) <= restDistance;
            state.current = state.done ? target : latest;
        };
        /**
         * Ideally this would resolve for t in a stateless way, we could
         * do that by always precalculating the animation but as we know
         * this will be done anyway we can assume that spring will
         * be discovered during that.
         */
        let timeReachedBoundary;
        let spring$1$1;
        const checkCatchBoundary = (t) => {
            if (!isOutOfBounds(state.current))
                return;
            timeReachedBoundary = t;
            spring$1$1 = spring$1({
                from: state.current,
                to: nearestBoundary(state.current),
                velocity: calcGeneratorVelocity(calcLatest, t, state.current),
                damping: bounceDamping,
                stiffness: bounceStiffness,
                restDistance,
                restSpeed,
            });
        };
        checkCatchBoundary(0);
        return (t) => {
            /**
             * We need to resolve the friction to figure out if we need a
             * spring but we don't want to do this twice per frame. So here
             * we flag if we updated for this frame and later if we did
             * we can skip doing it again.
             */
            let hasUpdatedFrame = false;
            if (!spring$1$1 && timeReachedBoundary === undefined) {
                hasUpdatedFrame = true;
                applyFriction(t);
                checkCatchBoundary(t);
            }
            /**
             * If we have a spring and the provided t is beyond the moment the friction
             * animation crossed the min/max boundary, use the spring.
             */
            if (timeReachedBoundary !== undefined && t > timeReachedBoundary) {
                state.hasReachedTarget = true;
                return spring$1$1(t - timeReachedBoundary);
            }
            else {
                state.hasReachedTarget = false;
                !hasUpdatedFrame && applyFriction(t);
                return state;
            }
        };
    };

    const timeStep = 10;
    const maxDuration = 10000;
    function pregenerateKeyframes(generator, toUnit = noopReturn) {
        let overshootDuration = undefined;
        let timestamp = timeStep;
        let state = generator(0);
        const keyframes = [toUnit(state.current)];
        while (!state.done && timestamp < maxDuration) {
            state = generator(timestamp);
            keyframes.push(toUnit(state.done ? state.target : state.current));
            if (overshootDuration === undefined && state.hasReachedTarget) {
                overshootDuration = timestamp;
            }
            timestamp += timeStep;
        }
        const duration = timestamp - timeStep;
        /**
         * If generating an animation that didn't actually move,
         * generate a second keyframe so we have an origin and target.
         */
        if (keyframes.length === 1)
            keyframes.push(state.current);
        return {
            keyframes,
            duration: duration / 1000,
            overshootDuration: (overshootDuration !== null && overshootDuration !== void 0 ? overshootDuration : duration) / 1000,
        };
    }

    function canGenerate(value) {
        return isNumber(value) && !isNaN(value);
    }
    function getAsNumber(value) {
        return isString(value) ? parseFloat(value) : value;
    }
    function createGeneratorEasing(createGenerator) {
        const keyframesCache = new WeakMap();
        return (options = {}) => {
            const generatorCache = new Map();
            const getGenerator = (from = 0, to = 100, velocity = 0, isScale = false) => {
                const key = `${from}-${to}-${velocity}-${isScale}`;
                if (!generatorCache.has(key)) {
                    generatorCache.set(key, createGenerator(Object.assign({ from,
                        to,
                        velocity, restSpeed: isScale ? 0.05 : 2, restDistance: isScale ? 0.01 : 0.5 }, options)));
                }
                return generatorCache.get(key);
            };
            const getKeyframes = (generator, toUnit) => {
                if (!keyframesCache.has(generator)) {
                    keyframesCache.set(generator, pregenerateKeyframes(generator, toUnit));
                }
                return keyframesCache.get(generator);
            };
            return {
                createAnimation: (keyframes, shouldGenerate = true, getOrigin, name, motionValue) => {
                    let settings;
                    let origin;
                    let target;
                    let velocity = 0;
                    let toUnit = noopReturn;
                    const numKeyframes = keyframes.length;
                    /**
                     * If we should generate an animation for this value, run some preperation
                     * like resolving target/origin, finding a unit (if any) and determine if
                     * it is actually possible to generate.
                     */
                    if (shouldGenerate) {
                        toUnit = getUnitConverter(keyframes, name ? transformDefinitions.get(getStyleName(name)) : undefined);
                        const targetDefinition = keyframes[numKeyframes - 1];
                        target = getAsNumber(targetDefinition);
                        if (numKeyframes > 1 && keyframes[0] !== null) {
                            /**
                             * If we have multiple keyframes, take the initial keyframe as the origin.
                             */
                            origin = getAsNumber(keyframes[0]);
                        }
                        else {
                            const prevGenerator = motionValue === null || motionValue === void 0 ? void 0 : motionValue.generator;
                            /**
                             * If we have an existing generator for this value we can use it to resolve
                             * the animation's current value and velocity.
                             */
                            if (prevGenerator) {
                                /**
                                 * If we have a generator for this value we can use it to resolve
                                 * the animations's current value and velocity.
                                 */
                                const { animation, generatorStartTime } = motionValue;
                                const startTime = (animation === null || animation === void 0 ? void 0 : animation.startTime) || generatorStartTime || 0;
                                const currentTime = (animation === null || animation === void 0 ? void 0 : animation.currentTime) || performance.now() - startTime;
                                const prevGeneratorCurrent = prevGenerator(currentTime).current;
                                origin = prevGeneratorCurrent;
                                velocity = calcGeneratorVelocity((t) => prevGenerator(t).current, currentTime, prevGeneratorCurrent);
                            }
                            else if (getOrigin) {
                                /**
                                 * As a last resort, read the origin from the DOM.
                                 */
                                origin = getAsNumber(getOrigin());
                            }
                        }
                    }
                    /**
                     * If we've determined it is possible to generate an animation, do so.
                     */
                    if (canGenerate(origin) && canGenerate(target)) {
                        const generator = getGenerator(origin, target, velocity, name === null || name === void 0 ? void 0 : name.includes("scale"));
                        settings = Object.assign(Object.assign({}, getKeyframes(generator, toUnit)), { easing: "linear" });
                        // TODO Add test for this
                        if (motionValue) {
                            motionValue.generator = generator;
                            motionValue.generatorStartTime = performance.now();
                        }
                    }
                    /**
                     * If by now we haven't generated a set of keyframes, create a generic generator
                     * based on the provided props that animates from 0-100 to fetch a rough
                     * "overshootDuration" - the moment when the generator first hits the animation target.
                     * Then return animation settings that will run a normal animation for that duration.
                     */
                    if (!settings) {
                        const keyframesMetadata = getKeyframes(getGenerator(0, 100));
                        settings = {
                            easing: "ease",
                            duration: keyframesMetadata.overshootDuration,
                        };
                    }
                    return settings;
                },
            };
        };
    }

    const spring = createGeneratorEasing(spring$1);

    const glide = createGeneratorEasing(glide$1);

    const thresholds = {
        any: 0,
        all: 1,
    };
    function inView$1(elementOrSelector, onStart, { root, margin: rootMargin, amount = "any" } = {}) {
        /**
         * If this browser doesn't support IntersectionObserver, return a dummy stop function.
         * Default triggering of onStart is tricky - it could be used for starting/stopping
         * videos, lazy loading content etc. We could provide an option to enable a fallback, or
         * provide a fallback callback option.
         */
        if (typeof IntersectionObserver === "undefined") {
            return () => { };
        }
        const elements = resolveElements(elementOrSelector);
        const activeIntersections = new WeakMap();
        const onIntersectionChange = (entries) => {
            entries.forEach((entry) => {
                const onEnd = activeIntersections.get(entry.target);
                /**
                 * If there's no change to the intersection, we don't need to
                 * do anything here.
                 */
                if (entry.isIntersecting === Boolean(onEnd))
                    return;
                if (entry.isIntersecting) {
                    const newOnEnd = onStart(entry);
                    if (isFunction(newOnEnd)) {
                        activeIntersections.set(entry.target, newOnEnd);
                    }
                    else {
                        observer.unobserve(entry.target);
                    }
                }
                else if (onEnd) {
                    onEnd(entry);
                    activeIntersections.delete(entry.target);
                }
            });
        };
        const observer = new IntersectionObserver(onIntersectionChange, {
            root,
            rootMargin,
            threshold: typeof amount === "number" ? amount : thresholds[amount],
        });
        elements.forEach((element) => observer.observe(element));
        return () => observer.disconnect();
    }

    const resizeHandlers = new WeakMap();
    let observer;
    function getElementSize(target, borderBoxSize) {
        if (borderBoxSize) {
            const { inlineSize, blockSize } = borderBoxSize[0];
            return { width: inlineSize, height: blockSize };
        }
        else if (target instanceof SVGElement && "getBBox" in target) {
            return target.getBBox();
        }
        else {
            return {
                width: target.offsetWidth,
                height: target.offsetHeight,
            };
        }
    }
    function notifyTarget({ target, contentRect, borderBoxSize, }) {
        var _a;
        (_a = resizeHandlers.get(target)) === null || _a === void 0 ? void 0 : _a.forEach((handler) => {
            handler({
                target,
                contentSize: contentRect,
                get size() {
                    return getElementSize(target, borderBoxSize);
                },
            });
        });
    }
    function notifyAll(entries) {
        entries.forEach(notifyTarget);
    }
    function createResizeObserver() {
        if (typeof ResizeObserver === "undefined")
            return;
        observer = new ResizeObserver(notifyAll);
    }
    function resizeElement(target, handler) {
        if (!observer)
            createResizeObserver();
        const elements = resolveElements(target);
        elements.forEach((element) => {
            let elementHandlers = resizeHandlers.get(element);
            if (!elementHandlers) {
                elementHandlers = new Set();
                resizeHandlers.set(element, elementHandlers);
            }
            elementHandlers.add(handler);
            observer === null || observer === void 0 ? void 0 : observer.observe(element);
        });
        return () => {
            elements.forEach((element) => {
                const elementHandlers = resizeHandlers.get(element);
                elementHandlers === null || elementHandlers === void 0 ? void 0 : elementHandlers.delete(handler);
                if (!(elementHandlers === null || elementHandlers === void 0 ? void 0 : elementHandlers.size)) {
                    observer === null || observer === void 0 ? void 0 : observer.unobserve(element);
                }
            });
        };
    }

    const windowCallbacks = new Set();
    let windowResizeHandler;
    function createWindowResizeHandler() {
        windowResizeHandler = () => {
            const size = {
                width: window.innerWidth,
                height: window.innerHeight,
            };
            const info = {
                target: window,
                size,
                contentSize: size,
            };
            windowCallbacks.forEach((callback) => callback(info));
        };
        window.addEventListener("resize", windowResizeHandler);
    }
    function resizeWindow(callback) {
        windowCallbacks.add(callback);
        if (!windowResizeHandler)
            createWindowResizeHandler();
        return () => {
            windowCallbacks.delete(callback);
            if (!windowCallbacks.size && windowResizeHandler) {
                windowResizeHandler = undefined;
            }
        };
    }

    function resize(a, b) {
        return isFunction(a) ? resizeWindow(a) : resizeElement(a, b);
    }

    /**
     * A time in milliseconds, beyond which we consider the scroll velocity to be 0.
     */
    const maxElapsed = 50;
    const createAxisInfo = () => ({
        current: 0,
        offset: [],
        progress: 0,
        scrollLength: 0,
        targetOffset: 0,
        targetLength: 0,
        containerLength: 0,
        velocity: 0,
    });
    const createScrollInfo = () => ({
        time: 0,
        x: createAxisInfo(),
        y: createAxisInfo(),
    });
    const keys = {
        x: {
            length: "Width",
            position: "Left",
        },
        y: {
            length: "Height",
            position: "Top",
        },
    };
    function updateAxisInfo(element, axisName, info, time) {
        const axis = info[axisName];
        const { length, position } = keys[axisName];
        const prev = axis.current;
        const prevTime = info.time;
        axis.current = element["scroll" + position];
        axis.scrollLength = element["scroll" + length] - element["client" + length];
        axis.offset.length = 0;
        axis.offset[0] = 0;
        axis.offset[1] = axis.scrollLength;
        axis.progress = progress(0, axis.scrollLength, axis.current);
        const elapsed = time - prevTime;
        axis.velocity =
            elapsed > maxElapsed ? 0 : velocityPerSecond(axis.current - prev, elapsed);
    }
    function updateScrollInfo(element, info, time) {
        updateAxisInfo(element, "x", info, time);
        updateAxisInfo(element, "y", info, time);
        info.time = time;
    }

    function calcInset(element, container) {
        let inset = { x: 0, y: 0 };
        let current = element;
        while (current && current !== container) {
            if (current instanceof HTMLElement) {
                inset.x += current.offsetLeft;
                inset.y += current.offsetTop;
                current = current.offsetParent;
            }
            else if (current instanceof SVGGraphicsElement && "getBBox" in current) {
                const { top, left } = current.getBBox();
                inset.x += left;
                inset.y += top;
                /**
                 * Assign the next parent element as the <svg /> tag.
                 */
                while (current && current.tagName !== "svg") {
                    current = current.parentNode;
                }
            }
        }
        return inset;
    }

    const ScrollOffset = {
        Enter: [
            [0, 1],
            [1, 1],
        ],
        Exit: [
            [0, 0],
            [1, 0],
        ],
        Any: [
            [1, 0],
            [0, 1],
        ],
        All: [
            [0, 0],
            [1, 1],
        ],
    };

    const namedEdges = {
        start: 0,
        center: 0.5,
        end: 1,
    };
    function resolveEdge(edge, length, inset = 0) {
        let delta = 0;
        /**
         * If we have this edge defined as a preset, replace the definition
         * with the numerical value.
         */
        if (namedEdges[edge] !== undefined) {
            edge = namedEdges[edge];
        }
        /**
         * Handle unit values
         */
        if (isString(edge)) {
            const asNumber = parseFloat(edge);
            if (edge.endsWith("px")) {
                delta = asNumber;
            }
            else if (edge.endsWith("%")) {
                edge = asNumber / 100;
            }
            else if (edge.endsWith("vw")) {
                delta = (asNumber / 100) * document.documentElement.clientWidth;
            }
            else if (edge.endsWith("vh")) {
                delta = (asNumber / 100) * document.documentElement.clientHeight;
            }
            else {
                edge = asNumber;
            }
        }
        /**
         * If the edge is defined as a number, handle as a progress value.
         */
        if (isNumber(edge)) {
            delta = length * edge;
        }
        return inset + delta;
    }

    const defaultOffset = [0, 0];
    function resolveOffset(offset, containerLength, targetLength, targetInset) {
        let offsetDefinition = Array.isArray(offset) ? offset : defaultOffset;
        let targetPoint = 0;
        let containerPoint = 0;
        if (isNumber(offset)) {
            /**
             * If we're provided offset: [0, 0.5, 1] then each number x should become
             * [x, x], so we default to the behaviour of mapping 0 => 0 of both target
             * and container etc.
             */
            offsetDefinition = [offset, offset];
        }
        else if (isString(offset)) {
            offset = offset.trim();
            if (offset.includes(" ")) {
                offsetDefinition = offset.split(" ");
            }
            else {
                /**
                 * If we're provided a definition like "100px" then we want to apply
                 * that only to the top of the target point, leaving the container at 0.
                 * Whereas a named offset like "end" should be applied to both.
                 */
                offsetDefinition = [offset, namedEdges[offset] ? offset : `0`];
            }
        }
        targetPoint = resolveEdge(offsetDefinition[0], targetLength, targetInset);
        containerPoint = resolveEdge(offsetDefinition[1], containerLength);
        return targetPoint - containerPoint;
    }

    const point = { x: 0, y: 0 };
    function resolveOffsets(container, info, options) {
        let { offset: offsetDefinition = ScrollOffset.All } = options;
        const { target = container, axis = "y" } = options;
        const lengthLabel = axis === "y" ? "height" : "width";
        const inset = target !== container ? calcInset(target, container) : point;
        /**
         * Measure the target and container. If they're the same thing then we
         * use the container's scrollWidth/Height as the target, from there
         * all other calculations can remain the same.
         */
        const targetSize = target === container
            ? { width: container.scrollWidth, height: container.scrollHeight }
            : { width: target.clientWidth, height: target.clientHeight };
        const containerSize = {
            width: container.clientWidth,
            height: container.clientHeight,
        };
        /**
         * Reset the length of the resolved offset array rather than creating a new one.
         * TODO: More reusable data structures for targetSize/containerSize would also be good.
         */
        info[axis].offset.length = 0;
        /**
         * Populate the offset array by resolving the user's offset definition into
         * a list of pixel scroll offets.
         */
        let hasChanged = !info[axis].interpolate;
        const numOffsets = offsetDefinition.length;
        for (let i = 0; i < numOffsets; i++) {
            const offset = resolveOffset(offsetDefinition[i], containerSize[lengthLabel], targetSize[lengthLabel], inset[axis]);
            if (!hasChanged && offset !== info[axis].interpolatorOffsets[i]) {
                hasChanged = true;
            }
            info[axis].offset[i] = offset;
        }
        /**
         * If the pixel scroll offsets have changed, create a new interpolator function
         * to map scroll value into a progress.
         */
        if (hasChanged) {
            info[axis].interpolate = interpolate(defaultOffset$1(numOffsets), info[axis].offset);
            info[axis].interpolatorOffsets = [...info[axis].offset];
        }
        info[axis].progress = info[axis].interpolate(info[axis].current);
    }

    function measure(container, target = container, info) {
        /**
         * Find inset of target within scrollable container
         */
        info.x.targetOffset = 0;
        info.y.targetOffset = 0;
        if (target !== container) {
            let node = target;
            while (node && node != container) {
                info.x.targetOffset += node.offsetLeft;
                info.y.targetOffset += node.offsetTop;
                node = node.offsetParent;
            }
        }
        info.x.targetLength =
            target === container ? target.scrollWidth : target.clientWidth;
        info.y.targetLength =
            target === container ? target.scrollHeight : target.clientHeight;
        info.x.containerLength = container.clientWidth;
        info.y.containerLength = container.clientHeight;
    }
    function createOnScrollHandler(element, onScroll, info, options = {}) {
        const axis = options.axis || "y";
        return {
            measure: () => measure(element, options.target, info),
            update: (time) => {
                updateScrollInfo(element, info, time);
                if (options.offset || options.target) {
                    resolveOffsets(element, info, options);
                }
            },
            notify: isFunction(onScroll)
                ? () => onScroll(info)
                : scrubAnimation(onScroll, info[axis]),
        };
    }
    function scrubAnimation(controls, axisInfo) {
        controls.pause();
        controls.forEachNative((animation, { easing }) => {
            var _a, _b;
            if (animation.updateDuration) {
                if (!easing)
                    animation.easing = noopReturn;
                animation.updateDuration(1);
            }
            else {
                const timingOptions = { duration: 1000 };
                if (!easing)
                    timingOptions.easing = "linear";
                (_b = (_a = animation.effect) === null || _a === void 0 ? void 0 : _a.updateTiming) === null || _b === void 0 ? void 0 : _b.call(_a, timingOptions);
            }
        });
        return () => {
            controls.currentTime = axisInfo.progress;
        };
    }

    const scrollListeners = new WeakMap();
    const resizeListeners = new WeakMap();
    const onScrollHandlers = new WeakMap();
    const getEventTarget = (element) => element === document.documentElement ? window : element;
    function scroll(onScroll, _a = {}) {
        var { container = document.documentElement } = _a, options = __rest(_a, ["container"]);
        let containerHandlers = onScrollHandlers.get(container);
        /**
         * Get the onScroll handlers for this container.
         * If one isn't found, create a new one.
         */
        if (!containerHandlers) {
            containerHandlers = new Set();
            onScrollHandlers.set(container, containerHandlers);
        }
        /**
         * Create a new onScroll handler for the provided callback.
         */
        const info = createScrollInfo();
        const containerHandler = createOnScrollHandler(container, onScroll, info, options);
        containerHandlers.add(containerHandler);
        /**
         * Check if there's a scroll event listener for this container.
         * If not, create one.
         */
        if (!scrollListeners.has(container)) {
            const listener = () => {
                const time = performance.now();
                for (const handler of containerHandlers)
                    handler.measure();
                for (const handler of containerHandlers)
                    handler.update(time);
                for (const handler of containerHandlers)
                    handler.notify();
            };
            scrollListeners.set(container, listener);
            const target = getEventTarget(container);
            window.addEventListener("resize", listener, { passive: true });
            if (container !== document.documentElement) {
                resizeListeners.set(container, resize(container, listener));
            }
            target.addEventListener("scroll", listener, { passive: true });
        }
        const listener = scrollListeners.get(container);
        const onLoadProcesss = requestAnimationFrame(listener);
        return () => {
            var _a;
            if (typeof onScroll !== "function")
                onScroll.stop();
            cancelAnimationFrame(onLoadProcesss);
            /**
             * Check if we even have any handlers for this container.
             */
            const containerHandlers = onScrollHandlers.get(container);
            if (!containerHandlers)
                return;
            containerHandlers.delete(containerHandler);
            if (containerHandlers.size)
                return;
            /**
             * If no more handlers, remove the scroll listener too.
             */
            const listener = scrollListeners.get(container);
            scrollListeners.delete(container);
            if (listener) {
                getEventTarget(container).removeEventListener("scroll", listener);
                (_a = resizeListeners.get(container)) === null || _a === void 0 ? void 0 : _a();
                window.removeEventListener("resize", listener);
            }
        };
    }

    function hasChanged(a, b) {
        if (typeof a !== typeof b)
            return true;
        if (Array.isArray(a) && Array.isArray(b))
            return !shallowCompare(a, b);
        return a !== b;
    }
    function shallowCompare(next, prev) {
        const prevLength = prev.length;
        if (prevLength !== next.length)
            return false;
        for (let i = 0; i < prevLength; i++) {
            if (prev[i] !== next[i])
                return false;
        }
        return true;
    }

    function isVariant(definition) {
        return typeof definition === "object";
    }

    function resolveVariant(definition, variants) {
        if (isVariant(definition)) {
            return definition;
        }
        else if (definition && variants) {
            return variants[definition];
        }
    }

    let scheduled = undefined;
    function processScheduledAnimations() {
        if (!scheduled)
            return;
        const generators = scheduled.sort(compareByDepth).map(fireAnimateUpdates);
        generators.forEach(fireNext);
        generators.forEach(fireNext);
        scheduled = undefined;
    }
    function scheduleAnimation(state) {
        if (!scheduled) {
            scheduled = [state];
            requestAnimationFrame(processScheduledAnimations);
        }
        else {
            addUniqueItem(scheduled, state);
        }
    }
    function unscheduleAnimation(state) {
        scheduled && removeItem(scheduled, state);
    }
    const compareByDepth = (a, b) => a.getDepth() - b.getDepth();
    const fireAnimateUpdates = (state) => state.animateUpdates();
    const fireNext = (iterator) => iterator.next();

    const motionEvent = (name, target) => new CustomEvent(name, { detail: { target } });
    function dispatchPointerEvent(element, name, event) {
        element.dispatchEvent(new CustomEvent(name, { detail: { originalEvent: event } }));
    }
    function dispatchViewEvent(element, name, entry) {
        element.dispatchEvent(new CustomEvent(name, { detail: { originalEntry: entry } }));
    }

    const inView = {
        isActive: (options) => Boolean(options.inView),
        subscribe: (element, { enable, disable }, { inViewOptions = {} }) => {
            const { once } = inViewOptions, viewOptions = __rest(inViewOptions, ["once"]);
            return inView$1(element, (enterEntry) => {
                enable();
                dispatchViewEvent(element, "viewenter", enterEntry);
                if (!once) {
                    return (leaveEntry) => {
                        disable();
                        dispatchViewEvent(element, "viewleave", leaveEntry);
                    };
                }
            }, viewOptions);
        },
    };

    const mouseEvent = (element, name, action) => (event) => {
        if (event.pointerType && event.pointerType !== "mouse")
            return;
        action();
        dispatchPointerEvent(element, name, event);
    };
    const hover = {
        isActive: (options) => Boolean(options.hover),
        subscribe: (element, { enable, disable }) => {
            const onEnter = mouseEvent(element, "hoverstart", enable);
            const onLeave = mouseEvent(element, "hoverend", disable);
            element.addEventListener("pointerenter", onEnter);
            element.addEventListener("pointerleave", onLeave);
            return () => {
                element.removeEventListener("pointerenter", onEnter);
                element.removeEventListener("pointerleave", onLeave);
            };
        },
    };

    const press = {
        isActive: (options) => Boolean(options.press),
        subscribe: (element, { enable, disable }) => {
            const onPointerUp = (event) => {
                disable();
                dispatchPointerEvent(element, "pressend", event);
                window.removeEventListener("pointerup", onPointerUp);
            };
            const onPointerDown = (event) => {
                enable();
                dispatchPointerEvent(element, "pressstart", event);
                window.addEventListener("pointerup", onPointerUp);
            };
            element.addEventListener("pointerdown", onPointerDown);
            return () => {
                element.removeEventListener("pointerdown", onPointerDown);
                window.removeEventListener("pointerup", onPointerUp);
            };
        },
    };

    const gestures = { inView, hover, press };
    /**
     * A list of state types, in priority order. If a value is defined in
     * a righter-most type, it will override any definition in a lefter-most.
     */
    const stateTypes = ["initial", "animate", ...Object.keys(gestures), "exit"];
    /**
     * A global store of all generated motion states. This can be used to lookup
     * a motion state for a given Element.
     */
    const mountedStates = new WeakMap();
    function createMotionState(options = {}, parent) {
        /**
         * The element represented by the motion state. This is an empty reference
         * when we create the state to support SSR and allow for later mounting
         * in view libraries.
         *
         * @ts-ignore
         */
        let element;
        /**
         * Calculate a depth that we can use to order motion states by tree depth.
         */
        let depth = parent ? parent.getDepth() + 1 : 0;
        /**
         * Track which states are currently active.
         */
        const activeStates = { initial: true, animate: true };
        /**
         * A map of functions that, when called, will remove event listeners for
         * a given gesture.
         */
        const gestureSubscriptions = {};
        /**
         * Initialise a context to share through motion states. This
         * will be populated by variant names (if any).
         */
        const context = {};
        for (const name of stateTypes) {
            context[name] =
                typeof options[name] === "string"
                    ? options[name]
                    : parent === null || parent === void 0 ? void 0 : parent.getContext()[name];
        }
        /**
         * If initial is set to false we use the animate prop as the initial
         * animation state.
         */
        const initialVariantSource = options.initial === false ? "animate" : "initial";
        /**
         * Destructure an initial target out from the resolved initial variant.
         */
        let _a = resolveVariant(options[initialVariantSource] || context[initialVariantSource], options.variants) || {}, target = __rest(_a, ["transition"]);
        /**
         * The base target is a cached map of values that we'll use to animate
         * back to if a value is removed from all active state types. This
         * is usually the initial value as read from the DOM, for instance if
         * it hasn't been defined in initial.
         */
        const baseTarget = Object.assign({}, target);
        /**
         * A generator that will be processed by the global animation scheduler.
         * This yeilds when it switches from reading the DOM to writing to it
         * to prevent layout thrashing.
         */
        function* animateUpdates() {
            var _a, _b;
            const prevTarget = target;
            target = {};
            const animationOptions = {};
            for (const name of stateTypes) {
                if (!activeStates[name])
                    continue;
                const variant = resolveVariant(options[name]);
                if (!variant)
                    continue;
                for (const key in variant) {
                    if (key === "transition")
                        continue;
                    target[key] = variant[key];
                    animationOptions[key] = getOptions((_b = (_a = variant.transition) !== null && _a !== void 0 ? _a : options.transition) !== null && _b !== void 0 ? _b : {}, key);
                }
            }
            const allTargetKeys = new Set([
                ...Object.keys(target),
                ...Object.keys(prevTarget),
            ]);
            const animationFactories = [];
            allTargetKeys.forEach((key) => {
                var _a;
                if (target[key] === undefined) {
                    target[key] = baseTarget[key];
                }
                if (hasChanged(prevTarget[key], target[key])) {
                    (_a = baseTarget[key]) !== null && _a !== void 0 ? _a : (baseTarget[key] = style.get(element, key));
                    animationFactories.push(animateStyle(element, key, target[key], animationOptions[key], Animation));
                }
            });
            // Wait for all animation states to read from the DOM
            yield;
            const animations = animationFactories
                .map((factory) => factory())
                .filter(Boolean);
            if (!animations.length)
                return;
            const animationTarget = target;
            element.dispatchEvent(motionEvent("motionstart", animationTarget));
            Promise.all(animations.map((animation) => animation.finished))
                .then(() => {
                element.dispatchEvent(motionEvent("motioncomplete", animationTarget));
            })
                .catch(noop);
        }
        const setGesture = (name, isActive) => () => {
            activeStates[name] = isActive;
            scheduleAnimation(state);
        };
        const updateGestureSubscriptions = () => {
            for (const name in gestures) {
                const isGestureActive = gestures[name].isActive(options);
                const remove = gestureSubscriptions[name];
                if (isGestureActive && !remove) {
                    gestureSubscriptions[name] = gestures[name].subscribe(element, {
                        enable: setGesture(name, true),
                        disable: setGesture(name, false),
                    }, options);
                }
                else if (!isGestureActive && remove) {
                    remove();
                    delete gestureSubscriptions[name];
                }
            }
        };
        const state = {
            update: (newOptions) => {
                if (!element)
                    return;
                options = newOptions;
                updateGestureSubscriptions();
                scheduleAnimation(state);
            },
            setActive: (name, isActive) => {
                if (!element)
                    return;
                activeStates[name] = isActive;
                scheduleAnimation(state);
            },
            animateUpdates,
            getDepth: () => depth,
            getTarget: () => target,
            getOptions: () => options,
            getContext: () => context,
            mount: (newElement) => {
                invariant(Boolean(newElement), "Animation state must be mounted with valid Element");
                element = newElement;
                mountedStates.set(element, state);
                updateGestureSubscriptions();
                return () => {
                    mountedStates.delete(element);
                    unscheduleAnimation(state);
                    for (const key in gestureSubscriptions) {
                        gestureSubscriptions[key]();
                    }
                };
            },
            isMounted: () => Boolean(element),
        };
        return state;
    }

    function createStyles(keyframes) {
        const initialKeyframes = {};
        const transformKeys = [];
        for (let key in keyframes) {
            const value = keyframes[key];
            if (isTransform(key)) {
                if (transformAlias[key])
                    key = transformAlias[key];
                transformKeys.push(key);
                key = asTransformCssVar(key);
            }
            let initialKeyframe = Array.isArray(value) ? value[0] : value;
            /**
             * If this is a number and we have a default value type, convert the number
             * to this type.
             */
            const definition = transformDefinitions.get(key);
            if (definition) {
                initialKeyframe = isNumber(value)
                    ? definition.toDefaultUnit(value)
                    : value;
            }
            initialKeyframes[key] = initialKeyframe;
        }
        if (transformKeys.length) {
            initialKeyframes.transform = buildTransformTemplate(transformKeys);
        }
        return initialKeyframes;
    }

    const camelLetterToPipeLetter = (letter) => `-${letter.toLowerCase()}`;
    const camelToPipeCase = (str) => str.replace(/[A-Z]/g, camelLetterToPipeLetter);
    function createStyleString(target = {}) {
        const styles = createStyles(target);
        let style = "";
        for (const key in styles) {
            style += key.startsWith("--") ? key : camelToPipeCase(key);
            style += `: ${styles[key]}; `;
        }
        return style;
    }

    exports.ScrollOffset = ScrollOffset;
    exports.animate = animate;
    exports.animateStyle = animateStyle;
    exports.createAnimate = createAnimate;
    exports.createMotionState = createMotionState;
    exports.createStyleString = createStyleString;
    exports.createStyles = createStyles;
    exports.getAnimationData = getAnimationData;
    exports.getStyleName = getStyleName;
    exports.glide = glide;
    exports.inView = inView$1;
    exports.mountedStates = mountedStates;
    exports.resize = resize;
    exports.scroll = scroll;
    exports.spring = spring;
    exports.stagger = stagger;
    exports.style = style;
    exports.timeline = timeline;
    exports.withControls = withControls;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
