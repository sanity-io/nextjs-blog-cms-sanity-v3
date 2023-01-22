import {RGB} from '../types'

function multiplyChannel(b: number, s: number) {
  return b * s
}

/**
 * Apply the \`multiply\` blend mode
 * Source: https://www.w3.org/TR/compositing-1/#blendingmultiply
 * @internal
 */
export function multiply(b: RGB, s: RGB): RGB {
  return {
    r: Math.round(clamp(multiplyChannel(b.r / 255, s.r / 255) * 255)),
    g: Math.round(clamp(multiplyChannel(b.g / 255, s.g / 255) * 255)),
    b: Math.round(clamp(multiplyChannel(b.b / 255, s.b / 255) * 255)),
  }
}

function clamp(num: number) {
  return Math.max(Math.min(num, 255), 0)
}
