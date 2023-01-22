import { appearStoreId } from './store-id.mjs';
import { animateStyle } from '../waapi/index.mjs';
import { optimizedAppearDataId } from './data-id.mjs';

function startOptimizedAppearAnimation(element, name, keyframes, options) {
    window.MotionAppearAnimations || (window.MotionAppearAnimations = new Map());
    const id = element.dataset[optimizedAppearDataId];
    const animation = animateStyle(element, name, keyframes, options);
    if (id && animation) {
        window.MotionAppearAnimations.set(appearStoreId(id, name), animation);
    }
    return animation;
}

export { startOptimizedAppearAnimation };
