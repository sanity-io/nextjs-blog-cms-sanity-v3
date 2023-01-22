import type { BezierDefinition, Easing, EasingFunction } from "@motionone/types";
export declare const generateLinearEasingPoints: (easing: EasingFunction, duration: number) => string;
export declare const convertEasing: (easing: Easing | EasingFunction, duration: number) => string;
export declare const cubicBezierAsString: ([a, b, c, d]: BezierDefinition) => string;
//# sourceMappingURL=easing.d.ts.map