import { signIn, signOut, useSession } from 'next-auth/client';
import Link from 'next/link';

export default function Header(): JSX.Element {
  const [session, loading] = useSession();

  if (loading) return <p>Loading...</p>;

  return (
    <header className="max-w-4xl mx-auto flex flex-row justify-between items-center content-center">
      <h1 className="text-indigo-500 text-2xl font-semibold my-3">Login</h1>
      {!session ? (
        <button
          className="bg-indigo-600 text-gray-50 px-6 py-1 rounded shadow mr-4"
          onClick={() => signIn()}
        >
          Login
        </button>
      ) : (
        <span className="flex w-64 items-center justify-between">
          <span className="flex items-center text-center">
            <nav>
              <span>
                <Link href="/admin/article">Admin</Link>
              </span>
            </nav>
            {session.user.name}
          </span>
          {session.user.image ? (
            <img
              className="w-16 h-16 rounded-full"
              src={session.user.image}
              alt={session.user.name}
            />
          ) : null}
          <button className=" text-gray-900 " onClick={() => signOut()}>
            Logout
          </button>
        </span>
      )}
    </header>
  );
}
