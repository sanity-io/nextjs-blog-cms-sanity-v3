import { onNextFrame, defaultTimestep } from './on-next-frame.mjs';
import { createRenderStep } from './create-render-step.mjs';
import { frameData } from './data.mjs';

const maxElapsed = 40;
let useDefaultElapsed = true;
let runNextFrame = false;
let isProcessing = false;
const stepsOrder = [
    "read",
    "update",
    "preRender",
    "render",
    "postRender",
];
const steps = stepsOrder.reduce((acc, key) => {
    acc[key] = createRenderStep(() => (runNextFrame = true));
    return acc;
}, {});
const sync = stepsOrder.reduce((acc, key) => {
    const step = steps[key];
    acc[key] = (process, keepAlive = false, immediate = false) => {
        if (!runNextFrame)
            startLoop();
        return step.schedule(process, keepAlive, immediate);
    };
    return acc;
}, {});
const cancelSync = stepsOrder.reduce((acc, key) => {
    acc[key] = steps[key].cancel;
    return acc;
}, {});
const flushSync = stepsOrder.reduce((acc, key) => {
    acc[key] = () => steps[key].process(frameData);
    return acc;
}, {});
const processStep = (stepId) => steps[stepId].process(frameData);
const processFrame = (timestamp) => {
    runNextFrame = false;
    frameData.delta = useDefaultElapsed
        ? defaultTimestep
        : Math.max(Math.min(timestamp - frameData.timestamp, maxElapsed), 1);
    frameData.timestamp = timestamp;
    isProcessing = true;
    stepsOrder.forEach(processStep);
    isProcessing = false;
    if (runNextFrame) {
        useDefaultElapsed = false;
        onNextFrame(processFrame);
    }
};
const startLoop = () => {
    runNextFrame = true;
    useDefaultElapsed = true;
    if (!isProcessing)
        onNextFrame(processFrame);
};

export { cancelSync, flushSync, sync };
