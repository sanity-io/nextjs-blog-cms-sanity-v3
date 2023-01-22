function defaultCreatePathSegment(value, index, outerValue) {
  return index
}

function getType(value) {
  if (Array.isArray(value)) {
    return 'array'
  }
  return value === null ? 'null' : typeof value
}

type SkipMarker = Object & {_: 'SKIP_MARKER'}
export const SKIP_MARKER: SkipMarker = {_: 'SKIP_MARKER'}
export type SkipTuple<T> = [SkipMarker, T]
export type Skipper<T> = (value: T) => SkipTuple<T>
export function SKIP<T>(value: T): SkipTuple<T> {
  return [SKIP_MARKER, value]
}

type ReducerResult<T> = [boolean, T]

function callReducer<T>(acc, reducerFn, value, path): ReducerResult<T> {
  const returnVal = reducerFn(acc, value, path)
  if (returnVal === SKIP) {
    return [true, acc]
  }

  return Array.isArray(returnVal) && returnVal[0] === SKIP_MARKER
    ? [true, returnVal[1]]
    : [false, returnVal]
}

// eslint-disable-next-line no-use-before-define

type JSONPrimitive = number | string | boolean
// @ts-ignore
type JSONArray = JSONValue[]

interface JSONObject {
  [key: string]: JSONValue
}

// @ts-ignore
type JSONValue = JSONPrimitive | JSONObject | JSONArray

type Reducer<T> = (
  acc: T,
  value: JSONValue,
  path?: Array<any>,
) => T | Skipper<T> | SkipMarker

type CreatePathSegment<K> = (
  value: JSONValue,
  index: string | number,
  outerValue: JSONObject | JSONValue[],
) => K

function reducePrimitive<T>(
  acc: T,
  reducerFn: Reducer<T>,
  value: JSONPrimitive,
  path: any[],
) {
  const [, /* skipped by default */ nextAcc] = callReducer(
    acc,
    reducerFn,
    value,
    path,
  )
  return nextAcc
}

// Reduce depth first
function reduceObject<T>(
  acc: T,
  reducerFn: Reducer<T>,
  object: JSONObject,
  path: any[],
  createPathSegment = defaultCreatePathSegment,
) {
  const [skip, nextAcc] = callReducer(acc, reducerFn, object, path)
  return skip
    ? nextAcc
    : Object.keys(object).reduce(
        (innerAcc: T, key: string) =>
          reduceAny(
            innerAcc,
            reducerFn,
            object[key],
            path.concat(createPathSegment(object[key], key, object)),
            createPathSegment,
          ),
        nextAcc,
      )
}

// Reduce depth first
function reduceArray<T>(
  acc: T,
  reducerFn: Reducer<T>,
  array: JSONValue[],
  path: any[],
  createPathSegment = defaultCreatePathSegment,
): T {
  const [skip, nextAcc] = callReducer(acc, reducerFn, array, path)
  return skip
    ? nextAcc
    : array.reduce(
        (innerAcc: T, item: JSONArray, index: number) =>
          reduceAny(
            innerAcc,
            reducerFn,
            item,
            path.concat(createPathSegment(item, index, array)),
            createPathSegment,
          ),
        nextAcc,
      )
}

function reduceAny<T>(
  acc: T,
  reducerFn: Reducer<T>,
  val: JSONValue,
  path: any[],
  createPathSegment = defaultCreatePathSegment,
) {
  const type = getType(val)
  if (type === 'object') {
    return reduceObject(acc, reducerFn, val, path, createPathSegment)
  }
  if (type === 'array') {
    return reduceArray(acc, reducerFn, val, path, createPathSegment)
  }
  return reducePrimitive(acc, reducerFn, val, path)
}

export default function reduce<T, K>(
  value: JSONValue,
  reducerFn: Reducer<T>,
  initial: T,
  createPathSegment: CreatePathSegment<K> = defaultCreatePathSegment,
) {
  return reduceAny(initial, reducerFn, value, [], createPathSegment)
}

export const withCustomPathSegment = createPathSegment => (
  value,
  reducer,
  initial,
) => reduce(value, reducer, initial, createPathSegment)
