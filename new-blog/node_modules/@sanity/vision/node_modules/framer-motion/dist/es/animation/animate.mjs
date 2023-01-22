import { createMotionValueAnimation } from './index.mjs';
import { motionValue } from '../value/index.mjs';
import { isMotionValue } from '../value/utils/is-motion-value.mjs';

/**
 * Animate a single value or a `MotionValue`.
 *
 * The first argument is either a `MotionValue` to animate, or an initial animation value.
 *
 * The second is either a value to animate to, or an array of keyframes to animate through.
 *
 * The third argument can be either tween or spring options, and optional lifecycle methods: `onUpdate`, `onPlay`, `onComplete`, `onRepeat` and `onStop`.
 *
 * Returns `AnimationPlaybackControls`, currently just a `stop` method.
 *
 * ```javascript
 * const x = useMotionValue(0)
 *
 * useEffect(() => {
 *   const controls = animate(x, 100, {
 *     type: "spring",
 *     stiffness: 2000,
 *     onComplete: v => {}
 *   })
 *
 *   return controls.stop
 * })
 * ```
 *
 * @public
 */
function animate(from, to, transition = {}) {
    const value = isMotionValue(from) ? from : motionValue(from);
    value.start(createMotionValueAnimation("", value, to, transition));
    return {
        stop: () => value.stop(),
        isAnimating: () => value.isAnimating(),
    };
}

export { animate };
