// src/components/Toast/Toast.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Toast } from './Toast'
import { Toaster, toast } from './Toaster'
import { Button } from '../Button'

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  argTypes: {
    type: { control: 'select', options: ['success', 'warning', 'error'] },
    message: { control: 'text' },
    description: { control: 'text' },
    icon: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Toast>

export const Playground: Story = {
  args: { type: 'success', message: '저장되었습니다.' },
}

export const AllTypes: Story = {
  name: 'Overview',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 320px)', gap: '24px' }}>
      <Toast type="success" message="한줄 토스트" />
      <Toast type="warning" message="한줄 토스트" />
      <Toast type="error" message="한줄 토스트" />
      <Toast type="success" message="서브 텍스트 토스트" description="안녕 너무 졸리다 안녕 너무 졸리다..." />
      <Toast type="warning" message="서브 텍스트 토스트" description="안녕 너무 졸리다 안녕 너무 졸리다..." />
      <Toast type="error" message="서브 텍스트 토스트" description="안녕 너무 졸리다 안녕 너무 졸리다..." />
    </div>
  ),
}

export const WithToaster: Story = {
  name: 'Toaster (실제 사용)',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={{ height: '100vh', padding: '24px', display: 'flex', gap: '8px', flexWrap: 'wrap', alignContent: 'flex-start' }}>
      <Toaster />
      <Button onClick={() => toast.success('저장되었습니다.')}>성공</Button>
      <Button variant="secondary" onClick={() => toast.warning('저장 공간이 부족합니다.', { description: '불필요한 파일을 정리해 주세요.' })}>경고</Button>
      <Button variant="tertiary" onClick={() => toast.error('저장에 실패했습니다.', { description: '잠시 후 다시 시도해 주세요.' })}>에러</Button>
      <Button variant="tertiary" onClick={() => toast.dismiss()}>모두 닫기</Button>
    </div>
  ),
}
