import React from 'react';
import { useSession } from 'hooks/use-session';
import { useSWR } from 'hooks/use-swr';
import fetcher from 'lib/fetch';
import { Site } from '@prisma/client';
import Link from 'next/link';

const SiteList = (): JSX.Element => {
  const [session, loading] = useSession();
  const { data, error } = useSWR<Site[]>('/api/site', fetcher);

  if (loading) return <div>Loading...</div>;
  if (!session) return <div></div>;
  if (error) return <div>failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="mx-auto max-w-2xl mb-8">
      <h1 className="text-2xl text-indigo-600 font-bold mb-4">My Sites</h1>
      {data &&
        data.map((site) => {
          return (
            <div key={site.id}>
              <Link href={`/site/${site.id}`}>{site.name}</Link>
            </div>
          );
        })}
    </div>
  );
};

export default SiteList;
