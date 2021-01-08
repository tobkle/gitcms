import { NextApiRequest, NextApiResponse } from 'next';
import { Octokit } from '@octokit/rest';
import { Endpoints } from '@octokit/types';
import getAuthenticatedUser from 'lib/get-authenticated-user';

type listUserReposResponse = Endpoints['GET /repos/{owner}/{repo}']['response'];

const octokit = new Octokit({
  auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
  baseUrl: 'https://api.github.com',
  headers: {
    accept: 'application/vnd.github.v3+json',
  },
});

interface ApiResponse {
  success: boolean;
  exists: boolean | undefined;
  message: string | undefined;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<ApiResponse | void | undefined> => {
  try {
    await getAuthenticatedUser(req, res);
    const githubUser = process.env.GITHUB_USER;
    const { repo } = req.body;

    if (!repo) throw new Error('Field repo is empty');

    const response: listUserReposResponse = await octokit.request(
      'GET /repos/{owner}/{repo}',
      {
        owner: githubUser,
        repo: repo,
      }
    );

    const exists = response.status === 200;

    res.status(200).json({ success: true, exists });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
