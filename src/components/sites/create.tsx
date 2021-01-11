import React from 'react'
import { GetStaticProps } from 'next'
import { useForm } from 'react-hook-form'
import useSWR, { mutate } from 'swr'
import fetcher, { post } from 'lib/fetch'
import { useSession } from 'hooks/use-session'
import { yupResolver } from '@hookform/resolvers/dist/umd'
import * as yup from 'yup'
import Form from 'components/ui/Form'
import Input from 'components/ui/Input'
import Button from 'components/ui/Button'
import { Site } from '@prisma/client'
import { URL_SITE_CREATE, URL_SITE_LIST } from 'config/url'

type FormObject = {
  name: string
  url: string
  repository: string
}

const schema = yup.object().shape({
  name: yup.string().required(),
  url: yup.string().trim().lowercase().url().required(),
  repository: yup
    .string()
    .trim()
    .lowercase()
    .matches(/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+/)
    .required(),
})

interface CreateSiteProps {
  sites: Site[]
}

const CreateSite: React.FC<CreateSiteProps> = (props): JSX.Element => {
  const { sites } = props
  const [session, loading] = useSession()

  const { data } = useSWR(URL_SITE_LIST, fetcher, {
    initialData: sites,
  })

  const { register, handleSubmit, errors } = useForm<FormObject>({
    defaultValues: {
      url: '',
      name: '',
      repository: '',
    },
    resolver: yupResolver(schema),
  })

  const onSubmit = async ({ name, url, repository }) => {
    try {
      const createdSite = await post(URL_SITE_CREATE, {
        name,
        url,
        repository,
      })
      mutate(URL_SITE_LIST, [...data, createdSite], false)
    } catch (error) {
      console.error('Error', error.message)
    }
  }

  if (loading) return <div>Loading...</div>
  if (!session) return <div></div>

  return (
    <Form h1="Create new Site" onSubmit={handleSubmit(onSubmit)}>
      <Input
        name="name"
        label="Name"
        type="text"
        ref={register({ required: true })}
        errors={errors['name']}
        placeholder="Site Name..."
      />

      <Input
        name="url"
        label="Url"
        type="text"
        ref={register({ required: true })}
        errors={errors['url']}
        placeholder="Site Url..."
      />

      <Input
        name="repository"
        label="Github Repository"
        type="text"
        ref={register({ required: true })}
        errors={errors['repository']}
        placeholder="maintainer/repository-name"
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
  )
}

export default CreateSite

export const getStaticProps: GetStaticProps = async () => {
  const sites = await fetcher(URL_SITE_LIST)
  return { props: { sites } }
}
