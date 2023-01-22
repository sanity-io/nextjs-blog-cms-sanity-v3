import { Options as DetectOverflowOptions } from '../detectOverflow';
import type { Middleware, Placement } from '../types';
export interface Options {
    /**
     * The axis that runs along the side of the floating element.
     * @default true
     */
    mainAxis: boolean;
    /**
     * The axis that runs along the alignment of the floating element.
     * @default true
     */
    crossAxis: boolean;
    /**
     * Placements to try if the preferred `placement` does not fit.
     * @default [oppositePlacement] (computed)
     */
    fallbackPlacements: Array<Placement>;
    /**
     * What strategy to use when no placements fit.
     * @default 'bestFit'
     */
    fallbackStrategy: 'bestFit' | 'initialPlacement';
    /**
     * Whether to allow fallback to the opposite axis, and if so, which
     * side direction of the axis to prefer.
     * @default 'none' (disallow fallback)
     */
    fallbackAxisSideDirection: 'none' | 'start' | 'end';
    /**
     * Whether to flip to placements with the opposite alignment if they fit
     * better.
     * @default true
     */
    flipAlignment: boolean;
}
/**
 * Changes the placement of the floating element to one that will fit if the
 * initially specified `placement` does not.
 * @see https://floating-ui.com/docs/flip
 */
export declare const flip: (options?: Partial<Options & DetectOverflowOptions>) => Middleware;
