// src/components/SearchField/SearchField.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { SearchField } from './SearchField'

const meta: Meta<typeof SearchField> = {
  title: 'Components/SearchField',
  component: SearchField,
  argTypes: {
    label: { control: 'text' },
    size: { control: 'select', options: ['medium', 'large'] },
    helperText: { control: 'text' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof SearchField>

export const Playground: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
    disabled: false,
  },
}

export const AllStates: Story = {
  name: 'Overview',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '320px' }}>
      <SearchField placeholder="검색어를 입력하세요" />
      <SearchField label="라벨" placeholder="검색어를 입력하세요" helperText="도움말 텍스트" />
      <SearchField defaultValue="떡볶이" />
      <SearchField defaultValue="떡볶이" error helperText="검색 결과가 없어요" />
      <SearchField size="medium" placeholder="Medium" />
      <SearchField placeholder="비활성화" disabled />
    </div>
  ),
}
