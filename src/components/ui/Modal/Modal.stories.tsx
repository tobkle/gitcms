import { Story, Meta } from '@storybook/react/types-6-0'

import Modal, { ModalProps } from './Modal'

export default {
  title: 'GITCMS/Modal',
  component: Modal,
} as Meta

const Template: Story<ModalProps> = (args) => <Modal {...args} />

export const _Modal = Template.bind({})
_Modal.args = {
  label: 'Modal:',
  name: 'modal',
  className: '',
}
