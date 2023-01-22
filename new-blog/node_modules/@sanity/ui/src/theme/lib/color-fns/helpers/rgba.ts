import {parseColor} from '../parse'

/**
 * @internal
 */
export function rgba(color: unknown, a: number): string {
  const rgb = parseColor(color)

  return `rgba(${rgb.r},${rgb.g},${rgb.b},${a})`
}
