import React from 'react'
import cn from 'classnames'
import { DeepMap, FieldError, FieldElement, Ref } from 'react-hook-form'

interface Props {
  name: string
  label: string
  type: string
  errors: DeepMap<FormData, FieldError>
  // errors: JSX.IntrinsicAttributes & Props & { children?: React.ReactNode }
  register: (ref: (FieldElement & Ref) | null) => void
}

const Input: React.FC<Props> = (props: Props): JSX.Element => {
  const { name, label, type, errors, register } = props
  return (
    <div className="col-span-12">
      <label className="block text-sm font-medium text-gray-700" htmlFor={name}>
        {label}
      </label>

      <input
        className={cn(
          'mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm',
          {
            'border-gray-300 focus:ring-light-blue-500 focus:border-light-blue-500': !errors[
              name
            ],
            'border-red-300 focus:ring-red-500 focus:border-red-500': !!errors[
              name
            ],
          }
        )}
        id={name}
        type={type}
        name={name}
        defaultValue="Website klemmer.info"
        ref={register}
        placeholder="Site name"
      />

      {errors[name] && (
        <div className="text-red-500 text-sm">{errors[name]?.message}</div>
      )}
    </div>
  )
}

export default Input
