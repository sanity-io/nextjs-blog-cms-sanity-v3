import { drag } from '../../motion/features/drag.mjs';
import { layoutFeatures } from '../../motion/features/layout/index.mjs';
import { domAnimation } from './features-animation.mjs';
import { HTMLProjectionNode } from '../../projection/node/HTMLProjectionNode.mjs';

/**
 * @public
 */
const domMax = {
    ...domAnimation,
    ...drag,
    ...layoutFeatures,
    projectionNodeConstructor: HTMLProjectionNode,
};

export { domMax };
