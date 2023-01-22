import {useRef} from 'react'

/**
 * This is a React hook to make sure that a record identity is the same on every render. Uses strict
 * equality comparison (eg by identity), and only goes one level deep.
 *
 * @internal
 */
type Comparable = Record<string | number | symbol, unknown> | undefined | null

export function useUnique<ValueType extends Comparable = Comparable>(value: ValueType): ValueType {
  const valueRef = useRef<ValueType>(value)

  if (!_isEqual(valueRef.current, value)) {
    valueRef.current = value
  }

  return valueRef.current
}

function _isEqual(objA: Comparable, objB: Comparable): boolean {
  if (!objA || !objB) {
    return objA === objB
  }

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) {
    return false
  }

  return keysA.every((key) => objA[key] === objB[key])
}
