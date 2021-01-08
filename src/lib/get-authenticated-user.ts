import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import dbUser from 'lib/db/user';
import { User } from '@prisma/client';

export default async function getAuthenticatedUser(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<User> {
  // Check if user has a valid session
  const session = await getSession({ req });
  if (!session) {
    res.status(401).end();
    return;
  }

  // Get the User by his accessToken in the session to obtain userId
  const user = await dbUser.getByAccessToken(session.accessToken);
  if (!user) {
    res.status(401).end();
    return;
  }

  return user;
}
