import Header from 'components/header'
import { SiteCreate, SiteList } from 'components/sites'
import { Site } from '@prisma/client'
// import { GetStaticProps } from 'next'
// import dbSite from 'lib/db/site'
// import { serializeContainedObjects } from 'lib/helpers'

interface HomePageProps {
  sites: Site[]
}

const HomePage: React.FC<HomePageProps> = (props): JSX.Element => {
  const { sites } = props
  return (
    <div>
      <Header />
      <SiteList sites={sites} />
      <SiteCreate sites={sites} />
    </div>
  )
}

export default HomePage

/*
interface GetStaticPropsResponse {
  props: {
    sites: Site[]
  }
}
export const getStaticProps: GetStaticProps = async (): Promise<GetStaticPropsResponse> => {
  let sites = await dbSite.getAll()
  sites = serializeContainedObjects(sites)
  return { props: { sites } }
}
*/
