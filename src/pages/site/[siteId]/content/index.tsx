import React from 'react'
import { useSite } from 'hooks/use-site'
import Header from 'components/header'

const ContentPage: React.FC = (): JSX.Element => {
  const { site } = useSite()
  if (!site) return null
  return (
    <div>
      <Header />
      <div className="mx-auto max-w-2xl">
        <h1>Contents</h1>
      </div>
    </div>
  )
}

export default ContentPage
