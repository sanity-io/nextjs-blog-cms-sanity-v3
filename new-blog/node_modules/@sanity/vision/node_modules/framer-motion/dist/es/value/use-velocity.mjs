import { useEffect } from 'react';
import { useMotionValue } from './use-motion-value.mjs';

/**
 * Creates a `MotionValue` that updates when the velocity of the provided `MotionValue` changes.
 *
 * ```javascript
 * const x = useMotionValue(0)
 * const xVelocity = useVelocity(x)
 * const xAcceleration = useVelocity(xVelocity)
 * ```
 *
 * @public
 */
function useVelocity(value) {
    const velocity = useMotionValue(value.getVelocity());
    useEffect(() => {
        return value.on("velocityChange", (newVelocity) => {
            velocity.set(newVelocity);
        });
    }, [value]);
    return velocity;
}

export { useVelocity };
