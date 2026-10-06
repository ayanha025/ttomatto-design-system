// src/components/SelectField/SelectField.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { SelectField } from './SelectField'

const sampleOptions = [
  { label: '옵션 1', value: 'opt1' },
  { label: '옵션 2', value: 'opt2' },
  { label: '옵션 3', value: 'opt3' },
  { label: '옵션 4', value: 'opt4' },
]

const meta: Meta<typeof SelectField> = {
  title: 'Components/SelectField',
  component: SelectField,
}

export default meta
type Story = StoryObj<typeof SelectField>

export const Playground: Story = {
  args: {
    label: '라벨',
    options: sampleOptions,
    placeholder: '선택하세요',
    disabled: false,
    error: false,
  },
}

export const AllStates: Story = {
  name: 'Overview',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '320px' }}>
      <SelectField label="기본" options={sampleOptions} placeholder="선택하세요" />
      <SelectField label="에러" options={sampleOptions} error helperText="필수 선택 항목입니다" />
      <SelectField label="비활성화" options={sampleOptions} disabled />
    </div>
  ),
}
