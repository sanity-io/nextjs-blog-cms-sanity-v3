import type { Meta, StoryObj } from '@storybook/react'

import { LinkedInCTA } from '../components/LinkedInCTA'

const meta: Meta<typeof LinkedInCTA> = {
  component: LinkedInCTA,
}

export default meta
type Story = StoryObj<typeof LinkedInCTA>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Main: Story = {
  render: () => <LinkedInCTA />,
}
