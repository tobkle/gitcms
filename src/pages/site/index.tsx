import Header from 'components/header'
import { SiteCreate, SiteList } from 'components/sites'

const HomePage: React.FC = () => {
  return (
    <div className="text-indigo-500">
      <Header />
      <SiteList />
      <SiteCreate />
    </div>
  )
}

export default HomePage
