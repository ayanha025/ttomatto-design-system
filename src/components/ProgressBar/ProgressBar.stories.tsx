// src/components/ProgressBar/ProgressBar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { ProgressBar } from './ProgressBar'

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    showLabel: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof ProgressBar>

export const Playground: Story = {
  args: { value: 60, showLabel: true },
}

export const AllStates: Story = {
  name: 'Overview',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
      <ProgressBar value={0} showLabel />
      <ProgressBar value={25} showLabel />
      <ProgressBar value={50} showLabel />
      <ProgressBar value={75} showLabel />
      <ProgressBar value={100} showLabel />
    </div>
  ),
}
