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
import LoadingDots from 'components/ui/LoadingDots'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Component?: string | JSXElementConstructor<any>
  variant?: 'primary' | 'secondary' | 'white' | 'round' | 'circular'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  type?: 'button' | 'submit' | 'reset'
  className?: string
  active?: boolean
  loading?: boolean
  disabled?: boolean
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
      [s.primary]: variant === 'primary',
      [s.secondary]: variant === 'secondary',
      [s.sm]: size === 'sm',
      [s.md]: size === 'md',
      [s.lg]: size === 'lg',
      [s.xl]: size === 'xl',
      [s.loading]: loading,
      [s.disabled]: disabled,
    },
    className
  )
  console.log('rootClassName', rootClassName, s)
  return (
    <div>
      <Component
        aria-pressed={active}
        ref={mergeRefs([ref, buttonRef])}
        {...buttonProps}
        onClick={onClick}
        type={type}
        data-variant={variant}
        className={rootClassName}
        // data-active={isPressed ? '' : undefined}
        style={{
          width,
          ...style,
        }}
      >
        <MailIcon />
        {children}
        {loading && (
          <i className="pl-2 m-0 flex">
            <LoadingDots />
          </i>
        )}
      </Component>
    </div>
  )
})

export default Button
