import {withCustomPathSegment} from '../src/reduce'

function getPathWithKey(item, index, container) {
  if (Array.isArray(container) && item && item._key) {
    return {_key: item._key}
  }
  return index
}

test('custom path', () => {
  const value = [
    {_key: 'first', some: {object: {some: 'string'}}},
    {
      _key: 'second',
      array: ['a', 'b', 'c', 'd'],
    },
    {
      _key: 'third',
      array: [
        {_key: 'key_a', value: 'a'},
        {_key: 'key_b', value: 'b'},
        {_key: 'key_c', value: 'c'},
      ],
    },
  ]
  const reduce = withCustomPathSegment(getPathWithKey)
  const result = reduce(value, (acc, val, path) => acc.concat([path]), [])

  expect(result).toEqual([
    [],
    [{_key: 'first'}],
    [{_key: 'first'}, '_key'],
    [{_key: 'first'}, 'some'],
    [{_key: 'first'}, 'some', 'object'],
    [{_key: 'first'}, 'some', 'object', 'some'],
    [{_key: 'second'}],
    [{_key: 'second'}, '_key'],
    [{_key: 'second'}, 'array'],
    [{_key: 'second'}, 'array', 0],
    [{_key: 'second'}, 'array', 1],
    [{_key: 'second'}, 'array', 2],
    [{_key: 'second'}, 'array', 3],
    [{_key: 'third'}],
    [{_key: 'third'}, '_key'],
    [{_key: 'third'}, 'array'],
    [{_key: 'third'}, 'array', {_key: 'key_a'}],
    [{_key: 'third'}, 'array', {_key: 'key_a'}, '_key'],
    [{_key: 'third'}, 'array', {_key: 'key_a'}, 'value'],
    [{_key: 'third'}, 'array', {_key: 'key_b'}],
    [{_key: 'third'}, 'array', {_key: 'key_b'}, '_key'],
    [{_key: 'third'}, 'array', {_key: 'key_b'}, 'value'],
    [{_key: 'third'}, 'array', {_key: 'key_c'}],
    [{_key: 'third'}, 'array', {_key: 'key_c'}, '_key'],
    [{_key: 'third'}, 'array', {_key: 'key_c'}, 'value'],
  ])
})
