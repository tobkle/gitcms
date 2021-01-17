import React from 'react'
import { useSite } from 'hooks/use-site'
import Header from 'components/header'
import Post from 'components/sites/post'
import Invite from 'components/sites/invite'

const SitePage: React.FC = (): JSX.Element => {
  const { site } = useSite()
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
