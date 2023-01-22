import type { AnimationOptionsWithOverrides, MotionKeyframesDefinition } from "./types";
import { AnimationControls } from "@motionone/types";
import { ElementOrSelector } from "../types";
import type { Animation } from "@motionone/animation";
export declare function createAnimate(AnimatePolyfill?: typeof Animation): (elements: ElementOrSelector, keyframes: MotionKeyframesDefinition, options?: AnimationOptionsWithOverrides) => AnimationControls;
//# sourceMappingURL=create-animate.d.ts.map