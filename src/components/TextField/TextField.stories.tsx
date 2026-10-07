// src/components/TextField/TextField.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { TextField } from './TextField'

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/AJQYSwTbm9nWWlonDl8WXR/TMT---Design-System?node-id=5001-2872' },
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    size: { control: 'select', options: ['medium', 'large'] },
    rightIcon: { control: 'select', options: [undefined, 'search', 'cancel', 'clock'] },
    required: { control: 'boolean' },
    optional: { control: 'boolean' },
    error: { control: 'boolean' },
    success: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof TextField>

export const Playground: Story = {
  args: {
    label: '라벨',
    placeholder: '텍스트를 입력하세요',
    helperText: '도움말 텍스트',
    error: false,
    disabled: false,
  },
}

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '320px' }}>
      <TextField label="기본" placeholder="텍스트를 입력하세요" />
      <TextField label="도움말 포함" placeholder="텍스트를 입력하세요" helperText="도움말 텍스트입니다" />
    </div>
  ),
}

export const Error: Story = {
  render: () => (
    <div style={{ maxWidth: '320px' }}>
      <TextField
        label="에러 상태"
        placeholder="텍스트를 입력하세요"
        error
        helperText="필수 입력 항목입니다"
      />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div style={{ maxWidth: '320px' }}>
      <TextField
        label="비활성화"
        placeholder="입력할 수 없습니다"
        disabled
      />
    </div>
  ),
}

export const AllStates: Story = {
  name: 'Overview',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '320px' }}>
      <TextField label="기본" placeholder="텍스트를 입력하세요" />
      <TextField label="도움말" placeholder="텍스트를 입력하세요" helperText="도움말 텍스트" />
      <TextField label="필수" placeholder="텍스트를 입력하세요" required />
      <TextField label="선택" placeholder="텍스트를 입력하세요" optional />
      <TextField label="입력됨" defaultValue="입력한 내용" rightIcon="cancel" />
      <TextField label="에러" placeholder="텍스트를 입력하세요" error helperText="에러 메시지" />
      <TextField label="성공" defaultValue="사용 가능한 닉네임" success helperText="사용할 수 있어요" />
      <TextField label="Medium" size="medium" placeholder="텍스트를 입력하세요" helperText="도움말 텍스트" />
      <TextField label="비활성화" placeholder="입력 불가" disabled />
    </div>
  ),
}
