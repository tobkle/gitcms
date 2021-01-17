import React from 'react'
import { useSite } from 'hooks/use-site'
import Header from 'components/header'
import { ContentTypeCreate } from 'components/content-types'

const CreateContentTypePage: React.FC = (): JSX.Element => {
  const { site } = useSite()
  if (!site) return null
  return (
    <div>
      <Header />
      <div className="mx-auto max-w-2xl">
        <ContentTypeCreate site={site} />
      </div>
    </div>
  )
}

export default CreateContentTypePage
