import React from 'react';
import cn from 'classnames';
import type { FieldElement, FieldError, FieldName, Ref } from 'react-hook-form';

export default function InputField({
  name,
  label,
  errors,
  register,
}: {
  name: HTMLInputElement;
  label: string;
  errors: FieldError | undefined;
  register: Ref;
}): JSX.Element {
  return (
    <div className="col-span-12 mb-4">
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
        type="text"
        name={name}
        ref={register}
        placeholder={label}
      />

      {errors[name] && <div className="text-red-500">{label} is required</div>}
    </div>
  );
}
