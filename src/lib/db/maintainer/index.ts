import db from '..'
import { User, Site, Maintainer } from '@prisma/client'

const upsert = async (_site: Site, _user: User): Promise<Maintainer> => {
  const _maintainer = await db.maintainer.upsert({
    create: {
      site: {
        connect: {
          id: _site.id,
        },
      },
      user: {
        connect: {
          id: _user.id,
        },
      },
    },
    update: {
      site: {
        connect: {
          id: _site.id,
        },
      },
      user: {
        connect: {
          id: _user.id,
        },
      },
    },
    where: {
      siteId_userId: {
        siteId: _site.id,
        userId: _user.id,
      },
    },
  })
  return _maintainer
}

const maintainer = { upsert }

export default maintainer
