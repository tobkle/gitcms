import React from 'react'
import { useRouter } from 'next/router'
import { Site } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/dist/umd'
import * as yup from 'yup'
import Form from 'components/ui/Form'
import Input from 'components/ui/Input'
import Button from 'components/ui/Button'
import { post } from 'lib/fetch'
import { URL_CONTENT_TYPE_CREATE } from 'config/url'

type FormObject = {
  name: string
  label: string
  menu: boolean
}

const schema = yup.object().shape({
  name: yup.string().trim().lowercase().required(),
  label: yup.string().trim().required(),
  menu: yup.boolean(),
})

interface ContentTypeCreateProps {
  site: Site
}

const ContentTypeCreate: React.FC<ContentTypeCreateProps> = (
  props
): JSX.Element => {
  const { site } = props
  const Router = useRouter()
  const { register, handleSubmit, errors } = useForm<FormObject>({
    defaultValues: {
      name: '',
      label: '',
      menu: true,
    },
    resolver: yupResolver(schema),
  })

  const onSubmit = async ({ name, label, menu }) => {
    try {
      await post(URL_CONTENT_TYPE_CREATE, {
        siteId: site.id,
        name,
        label,
        menu,
      })
      Router.push(`/site/${site.id}/type/${name}`)
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <>
      <Form h1="Create Content Type" onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="name"
          ref={register({ required: true })}
          errors={errors['name']}
          type="text"
          label="Name"
          placeholder="Content Type Name"
          className="w-full"
        />
        <Input
          name="label"
          ref={register({ required: true })}
          errors={errors['label']}
          type="text"
          label="Label"
          placeholder="Content Type Label"
          className="w-full"
        />
        <Input
          name="menu"
          ref={register({ required: false })}
          errors={errors['menu']}
          type="checkbox"
          label="Menu"
          placeholder="Content Type Menu"
          className=""
        />
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={Object.keys(errors).length !== 0}
        >
          Create
        </Button>
      </Form>
    </>
  )
}

export default ContentTypeCreate
