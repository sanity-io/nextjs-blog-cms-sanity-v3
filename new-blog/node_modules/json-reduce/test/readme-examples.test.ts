import reduce, {SKIP} from '../src/reduce'

test('skip example', () => {
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
            food: [{type: 'plant', name: 'leaves'}],
          },
          {
            type: 'plant',
            name: 'blueberry',
          },
        ],
      },
    ],
  }

  const result = reduce(
    doc,
    (acc, val, path) => {
      if (val.type === 'plant' || val.type === 'fish') {
        // We don't want to traverse these
        return SKIP
      }
      return acc.concat([path])
    },
    [],
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
    ['species', 2, 'food', 0, 'food'],
  ])
})

test('skip() example', () => {
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
            food: [{type: 'plant', name: 'leaves'}],
          },
          {
            type: 'plant',
            name: 'blueberry',
          },
        ],
      },
    ],
  }
  const result = reduce(
    doc,
    (acc, node) => {
      if (node.type === 'plant' || node.type === 'fish') {
        // We don't want to traverse these
        return SKIP(
          acc.concat({
            ...node,
            name: node.name.toUpperCase(),
          }),
        )
      }
      return acc
    },
    [],
  )

  expect(result).toEqual([
    {name: 'CLOVER', type: 'plant'},
    {name: 'TROUT', type: 'fish', eats: [{type: 'animal', name: 'crayfish'}]},
    {type: 'plant', name: 'LEAVES'},
    {type: 'plant', name: 'BLUEBERRY'},
  ])
})
