import { Story, Meta } from '@storybook/react/types-6-0'

import Input, { InputProps } from './Input'

export default {
  title: 'GITCMS/Input',
  component: Input,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta

const Template: Story<InputProps> = (args) => <Input {...args} />

export const _Input = Template.bind({})
_Input.args = {
  label: 'Input',
  name: 'input',
  className: '',
  placeholder: 'Please enter input...',
}
