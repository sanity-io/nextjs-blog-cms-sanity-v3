import {HSL, RGB} from './types'

/**
 * @internal
 */
export function hexToRgb(hex: string): RGB {
  if (hex.length === 4) {
    const hexR = hex.slice(1, 2)
    const hexG = hex.slice(2, 3)
    const hexB = hex.slice(3, 4)

    return {
      r: parseInt(hexR + hexR, 16),
      g: parseInt(hexG + hexG, 16),
      b: parseInt(hexB + hexB, 16),
    }
  }

  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  }
}

/**
 * @internal
 */
export function rgbToHex({r, g, b}: RGB): string {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

/**
 * @internal
 * @see https://css-tricks.com/converting-color-spaces-in-javascript/
 */
export function rgbToHsl({r, g, b}: RGB): HSL {
  // Make r, g, and b fractions of 1
  r /= 255
  g /= 255
  b /= 255

  // Find greatest and smallest channel values
  const cmin = Math.min(r, g, b)
  const cmax = Math.max(r, g, b)
  const delta = cmax - cmin

  let h = 0
  let s = 0
  let l = 0

  // Calculate hue
  // No difference
  if (delta == 0) h = 0
  // Red is max
  else if (cmax == r) h = ((g - b) / delta) % 6
  // Green is max
  else if (cmax == g) h = (b - r) / delta + 2
  // Blue is max
  else h = (r - g) / delta + 4

  h = Math.round(h * 60)

  // Make negative hues positive behind 360°
  if (h < 0) h += 360

  // Calculate lightness
  l = (cmax + cmin) / 2

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1)
  l = +(l * 100).toFixed(1)

  return {h, s, l}
}

/**
 * @internal
 */
export function hslToRgb(hsl: HSL): RGB {
  // Must be fractions of 1
  const s = hsl.s / 100
  const l = hsl.l / 100

  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((hsl.h / 60) % 2) - 1))
  const m = l - c / 2

  let r = 0
  let g = 0
  let b = 0

  if (0 <= hsl.h && hsl.h < 60) {
    r = c
    g = x
    b = 0
  } else if (60 <= hsl.h && hsl.h < 120) {
    r = x
    g = c
    b = 0
  } else if (120 <= hsl.h && hsl.h < 180) {
    r = 0
    g = c
    b = x
  } else if (180 <= hsl.h && hsl.h < 240) {
    r = 0
    g = x
    b = c
  } else if (240 <= hsl.h && hsl.h < 300) {
    r = x
    g = 0
    b = c
  } else if (300 <= hsl.h && hsl.h < 360) {
    r = c
    g = 0
    b = x
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  }
}
