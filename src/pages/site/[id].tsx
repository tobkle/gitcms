import Header from 'components/header';
import { useRouter } from 'next/router';
import Post from 'components/post';

export default function SitePage(props: any): JSX.Element {
  const {
    query: { id },
  } = useRouter();
  return (
    <div>
      <Header />
      <div className="mx-auto max-w-2xl bg-white mb-8 p-8 border-2 border-indigo-500 rounded-md shadow-lg">
        <h1 className="text-2xl text-indigo-600 font-bold mb-4">Site {id}</h1>
        <Post />
      </div>
    </div>
  );
}
