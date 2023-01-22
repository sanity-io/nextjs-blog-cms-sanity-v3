/**
 * @jest-environment jsdom
 */

import {render} from '@testing-library/react'
import {Icon} from './icon'

test('should render svg', () => {
  const {container} = render(<Icon symbol="rocket" />)

  expect(container.querySelector('svg[data-sanity-icon="rocket"]')).toBeInTheDocument()
})
