import { useSession } from 'hooks/use-session'
import { useState, useEffect } from 'react'
import { useMutation } from 'react-query'
import { getSlug } from 'lib/helpers'

export default function Post(): JSX.Element {
  const [session, loading] = useSession()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [slug, setSlug] = useState(getSlug(title))
  const [manuallyUpdatedSlug, setManuallyUpdatedSlug] = useState(false)

  // if filename was changed by user once, remember that
  const updateSlug = (newSlug) => {
    setManuallyUpdatedSlug(true)
    setSlug(getSlug(newSlug))
  }

  // adjust filename according to title, if user hasn't provided a manual filename
  useEffect(() => {
    if (manuallyUpdatedSlug) return null
    setSlug(getSlug(title))
  }, [title, manuallyUpdatedSlug])

  const { mutate, isLoading, isError, error, isSuccess } = useMutation(
    (newPost) =>
      fetch('/api/github/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
        credentials: 'include',
      })
  )

  const onSubmit = (e) => {
    e.preventDefault()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mutate({ title, content, slug, path: 'posts', suffix: '.yml' })
  }

  if (loading || isLoading) return <div>Loading...</div>
  if (!session) return <div></div>
  if (isError) return <div>{error}</div>
  if (isSuccess) <div>Article is saved</div>

  return (
    <form
      className="mx-auto max-w-2xl  bg-white mb-8 p-8 border-2 border-indigo-500 rounded-md shadow-lg"
      onSubmit={onSubmit}
    >
      <h1 className="text-2xl text-indigo-600 font-bold mb-4">Edit Article</h1>

      <label className="flex flex-col mb-4 text-gray-400" htmlFor="title">
        Title
        <input
          className="bg-gray-100 px-3 py-1 my-3 rounded shadow border-2 border-gray-200"
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <label className="flex flex-col mb-4 text-gray-400" htmlFor="slug">
        Slug
        <input
          className="bg-gray-100 px-3 py-1 my-3 rounded shadow border-2 border-gray-200"
          id="slug"
          type="text"
          value={slug}
          onChange={(e) => updateSlug(e.target.value)}
        />
      </label>

      <label className="flex flex-col mb-4 text-gray-400" htmlFor="title">
        Content
        <textarea
          className="bg-gray-100 px-3 py-1 my-3 rounded shadow border-2 border-gray-200 "
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>

      <button
        className="bg-indigo-600 text-gray-50 px-6 py-2 mt-8 w-full rounded shadow hover:bg-indigo-400"
        type="submit"
      >
        Publish
      </button>
    </form>
  )
}
