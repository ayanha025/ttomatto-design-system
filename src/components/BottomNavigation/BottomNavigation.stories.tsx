// src/components/BottomNavigation/BottomNavigation.stories.tsx
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { BottomNavigation } from './BottomNavigation'

const meta: Meta<typeof BottomNavigation> = {
  title: 'Components/BottomNavigation',
  component: BottomNavigation,
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/AJQYSwTbm9nWWlonDl8WXR/TMT---Design-System?node-id=5017-1714' },
  },
}

export default meta
type Story = StoryObj<typeof BottomNavigation>

export const Playground: Story = {
  render: function Render() {
    const [value, setValue] = useState('home')
    return (
      <div style={{ padding: '24px', background: 'var(--color-bg-secondary)', width: 'fit-content' }}>
        <BottomNavigation value={value} onChange={setValue} onFabClick={() => alert('새 글 작성')} />
      </div>
    )
  },
}

export const Overview: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '24px', background: 'var(--color-bg-secondary)', width: 'fit-content' }}>
      {['home', 'feed', 'group', 'my'].map((value) => (
        <BottomNavigation key={value} value={value} onFabClick={() => {}} />
      ))}
    </div>
  ),
}
