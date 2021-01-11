import { useSession } from 'hooks/use-session'
import { useState, useEffect } from 'react'
import { useMutation } from 'react-query'
import { getSlug } from 'lib/helpers'
import { Site } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { post } from 'lib/fetch'
import { yupResolver } from '@hookform/resolvers/dist/umd'
import * as yup from 'yup'
import Form from 'components/ui/Form'
import Input from 'components/ui/Input'
import Button from 'components/ui/Button'
import { URL_SITE_POST_UPDATE } from 'config/url'

interface PostProps {
  site?: Site
}

interface FormObject {
  siteId: number
  title: string
  slug: string
  content: string
  suffix: string
  path: string
}

const schema = yup.object().shape({
  siteId: yup.number().required(),
  title: yup.string().trim().required(),
  slug: yup.string().trim().lowercase().required(),
  content: yup.string(),
  suffix: yup.string().required(),
  path: yup.string().required(),
})

const Post: React.FC<PostProps> = (props): JSX.Element => {
  const { site } = props
  const [session, loading] = useSession()

  const { register, handleSubmit, errors } = useForm<FormObject>({
    defaultValues: {
      siteId: site.id,
      title: '',
      slug: '',
      content: '',
      suffix: 'md',
      path: 'posts',
    },
    resolver: yupResolver(schema),
  })

  const onSubmit = async ({ siteId, title, slug, content, suffix, path }) => {
    try {
      const response = await post(URL_SITE_POST_UPDATE, {
        siteId,
        title,
        slug: getSlug(slug),
        content,
        suffix,
        path,
      })
      console.log('Post published:', response)
    } catch (error) {
      console.error(error)
    }
  }

  if (loading) return <div>Loading...</div>
  if (!session) return null

  return (
    <Form onSubmit={handleSubmit(onSubmit)} h1="Edit Post">
      <Input
        ref={register({ required: true })}
        type="hidden"
        name="siteId"
        label="siteId"
        placeholder="siteId"
        errors={errors['siteId']}
      />
      <Input
        ref={register({ required: true })}
        type="hidden"
        name="suffix"
        label="suffix"
        placeholder="suffix"
        errors={errors['suffix']}
      />
      <Input
        ref={register({ required: true })}
        type="hidden"
        name="path"
        label="path"
        placeholder="path"
        errors={errors['path']}
      />
      <Input
        ref={register({ required: true })}
        type="text"
        name="title"
        label="Title"
        placeholder="title"
        errors={errors['title']}
      />
      <Input
        ref={register({ required: true })}
        type="text"
        name="slug"
        label="Slug"
        placeholder="slug"
        errors={errors['slug']}
      />
      <Input
        ref={register({ required: true })}
        type="Textarea"
        name="content"
        label="Content"
        placeholder="content"
        errors={errors['content']}
      />
      <Button type="submit" variant="primary" className="w-full mt-4">
        Publish
      </Button>
    </Form>
  )
}

export default Post
