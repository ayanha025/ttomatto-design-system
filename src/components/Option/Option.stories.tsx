// src/components/Option/Option.stories.tsx
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Option, type OptionType } from './Option'
import { OptionGroup } from './OptionGroup'

const meta: Meta<typeof Option> = {
  title: 'Components/Option',
  component: Option,
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/AJQYSwTbm9nWWlonDl8WXR/TMT---Design-System?node-id=5001-3811' },
  },
  argTypes: {
    type: { control: 'select', options: ['check', 'radio', 'text', 'text2'] },
    label: { control: 'text' },
    subText: { control: 'text' },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Option>

export const Playground: Story = {
  args: { type: 'text', label: '옵션', subText: '보조 설명', selected: false, disabled: false },
  render: (args) => (
    <div role="listbox" style={{ width: '320px' }}>
      <Option {...args} />
    </div>
  ),
}

const types: OptionType[] = ['check', 'radio', 'text', 'text2']

export const AllTypes: Story = {
  name: 'Overview',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 320px)', gap: '24px' }}>
      {types.map((type) => (
        <div key={type} role="listbox" aria-label={type} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <Option type={type} label="선택됨" subText="보조 설명" selected />
          <Option type={type} label="기본" subText="보조 설명" />
          <Option type={type} label="비활성화 (선택됨)" subText="보조 설명" selected disabled />
          <Option type={type} label="비활성화" subText="보조 설명" disabled />
        </div>
      ))}
    </div>
  ),
}

const menu = ['한식', '중식', '일식', '양식', '분식', '카페', '디저트', '술집']

export const Group: Story = {
  name: 'Option group',
  render: function Render() {
    const [selected, setSelected] = useState<string[]>(['한식'])
    const toggle = (item: string) =>
      setSelected((prev) => (prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item]))
    return (
      <OptionGroup aria-label="음식 종류" aria-multiselectable maxHeight={268} style={{ width: '320px' }}>
        {menu.map((item) => (
          <Option
            key={item}
            type="check"
            label={item}
            subText="가게 수 120곳"
            selected={selected.includes(item)}
            onClick={() => toggle(item)}
          />
        ))}
      </OptionGroup>
    )
  },
}
