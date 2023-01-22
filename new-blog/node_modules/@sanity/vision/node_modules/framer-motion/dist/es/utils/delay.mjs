import { sync, cancelSync } from '../frameloop/index.mjs';

/**
 * Timeout defined in ms
 */
function delay(callback, timeout) {
    const start = performance.now();
    const checkElapsed = ({ timestamp }) => {
        const elapsed = timestamp - start;
        if (elapsed >= timeout) {
            cancelSync.read(checkElapsed);
            callback(elapsed - timeout);
        }
    };
    sync.read(checkElapsed, true);
    return () => cancelSync.read(checkElapsed);
}

export { delay };
