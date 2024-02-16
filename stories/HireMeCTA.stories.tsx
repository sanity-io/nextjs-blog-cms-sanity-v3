import type { Meta, StoryObj } from '@storybook/react'

import { HireMeCTA } from '../components/HireMeCTA'

const meta: Meta<typeof HireMeCTA> = {
  component: HireMeCTA,
}

export default meta
type Story = StoryObj<typeof HireMeCTA>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Main: Story = {
  render: () => <HireMeCTA />,
}
