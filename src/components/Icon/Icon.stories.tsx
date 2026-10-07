import type { Meta, StoryObj } from '@storybook/react'
import { Icon } from './Icon'
import { icons, type IconName } from './icons'

const names = Object.keys(icons) as IconName[]

const meta: Meta<typeof Icon> = {
  title: 'Foundations/Icon',
  component: Icon,
  argTypes: {
    name: { control: 'select', options: names },
    size: { control: 'select', options: [16, 20, 24] },
    color: { control: 'color' },
  },
}

export default meta
type Story = StoryObj<typeof Icon>

export const Playground: Story = {
  args: { name: 'search', size: 24, color: 'var(--color-label-primary)' },
}

export const Overview: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(112px, 1fr))',
        gap: '8px',
        fontFamily: 'var(--font-family)',
        color: 'var(--color-label-primary)',
      }}
    >
      {names.map((name) => (
        <div
          key={name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            padding: '16px 8px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--color-bg-secondary)',
          }}
        >
          <Icon name={name} />
          <span style={{ fontSize: 'var(--font-size-12)', color: 'var(--color-label-tertiary)' }}>{name}</span>
        </div>
      ))}
    </div>
  ),
}
