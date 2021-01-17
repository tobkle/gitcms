import React from 'react'
import { useSite } from 'hooks/use-site'
import Header from 'components/header'

const ContentPageForId: React.FC = (): JSX.Element => {
  const { site } = useSite()
  if (!site) return null
  return (
    <div>
      <Header />
      <div className="mx-auto max-w-2xl">
        <h1>Content for ID</h1>
      </div>
    </div>
  )
}

export default ContentPageForId
