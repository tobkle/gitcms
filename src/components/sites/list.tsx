import React from 'react'
import { GetStaticProps } from 'next'
import { useSession } from 'hooks/use-session'
import { useSWR } from 'hooks/use-swr'
import fetcher from 'lib/fetch'
import { Site } from '@prisma/client'
import Link from 'next/link'
import { URL_SITE_LIST } from 'config/url'

interface SiteListProps {
  sites: Site[]
}

const SiteList: React.FC<SiteListProps> = (props): JSX.Element => {
  const { sites } = props
  const [session, loading] = useSession()
  const { data, error } = useSWR<Site[]>(URL_SITE_LIST, fetcher, {
    initialData: sites,
  })

  if (loading) return <div>Loading...</div>
  if (!session) return <div></div>
  if (error) return <div>failed to load</div>
  if (!data) return <div>Loading...</div>
  console.log('list: data', data)
  return (
    <div className="mx-auto max-w-2xl mb-8">
      <h1 className="text-2xl text-indigo-600 font-bold mb-4">My Sites</h1>
      {data &&
        data.map((site) => {
          return (
            <div key={site.id}>
              <Link href={`/site/${site.id}`}>
                <a>{site.name}</a>
              </Link>
            </div>
          )
        })}
    </div>
  )
}

export default SiteList

export const getStaticProps: GetStaticProps = async () => {
  const sites = await fetcher(URL_SITE_LIST)
  return { props: { sites } }
}
