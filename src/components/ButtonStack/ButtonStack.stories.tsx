// src/components/ButtonStack/ButtonStack.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { ButtonStack } from './ButtonStack'
import { Button } from '../Button'

const meta: Meta<typeof ButtonStack> = {
  title: 'Components/ButtonStack',
  component: ButtonStack,
  argTypes: {
    direction: { control: 'select', options: ['horizontal', 'vertical'] },
    padded: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof ButtonStack>

export const Playground: Story = {
  args: { direction: 'horizontal', padded: false },
  render: (args) => (
    <div style={{ width: args.padded ? '360px' : '320px', background: 'var(--color-bg-secondary)' }}>
      <ButtonStack {...args}>
        {args.direction === 'vertical' ? (
          <>
            <Button size="large">확인</Button>
            <Button size="large" variant="tertiary">취소</Button>
          </>
        ) : (
          <>
            <Button size="large" variant="tertiary">취소</Button>
            <Button size="large">확인</Button>
          </>
        )}
      </ButtonStack>
    </div>
  ),
}

export const Overview: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-start' }}>
      <div style={{ width: '320px' }}>
        <ButtonStack direction="horizontal">
          <Button size="large" variant="tertiary">취소</Button>
          <Button size="large">확인</Button>
        </ButtonStack>
      </div>
      <div style={{ width: '320px' }}>
        <ButtonStack direction="vertical">
          <Button size="large">확인</Button>
          <Button size="large" variant="tertiary">취소</Button>
        </ButtonStack>
      </div>
      <div style={{ width: '360px', background: 'var(--color-bg-secondary)' }}>
        <ButtonStack direction="horizontal" padded>
          <Button size="large" variant="tertiary">취소</Button>
          <Button size="large">확인</Button>
        </ButtonStack>
      </div>
      <div style={{ width: '360px', background: 'var(--color-bg-secondary)' }}>
        <ButtonStack direction="vertical" padded>
          <Button size="large">확인</Button>
          <Button size="large" variant="tertiary">취소</Button>
        </ButtonStack>
      </div>
    </div>
  ),
}
