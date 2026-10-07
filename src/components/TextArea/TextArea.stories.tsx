// src/components/TextArea/TextArea.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { TextArea } from './TextArea'

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/AJQYSwTbm9nWWlonDl8WXR/TMT---Design-System?node-id=5001-2968' },
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    maxLength: { control: 'number' },
    showCount: { control: 'boolean' },
    required: { control: 'boolean' },
    optional: { control: 'boolean' },
    error: { control: 'boolean' },
    success: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof TextArea>

export const Playground: Story = {
  args: {
    label: '리뷰',
    placeholder: '내용을 입력하세요',
    helperText: '도움말 텍스트',
    maxLength: 300,
    showCount: true,
  },
  render: (args) => (
    <div style={{ maxWidth: '320px' }}>
      <TextArea {...args} />
    </div>
  ),
}

export const AllStates: Story = {
  name: 'Overview',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '320px' }}>
      <TextArea label="기본" placeholder="내용을 입력하세요" maxLength={300} helperText="도움말 텍스트" />
      <TextArea label="입력됨" defaultValue="맛있게 잘 먹었습니다." maxLength={300} />
      <TextArea label="에러" defaultValue="짧은 리뷰" maxLength={300} error helperText="10자 이상 입력해 주세요" />
      <TextArea label="비활성화" placeholder="입력할 수 없습니다" maxLength={300} disabled />
    </div>
  ),
}
