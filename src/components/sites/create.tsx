import React from 'react'
import cn from 'classnames'
import { useForm } from 'react-hook-form'
import { useSWR } from 'hooks/use-swr'
import fetcher from 'lib/fetch'
import { useSession } from 'hooks/use-session'
import { yupResolver } from '@hookform/resolvers/dist/umd'
import * as yup from 'yup'
import Input from 'components/elements/input'

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

const CreateSite: React.FC = (): JSX.Element => {
  const [session, loading] = useSession()
  const { register, handleSubmit, errors } = useForm<FormObject>({
    defaultValues: {
      url: '',
      name: '',
      repository: '',
    },
    resolver: yupResolver(schema),
  })
  const { mutate } = useSWR('/api/site')

  const onSubmit = async ({ name, url, repository }) => {
    try {
      console.log(name, url, repository)
      const response = await fetcher('/api/site/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({ name, url, repository }),
        credentials: 'include',
      })
      console.log('response', response)
      const site = await response.json()
      console.log('site', site)
      mutate(site)
    } catch (error) {
      console.error('Error', error.message)
    }
  }

  if (loading) return <div>Loading...</div>
  if (!session) return <div></div>

  return (
    <div className="mx-auto max-w-2xl bg-white mb-8 p-8 border-2 border-indigo-500 rounded-md shadow-lg">
      <h1 className="text-2xl text-indigo-600 font-bold mb-4">
        Create new Site
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-6 grid grid-cols-12 gap-6">
          {/* <Input
            name="name"
            label="Name"
            type="text"
            register={register({ required: true })}
            errors={errors}
          /> */}

          {/* <div className="col-span-12">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className={cn(
                'mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm',
                {
                  'border-gray-300 focus:ring-light-blue-500 focus:border-light-blue-500': !errors.name,
                  'border-red-300 focus:ring-red-500 focus:border-red-500': !!errors.name,
                }
              )}
              id="name"
              type="text"
              name="name"
              defaultValue="Website klemmer.info"
              ref={register({ required: true })}
              placeholder="Site name"
            />
            {errors.name && (
              <div className="text-red-500 text-sm">{errors.name?.message}</div>
            )}
          </div> */}

          <div className="col-span-12">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="url"
            >
              Url
            </label>
            <input
              className={cn(
                'mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm',
                {
                  'border-gray-300 focus:ring-light-blue-500 focus:border-light-blue-500': !errors.url,
                  'border-red-300 focus:ring-red-500 focus:border-red-500': !!errors.url,
                }
              )}
              id="url"
              type="text"
              name="url"
              defaultValue="https://www.klemmer.info"
              ref={register({ required: true })}
              placeholder="Site Url"
            />
            {errors.url && (
              <div className="text-red-500 text-sm">{errors.url?.message}</div>
            )}
          </div>

          <div className="col-span-12">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="repository"
            >
              Github Repository
            </label>
            <input
              className={cn(
                'mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm',
                {
                  'border-gray-300 focus:ring-light-blue-500 focus:border-light-blue-500': !errors.repository,
                  'border-red-300 focus:ring-red-500 focus:border-red-500': !!errors.repository,
                }
              )}
              id="repository"
              type="text"
              name="repository"
              defaultValue="tobkle/klemmer.info"
              ref={register({ required: true })}
              placeholder="maintainer/repository-name"
            />
            {errors.repository && (
              <div className="text-red-500 text-sm">
                {errors.repository?.message}
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={!true}
          className={cn('text-gray-50 px-6 py-2 mt-8 w-full rounded shadow', {
            'bg-indigo-600  hover:bg-indigo-400': true,
            'bg-gray-200': !true,
          })}
        >
          Create
        </button>
      </form>
    </div>
  )
}

export default CreateSite
