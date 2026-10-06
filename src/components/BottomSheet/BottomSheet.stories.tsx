// src/components/BottomSheet/BottomSheet.stories.tsx
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { BottomSheet } from './BottomSheet'
import { Button } from '../Button'

const meta: Meta<typeof BottomSheet> = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
}

export default meta
type Story = StoryObj<typeof BottomSheet>

export const Default: Story = {
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>바텀시트 열기</Button>
        <BottomSheet
          isOpen={isOpen}
          title="옵션 선택"
          onClose={() => setIsOpen(false)}
          footer={
            <>
              <Button variant="tertiary" onClick={() => setIsOpen(false)}>취소</Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>확인</Button>
            </>
          }
        >
          <p>바텀시트 내용이 여기에 들어갑니다.</p>
          <p>모바일 환경에서 주로 사용되는 컴포넌트입니다.</p>
        </BottomSheet>
      </>
    )
  },
}
