import React, {
  forwardRef,
  useRef,
  ButtonHTMLAttributes,
  JSXElementConstructor,
} from 'react'
import mergeRefs from 'react-merge-refs'
import { useButton } from 'react-aria'
import MailIcon from 'components/icons/mail'
import cn from 'classnames'
import s from './Button.module.css'
// import LoadingDots from 'components/ui/LoadingDots'
import Spinner from 'components/icons/spinner'
import PlusIcon from 'components/icons/plus'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Component?: string | JSXElementConstructor<any>
  variant?: 'primary' | 'secondary' | 'white' | 'accent' | 'round' | 'circular'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  type?: 'button' | 'submit' | 'reset'
  className?: string
  active?: boolean
  loading?: boolean
  disabled?: boolean
  icon?: string
  width?: string | number
}

const Button: React.FC<ButtonProps> = forwardRef((props, buttonRef) => {
  const {
    Component = 'button',
    onClick,
    active,
    variant = 'primary',
    size = 'lg',
    type = 'button',
    className = '',
    loading = false,
    disabled = false,
    icon = '',
    width,
    style = {},
    children,
    ...rest
  } = props
  const ref = useRef<typeof Component>(null)
  const { buttonProps, isPressed } = useButton(
    {
      ...rest,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore onClick === onPress for our purposes
      onPress: onClick,
      isDisabled: disabled,
      // elementType: Component,
    },
    ref
  )

  const rootClassName = cn(
    s.root,
    {
      [s.sm]: variant !== 'circular' && size === 'sm',
      [s.md]: variant !== 'circular' && size === 'md',
      [s.lg]: variant !== 'circular' && size === 'lg',
      [s.xl]: variant !== 'circular' && size === 'xl',
      [s.primary]: variant === 'primary',
      [s.secondary]: variant === 'secondary',
      [s.white]: variant === 'white',
      [s.accent]: variant === 'accent',
      [s.round]: variant === 'round',
      [s.circular]: variant === 'circular',
      [s.loading]: loading,
      [s.disabled]: disabled,
    },
    className
  )
  return (
    <div className={s.inputBlock}>
      <Component
        aria-pressed={active}
        ref={mergeRefs([ref, buttonRef])}
        {...buttonProps}
        onClick={onClick}
        type={type}
        data-variant={variant}
        className={rootClassName}
        data-active={isPressed ? '' : undefined}
        style={{
          width,
          ...style,
        }}
      >
        <div className="mx-auto">
          {variant !== 'circular' && !!icon && <MailIcon />}
          {variant !== 'circular' && children}
          {variant === 'circular' && <PlusIcon />}
          {loading && (
            <i className="pl-2 m-0 flex">
              <Spinner />
            </i>
          )}
        </div>
      </Component>
    </div>
  )
})

export default Button
