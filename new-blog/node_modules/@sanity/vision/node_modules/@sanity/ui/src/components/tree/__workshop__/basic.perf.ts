import {PerfTestProps, PerfTestRunFn} from '@sanity/ui-workshop/plugin-perf'
import {findByTestId, fireEvent} from '@testing-library/dom'

function test<ElementType = unknown>(
  title: string,
  run: PerfTestRunFn<ElementType>
): PerfTestProps<ElementType> {
  return {name: title, run}
}

export const perfTests = [
  test('Toggle tree groups', async ({target}: {target: HTMLDivElement}) => {
    const apples = await findByTestId(target, 'apples')
    const oranges = await findByTestId(target, 'oranges')

    fireEvent.click(apples)
    fireEvent.click(oranges)
  }),
]
