import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/dist/umd'
import * as yup from 'yup'
import Form from 'components/ui/Form'
import Input from 'components/ui/Input'
import Button from 'components/ui/Button'
import Select from 'components/ui/Select'
import { ContentTypeProps, ContentTypeFields, Widgets } from 'types'

const schema = yup.object().shape({
  name: yup.string().trim().lowercase().required(),
  label: yup.string().trim().required(),
  widget: yup.string().trim().required(),
  required: yup.boolean(),
  default: yup.string().trim(),
  placeholder: yup.string().trim(),
})

const AddField: React.FC<ContentTypeProps> = (props): JSX.Element => {
  const { contentType, setContentType, setShow, edit, field } = props

  const { handleSubmit, register, errors } = useForm<ContentTypeFields>({
    defaultValues: field,
    resolver: yupResolver(schema),
  })

  const onCancel = () => {
    setShow(false)
  }

  const onSubmit = async (fields) => {
    try {
      setContentType(() => {
        const newContentType = { ...contentType }
        if (edit) {
          console.log('editing field', fields)
          newContentType.fields.forEach((field) => {
            if (field.name === fields.name) {
              field = fields
            }
          })
        } else {
          console.log('adding field', fields)
          newContentType.fields.push(fields)
        }
        console.log('contentType:', newContentType)
        return newContentType
      })
      setShow(false)
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      h1={edit ? 'Edit Field' : 'Add Field'}
    >
      <Input
        name="name"
        label="Name"
        className="w-full"
        ref={register({ required: true })}
        errors={errors['name']}
        type="text"
        placeholder="Name"
        disabled={edit}
      />

      <Input
        name="label"
        label="Label"
        className="w-full"
        ref={register({ required: true })}
        errors={errors['label']}
        type="text"
        placeholder="Label"
      />

      <Select
        name="widget"
        label="Widget"
        selected={field.widget}
        ref={register({ required: true })}
        errors={errors['widget']}
        options={Widgets}
      />

      <Input
        name="default"
        label="Default Value (optional)"
        className="w-full"
        ref={register({ required: false })}
        errors={errors['default']}
        type="text"
        placeholder="Default"
      />

      <Input
        name="placeholder"
        label="Placeholder (optional)"
        className="w-full"
        ref={register({ required: false })}
        errors={errors['placeholder']}
        type="text"
        placeholder="Placeholder"
      />

      <div className="w-full col-span-12">
        <Input
          name="required"
          label="Field is mandatory?"
          ref={register({ required: false })}
          errors={errors['required']}
          type="checkbox"
          placeholder="Required"
        />
      </div>

      <span className="col-span-6">
        <Button type="submit" variant="primary" className="w-full">
          Add
        </Button>
      </span>

      <span className="col-span-6">
        <Button
          type="button"
          variant="white"
          onClick={() => onCancel()}
          className="w-full"
        >
          Cancel
        </Button>
      </span>
    </Form>
  )
}

export default AddField
