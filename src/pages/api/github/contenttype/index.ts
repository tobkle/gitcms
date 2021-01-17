import { NextApiRequest, NextApiResponse } from 'next'
import { Octokit } from '@octokit/rest'
import { OctokitResponse } from '@octokit/types'
import getAuthenticatedUser from 'lib/get-authenticated-user'
import YAML from 'yaml'

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
    const githubUser = process.env.GITHUB_USER
    const githubRepo = process.env.GITHUB_REPO
    const contentFolder = process.env.CMS_CONTENT_FOLDER
    const contentFile = process.env.CMS_CONTENT_TYPE_FILE

    const { siteId } = req.query
    if (!siteId) throw new Error('Please provide a siteId')

    // First we need to get the current data of the file to check for
    // concurrent updates
    const githubFilename = `${contentFolder}/${contentFile}`
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

    // Prepare content type definition file
    if (!githubFile) throw new Error('No content types available')
    const bufferObject = Buffer.from(githubFile.data.content, 'base64')
    const decoded = bufferObject.toString('utf8')
    const jsonData = YAML.parse(decoded)

    res.status(200).json({ success: true, data: jsonData.folders })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

const ContentTypesTemplate = {
  name: 'content',
  plural: 'Content Types',
  singular: 'Content Type',
  menu: true,
  create: true,
  read: true,
  update: true,
  delete: true,
  folders: [],
}

const prepareContent = (githubFile, body) => {
  const { name, label, menu } = body
  let content = null
  if (githubFile) content = YAML.parse(githubFile)
  if (!content?.name && !content?.folder) {
    content = Object.assign({}, ContentTypesTemplate)
  }
  content.folders.push({ name, label, menu })
  return YAML.stringify(content)
}
