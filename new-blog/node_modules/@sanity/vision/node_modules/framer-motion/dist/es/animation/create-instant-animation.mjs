import { delay } from '../utils/delay.mjs';

function createInstantAnimation({ keyframes, elapsed, onUpdate, onComplete, }) {
    const setValue = () => {
        onUpdate && onUpdate(keyframes[keyframes.length - 1]);
        onComplete && onComplete();
    };
    return elapsed ? { stop: delay(setValue, -elapsed) } : setValue();
}

export { createInstantAnimation };
