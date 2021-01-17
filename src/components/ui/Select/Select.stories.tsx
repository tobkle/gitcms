import { Story, Meta } from '@storybook/react/types-6-0'

import Select, { SelectProps } from './Select'

export default {
  title: 'GITCMS/Select',
  component: Select,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta

const Template: Story<SelectProps> = (args) => <Select {...args} />

export const _Select = Template.bind({})
_Select.args = {
  label: 'Label:',
  name: 'select',
  className: '',
  options: [
    { value: '1', label: 'Ada Lovelace' },
    { value: '2', label: 'Charles Babbage' },
    { value: '3', label: 'Konrad Zuse' },
    { value: '4', label: 'Alan Turing' },
  ],
}
