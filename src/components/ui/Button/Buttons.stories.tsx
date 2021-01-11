import { Story, Meta } from '@storybook/react/types-6-0'

import Button, { ButtonProps } from './Button'
import PrimaryCircularButton from './PrimaryCircularButton'

export default {
  title: 'GITCMS/Button',
  component: Button,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta

const Template: Story<ButtonProps> = (args) => <Button {...args}>Button</Button>

export const _Button = Template.bind({})
_Button.args = {
  size: 'xl',
  variant: 'primary',
  className: '',
}

export const _PrimaryCircularButton = () => <PrimaryCircularButton />
