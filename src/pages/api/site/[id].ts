import { NextApiRequest, NextApiResponse } from 'next'
import site from 'lib/db/site'
import { Site } from '@prisma/client'
import getAuthenticatedUser from 'lib/get-authenticated-user'

interface ApiResponse {
  success: boolean | undefined
  site: Site | undefined
}

export default async function apiSite(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<ApiResponse | void | undefined> {
  try {
    const { id } = req.query
    if (!id) throw new Error('Please provide site id')
    const siteId = Math.floor(Number(id))

    await getAuthenticatedUser(req, res)

    if (req.method === 'GET') {
      console.log('handleGET')
      handleGET(res, siteId)
    } else if (req.method === 'DELETE') {
      console.log('handleDELETE')
      handleDELETE(res, siteId)
    } else if (req.method === 'PATCH') {
      console.log('handleUPDATE')
      const updateSite = req.body
      handleUPDATE(res, siteId, updateSite)
    } else {
      throw new Error(
        `The request method ${req.method} is not supported by this route`
      )
    }
  } catch (error) {
    console.log(`ERROR: ${req.method}?${req.query}/api/site:`, error.message)
    res.status(500).json({ success: false })
  }
}

async function handleGET(res: NextApiResponse, siteId: number): Promise<void> {
  const returnedSite = await site.get(siteId)
  res.status(200).json(returnedSite)
}

async function handleUPDATE(
  res: NextApiResponse,
  siteId: number,
  updateSite: Site
): Promise<void> {
  const returnedSite = await site.update(siteId, updateSite)
  res.status(200).json(returnedSite)
}

async function handleDELETE(
  res: NextApiResponse,
  siteId: number
): Promise<void> {
  const returnedSite = await site.remove(siteId)
  res.status(200).json(returnedSite)
}
