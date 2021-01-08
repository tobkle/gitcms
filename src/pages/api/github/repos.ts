import { NextApiRequest, NextApiResponse } from 'next';
import { Octokit } from '@octokit/rest';
import { OctokitResponse } from '@octokit/types';
import getAuthenticatedUser from 'lib/get-authenticated-user';

const octokit = new Octokit({
  auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
  baseUrl: 'https://api.github.com',
  headers: {
    accept: 'application/vnd.github.v3+json',
  },
});

interface ApiResponse {
  success: boolean;
  message: string | undefined;
  repos: OctokitResponse<any, number> | void | undefined;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<ApiResponse | void | undefined> => {
  try {
    await getAuthenticatedUser(req, res);
    const githubUser = process.env.GITHUB_USER;

    const response = await octokit.request('GET /user/repos', {
      owner: githubUser,
      visibility: 'all',
      direction: 'desc',
      sort: 'created',
      page: 1,
      per_page: 10,
    });

    res.status(200).json({ success: true, repos: response.data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
