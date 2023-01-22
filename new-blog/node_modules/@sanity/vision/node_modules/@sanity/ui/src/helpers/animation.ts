/**
 * @internal
 */
export function _raf(fn: () => void): () => void {
  const frameId = requestAnimationFrame(fn)

  return () => {
    cancelAnimationFrame(frameId)
  }
}

/**
 * @internal
 */
export function _raf2(fn: () => void): () => void {
  let innerDispose: (() => void) | null = null

  const outerDispose = _raf(() => {
    innerDispose = _raf(fn)
  })

  return () => {
    if (innerDispose) innerDispose()

    outerDispose()
  }
}
