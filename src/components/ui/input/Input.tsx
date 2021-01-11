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
      ...rest
    } = props
    const rootClassName = cn(
      s.root,
      {
        [s.rootError]: !!errors,
      },
      className
    )
    return (
      <div className={s.inputBlock}>
        {type !== 'hidden' && (
          <label className={s.label} htmlFor={name}>
            {label}
          </label>
        )}

        <Component
          displayname="input"
          name={name}
          type={type}
          className={rootClassName}
          ref={inputRef}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          {...rest}
        />

        {errors && <div className={s.errorMessage}>{errors?.message}</div>}
      </div>
    )
  }
)

export default Input
