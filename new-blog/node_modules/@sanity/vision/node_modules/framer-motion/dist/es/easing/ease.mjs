import { mirrorEasing } from './modifiers/mirror.mjs';
import { reverseEasing } from './modifiers/reverse.mjs';

const easeIn = (p) => p * p;
const easeOut = reverseEasing(easeIn);
const easeInOut = mirrorEasing(easeIn);

export { easeIn, easeInOut, easeOut };
