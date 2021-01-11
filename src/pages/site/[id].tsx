import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import Header from 'components/header'
import Post from 'components/sites/post'
import Invite from 'components/sites/invite'
import { get } from 'lib/fetch'
import { Site } from '@prisma/client'
import { URL_SITE_ID } from 'config/url'

const SitePage: React.FC = (): JSX.Element => {
  const [session, loading] = useSession()
  const [site, setSite] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const getSite = async (id: number): Promise<void> => {
      const site: Site = await get<Site>(`${URL_SITE_ID}/${id}`)
      console.log('useEffect site', site)
      if (site && site.id) {
        setSite(() => site)
      }
    }
    // id will not come with first render, need to wait for it...
    if (router.asPath !== router.route) {
      const { id } = router.query
      if (id) getSite(Number(id))
    }
  }, [router, session])

  if (loading) return <div>Loading...</div>
  if (!site || !site.id) return null
  return (
    <div>
      <Header />
      <div className="mx-auto max-w-2xl">
        <Invite site={site} />
        <Post site={site} />
      </div>
    </div>
  )
}

export default SitePage
