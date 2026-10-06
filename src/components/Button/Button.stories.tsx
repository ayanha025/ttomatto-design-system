// src/components/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    disabled: false,
    children: '버튼',
  },
}

export const Primary: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button variant="primary" size="small">Small</Button>
      <Button variant="primary" size="medium">Medium</Button>
      <Button variant="primary" size="large">Large</Button>
      <Button variant="primary" disabled>Disabled</Button>
    </div>
  ),
}

export const Secondary: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button variant="secondary" size="small">Small</Button>
      <Button variant="secondary" size="medium">Medium</Button>
      <Button variant="secondary" size="large">Large</Button>
      <Button variant="secondary" disabled>Disabled</Button>
    </div>
  ),
}

export const Tertiary: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button variant="tertiary" size="small">Small</Button>
      <Button variant="tertiary" size="medium">Medium</Button>
      <Button variant="tertiary" size="large">Large</Button>
      <Button variant="tertiary" disabled>Disabled</Button>
    </div>
  ),
}

export const AllVariants: Story = {
  name: 'Overview',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '12px', fontFamily: 'var(--font-family)' }}>Primary</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button variant="primary" size="small">Small</Button>
          <Button variant="primary" size="medium">Medium</Button>
          <Button variant="primary" size="large">Large</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontFamily: 'var(--font-family)' }}>Secondary</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button variant="secondary" size="small">Small</Button>
          <Button variant="secondary" size="medium">Medium</Button>
          <Button variant="secondary" size="large">Large</Button>
          <Button variant="secondary" disabled>Disabled</Button>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontFamily: 'var(--font-family)' }}>Tertiary</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button variant="tertiary" size="small">Small</Button>
          <Button variant="tertiary" size="medium">Medium</Button>
          <Button variant="tertiary" size="large">Large</Button>
          <Button variant="tertiary" disabled>Disabled</Button>
        </div>
      </div>
    </div>
  ),
}
