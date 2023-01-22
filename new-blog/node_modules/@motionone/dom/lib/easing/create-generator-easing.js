import { pregenerateKeyframes } from "@motionone/generators";
import { isNumber, isString, noopReturn } from "@motionone/utils";
import { getUnitConverter } from "../animate/utils/get-unit";
import { calcGeneratorVelocity } from "@motionone/generators";
import { transformDefinitions } from "../animate/utils/transforms";
import { getStyleName } from "../animate/utils/get-style-name";
function canGenerate(value) {
    return isNumber(value) && !isNaN(value);
}
function getAsNumber(value) {
    return isString(value) ? parseFloat(value) : value;
}
export function createGeneratorEasing(createGenerator) {
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
//# sourceMappingURL=create-generator-easing.js.map