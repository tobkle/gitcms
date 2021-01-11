import { NextApiRequest, NextApiResponse } from 'next'
import { randomBytes, createHash } from 'crypto'
import dbSite from 'lib/db/site'
import dbUser from 'lib/db/user'
import dbMaintainer from 'lib/db/maintainer'
import dbVerificationRequest from 'lib/db/verification-request'
import { Site, VerificationRequest } from '@prisma/client'
import getAuthenticatedUser from 'lib/get-authenticated-user'
import { sendVerificationRequest } from 'lib/emails/verification-emails'

interface ApiResponse {
  success: boolean | undefined
  sites: Site | undefined
}

export default async function apiSiteInvite(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<ApiResponse | void> {
  try {
    const { email, siteId } = req.body

    if (!email) throw new Error('Please provide an email')
    if (!siteId) throw new Error('Please provide a siteId')

    // check if user is authenticated
    const user = await getAuthenticatedUser(req, res)

    // check if authenticaed user is owner of that site
    const site = await dbSite.get(Number(siteId))

    if (user.id !== site.ownerId)
      throw new Error('User is not owner of the site')

    // create a new user
    const newUser = await dbUser.upsert(email)

    // create him as maintainer
    const newMaintainer = await dbMaintainer.upsert(site, newUser)

    // create a verification invitation
    const identifier = email
    const token = randomBytes(32).toString('hex')
    const hashedToken = createHash('sha256')
      .update(''.concat(token).concat(process.env.AUTH_SECRET))
      .digest('hex')
    let expires = null
    if (process.env.AUTH_MAX_AGE) {
      const dateExpires = new Date()
      dateExpires.setTime(
        dateExpires.getTime() + Number(process.env.AUTH_MAX_AGE) * 1000
      )
      expires = dateExpires.toISOString()
    }
    const data: VerificationRequest = {
      id: 0,
      identifier,
      token: hashedToken,
      expires,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    await dbVerificationRequest.create(data)

    // send an email with the invitation link
    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? process.env.URI_PRODUCTION
        : process.env.URI_DEVELOPMENT

    const basePath = '/api/auth/callback/email'

    const url = `${baseUrl}${basePath}?email=${encodeURIComponent(
      email
    )}&token=${encodeURIComponent(token)}`

    const provider = {
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }

    await sendVerificationRequest({ identifier, url, token, baseUrl, provider })

    res.status(200).json({ success: true })
  } catch (error) {
    console.error('ERROR: /api/site/create', error.message)
    res.status(500).json({ success: false })
  }
}
