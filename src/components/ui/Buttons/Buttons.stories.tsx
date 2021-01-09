import { Story, Meta } from '@storybook/react/types-6-0'

import Button, { ButtonProps } from './Button'
import SecondaryButton from './SecondaryButtons'
import WhiteButtons from './WhiteButtons'
import PrimaryCircularButton from './PrimaryCircularButton'
import PrimaryRoundButton from './PrimaryRoundButton'

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
}

export const _SecondaryButton = () => <SecondaryButton />
export const _WhiteButtons = () => <WhiteButtons />
export const _PrimaryCircularButton = () => <PrimaryCircularButton />
export const _PrimaryRoundButton = () => <PrimaryCircularButton />
