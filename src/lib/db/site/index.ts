import db from '../'
import { User, Site, Prisma } from '@prisma/client'

const create = async ({
  owner,
  name,
  url,
  repository,
}: Prisma.SiteCreateInput): Promise<Site> => {
  if (!owner || !name || !url || !repository)
    throw new Error('Please provide valid input for create (site).')

  const site = await db.site.create({
    data: {
      owner,
      name,
      url,
      repository,
    },
  })

  return site
}

const getAll = async (): Promise<Site[]> => {
  const sites = await db.site.findMany()
  return sites
}

const getAllForOwnerMaintainer = async (user: User): Promise<Site[]> => {
  // add all the sites the signed in user owns
  const sites = await db.site.findMany({
    where: {
      ownerId: Number(user.id),
    },
  })

  // add all the sites, the user is invited as an editor (= maintainer)
  const maintainedSites = await db.maintainer.findMany({
    include: {
      site: true,
    },
    where: {
      userId: user.id,
    },
  })

  maintainedSites.map((site) => {
    sites.push(site.site)
  })

  // don't send duplicate sites
  const distinctSites = []
  sites.map((s) =>
    distinctSites.filter((d) => d.id == s.id).length > 0
      ? null
      : distinctSites.push(s)
  )

  return distinctSites
}

const get = async (id: number): Promise<Site> => {
  const site = await db.site.findUnique({
    where: {
      id: Number(id),
    },
  })
  console.log('Site get:', site)
  return site
}

const update = async (id: number, updated: Site): Promise<Site> => {
  const site = await db.site.update({
    data: {
      name: updated.name,
      url: updated.url,
      repository: updated.repository,
      status: updated.status,
    },
    where: {
      id: id,
    },
  })
  console.log('Site updated:', site)
  return site
}

const remove = async (id: number): Promise<Site> => {
  const site = await db.site.findUnique({
    where: {
      id: Number(id),
    },
  })

  await db.site.delete({
    where: {
      id: Number(id),
    },
  })
  console.log('Site deleted:', site)
  return site
}

const site = {
  get,
  getAll,
  getAllForOwnerMaintainer,
  create,
  update,
  remove,
}
export default site

/*
export  async function handle(req, res) {
  const postId = req.query.id;

  if (req.method === 'GET') {
    handleGET(postId, res);
  } else if (req.method === 'DELETE') {
    handleDELETE(postId, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

// GET /api/post/:id
async function handleGET(postId, res) {
  const post = await prisma.post.findOne({
    where: { id: Number(postId) },
    include: { author: true },
  });
  res.json(post);
}

// DELETE /api/post/:id
async function handleDELETE(postId, res) {
  const post = await prisma.post.delete({
    where: { id: Number(postId) },
  });
  res.json(post);
}
*/
