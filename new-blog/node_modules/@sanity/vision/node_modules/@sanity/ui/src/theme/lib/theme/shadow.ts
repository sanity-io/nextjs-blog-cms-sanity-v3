/**
 * TODO: Rename to `ThemeBoxShadow`
 * @public
 */
export type BoxShadow = [
  // offsetX, offsetY, blurRadius, spreadRadius
  number,
  number,
  number,
  number
]

/**
 * @public
 */
export interface ThemeShadow {
  umbra: BoxShadow
  penumbra: BoxShadow
  ambient: BoxShadow
}
