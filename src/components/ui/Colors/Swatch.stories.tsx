import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import Swatch, { SwatchProps } from './Swatch'

export default {
  title: 'GITCMS/Colors',
  component: Swatch,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta

const Template: Story<SwatchProps> = (args) => <Swatch {...args} />

export const Colors = Template.bind({})
Colors.args = {
  label: 'color',
}
