import { mapEasingToNativeEasing } from './easing.mjs';

function animateStyle(element, valueName, keyframes, { delay = 0, duration, repeat = 0, repeatType = "loop", ease, times, } = {}) {
    return element.animate({ [valueName]: keyframes, offset: times }, {
        delay,
        duration,
        easing: mapEasingToNativeEasing(ease),
        fill: "both",
        iterations: repeat + 1,
        direction: repeatType === "reverse" ? "alternate" : "normal",
    });
}

export { animateStyle };
