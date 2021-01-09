import Header from 'components/header'
import { useRouter } from 'next/router'
import Post from 'components/sites/post'
import Invite from 'components/sites/invite'

export default function SitePage(props: any): JSX.Element {
  const {
    query: { id },
  } = useRouter()
  return (
    <div>
      <Header />
      <div className="mx-auto max-w-2xl">
        <Invite />
        <Post />
      </div>
    </div>
  )
}
