import * as React from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { get } from 'lib/fetch'
import { URL_SITE_ID } from 'config/url'
import { Site } from '@prisma/client'

type Props = {
  children: React.ReactNode
}

export type SiteContextType = {
  site: Site
  setSite: (value: Site) => void
}

const SiteContext = React.createContext<SiteContextType | null>(null)

export const SiteProvider: React.FC<Props> = (props: Props): JSX.Element => {
  const [session] = useSession()
  const [site, setSite] = React.useState<Site>(null)
  const router = useRouter()

  React.useEffect(() => {
    const getSite = async (siteId: number): Promise<void> => {
      const site: Site = await get<Site>(`${URL_SITE_ID}/${siteId}`)
      if (site && site.id) {
        setSite(() => site)
      }
    }

    // query id will not come with first render, need to wait for it...
    if (router.asPath !== router.route) {
      const { siteId } = router.query
      if (siteId) getSite(Number(siteId))
    }
  }, [router, session])

  return (
    <SiteContext.Provider value={{ site, setSite }}>
      {props.children}
    </SiteContext.Provider>
  )
}

export const useSite = (): SiteContextType => {
  return React.useContext(SiteContext)
}
