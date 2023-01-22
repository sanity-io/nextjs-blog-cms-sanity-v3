import reduce, {SKIP} from '../src/reduce'

test('skipping', () => {
  const doc = {
    foo: 'bar',
    array: [{some: 'object'}],
    skipme: {skip: true, this: {should: {be: {skipped: 'yes'}}}},
  }

  expect(
    reduce(doc, (acc, val) => (val.skip ? SKIP(acc) : append(acc, val)), []),
  ).toEqual([doc, doc.foo, doc.array, doc.array[0], doc.array[0].some])

  expect(
    reduce(doc, (acc, val) => (val.skip ? SKIP : append(acc, val)), []),
  ).toEqual([doc, doc.foo, doc.array, doc.array[0], doc.array[0].some])
})

function append(arr, value) {
  const next = [...arr]
  next.push(value)
  return next
}

test('counting longest string value', () => {
  const doc = {
    foo: 'bar',
    array: [
      'item1',
      'item2',
      {some: 'object'},
      'a very long string (29 chars)',
    ],
  }

  expect(
    reduce(
      doc,
      (acc, val) => (typeof val === 'string' ? Math.max(acc, val.length) : acc),
      0,
    ),
  ).toEqual(29)
})

test('collecting all values', () => {
  const doc = {
    foo: 'bar',
    array: ['item1', 'item2', {some: 'object'}],
  }

  expect(reduce(doc, append, [])).toEqual([
    doc,
    doc.foo,
    doc.array,
    doc.array[0],
    doc.array[1],
    doc.array[2],
    (doc.array[2] as {some: string}).some,
  ])
})

test('collecting paths', () => {
  const doc = {
    a: {b: {c: {d: {e: {f: {g: 'deep!'}}}}}},
    foo: 'bar',
    array: ['item1', 'item2', {some: 'object'}],
  }

  expect(reduce(doc, (acc, value, path) => append(acc, path), [])).toEqual([
    [],
    ['a'],
    ['a', 'b'],
    ['a', 'b', 'c'],
    ['a', 'b', 'c', 'd'],
    ['a', 'b', 'c', 'd', 'e'],
    ['a', 'b', 'c', 'd', 'e', 'f'],
    ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    ['foo'],
    ['array'],
    ['array', 0],
    ['array', 1],
    ['array', 2],
    ['array', 2, 'some'],
  ])
})

test('skipping paths at a certain depths', () => {
  const doc = {
    a: {b: {c: {d: {e: {f: {g: 'deep!'}}}}}},
    foo: 'bar',
    array: ['item1', 'item2', {some: 'object'}],
  }

  expect(
    reduce(
      doc,
      (acc, value, path) => (path.length <= 2 ? append(acc, path) : SKIP),
      [],
    ),
  ).toEqual([
    [],
    ['a'],
    ['a', 'b'],
    ['foo'],
    ['array'],
    ['array', 0],
    ['array', 1],
    ['array', 2],
  ])
})

test('string as entry', () => {
  const value = 'abcd'
  const result = reduce(value, (acc, val) => acc.concat(val), [])
  expect(result).toEqual(['abcd'])
})

test('array as entry', () => {
  const value = [
    {some: {object: {some: 'string'}}},
    {
      array: ['a', 'b', 'c', 'd'],
    },
  ]
  const result = reduce(
    value,
    (acc, val, path) => ({...acc, [path.join('.') || 'root']: val}),
    {},
  )

  expect(result).toEqual({
    root: [{some: {object: {some: 'string'}}}, {array: ['a', 'b', 'c', 'd']}],
    '0': {some: {object: {some: 'string'}}},
    '0.some': {object: {some: 'string'}},
    '0.some.object': {some: 'string'},
    '0.some.object.some': 'string',
    '1': {array: ['a', 'b', 'c', 'd']},
    '1.array': ['a', 'b', 'c', 'd'],
    '1.array.0': 'a',
    '1.array.1': 'b',
    '1.array.2': 'c',
    '1.array.3': 'd',
  })
})
