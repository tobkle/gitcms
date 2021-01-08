import db from '../';
import { User, Site, Prisma } from '@prisma/client';

const create = async ({
  owner,
  name,
  url,
  repository,
}: Prisma.SiteCreateInput): Promise<Site> => {
  if (!owner || !name || !url || !repository)
    throw new Error('Please provide valid input for create (site).');

  const site = await db.site.create({
    data: {
      owner,
      name,
      url,
      repository,
    },
  });

  return site;
};

const getAll = async (): Promise<Site[]> => {
  const sites = await db.site.findMany();
  return sites;
};

const getAllForOwnerMaintainer = async (user: User): Promise<Site[]> => {
  const ownedSites = await db.site.findMany({
    where: {
      ownerId: Number(user.id),
    },
  });
  console.log('ownedSites:', ownedSites);

  const maintainedSites = await db.maintainer.findMany({
    include: {
      site: true,
    },
    where: {
      userId: user.id,
    },
  });

  console.log('maintainedSites:', maintainedSites);

  const concatenatedSites = ownedSites; //.concat();
  console.log('concatenatedSites:', concatenatedSites);

  return concatenatedSites;
};

const get = async (id): Promise<Site> => {
  const site = await db.site.findUnique({
    where: {
      id: Number(id),
    },
  });
  return site;
};

const site = {
  get,
  getAll,
  getAllForOwnerMaintainer,
  create,
};
export default site;

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
