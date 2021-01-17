import React from 'react'
import { useSite } from 'hooks/use-site'
import { get } from 'lib/fetch'
import { URL_CONTENT_TYPE_LIST } from 'config/url'
import Header from 'components/header'
import Link from 'next/link'

interface ContentTypeType {
  name: string
  label: string
  menu: boolean
}

interface ContentResponse {
  success: boolean
  data: ContentTypeType[] | undefined
  message: string | undefined
}

const ContentTypesPage: React.FC = (): JSX.Element => {
  const [contentTypes, setContentTypes] = React.useState<ContentTypeType[]>([])
  const { site } = useSite()
  React.useEffect(() => {
    const getContentTypes = async (siteId) => {
      try {
        const response: ContentResponse = await get(
          `${URL_CONTENT_TYPE_LIST}?siteId=${siteId}`
        )
        if (response?.data?.length > 0) {
          setContentTypes(response.data)
        }
      } catch (error) {
        console.error(error.message)
      }
    }
    if (site && site.id) {
      getContentTypes(site.id)
    }
  }, [site])
  if (!site || !contentTypes || contentTypes.length === 0) return null
  return (
    <div>
      <Header />
      <div className="mx-auto max-w-2xl">
        <h1 className="font-semibold text-2xl text-primary-500 mb-4">
          Content Types
        </h1>
        <ul>
          {contentTypes &&
            contentTypes.map(
              ({ name, label, menu }) =>
                menu && (
                  <li key={name}>
                    <Link href={`/site/${site.id}/type/${name}`}>{label}</Link>
                  </li>
                )
            )}
        </ul>
      </div>
    </div>
  )
}

export default ContentTypesPage
