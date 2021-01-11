import { NextApiRequest, NextApiResponse } from 'next'
import dbSite from 'lib/db/site'
import { Site, Prisma } from '@prisma/client'
import getAuthenticatedUser from 'lib/get-authenticated-user'

interface ApiResponse {
  success: boolean | undefined
  sites: Site | undefined
}

export default async function apiSiteCreate(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<ApiResponse | void> {
  try {
    const { name, url, repository } = req.body
    if (!name) throw new Error('Please provide a name')
    if (!url) throw new Error('Please provide an url')
    if (!repository) throw new Error('Please provide a repository')

    const user = await getAuthenticatedUser(req, res)
    const owner: Prisma.UserCreateOneWithoutOwnsInput = {
      connect: {
        id: Number(user.id),
      },
    }
    const site = await dbSite.create({ owner, name, url, repository })
    res.status(200).json(site)
  } catch (error) {
    console.error('ERROR: /api/site/create', error.message)
    res.status(500).json({ success: false })
  }
}
