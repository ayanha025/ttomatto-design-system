import type { Meta, StoryObj } from '@storybook/react'
import { BrandIcon } from './BrandIcon'
import { brandIcons, type BrandIconName } from './brandIcons'

const names = Object.keys(brandIcons) as BrandIconName[]

const groups = [
  { key: 'store', title: 'Store Filter Icon' },
  { key: 'person', title: 'Tag Icon / Person' },
  { key: 'benefit', title: 'Tag Icon / Benefit' },
  { key: 'etc', title: 'ETC' },
] as const

const meta: Meta<typeof BrandIcon> = {
  title: 'Brand/Brand Icon',
  component: BrandIcon,
  argTypes: {
    name: { control: 'select', options: names },
    size: { control: 'select', options: [16, 20, 24, 32, 48] },
  },
}

export default meta
type Story = StoryObj<typeof BrandIcon>

export const Playground: Story = {
  args: { name: 'korean', size: 48 },
}

export const Overview: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontFamily: 'var(--font-family)' }}>
      {groups.map((group) => (
        <section key={group.key}>
          <h3
            style={{
              margin: '0 0 8px',
              fontSize: 'var(--font-size-14)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-label-primary)',
            }}
          >
            {group.title}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(112px, 1fr))', gap: '8px' }}>
            {names
              .filter((name) => brandIcons[name].group === group.key)
              .map((name) => (
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
                  <BrandIcon name={name} size={32} />
                  <span style={{ fontSize: 'var(--font-size-12)', color: 'var(--color-label-tertiary)', textAlign: 'center' }}>
                    {name}
                    <br />
                    {brandIcons[name].label}
                  </span>
                </div>
              ))}
          </div>
        </section>
      ))}
    </div>
  ),
}
