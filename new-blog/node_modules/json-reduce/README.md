# json-reduce

> Reduce any JSON value by traversing depth first and visiting each node

## Example: calculate the sum of all number values in a json object
```js
import reduce from 'json-reduce'

const document = {
  first: 1,
  second: 2,
  deep: {
    array: [3, 4, 5, 6],
    seven: 7
  }
}

const result = reduce(
  document,
  (acc, value, path) => (typeof value === 'number' ? acc + value : acc),
  0
)

console.log(result)
//=> 28
```

## API
```
reduce(value, reducer, initialValue)
````

`reducer` is the reducer function to execute for each node in the tree, and is given three arguments:

  - `accumulator` - The accumulation of the callback's return values; it is the value returned
  from the previous invocation of the callback, or `initialValue`.
  - `value` - The current node being traversed
  - `path` - The "dot-path" to the current node being traversed, e.g. `['deep', 'array', 2]`

## Skipping subtrees
Sometimes when encountering a specific object or array value, you want to skip traversing the subtree. This can be done calling
a provided SKIP function like this:

```js
import reduce, {SKIP} from 'json-reduce'

const doc = {
  species: [
    {name: 'clover', type: 'plant'},
    {name: 'trout', type: 'fish', eats: [{type: 'animal', name: 'crayfish'}]},
    {
      type: 'animal',
      name: 'bear',
      food: [
        {
          type: 'animal',
          name: 'deer',
          food: [{type: 'plant', name: 'leaves'}]
        },
        {
          type: 'plant',
          name: 'blueberry'
        }
      ]
    }
  ]
}

const result = reduce(
  doc,
  (acc, val, path) => {
    if (val.type === 'plant' || val.type === 'fish') {
      // We don't want to traverse the subtrees of these
      return SKIP
    }
    // Collect all traversed paths
    return acc.concat([path])
  },
  []
)
expect(result).toEqual([
  [],
  ['species'],
  ['species', 2],
  ['species', 2, 'type'],
  ['species', 2, 'name'],
  ['species', 2, 'food'],
  ['species', 2, 'food', 0],
  ['species', 2, 'food', 0, 'type'],
  ['species', 2, 'food', 0, 'name'],
  ['species', 2, 'food', 0, 'food']
])
```

## Return and skip
In addition to return `SKIP`, you can also call SKIP with a return value for convenience, to both return the accumulated
value and signal subtree skipping in one operation, e.g.:

```js
//
reduce(doc, (acc, node) => {
  if (node.type === 'plant' || node.type === 'fish') {
    // Uppercase plant and fish names, but skip traversing subtrees
    return SKIP(
      acc.concat({
        ...node,
        name: node.name.toUpperCase()
      })
    )
  }
  return acc
}, [])
```

## Gotchas / Limitations
- Initial value _is required_. json-reduce does not work like [Array.prototype.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) with respect to missing initial value
- No circular reference detection and handling. Passing a circular structure to `reduce()` will probably crash with maximum call stack size exceeded.
- Assumes a data structure that consists of valid JSON data types only. Traversal of `Map`, `Set`, etc. are not currently supported (PR welcome!).
