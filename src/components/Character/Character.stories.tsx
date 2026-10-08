import type { Meta, StoryObj } from '@storybook/react'
import { Character, characterPoses, type CharacterPose } from './Character'

const poses = Object.keys(characterPoses) as CharacterPose[]

const meta: Meta<typeof Character> = {
  title: 'Brand/Character',
  component: Character,
  argTypes: {
    pose: { control: 'select', options: poses },
    size: { control: { type: 'range', min: 48, max: 400, step: 8 } },
  },
}

export default meta
type Story = StoryObj<typeof Character>

export const Playground: Story = {
  args: { pose: 'default', size: 200 },
}

export const Variations: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '8px',
        fontFamily: 'var(--font-family)',
      }}
    >
      {poses.map((pose) => (
        <div
          key={pose}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            padding: '16px 8px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--color-bg-secondary)',
          }}
        >
          <Character pose={pose} size={136} />
          <span style={{ fontSize: 'var(--font-size-12)', color: 'var(--color-label-tertiary)' }}>{pose}</span>
        </div>
      ))}
    </div>
  ),
}
