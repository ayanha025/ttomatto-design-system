import type { Meta, StoryObj } from '@storybook/react'
import { Logo, type LogoType } from './Logo'

const types: LogoType[] = ['wordmark', 'symbol', 'horizontal', 'vertical']

const meta: Meta<typeof Logo> = {
  title: 'Brand/Logo',
  component: Logo,
  argTypes: {
    type: { control: 'select', options: types },
    variant: { control: 'inline-radio', options: ['color', 'simple'] },
    height: { control: 'number' },
    color: { control: 'color' },
  },
}

export default meta
type Story = StoryObj<typeof Logo>

export const Playground: Story = {
  args: { type: 'wordmark', variant: 'color' },
}

export const Overview: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, max-content)',
        alignItems: 'center',
        gap: '24px 40px',
        fontFamily: 'var(--font-family)',
        color: 'var(--color-label-primary)',
      }}
    >
      {types.map((type) => (
        <div key={type} style={{ display: 'contents' }}>
          {(['color', 'simple'] as const).map((variant) => (
            <div key={variant} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Logo type={type} variant={variant} />
              <span style={{ fontSize: 'var(--font-size-12)', color: 'var(--color-label-tertiary)' }}>
                {type} · {variant}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
}

/** 단색 로고는 `color`로 색을 바꿀 수 있어 어두운 배경에도 쓸 수 있습니다. */
export const OnDark: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '24px',
        padding: '24px',
        borderRadius: 'var(--radius-md)',
        background: 'var(--color-label-primary)',
        color: 'var(--color-bg-primary)',
      }}
    >
      <Logo type="horizontal" variant="simple" />
      <Logo type="wordmark" variant="simple" height={28} />
    </div>
  ),
}
