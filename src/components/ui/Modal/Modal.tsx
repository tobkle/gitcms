import { useEffect } from 'react'
import Button from 'components/ui/Button'
import cn from 'classnames'
import s from './Modal.module.css'

export interface ModalProps {
  title?: string
  className?: string
  show?: boolean
  setShow?: (arg0: boolean) => void
  children?: React.ReactNode
}

const Modal: React.FC<ModalProps> = (props: ModalProps): JSX.Element => {
  const { show, setShow, title = 'Modal', children } = props

  if (!show) return null
  /*
  useEffect(() => {
    const reactOnKey = (e) => {
      e.preventDefault()
      let isEscape = false
      if ('key' in e) {
        isEscape = e.key === 'Escape' || e.key === 'Esc'
      } else {
        isEscape = e.keyCode === 27
      }
      if (isEscape) setShow(false)
    }
    // TODO: key Event isn't forwarded to the modal child ...
    // const keyEvent: any = addEventListener('keydown', reactOnKey)
    // return () => removeEventListener('keydown', keyEvent)
  }, [setShow])
*/
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" />
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        ></span>

        <div
          className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Modal
