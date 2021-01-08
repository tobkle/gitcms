import { NextApiRequest, NextApiResponse } from 'next';
import site from 'lib/db/site';
import { Site } from '@prisma/client';
import getAuthenticatedUser from 'lib/get-authenticated-user';

interface ApiResponse {
  success: boolean | undefined;
  sites: Site[] | undefined;
}

export default async function apiSite(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<ApiResponse | void | undefined> {
  try {
    const user = await getAuthenticatedUser(req, res);
    const sites = await site.getAllForOwnerMaintainer(user);
    console.log('getAllFromOwnerMaintainer sites:', sites);

    res.status(200).json(sites);
  } catch (error) {
    console.log('ERROR: /api/site:', error.message);
    res.status(500).json({ success: false });
  }
}
