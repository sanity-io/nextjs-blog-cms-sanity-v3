/**
 * @public
 */
export interface LayerContextValue {
  version: 0.0
  isTopLayer: boolean
  registerChild: () => () => void
  size: number
  zIndex: number
}
