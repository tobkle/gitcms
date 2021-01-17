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

    const body = req.body
    const githubUser = process.env.GITHUB_USER
    const githubRepo = process.env.GITHUB_REPO
    const contentFolder = process.env.CMS_CONTENT_FOLDER
    const contentFile = process.env.CMS_CONTENT_TYPE_FILE

    if (!body) throw new Error('Please provide information')
    if (!body.siteId) throw new Error('Please provide a siteId')
    if (!body.name) throw new Error('Please provide a name')
    if (!body.plural) throw new Error('Please provide a plural')
    if (!body.singular) throw new Error('Please provide a singular')
    if (typeof body.menu === 'undefined')
      throw new Error('Please provide a menu')
    if (typeof body.create === 'undefined')
      throw new Error('Please provide a create')
    if (typeof body.read === 'undefined')
      throw new Error('Please provide a read')
    if (typeof body.update === 'undefined')
      throw new Error('Please provide a update')
    if (typeof body.delete === 'undefined')
      throw new Error('Please provide a delete')
    if (typeof body.fields === 'undefined')
      throw new Error('Please provide a fields')

    // First we need to get the current data of the file to check for
    // concurrent updates
    const githubFilename = `${contentFolder}/${body.name}/${contentFile}`
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
    const content = prepareContent(githubFile, body)

    // Create new file
    const fileContent = YAML.stringify(content)
    const buff = Buffer.from(fileContent, 'utf-8')
    const base64EncodedContent = buff.toString('base64')

    await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
      owner: githubUser,
      repo: githubRepo,
      path: githubFilename,
      sha: SHAofPreviousFileVersion,
      message: `updated by ${user.name}`,
      content: base64EncodedContent,
    })

    res.status(200).json({ success: true, data: content })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

const ContentTypesTemplate = {
  name: '',
  plural: '',
  singular: '',
  menu: true,
  create: true,
  read: true,
  update: true,
  delete: true,
  fields: [],
}

const prepareContent = (githubFile, body) => {
  let content = null

  if (githubFile) {
    const bufferObject = Buffer.from(githubFile?.data?.content, 'base64')
    const decoded = bufferObject.toString('utf8')
    content = YAML.parse(decoded)
  }

  if (!content?.name) {
    content = Object.assign({}, ContentTypesTemplate)
  }

  content.name = body.name
  content.plural = body.plural
  content.singular = body.singular
  content.menu = body.menu
  content.create = body.create
  content.read = body.read
  content.update = body.update
  content.delete = body.delete
  content.fields = body.fields

  // content.fields.push({
  //   name: body.name,
  //   label: body.label,
  //   widget: body.widget,
  //   default: body.default,
  //   placeholder: body.placeholder,
  //   required: body.required,
  // })

  return content
}
