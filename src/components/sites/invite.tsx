import React, { useState } from 'react'
import { useForm } from 'hooks/use-form'
import useSWR, { mutate } from 'swr'
import { useSession } from 'hooks/use-session'
import Form from 'components/ui/Form'
import Input from 'components/ui/Input'
import Button from 'components/ui/Button'
import * as yup from 'yup'
import fetcher, { post } from 'lib/fetch'
import { yupResolver } from '@hookform/resolvers/dist/umd'
import { URL_SITE_INVITE, URL_SITE_MAINTAINER } from 'config/url'
import { Site } from '@prisma/client'

interface InviteProps {
  site: Site
}

interface FormObject {
  email: string
  siteId: number
}

const schema = yup.object().shape({
  email: yup.string().trim().lowercase().email().required(),
  siteId: yup.number().required(),
})

const Invite: React.FC<InviteProps> = (props) => {
  const { site } = props
  const [session, loading] = useSession()
  const { data } = useSWR(URL_SITE_MAINTAINER, fetcher)

  const { register, handleSubmit, errors } = useForm<FormObject>({
    defaultValues: {
      email: '',
      siteId: site.id,
    },
    resolver: yupResolver(schema),
  })

  const onSubmit = async ({ email, siteId }) => {
    try {
      const createdMaintainer = await post(URL_SITE_INVITE, {
        email,
        siteId,
      })
      mutate(URL_SITE_MAINTAINER, [...data, createdMaintainer], false)
    } catch (error) {
      console.error(error)
    }
  }

  if (loading) return <div>Loading</div>
  if (!session) return <div></div>

  return (
    <Form
      h1={`Invite Editor to ${site.name}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        name="email"
        label="E-Mail"
        type="email"
        ref={register({ required: true })}
        errors={errors['email']}
        placeholder="E-Mail address.."
      />

      <Input
        name="siteId"
        label="Site Id"
        type="hidden"
        ref={register({ required: true })}
        errors={errors['siteId']}
        placeholder="Site Id.."
      />

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={Object.keys(errors).length !== 0}
      >
        Invite
      </Button>
    </Form>
  )
}

export default Invite
