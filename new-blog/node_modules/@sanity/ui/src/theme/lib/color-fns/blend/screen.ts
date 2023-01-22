import {RGB} from '../types'

function screenChannel(b: number, s: number) {
  return b + s - b * s
}

/**
 * Apply the \`screen\` blend mode
 * Source: https://www.w3.org/TR/compositing-1/#blendingscreen
 * @internal
 */
export function screen(b: RGB, s: RGB): RGB {
  return {
    r: Math.round(clamp(screenChannel(b.r / 255, s.r / 255) * 255)),
    g: Math.round(clamp(screenChannel(b.g / 255, s.g / 255) * 255)),
    b: Math.round(clamp(screenChannel(b.b / 255, s.b / 255) * 255)),
  }
}

function clamp(num: number) {
  return Math.max(Math.min(num, 255), 0)
}
