import React, { JSXElementConstructor } from 'react'
import { Listbox } from '@headlessui/react'
import { FieldError } from 'react-hook-form'
import s from './Select.module.css'

export interface OptionType {
  value: string | number
  label: string
}

export interface SelectProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  Component?: string | JSXElementConstructor<any>
  className?: string
  label?: string
  options: OptionType[]
  errors?: FieldError
  selected: string | number
}

// eslint-disable-next-line react/display-name
const Select = React.forwardRef<HTMLInputElement, SelectProps>(
  (props, selectRef) => {
    const {
      Component = 'div',
      name,
      className = 'col-span-full w-full mx-auto space-y-1',
      label = '',
      options = [],
      errors,
      selected,
      ...rest
    } = props

    const [selectedOption, setSelectedOption] = React.useState<OptionType>(
      selected
        ? options.filter((option) => option.value === selected).pop()
        : options[0]
    )

    const onChange = (value) => {
      const _options = [...options]
      const selected = _options
        .filter((_option) => _option.label === value)
        .pop()
      setSelectedOption(selected)
    }

    return (
      <>
        <Listbox
          as="div"
          className={className}
          value={selectedOption.label}
          onChange={onChange}
        >
          <input
            type="hidden"
            name={name}
            ref={selectRef}
            value={selectedOption.value}
          />
          <Listbox.Label className={s.label}>{label}</Listbox.Label>

          <Listbox.Button className={s.root}>
            <span className="block text-left truncate">
              {selectedOption.label}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Listbox.Button>

          <Listbox.Options className={s.options}>
            {options &&
              options.map((option) => (
                <Listbox.Option key={option.value} value={option.label}>
                  {({ selected, active }) => (
                    <div
                      className={`${
                        active ? 'text-white bg-primary-600' : 'text-gray-900'
                      } cursor-default select-none relative py-2 pl-8 pr-4`}
                    >
                      <span
                        className={`${
                          selected ? 'font-semibold' : 'font-normal'
                        } block truncate`}
                      >
                        {option.label}
                      </span>

                      {selected && (
                        <span
                          className={`${
                            active ? 'text-white' : 'text-primary-600'
                          } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                        >
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      )}
                    </div>
                  )}
                </Listbox.Option>
              ))}
          </Listbox.Options>
        </Listbox>

        {errors && <div className={s.errorMessage}>{errors?.message}</div>}
      </>
    )
  }
)

export default Select
