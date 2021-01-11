import db from '..'
import { User, Site, VerificationRequest } from '@prisma/client'

const create = async (
  data: VerificationRequest
): Promise<VerificationRequest> => {
  const _verificationRequest = await db.verificationRequest.create({
    data: {
      identifier: data.identifier,
      token: data.token,
      expires: data.expires,
    },
  })
  return _verificationRequest
}

const VR = { create }

export default VR
