export function findMaxBreakpoints(media: number[], width: number): number[] {
  const ret: number[] = []

  for (let i = 0; i < media.length; i += 1) {
    const bp = media[i]

    if (bp > width) {
      ret.push(i)
    }
  }

  return ret
}

export function findMinBreakpoints(media: number[], width: number): number[] {
  const ret: number[] = []

  for (let i = 0; i < media.length; i += 1) {
    const bp = media[i]

    if (bp <= width) {
      ret.push(i)
    }
  }

  return ret
}
