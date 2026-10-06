import '../src/styles/tokens.css'
import type { Preview } from '@storybook/react'

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ['Introduction', 'Foundations', ['Color', 'Typography', 'Spacing', 'Radius', 'Shadow'], 'Components'],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
