import React, { JSXElementConstructor } from 'react'
import { useRef } from 'react'
import mergeRefs from 'react-merge-refs'
import { FieldError } from 'react-hook-form'
import cn from 'classnames'
import s from './Input.module.css'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  Component?: string | JSXElementConstructor<any>
  className?: string
  label?: string
  errors?: FieldError
}

// eslint-disable-next-line react/display-name
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, inputRef) => {
    const {
      Component = 'input',
      name,
      className,
      label,
      errors,
      type,
      disabled,
      ...rest
    } = props

    const containerClass = cn({
      [s.inputBlock_Checkbox]: type === 'checkbox',
      [s.inputBlock]: type !== 'checkbox',
    })

    const rootClassName = cn(
      s.root,
      {
        [s.rootError]: !!errors,
        'bg-gray-100': disabled === true,
      },
      className
    )
    return (
      <div className={containerClass}>
        {type !== 'hidden' && (
          <label
            className={cn({
              [s.label]: type !== 'checkbox',
              [s.label_Checkbox]: type === 'checkbox',
            })}
            htmlFor={name}
          >
            {label}
          </label>
        )}

        <Component
          displayname="input"
          name={name}
          type={type}
          className={rootClassName}
          tabIndex="0"
          ref={inputRef}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          disabled={disabled}
          {...rest}
        />

        {errors && <div className={s.errorMessage}>{errors?.message}</div>}
      </div>
    )
  }
)

export default Input
