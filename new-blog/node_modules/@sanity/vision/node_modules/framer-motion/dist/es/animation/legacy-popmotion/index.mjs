import { keyframes } from './keyframes.mjs';
import { spring } from './spring.mjs';
import { decay } from './decay.mjs';
import { sync, cancelSync } from '../../frameloop/index.mjs';
import { interpolate } from '../../utils/interpolate.mjs';

const types = {
    decay,
    keyframes: keyframes,
    tween: keyframes,
    spring,
};
function loopElapsed(elapsed, duration, delay = 0) {
    return elapsed - duration - delay;
}
function reverseElapsed(elapsed, duration = 0, delay = 0, isForwardPlayback = true) {
    return isForwardPlayback
        ? loopElapsed(duration + -elapsed, duration, delay)
        : duration - (elapsed - duration) + delay;
}
function hasRepeatDelayElapsed(elapsed, duration, delay, isForwardPlayback) {
    return isForwardPlayback ? elapsed >= duration + delay : elapsed <= -delay;
}
const framesync = (update) => {
    const passTimestamp = ({ delta }) => update(delta);
    return {
        start: () => sync.update(passTimestamp, true),
        stop: () => cancelSync.update(passTimestamp),
    };
};
function animate({ duration, driver = framesync, elapsed = 0, repeat: repeatMax = 0, repeatType = "loop", repeatDelay = 0, keyframes: keyframes$1, autoplay = true, onPlay, onStop, onComplete, onRepeat, onUpdate, type = "keyframes", ...options }) {
    var _a, _b;
    const initialElapsed = elapsed;
    let driverControls;
    let repeatCount = 0;
    let computedDuration = duration;
    let isComplete = false;
    let isForwardPlayback = true;
    let interpolateFromNumber;
    const animator = types[keyframes$1.length > 2 ? "keyframes" : type] || keyframes;
    const origin = keyframes$1[0];
    const target = keyframes$1[keyframes$1.length - 1];
    let state = { done: false, value: origin };
    if ((_b = (_a = animator).needsInterpolation) === null || _b === void 0 ? void 0 : _b.call(_a, origin, target)) {
        interpolateFromNumber = interpolate([0, 100], [origin, target], {
            clamp: false,
        });
        keyframes$1 = [0, 100];
    }
    const animation = animator({
        ...options,
        duration,
        keyframes: keyframes$1,
    });
    function repeat() {
        repeatCount++;
        if (repeatType === "reverse") {
            isForwardPlayback = repeatCount % 2 === 0;
            elapsed = reverseElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback);
        }
        else {
            elapsed = loopElapsed(elapsed, computedDuration, repeatDelay);
            if (repeatType === "mirror")
                animation.flipTarget();
        }
        isComplete = false;
        onRepeat && onRepeat();
    }
    function complete() {
        driverControls && driverControls.stop();
        onComplete && onComplete();
    }
    function update(delta) {
        if (!isForwardPlayback)
            delta = -delta;
        elapsed += delta;
        if (!isComplete) {
            state = animation.next(Math.max(0, elapsed));
            if (interpolateFromNumber)
                state.value = interpolateFromNumber(state.value);
            isComplete = isForwardPlayback ? state.done : elapsed <= 0;
        }
        onUpdate && onUpdate(state.value);
        if (isComplete) {
            if (repeatCount === 0) {
                computedDuration =
                    computedDuration !== undefined ? computedDuration : elapsed;
            }
            if (repeatCount < repeatMax) {
                hasRepeatDelayElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback) && repeat();
            }
            else {
                complete();
            }
        }
    }
    function play() {
        onPlay && onPlay();
        driverControls = driver(update);
        driverControls.start();
    }
    autoplay && play();
    return {
        stop: () => {
            onStop && onStop();
            driverControls && driverControls.stop();
        },
        /**
         * Set the current time of the animation. This is purposefully
         * mirroring the WAAPI animation API to make them interchanagable.
         * Going forward this file should be ported more towards
         * https://github.com/motiondivision/motionone/blob/main/packages/animation/src/Animation.ts
         * Which behaviourally adheres to WAAPI as far as possible.
         *
         * WARNING: This is not safe to use for most animations. We currently
         * only use it for handoff from WAAPI within Framer.
         *
         * This animation function consumes time every frame rather than being sampled for time.
         * So the sample() method performs some headless frames to ensure
         * repeats are handled correctly. Ideally in the future we will replace
         * that method with this, once repeat calculations are pure.
         */
        set currentTime(t) {
            elapsed = initialElapsed;
            update(t);
        },
        /**
         * animate() can't yet be sampled for time, instead it
         * consumes time. So to sample it we have to run a low
         * temporal-resolution version.
         */
        sample: (t) => {
            elapsed = initialElapsed;
            const sampleResolution = duration && typeof duration === "number"
                ? Math.max(duration * 0.5, 50)
                : 50;
            let sampleElapsed = 0;
            update(0);
            while (sampleElapsed <= t) {
                const remaining = t - sampleElapsed;
                update(Math.min(remaining, sampleResolution));
                sampleElapsed += sampleResolution;
            }
            return state;
        },
    };
}

export { animate, hasRepeatDelayElapsed, loopElapsed, reverseElapsed };
