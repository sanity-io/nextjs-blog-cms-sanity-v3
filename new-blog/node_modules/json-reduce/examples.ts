import reduce from './src/reduce'

// -- count all number values
const document = {
  first: 1,
  second: 2,
  deep: {
    array: [3, 4, 5, 6],
    seven: 7,
  },
}
const result = reduce(
  document,
  (acc, value, path) => (typeof value === 'number' ? acc + value : acc),
  0,
)

console.log(result) // Prints out 28

// primitive inputs
console.log(reduce(21, (prev, current) => prev + current, 4))
console.log(reduce(false, (prev, current) => prev && current, true))
console.log(reduce(false, (prev, current) => prev || current, true))
console.log(reduce('World', (prev, current) => `${prev} ${current}`, 'Hello'))

// array of numbers
console.log(
  reduce(
    [1, 2],
    (acc, value, path) => (Array.isArray(value) ? acc : acc + value),
    3,
  ),
)

// object with numbers
console.log(
  reduce(
    {foo: 1, bar: 2},
    (acc, value, path) => (typeof value === 'number' ? acc + value : acc),
    3,
  ),
)

console.log(reduce({foo: 1, bar: 2}, (acc, value, path) => null, 3))

// uppercase all strings
console.log(
  reduce(
    {foo: 'foo', bar: 'bar'},
    (acc, value, path) =>
      typeof value === 'string' ? value.toUpperCase() : value,
    {},
  ),
)

console.log(
  reduce(
    {foo: 'foo', bar: ['one', 'two', 'three']},
    (acc, value, path) =>
      typeof value === 'string' ? value.toUpperCase() : undefined,
    {},
  ),
)

console.log(
  reduce(
    ['one', 'two', 'three'],
    (acc, value, path) =>
      typeof value === 'string' ? value.toUpperCase() : undefined,
    '',
  ),
)
