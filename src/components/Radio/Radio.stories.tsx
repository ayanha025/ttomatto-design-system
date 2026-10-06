// src/components/Radio/Radio.stories.tsx
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Radio } from './Radio'

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Radio>

export const Playground: Story = {
  args: {
    checked: false,
    disabled: false,
    label: '라디오 버튼',
  },
  render: function Render(args) {
    const [checked, setChecked] = useState(args.checked)
    return <Radio {...args} checked={checked} onChange={() => setChecked(true)} />
  },
}

export const RadioGroup: Story = {
  name: 'Overview',
  render: function Render() {
    const [selected, setSelected] = useState('option1')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Radio
          label="옵션 1"
          name="group"
          value="option1"
          checked={selected === 'option1'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <Radio
          label="옵션 2"
          name="group"
          value="option2"
          checked={selected === 'option2'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <Radio
          label="옵션 3"
          name="group"
          value="option3"
          checked={selected === 'option3'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <Radio label="비활성화" disabled />
        <Radio label="비활성화 (선택됨)" checked disabled />
      </div>
    )
  },
}
