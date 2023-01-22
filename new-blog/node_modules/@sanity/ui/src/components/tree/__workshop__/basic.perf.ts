import {PerfTestProps, PerfTestRunFn} from '@sanity/ui-workshop'
import {findByTestId, fireEvent} from '@testing-library/dom'

// // function delay(ms: number) {
// //   return new Promise((resolve) => setTimeout(resolve, ms))
// // }

function test<ElementType = unknown>(
  title: string,
  run: PerfTestRunFn<ElementType>
): PerfTestProps<ElementType> {
  return {name: title, run}
}

// export const toggleTreeGroupsTest = perfTest(
//   'Toggle tree groups',
//   async ({target}: {target: HTMLDivElement}) => {

//   }
// )

export const perfTests = [
  test('Toggle tree groups', async ({target}: {target: HTMLDivElement}) => {
    // await delay(50)

    const apples = await findByTestId(target, 'apples')
    const oranges = await findByTestId(target, 'oranges')

    fireEvent.click(apples)
    fireEvent.click(oranges)
  }),
]
