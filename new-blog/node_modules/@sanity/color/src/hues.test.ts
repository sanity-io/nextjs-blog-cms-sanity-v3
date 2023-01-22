import {hues} from './hues'

test('should be generated', () => {
  expect(Object.entries(hues)).toHaveLength(9)
})
