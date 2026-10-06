// src/components/Chip/Chip.stories.tsx
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Chip } from './Chip'

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  argTypes: {
    variant: { control: 'select', options: ['filled', 'outlined'] },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Chip>

export const Playground: Story = {
  args: {
    variant: 'filled',
    selected: false,
    disabled: false,
    children: '칩 라벨',
  },
}

export const AllVariants: Story = {
  name: 'Overview',
  render: function Render() {
    const [selected, setSelected] = useState<string[]>([])
    const toggle = (id: string) => {
      setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id])
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h3 style={{ marginBottom: '12px', fontFamily: 'var(--font-family)' }}>Filled</h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Chip variant="filled" onClick={() => toggle('f1')} selected={selected.includes('f1')}>카테고리</Chip>
            <Chip variant="filled" onClick={() => toggle('f2')} selected={selected.includes('f2')}>태그</Chip>
            <Chip variant="filled" onClose={() => alert('닫기')}>삭제 가능</Chip>
            <Chip variant="filled" disabled>비활성화</Chip>
          </div>
        </div>
        <div>
          <h3 style={{ marginBottom: '12px', fontFamily: 'var(--font-family)' }}>Outlined</h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Chip variant="outlined" onClick={() => toggle('o1')} selected={selected.includes('o1')}>카테고리</Chip>
            <Chip variant="outlined" onClick={() => toggle('o2')} selected={selected.includes('o2')}>태그</Chip>
            <Chip variant="outlined" onClose={() => alert('닫기')}>삭제 가능</Chip>
            <Chip variant="outlined" disabled>비활성화</Chip>
          </div>
        </div>
      </div>
    )
  },
}
