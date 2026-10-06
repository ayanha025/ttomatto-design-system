// src/components/Modal/Modal.stories.tsx
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Modal } from './Modal'
import { Button } from '../Button'

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
}

export default meta
type Story = StoryObj<typeof Modal>

export const Default: Story = {
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>모달 열기</Button>
        <Modal
          isOpen={isOpen}
          title="확인"
          onClose={() => setIsOpen(false)}
          footer={
            <>
              <Button variant="tertiary" onClick={() => setIsOpen(false)}>취소</Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>확인</Button>
            </>
          }
        >
          <p>이 작업을 진행하시겠습니까?</p>
        </Modal>
      </>
    )
  },
}

export const WithLongContent: Story = {
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>긴 내용 모달</Button>
        <Modal
          isOpen={isOpen}
          title="서비스 이용약관"
          onClose={() => setIsOpen(false)}
          footer={
            <Button variant="primary" onClick={() => setIsOpen(false)}>동의</Button>
          }
        >
          {Array.from({ length: 10 }, (_, i) => (
            <p key={i}>이용약관 내용이 여기에 들어갑니다. 스크롤이 생기는 긴 내용의 모달입니다.</p>
          ))}
        </Modal>
      </>
    )
  },
}
