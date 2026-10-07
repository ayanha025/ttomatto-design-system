// src/components/Chip/Chip.stories.tsx
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Chip } from './Chip'

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/AJQYSwTbm9nWWlonDl8WXR/TMT---Design-System?node-id=5001-3042' },
  },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    leftIcon: { control: 'select', options: [undefined, 'star', 'heart', 'map-pin', 'clock'] },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Chip>

export const Playground: Story = {
  args: {
    size: 'large',
    selected: false,
    disabled: false,
    children: '칩 라벨',
  },
  render: function Render(args) {
    const [selected, setSelected] = useState(args.selected)
    return <Chip {...args} selected={selected} onClick={() => setSelected(!selected)} />
  },
}

const sizes = ['large', 'medium', 'small'] as const

export const AllVariants: Story = {
  name: 'Overview',
  render: function Render() {
    const [selected, setSelected] = useState<string[]>(['large-1'])
    const toggle = (id: string) => {
      setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id])
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontFamily: 'var(--font-family)' }}>
        {sizes.map(size => (
          <div key={size}>
            <h3 style={{ margin: '0 0 12px' }}>{size}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <Chip size={size} onClick={() => toggle(`${size}-1`)} selected={selected.includes(`${size}-1`)}>한식</Chip>
              <Chip size={size} leftIcon="star" onClick={() => toggle(`${size}-2`)} selected={selected.includes(`${size}-2`)}>평점 4.5+</Chip>
              <Chip size={size} onClose={() => alert('삭제')}>삭제 가능</Chip>
              <Chip size={size} disabled>비활성화</Chip>
            </div>
          </div>
        ))}
      </div>
    )
  },
}
