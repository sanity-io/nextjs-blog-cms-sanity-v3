import { Boundary, RootBoundary, Rect, Strategy } from '@floating-ui/core';
import { Platform, ReferenceElement } from '../types';
type PlatformWithCache = Platform & {
    _c: Map<ReferenceElement, Element[]>;
};
export declare function getClippingRect(this: PlatformWithCache, { element, boundary, rootBoundary, strategy, }: {
    element: Element;
    boundary: Boundary;
    rootBoundary: RootBoundary;
    strategy: Strategy;
}): Rect;
export {};
