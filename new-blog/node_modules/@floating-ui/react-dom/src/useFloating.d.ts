import type { ReferenceType, UseFloatingProps, UseFloatingReturn } from './types';
export declare function useFloating<RT extends ReferenceType = ReferenceType>({ middleware, placement, strategy, whileElementsMounted, open, }?: UseFloatingProps): UseFloatingReturn<RT>;
