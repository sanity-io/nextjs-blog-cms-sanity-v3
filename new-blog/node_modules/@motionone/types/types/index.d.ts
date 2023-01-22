import { MotionValue } from "./MotionValue";
export { MotionValue } from "./MotionValue";
export interface AnimationGeneratorState {
    done: boolean;
    hasReachedTarget: boolean;
    current: number;
    target: number;
}
export declare type ProgressFunction = (t: number) => void;
export declare type AnimationGeneratorFactory<Options> = (options: Options) => AnimationGenerator;
export declare type AnimationGenerator = (t: number) => AnimationGeneratorState;
export declare type BezierDefinition = readonly [number, number, number, number];
export declare type PlayState = "idle" | "running" | "paused" | "finished";
export interface BasicAnimationControls {
    play: VoidFunction;
    pause: VoidFunction;
    commitStyles: VoidFunction;
    cancel: VoidFunction;
    stop?: VoidFunction;
    playState: PlayState;
    finished: Promise<any>;
    startTime: number | null;
    currentTime: number | null;
}
export interface AnimationControls extends BasicAnimationControls {
    stop: VoidFunction;
    finish: VoidFunction;
    reverse: VoidFunction;
    finished: Promise<any>;
    duration: number;
    playbackRate: number;
    playState: AnimationPlayState;
}
export declare type CustomAnimationSettings = {
    easing: Easing;
    keyframes?: Array<number | string>;
    duration?: number;
};
export declare type ValueKeyframe = string | number;
export declare type UnresolvedValueKeyframe = ValueKeyframe | null;
export declare type Easing = "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out" | "steps-start" | "steps-end" | `steps(${number}, ${"start" | "end"})` | BezierDefinition;
export declare type EasingGenerator = {
    createAnimation: (keyframes: UnresolvedValueKeyframe[], shouldGenerate?: boolean, readInitialKeyframe?: () => number | string, name?: string, value?: MotionValue) => CustomAnimationSettings;
};
export declare type KeyframeOptions = {
    duration?: number;
    easing?: EasingGenerator | Easing | Easing[] | EasingFunction;
    offset?: number[];
};
export declare type OptionResolver<T> = (i: number, total: number) => T;
export declare type PlaybackOptions = {
    delay?: number | OptionResolver<number>;
    endDelay?: number;
    repeat?: number;
    direction?: PlaybackDirection;
    persist?: boolean;
};
export declare type DevToolsOptions = {
    record?: boolean;
};
export declare type AnimationOptions = KeyframeOptions & PlaybackOptions & DevToolsOptions & {
    allowWebkitAcceleration?: boolean;
};
export interface DevTools {
    record: (element: HTMLElement, valueName: string, keyframes: any, options: AnimationOptions) => void;
    isRecording: boolean;
}
export declare type EasingFunction = (t: number) => number;
//# sourceMappingURL=index.d.ts.map