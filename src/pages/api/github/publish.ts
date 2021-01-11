import { NextApiRequest, NextApiResponse } from 'next'
import { Octokit } from '@octokit/rest'
import { OctokitResponse } from '@octokit/types'
import getAuthenticatedUser from 'lib/get-authenticated-user'

const octokit = new Octokit({
  auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
  baseUrl: 'https://api.github.com',
})

interface ApiResponse {
  success: boolean
  message: string | undefined
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<ApiResponse | void> => {
  try {
    const user = await getAuthenticatedUser(req, res)
    const body = req.body
    const githubUser = process.env.GITHUB_USER
    const githubRepo = process.env.GITHUB_REPO
    const githubPaths = JSON.parse(process.env.NEXT_PUBLIC_GITHUB_PATHS)

    if (!body) throw new Error('Please provide information')
    if (!body.title) throw new Error('Please provide a title')
    if (!body.content) throw new Error('Please provide content')
    if (!body.slug) throw new Error('Please provide a slug')
    if (!body.suffix) throw new Error('Please provide a suffix')
    if (!body.path) throw new Error('Please provide a folder path')

    if (githubPaths.indexOf(body.path) < 0)
      throw new Error('The provided path is not allowed')

    // First we need to get the current data of the file to check for
    // concurrent updates
    const githubFilename = `${body.path}/${body.slug}.${body.suffix}`
    let githubFile: OctokitResponse<any, any> = null
    try {
      githubFile = await octokit.request(
        'GET /repos/{owner}/{repo}/contents/{path}',
        {
          owner: githubUser,
          repo: githubRepo,
          path: githubFilename,
        }
      )
    } catch (error) {
      console.log(
        `File with name ${githubFilename} not accessible.`,
        error.message
      )
    }
    // eslint-disable-next-line
    const SHAofPreviousFileVersion = githubFile?.data?.sha
      ? githubFile.data.sha
      : ''

    const buff = Buffer.from(body.content, 'utf-8')
    const base64EncodedContent = buff.toString('base64')

    await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
      owner: githubUser,
      repo: githubRepo,
      path: githubFilename,
      sha: SHAofPreviousFileVersion,
      message: `updated by ${user.name}`,
      content: base64EncodedContent,
    })

    res.status(200).json({ success: true })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
