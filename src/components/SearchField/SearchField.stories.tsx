// src/components/SearchField/SearchField.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { SearchField } from './SearchField'

const meta: Meta<typeof SearchField> = {
  title: 'Components/SearchField',
  component: SearchField,
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
      <SearchField placeholder="비활성화" disabled />
    </div>
  ),
}
